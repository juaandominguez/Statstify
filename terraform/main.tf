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
  region  = "eu-west-3"
}

resource "aws_instance" "kubernetes-instance" {
  ami           = "ami-09d83d8d719da9808"
  instance_type = "t2.micro"
  user_data = file("${path.module}/startup-script.sh")
  key_name = "kubernetes"
  security_groups = ["SshAccess"]
  root_block_device {
    device_name = "/dev/sda1"
    volume_size = 30
  }

  tags = {
    Name = var.instance_name
  }
}
