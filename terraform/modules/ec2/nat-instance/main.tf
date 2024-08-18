resource "aws_instance" "nat-instance" {
  ami               = "ami-0d7c7fe775a76686f"
  instance_type     = "t2.micro"
  key_name          = var.key_pair_name
  network_interface {
    device_index         = 0
    network_interface_id = var.public_subnet_eni_id
  }
  root_block_device {
    volume_size = 8
  }
  tags = {
    Name = format("%s-nat-instance", var.instance_name)
  }

}