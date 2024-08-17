resource "aws_sqs_queue" "main" {
  name                        = "k8s-queue.fifo"
  fifo_queue                  = true
  content_based_deduplication = true
  visibility_timeout_seconds  = 12 * 3600
}