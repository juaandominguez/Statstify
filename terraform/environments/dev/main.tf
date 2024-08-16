module "vpc" {
  source   = "../../modules/vpc"
  vpc_cidr_block = var.vpc_cidr_block
  vpc_prefix = var.vpc_prefix
  region = var.region
}

module "s3" {
  source   = "../../modules/s3"
  s3_bucket_name = var.s3_bucket_name
}

module "key_pair" {
  source   = "../../modules/key_pair"
  public_key_path = var.public_key_path
}

module "iam" {
  source   = "../../modules/iam"
  s3_bucket_arn = module.s3.s3_bucket_arn
}

module "ec2" {
  source   = "../../modules/ec2"
  instance_name = var.instance_name
  vpc_subnet_id   = module.vpc.vpc_subnet_id
  vpc_sg_id = module.vpc.vpc_sg_id
  key_pair_name = module.key_pair.key_pair_name
  ec2_profile_id = module.iam.ec2_profile_id
  s3_bucket_name = var.s3_bucket_name
}
