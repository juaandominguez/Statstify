resource "aws_instance" "kubernetes-worker-nodes" {
  count = 1
  ami             = "ami-09d83d8d719da9808"
  instance_type   = "t2.micro"
  user_data       = templatefile("${path.module}/startup-worker-node.tpl.sh", {NODE_NUMBER=count.index + 1})
  subnet_id = var.vpc_subnet_id
  key_name        = var.key_pair_name
  security_groups = [var.vpc_sg_id]
  root_block_device {
    volume_size = 8
  }
  tags = {
    Name = format("%s-worker-%02d", var.instance_name, count.index + 1)
  }
}