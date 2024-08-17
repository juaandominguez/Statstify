variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
}

variable "vpc_subnet_id" {
  description = "The ID of the VPC to launch the EC2 instance into"
  type        = string
}

variable "vpc_sg_id" {
  description = "The ID of the VPC security group to assign to the EC2 instance"
  type        = string
}

variable "key_pair_name" {
  description = "The key pair to associate with the EC2 instance"
  type        = string
}

variable "ec2_profile_id" {
  description = "The instance profile to associate with the EC2 instance"
  type        = string
}

variable "s3_bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "region" {
  description = "The region in which the resources will be created"
  type        = string
}

variable "sqs_queue_name" {
  description = "The name of the SQS queue"
  type        = string
}