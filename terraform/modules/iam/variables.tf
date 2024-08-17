variable "s3_bucket_arn" {
  description = "The ARN of the S3 bucket"
  type        = string
}

variable "sqs_queue_arn" {
  description = "The ARN of the SQS queue"
  type        = string
}