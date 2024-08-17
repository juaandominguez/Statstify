variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
  default     = "Kubernetes Instance"
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_prefix" {
  description = "Prefix to be used for the VPC resources"
  type        = string
  default     = "main-vpc"
}

variable "public_key_path" {
  description = "Path to the public key to be used for SSH access"
  type        = string
}

variable "region" {
  description = "AWS region to deploy the resources"
  type        = string
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket to store the Terraform state file"
  type        = string
  default     = "my-bucket"
}

variable "subnet_cidr_blocks" {
  description = "CIDR blocks for the subnets"
  type        = list(string)
  default     = ["10.0.0.0/24", "10.0.1.0/24"]
}