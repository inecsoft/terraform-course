import io
import boto3
import string
import random

s3 = boto3.client("s3")
INPUT_PREFIX = "input"
OUTPUT_PREFIX = "output"
ID_LENGTH = 12


def random_id():
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=ID_LENGTH))


def separate_object(bucket, key):
    body = s3.get_object(Bucket=bucket, Key=key)["Body"].read().decode("utf-8")
    output = {}
    for line in io.StringIO(body):
        fields = line.split(",")
        output.setdefault(fields[0], []).append(line)
    return output


def write_objects(objects, bucket, key):
    file_name = key.split("/")[-1]
    for prefix in objects.keys():
        identifier = random_id()
        s3.put_object(
            Body=",".join(objects[prefix]),
            Key=f"{OUTPUT_PREFIX}/{prefix}/{identifier}-{file_name}",
            Bucket=bucket,
        )


def lambda_handler(event, context):
    record = event["Records"][0]["s3"]
    bucket = record["bucket"]["name"]
    key = record["object"]["key"]

    if key.startswith(INPUT_PREFIX):
        objects = separate_object(bucket, key)
        write_objects(objects, bucket, key)

    return "OK"