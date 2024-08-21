import boto3
import time
from botocore.exceptions import ClientError
import os

def handler(event, context):
    ssm_client = boto3.client('ssm')

    instance_id = os.getenv('instance_id')

    command = 'kubectl set image deployment/statstify-deployment statstify=public.ecr.aws/statstify/statstify:latest'

    try:
        response = ssm_client.send_command(
            InstanceIds=[instance_id],
            DocumentName="AWS-RunShellScript",
            Parameters={'commands': [command]}
        )

        command_id = response['Command']['CommandId']

        while True:
            try:
                output = ssm_client.get_command_invocation(
                    CommandId=command_id,
                    InstanceId=instance_id,
                )

                if output['Status'] in ['Success', 'Failed', 'Cancelled', 'TimedOut']:
                    break

                time.sleep(2)

            except ClientError as e:
                if e.response['Error']['Code'] == 'InvocationDoesNotExist':
                    print("Command is not yet invoked, retrying...")
                    time.sleep(2)
                else:
                    raise e

        return {
            'statusCode': 200,
            'body': output['Status']
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': f"An error occurred: {str(e)}"
        }