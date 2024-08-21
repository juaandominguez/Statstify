resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

resource "aws_iam_role_policy_attachment" "lambda_ssm_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMFullAccess"
  role       = aws_iam_role.lambda_role.name
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = format("%s/lambda.py", path.module)
  output_path = format("%s/lambda_payload.zip", path.module)
}

resource "aws_lambda_function" "lambda" {
  filename      = format("%s/lambda_payload.zip", path.module)
  function_name = "pull_latest_image"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "python3.12"

  timeout = 15

  environment {
    variables = {
      instance_id = var.cluster_id
    }
  }
}

resource "aws_lambda_permission" "with_eventBridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "events.amazonaws.com"
}