resource "aws_instance" "kubernetes-control-plane" {
  ami             = "ami-09d83d8d719da9808"
  instance_type   = "t2.micro"
  user_data       = templatefile("${path.module}/startup-control-plane.tpl.sh", {S3_BUCKET_NAME=var.s3_bucket_name})
  subnet_id = var.vpc_subnet_id
  key_name        = var.key_pair_name
  security_groups = [var.vpc_sg_id]
  iam_instance_profile = var.ec2_profile_id
  root_block_device {
    volume_size = 8
  }
  tags = {
    Name = format("%s-control-plane", var.instance_name)
  }
}