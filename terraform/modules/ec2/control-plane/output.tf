output "id" {
  description = "The ID of the cluster"
  value       = aws_instance.kubernetes-control-plane.id
}