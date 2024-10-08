variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
}

variable "vpc_public_subnet_id" {
  description = "The ID of the VPC public subnet to launch the EC2 instance into"
  type        = string
}

variable "vpc_private_subnet_id" {
  description = "The ID of the VPC public subnet to launch the EC2 instance into"
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

variable "control_plane_id" {
  description = "The ID of the control plane IAM profile"
  type        = string
}

variable "worker_node_id" {
  description = "The ID of the worker node IAM profile"
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

variable "public_subnet_eni_id" {
  description = "The ID of the public subnet ENI"
  type        = string
}