#!/usr/bin/env python3

from aws_cdk import core

from ivs_moderation.ivs_moderation_stack import IvsModerationStack

app = core.App()
IvsModerationStack(app, "ivs-moderation", description="This stack deploys backed resources for the IVS-Moderation solution.")

# Dev stage should remove before merging with master
# IvsModerationStack(app, "ivs-moderation-dev", description="This stack deploys backed resources for the IVS-Moderation solution.")

app.synth()
