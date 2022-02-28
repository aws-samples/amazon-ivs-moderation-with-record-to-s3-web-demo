# Amazon IVS Moderation demo – Frontend

### Connecting IVS Channels to the moderation workflow

The moderation workflow is triggered as thumbnail images are written to the S3 bucket created by the backend deployment. The S3 bucket name is returned by the cdk deploy command, or can be retrieved from the resultant outputs.json file or from the AWS Console by viewing the ivs-moderation stack outputs in AWS CloudFormation. 

Amazon IVS automatically creates thumbnail images for channels configured to archive to S3. To add auto-recording to S3 to your IVS Channel:

1. Create a recording configuration and specify the S3 bucket deployed by the backend.
2. The frequency at which images are processed for moderation is controlled by _Target thumbnail interval_.
3. In the IVS Channel configuration page, enable Auto-record to S3 and select the recording configuration.

Refer to the [Create a Channel with Optional Recording](https://docs.aws.amazon.com/ivs/latest/userguide/getting-started-create-channel.html) documentation for additional information

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

<br>

-----------

### Authenticating Users

This project uses an Amazon Cognito backend for user authentication. You can create new users via the web applications login prompt.

### More information about other API endpoints

For GraphQL: [Create a GraphQL API](https://docs.amplify.aws/cli/graphql-transformer/overview#create-a-graphql-api) or in [docs.aws.amazon](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html)

For RestAPI: [Create a Rest API](https://docs.amplify.aws/cli/restapi) or in [docs.aws.amazon](https://docs.aws.amazon.com/code-samples/latest/catalog/code-catalog-python-example_code-apigateway-aws_service.html)
