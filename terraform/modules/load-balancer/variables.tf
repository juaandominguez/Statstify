variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "cluster-instance" {
  description = "The ID of the cluster instance"
  type        = string
}

variable "vpc_sg_id" {
  description = "The ID of the VPC security group to assign to the EC2 instance"
  type        = string
}

variable "vpc_subnet_ids" {
  description = "The IDs of the VPC subnets"
  type        = list(string)
}