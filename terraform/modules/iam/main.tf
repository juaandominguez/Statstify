resource "aws_iam_role" "control_plane_role" {
  name = "control_plane_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ],
  })
}

resource "aws_iam_role_policy" "control_plane_policy" {
  name = "control_plane_policy"
  role = aws_iam_role.control_plane_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "s3:PutObject",
          "s3:PutObjectAcl"
        ],
        Effect   = "Allow",
        Resource = "${var.s3_bucket_arn}/*"
      },
      {
        Effect = "Allow",
        Action = [
          "sqs:SendMessage",
          "sqs:GetQueueUrl",
        ]
        Resource = var.sqs_queue_arn
      },
    ],
  })
}

resource "aws_iam_instance_profile" "control_plane_profile" {
  name = "control_plane_profile"
  role = aws_iam_role.control_plane_role.name
}

resource "aws_iam_role" "worker_node_role" {
  name = "worker_node_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ],
  })
}

resource "aws_iam_role_policy" "worker_node_policy" {
  name = "worker_node_policy"
  role = aws_iam_role.worker_node_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:ChangeMessageVisibility",
        ],
        Resource = var.sqs_queue_arn
      },
    ],
  })
}

resource "aws_iam_instance_profile" "worker_node_profile" {
  name = "worker_node_profile"
  role = aws_iam_role.worker_node_role.name
}