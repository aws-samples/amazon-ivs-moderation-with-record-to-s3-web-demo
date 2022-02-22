# Amazon IVS Moderation demo – Frontend

## Updating Config Variables

The variables in the file `config.js` are initially empty. The developer will first need to deploy the backend to their account. This process writes the associated values to screen and to the outputs.json file once complete. They can also be retrieved from the AWS CloudFormation Console under the ivs-moderation stack's Outputs tab.

The region value is set to us-west-2 (Oregon) by default. Change this to us-east-1 (N.Virginia) or eu-west-1 (Dublin) to match the region in which you deployed the backend.

Once updated, the config.js file should look similar to this:

```
import Amplify from 'aws-amplify'

export const awsConfig = {
  Auth: {
    identityPoolId: "us-west-2:5bccaac1-71ba-4927-b7f6-5cbecfa791ec",
    region: "us-west-2", 
    userPoolId: "us-west-2_gY10q8PuN", 
    userPoolWebClientId: "5snlrgu90d2rf8eogk86rm4u5g",
  },
  aws_appsync_graphqlEndpoint: "https://kdmmol2h6jcxrivd6jpknopvni.appsync-api.us-west-2.amazonaws.com/graphql",
  apiGateway: "https://juzgm32quj.execute-api.us-west-2.amazonaws.com/prod/",
  aws_appsync_authenticationType: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATIONTYPE,
}

Amplify.configure(awsConfig)
```

### For retrieving your `Auth` configs

This project uses an existing backend with an Authentication. You can create new users via the web applications login prompt.

### Connecting IVS Channels to the moderation workflow

The moderation workflow is triggered as thumbnail images are written to the S3 bucket created by the backend deployment. IVS automatically creates these thumbnail images for channels configured to archive to S3. To add auto-recording to S3 to your IVS Channel:

1. Create a recording configuration and specify the S3 bucket deployed by the backend (see _ivs-moderation.s3bucket_ in the output.json)
2. The frequency at which images are processed for moderation is controlled by the _Target thumbnail interval_ setting in the recording configuration. Set this at the desired cadence.
3. In the IVS Channel configuration page, enable Auto-record to S3 and select the recording configuration

Refer to the [Create a Channel with Optional Recording](https://docs.aws.amazon.com/ivs/latest/userguide/getting-started-create-channel.html) documentation for additional information

### More information about other API endpoints

For GraphQL: [Create a GraphQL API](https://docs.amplify.aws/cli/graphql-transformer/overview#create-a-graphql-api) or in [docs.aws.amazon](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html)

For RestAPI: [Create a Rest API](https://docs.amplify.aws/cli/restapi) or in [docs.aws.amazon](https://docs.aws.amazon.com/code-samples/latest/catalog/code-catalog-python-example_code-apigateway-aws_service.html)

<br>

-----------

## Available Scripts

In the project directory, you can run:

### `yarn`

First fun `yarn` or `yarn install` to install all the modules in to your local machine.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
