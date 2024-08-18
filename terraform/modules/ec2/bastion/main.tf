resource "aws_instance" "bastion" {
  ami             = "ami-09d83d8d719da9808"
  instance_type   = "t2.micro"
  subnet_id       = var.vpc_subnet_id
  key_name        = var.key_pair_name
  security_groups = [var.vpc_sg_id]
  root_block_device {
    volume_size = 8
  }
  tags = {
    Name = format("%s-bastion", var.instance_name)
  }
}