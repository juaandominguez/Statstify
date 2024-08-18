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

variable "public_subnet_eni_id" {
  description = "The ID of the public subnet ENI"
  type        = string
}