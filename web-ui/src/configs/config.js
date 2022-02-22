import Amplify from 'aws-amplify'

export const awsConfig = {
  Auth: {
    identityPoolId: "", 
    userPoolId: "", 
    userPoolWebClientId: "",
    region: "us-west-2",
  },
  aws_appsync_graphqlEndpoint: "",
  apiGateway: "",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
}

Amplify.configure(awsConfig)
