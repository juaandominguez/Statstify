output "nat_instance_id" {
  value       = aws_instance.nat-instance.id
  description = "The ID of the NAT instance"
}