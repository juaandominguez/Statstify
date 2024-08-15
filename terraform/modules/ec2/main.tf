resource "aws_instance" "kubernetes-instance" {
  ami             = "ami-09d83d8d719da9808"
  instance_type   = "t2.micro"
  user_data       = file("${path.module}/startup-script.sh")
  subnet_id = var.vpc_subnet_id
  key_name        = aws_key_pair.main.key_name
  security_groups = [var.vpc_sg_id]
  root_block_device {
    volume_size = 30
  }
  tags = {
    Name = var.instance_name
  }
}

resource "aws_key_pair" "main" {
  key_name   = "k8s_key"
  public_key = file("~/.ssh/k8s_rsa.pub")
}