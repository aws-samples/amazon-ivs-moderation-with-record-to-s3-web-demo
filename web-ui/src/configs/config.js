import Amplify from 'aws-amplify'

export const awsConfig = {
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION, 
    userPoolId: process.env.REACT_APP_USER_POOL_ID, 
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  },
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
  apiGateway: process.env.REACT_APP_API_GATEWAY,
  aws_appsync_authenticationType: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATIONTYPE,
}

Amplify.configure(awsConfig)
