output "vpc_public_subnet_id" {
  description = "The ID of the VPC public subnet"
  value       = aws_subnet.public.id
}

output "vpc_private_subnet_id" {
  description = "The ID of the VPC private subnet"
  value       = aws_subnet.private.id
}

output "vpc_sg_id" {
  description = "The ID of the VPC security group"
  value       = aws_security_group.main.id
}

output "public_subnet_eni_id" {
  description = "The ID of the public subnet ENI"
  value       = aws_network_interface.nat.id
}

output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}