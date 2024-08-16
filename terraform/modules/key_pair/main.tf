resource "aws_key_pair" "main" {
  key_name   = "k8s_key"
  public_key = file(var.public_key_path)
}