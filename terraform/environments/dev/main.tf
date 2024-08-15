module "vpc" {
  source   = "../../modules/vpc"
  vpc_cidr_block = var.vpc_cidr_block
  vpc_prefix = var.vpc_prefix
}

module "ec2" {
  source   = "../../modules/ec2"
  vpc_subnet_id   = module.vpc.vpc_subnet_id
  vpc_sg_id = module.vpc.vpc_sg_id
}