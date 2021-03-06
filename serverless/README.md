# Amazon IVS Moderation demo – Backend

This reference template shows how you can build add a simple  moderation capability to your Amazon IVS streams. This CDK project will setup up all the required backend resources.

⚠️ **IMPORTANT NOTE:** *Deploying this demo application in your AWS account will create and consume AWS resources, which will cost money.*

This project is set up like any standard Python project.  The initialization process also creates a virtualenv within this project, stored under the `.env` directory. To create the virtualenv it assumes that there is a `python3` (or `python` for Windows) executable in your path with access to the `venv` package. If for any reason the automatic creation of the virtualenv fails, you can create the virtualenv manually.

To manually create a virtualenv on MacOS and Linux:

```
python3 -m venv .env
```

After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.

```
source .env/bin/activate
```

If you are a Windows platform, you would activate the virtualenv like this:

```
.env\Scripts\activate.bat
```

Once the virtualenv is activated, you can install the required dependencies.

```
pip install -r requirements.txt
```

At this point you can now synthesize the CloudFormation template for this code.

```
cdk synth
```
Once the synthesize command is successful, you can deploy the backend. Ensure you configure the **email** parameter with a valid recipient address. SNS alerts will be sent to this address when a new task is assigned to the moderation queue.

```
cdk deploy --outputs-file outputs.json --parameters email=user@sample.com 
```

During the installation you should receive an email to subscribe to an SNS topic. Click in the link to accept the email.    

Once the installation is completed, note down the S3 bucket created. You should use this S3 bucket when you setup the recording configuration in Amazon IVS.

### Post Installation Script

The Post installation script loads default moderation values into the settings db table and creates the web-ui config to automate connection to the backend infrastructure. Before running the script, make sure that the `outputs.json` file is generated after the `cdk deploy` command. You can run the post installation script as follows:

```
python post_installation_script.py
```

## Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation
