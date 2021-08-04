# Amazon IVS Moderation demo – Frontend

## Updating Config Variables

The variables in the file `config.js` are all currently empty and the developer will need to deploy the backend to their account. 

### For retrieving your `Auth` configs

This project uses an existing backend with an Authentication, and this connection provided by Amplify.

For replacing the Auth config variables, you can either use the [Amplify CLI to add Authentication to the project](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#create-authentication-service),
or [go to the console and access Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-console.html) to get the variables needed.

If you do not have an AWS account, please see [How do I create and activate a new Amazon Web Services account?](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
Log into the AWS console if you are not already. Note: If you are logged in as an IAM user, ensure your account has permissions to create and manage the necessary resources and components for this application.
Follow the instructions for deploying to AWS or running locally.

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
