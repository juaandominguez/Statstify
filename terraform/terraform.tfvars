instance_name = "k8s"

vpc_prefix = "k8s-vpc"

vpc_cidr_block = "10.0.0.0/16"

public_key_path = "~/.ssh/k8s_rsa.pub"

region = "eu-west-3"

s3_bucket_name = "k8s-vpc-endpoint-tf"

subnet_cidr_blocks = ["10.0.0.0/24", "10.0.1.0/24"]