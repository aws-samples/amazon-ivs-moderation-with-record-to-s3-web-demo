""" All stack configuration for ivs moderation backend """
from aws_cdk import (
    core,
    aws_s3 as s3,
    aws_lambda as lambda_,
    aws_iam as iam,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    aws_cloudfront as cf,
    aws_cloudfront_origins as origins,
    aws_dynamodb as db,
    aws_apigateway as api,
    aws_cognito as cognito,
    aws_appsync as appsync
)
import boto3

from aws_cdk.aws_lambda_event_sources import S3EventSource


class IvsModerationStack(core.Stack):
    """ Main class for the IvsModerationStack """

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # Create S3 bucket for the recording
        bucket = self.create_s3_bucket("recording-")

        # Create CloudFront distribution and attach it with the S3 bucket
        cf_distribution = self.create_cf_distribution(bucket)

        # Create SNS for alerts
        email = core.CfnParameter(self, "email", type="String",
                                  description="Email address to which SNS messages will be sent")
        mytopic = self.create_sns_topic(email.value_as_string, 'alerttopic')

        # Create database table to store the job status
        table = self.create_dynamo_db_table("ledger-")

        # Create a database table to keep the channels to be reviewed
        review_db_table = self.create_dynamo_db_table("review-")

        # Table to keep the settings
        settings_db_table = self.create_db_table("settings-", "id")

        # Create lamabda function to process the content

        # Environment variables
        env = {
            'CFDOMAIN': cf_distribution.domain_name,
            'SNSTOPIC': mytopic.topic_arn,
            'STATUSTABLE': table.table_name,
            'REVIEWTABLE': review_db_table.table_name,
            'SETTINGSTABLE': settings_db_table.table_name
        }

        lfuncrecog = self.create_lambda_function(
            "lfuncrecog", "ivs_moderation/lambdas/lfuncprocessimage", env)

        # Giving full access to rekognition
        lfuncrecog.role.add_managed_policy(
            iam.ManagedPolicy.from_aws_managed_policy_name("AmazonRekognitionFullAccess"))
        lfuncrecog.role.add_managed_policy(
            iam.ManagedPolicy.from_aws_managed_policy_name("AmazonS3ReadOnlyAccess"))
        lfuncrecog.role.add_to_policy(iam.PolicyStatement(
            resources=["*"],
            actions=["ivs:StopStream",
                     "ivs:DeleteStreamKey", "ivs:ListStreamKeys",
                     "ivs:GetChannel", "ivs:GetStream"]
        ))

        # Allow lambda function to publish to the SNS Topic
        lfuncrecog.role.add_to_policy(iam.PolicyStatement(
            resources=[mytopic.topic_arn],
            actions=["sns:Publish"]
        ))

        # Allow lambda function to access the db table
        table.grant_full_access(lfuncrecog)
        review_db_table.grant_full_access(lfuncrecog)
        settings_db_table.grant_full_access(lfuncrecog)

        # Connect lambda with S3 event
        lfuncrecog.add_event_source(S3EventSource(
            bucket=bucket,
            events=[s3.EventType.OBJECT_CREATED],
            filters=[s3.NotificationKeyFilter(suffix=".jpg")]
        ))

        lambda_layers = self.create_lambda_layer()

        # Create lambda function for all the API Calls
        lambda_api = self.create_lambda_function(
            "lambda_api", "ivs_moderation/lambdas/lambda_api/", env)
        # Adding lambda layer to the api lambda function
        lambda_api.add_layers(lambda_layers)

        # Giving lambda full access to ivs service
        lambda_api.role.add_to_policy(iam.PolicyStatement(
            resources=["*"],
            actions=["ivs:StopStream",
                     "ivs:DeleteStreamKey", "ivs:ListStreamKeys", "ivs:GetStream"]
        ))

        # Give sns access to the api lambda
        lambda_api.role.add_to_policy(iam.PolicyStatement(
            resources=[mytopic.topic_arn],
            actions=["sns:Publish"]
        ))

        # API gateway integrated with lambda
        self.create_api_gw(lambda_api)

        # Api lambda to give access to review and ledger tables
        table.grant_full_access(lambda_api)
        review_db_table.grant_full_access(lambda_api)

        # Debug database should be deleted
        self.create_db_table("moderation-", "id")

        # Create userpool
        pool = self.create_user_pool('ivsmoderation-pool')
        pool_client = self.create_user_pool_client('ivsmoderation', pool)

        # Create identity pool and map it to the userpool created
        identity_pool = self.create_identity_pool(
            'ivsmoderation-idpool', pool, pool_client)

        # Create iam role for authenticated users for the identity pool
        identity_auth_role = iam.Role(self, 'auth-role', assumed_by=iam.FederatedPrincipal(federated="cognito-identity.amazonaws.com", conditions=({
            "StringEquals": {
                "cognito-identity.amazonaws.com:aud": identity_pool.ref
            },
            "ForAnyValue:StringLike": {
                "cognito-identity.amazonaws.com:amr": "authenticated"
            }
        }), assume_role_action="sts:AssumeRoleWithWebIdentity"))

        # Create iam role for authenticated users for the identity pool
        identity_unauth_role = iam.Role(self, 'unauth-role', assumed_by=iam.FederatedPrincipal(federated="cognito-identity.amazonaws.com", conditions=({
            "StringEquals": {
                "cognito-identity.amazonaws.com:aud": identity_pool.ref
            },
            "ForAnyValue:StringLike": {
                "cognito-identity.amazonaws.com:amr": "unauthenticated"
            }
        }), assume_role_action="sts:AssumeRoleWithWebIdentity"))

        # attaching identitypool roles
        cognito.CfnIdentityPoolRoleAttachment(self, "PoolRoleAttachment", identity_pool_id=identity_pool.ref, roles=({
            "authenticated": identity_auth_role.role_arn,
            "unauthenticated": identity_unauth_role.role_arn
        }))

        # Creating appsync endpoints
        api = self.create_appsync_api('appsync-api', pool)
        review_db_table_source = api.add_dynamo_db_data_source(
            'ChannelsTable', review_db_table)
        settings_db_table_source = api.add_dynamo_db_data_source(
            'SettingsTable', settings_db_table)

        # Adding resolvers mapping to the datasource
        self.add_resolvers(review_db_table_source, 'getChannels', 'Query', 'ivs_moderation/schemas/resolvers/Query.getChannels.req.vtl')
        self.add_resolvers(review_db_table_source, 'listChannelss', 'Query', 'ivs_moderation/schemas/resolvers/Query.listChannelss.req.vtl')
        self.add_resolvers(settings_db_table_source, 'getSettings', 'Query', 'ivs_moderation/schemas/resolvers/Query.getSettings.req.vtl')
        self.add_resolvers(settings_db_table_source, 'listSettingss', 'Query', 'ivs_moderation/schemas/resolvers/Query.listSettings.req.vtl')

        self.add_resolvers(review_db_table_source, 'createChannels', 'Mutation', 'ivs_moderation/schemas/resolvers/Mutation.createChannels.req.vtl')
        self.add_resolvers(review_db_table_source, 'updateChannels', 'Mutation', 'ivs_moderation/schemas/resolvers/Mutation.updateChannels.req.vtl')
        self.add_resolvers(review_db_table_source, 'deleteChannels', 'Mutation', 'ivs_moderation/schemas/resolvers/Mutation.deleteChannels.req.vtl')
        self.add_resolvers(settings_db_table_source, 'createSettings', 'Mutation', 'ivs_moderation/schemas/resolvers/Mutation.createSettings.req.vtl')
        self.add_resolvers(settings_db_table_source, 'updateSettings', 'Mutation', 'ivs_moderation/schemas/resolvers/Mutation.updateSettings.req.vtl')
        self.add_resolvers(settings_db_table_source, 'deleteSettings', 'Mutation', 'ivs_moderation/schemas/resolvers/Mutation.deleteSettings.req.vtl')

        # Exports
        core.CfnOutput(self, 's3_bucket', value=bucket.bucket_name,
                       description="Bucket to store the recordings", export_name='s3-bucket')
        core.CfnOutput(self, 'user_pools_id', value=pool.user_pool_id,
                       description="User pool to access the APIs", export_name='user-pools-id')
        core.CfnOutput(self, 'user_pools_webclient_id', value=pool_client.user_pool_client_id,
                       description="client id for applications", export_name='user-pools-web-client-id')
        core.CfnOutput(self, 'identity_pool_id', value=identity_pool.ref,
                       description="Identity pool name", export_name='identity-pool-id')
        core.CfnOutput(self, 'aws_appsync_graphqlEndpoint', value=api.graphql_url,
                       description="Appsync api url", export_name='appsync-api-url')

    def create_s3_bucket(self, bucketname):
        ''' Function to create s3 bucket '''

        # Disabling block public access option as part of the requirement of IVS beta API
        # Remove removal policy once the code goes for production
        return s3.Bucket(self, bucketname,
                         block_public_access=s3.BlockPublicAccess(block_public_acls=False), removal_policy=core.RemovalPolicy.DESTROY)

    def create_lambda_function(self, lfuncname, codeloc, env):
        ''' Function to create lambda '''

        return lambda_.Function(self, lfuncname, code=lambda_.Code.from_asset(codeloc),
                                handler="app.handler", runtime=lambda_.Runtime.PYTHON_3_8, environment=env
                                )

    def create_sns_topic(self, email, topicname):
        """ Function to create new sns topic """
        topic = sns.Topic(self, topicname, display_name="Alert topic")
        topic.add_subscription(subs.EmailSubscription(email))
        return topic

    def create_cf_distribution(self, s3_bucket):
        """ Function to create CF distribution """
        return cf.Distribution(self, "ivsmoderation-dist", default_behavior=cf.BehaviorOptions(origin=origins.S3Origin(s3_bucket)), comment="CF distribution for the moderation workflow")

    def create_dynamo_db_table(self, tablename):
        """ Function to create the dynamodb table """
        return db.Table(self, tablename,
                        partition_key=db.Attribute(
                            name="id", type=db.AttributeType.STRING),
                        sort_key=db.Attribute(
                            name="time", type=db.AttributeType.STRING),
                        billing_mode=db.BillingMode.PAY_PER_REQUEST
                        )

    def create_db_table(self, tablename, field):
        """ Function to create the dynamodb table """
        return db.Table(self, tablename,
                        partition_key=db.Attribute(
                            name=field, type=db.AttributeType.STRING),
                        billing_mode=db.BillingMode.PAY_PER_REQUEST
                        )

    def find_canonical_id(self):
        """ Function to find out the canonical ID """
        session = boto3.session.Session(profile_name='cjw-dev')
        s3_client = session.client('s3')
        return s3_client.list_buckets()['Owner']['ID']

    def create_api_gw(self, backend):
        """ Function to create api gateway """
        return api.LambdaRestApi(self, "api", handler=backend, default_cors_preflight_options={
            "allow_origins": api.Cors.ALL_ORIGINS,
            "allow_methods": api.Cors.ALL_METHODS
        })

    def create_lambda_layer(self):
        """ Function to create lambda layer """
        return lambda_.LayerVersion(self, "lambda_layer",
                                    code=lambda_.Code.from_asset(
                                        "ivs_moderation/lambda_layers/resources/dependencies.zip"),
                                    compatible_runtimes=[
                                        lambda_.Runtime.PYTHON_3_8],
                                    description="A layer for all the third-party dependencies of the lambda functions"
                                    )

    def create_user_pool(self, id):
        """ Function to create userpools """
        return cognito.UserPool(self, id,
                                self_sign_up_enabled=True,
                                password_policy=cognito.PasswordPolicy(
                                    require_lowercase=False, require_symbols=False, require_uppercase=False),
                                auto_verify=cognito.AutoVerifiedAttrs(
                                    email=True),
                                standard_attributes=cognito.StandardAttributes(
                                    email=cognito.StandardAttribute(
                                        required=True, mutable=False)
                                )
                                )

    def create_user_pool_client(self, id, pool):
        """ Function to create new usrpool """
        return pool.add_client(id, disable_o_auth=True)

    def create_identity_pool(self, id, pool, pool_client):
        """ Function to create new identity pool """
        return cognito.CfnIdentityPool(self, id, allow_unauthenticated_identities=False, cognito_identity_providers=[cognito.CfnIdentityPool.CognitoIdentityProviderProperty(
            client_id=pool_client.user_pool_client_id, provider_name=pool.user_pool_provider_name
        )])

    def create_appsync_api(self, id, user_pool):
        """ Function to create appsync endpoints """
        return appsync.GraphqlApi(self, id, name='ivs-moderation-api', schema=appsync.Schema.from_asset('ivs_moderation/schemas/schema.graphql'),
                                  authorization_config=appsync.AuthorizationConfig(default_authorization=appsync.AuthorizationMode(
                                      authorization_type=appsync.AuthorizationType.USER_POOL, user_pool_config=appsync.UserPoolConfig(user_pool=user_pool))))

    def add_resolvers(self, db_source, field_name, type_name, request_mapping_template):
        """ Function to create resolvers """
        db_source.create_resolver(
            field_name=field_name,
            type_name=type_name,
            request_mapping_template=appsync.MappingTemplate.from_file(request_mapping_template),
            response_mapping_template=appsync.MappingTemplate.dynamo_db_result_item()
        )