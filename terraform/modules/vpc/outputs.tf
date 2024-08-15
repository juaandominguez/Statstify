output "vpc_subnet_id" {
  description = "The ID of the VPC subnet"
  value       = aws_subnet.main.id
}

output "vpc_sg_id" {
  description = "The ID of the VPC security group"
  value       = aws_security_group.main.id
}