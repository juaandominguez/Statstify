output "control_plane_id" {
  description = "The ID of the control plane IAM profile"
  value       = aws_iam_instance_profile.control_plane_profile.id
}

output "worker_node_id" {
  description = "The ID of the worker node IAM profile"
  value       = aws_iam_instance_profile.worker_node_profile.id
}