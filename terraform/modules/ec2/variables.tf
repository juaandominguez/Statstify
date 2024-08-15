variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
  default     = "Kubernetes Instance"
}

variable "vpc_subnet_id" {
  description = "The ID of the VPC to launch the EC2 instance into"
  type        = string
}

variable "vpc_sg_id" {
  description = "The ID of the VPC security group to assign to the EC2 instance"
  type        = string
}