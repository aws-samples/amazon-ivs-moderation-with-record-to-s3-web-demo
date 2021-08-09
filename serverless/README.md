
# IVS Moderation backend

IVS moderation reference template helps the customer to build moderation capability to their existing IVS deployments. This CDK project helps to setup all the backend resources required.

## Installation Instructions

### Deploying the backend

This project is set up like a standard Python project.  The initialization
process also creates a virtualenv within this project, stored under the .env
directory.  To create the virtualenv it assumes that there is a `python3`
(or `python` for Windows) executable in your path with access to the `venv`
package. If for any reason the automatic creation of the virtualenv fails,
you can create the virtualenv manually.

To manually create a virtualenv on MacOS and Linux:

```
$ python3 -m venv .env
```

After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.

```
$ source .env/bin/activate
```

If you are a Windows platform, you would activate the virtualenv like this:

```
% .env\Scripts\activate.bat
```

Once the virtualenv is activated, you can install the required dependencies.

```
$ pip install -r requirements.txt
```

At this point you can now synthesize the CloudFormation template for this code.

```
$ cdk synth
```
Once the synthesize command is successful, you can deploy the backend using the deploy command.

```
cdk deploy --parameters email=user@sample.com --outputs-file outputs.json
```

* `outputs.json` file can be useful to run helper script to deploy the front-end.
* `email` parameter is used for sending sns alerts when a new task is assigned to the moderation queue. user@sample.com should be replaced with your email address.

During the installation you should receive an email to subscribe to an SNS topic. You should accept the email.    

Once the installation is completed, note down the S3 bucket created. You should use this S3 bucket when you setup the recording configuration in IVS.

### Post Installation Script

Post installation script is used for deploying the default values in the database. Before running the script, make sure that the `outputs.json` file is generated after the `cdk deploy` command. You can run the post installation script as follows.

```
python post_installation_script.py
```

### Useful CDK commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

## Architecture

