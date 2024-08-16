output "ec2_profile_id" {
  description = "The instance profile to associate with the EC2 instance"
  value = aws_iam_instance_profile.ec2_profile.id
}