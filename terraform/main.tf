terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.region
}

module "dev" {
  source          = "./environments/dev"
  vpc_prefix      = var.vpc_prefix
  vpc_cidr_block  = var.vpc_cidr_block
  instance_name   = var.instance_name
  public_key_path = var.public_key_path
  s3_bucket_name  = var.s3_bucket_name
  region          = var.region
}