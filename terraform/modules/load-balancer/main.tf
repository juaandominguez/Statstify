resource "aws_lb_target_group" "main" {
  name     = "k8s-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_target_group_attachment" "main" {
  target_group_arn = aws_lb_target_group.main.arn
  target_id        = var.cluster-instance
  port             = 3000
}

resource "aws_lb" "main" {
  name               = "k8s-load-balancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.vpc_sg_id]
  subnets            = [for subnet_id in var.vpc_subnet_ids : subnet_id]

  enable_deletion_protection = false

  tags = {
    Environment = "production"
  }

}

resource "aws_lb_listener" "main" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
}