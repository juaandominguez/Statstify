module "eventbridge" {
  source = "terraform-aws-modules/eventbridge/aws"

  create_bus = false

  rules = {
    ecr_image_push = {
      description = "Capture ECR image push events"
      event_pattern = jsonencode({
        "source" : ["aws.ecr"],
        "detail-type" : ["ECR Image Action"],
        "detail" : {
          "action-type" : ["PUSH"],
          "result" : ["SUCCESS"],
          "repository-name" : ["statstify"],
          "image-tag" : ["latest"]
        }
      })
    }
  }

  targets = {
    ecr_image_push = [{
      name = "lambda-target"
      arn  = var.lambda_arn
    }]
  }
}