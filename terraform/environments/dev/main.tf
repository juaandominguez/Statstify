module "vpc" {
  source             = "../../modules/vpc"
  vpc_cidr_block     = var.vpc_cidr_block
  vpc_prefix         = var.vpc_prefix
  region             = var.region
  subnet_cidr_blocks = var.subnet_cidr_blocks
}

module "s3" {
  source         = "../../modules/s3"
  s3_bucket_name = var.s3_bucket_name
}

module "key_pair" {
  source          = "../../modules/key_pair"
  public_key_path = var.public_key_path
}

module "iam" {
  source        = "../../modules/iam"
  s3_bucket_arn = module.s3.s3_bucket_arn
  sqs_queue_arn = module.sqs.sqs_queue_arn
}

module "ec2" {
  source           = "../../modules/ec2"
  instance_name    = var.instance_name
  vpc_subnet_id    = module.vpc.vpc_public_subnet_id
  vpc_sg_id        = module.vpc.vpc_sg_id
  key_pair_name    = module.key_pair.key_pair_name
  control_plane_id = module.iam.control_plane_id
  worker_node_id   = module.iam.worker_node_id
  s3_bucket_name   = var.s3_bucket_name
  region           = var.region
  sqs_queue_name   = module.sqs.sqs_queue_name
}

module "sqs" {
  source = "../../modules/sqs"
}
