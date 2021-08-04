#!/usr/bin/env python3

from aws_cdk import core

from ivs_moderation.ivs_moderation_stack import IvsModerationStack


app = core.App()
IvsModerationStack(app, "ivs-moderation")

app.synth()
