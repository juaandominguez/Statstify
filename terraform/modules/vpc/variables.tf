variable "vpc_prefix" {
  description = "Prefix to be used for the VPC resources"
  type        = string
  default     = "main-vpc"
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}