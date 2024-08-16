module "control-plane" {
  source   = "./control-plane"
  instance_name = var.instance_name
  vpc_subnet_id   = var.vpc_subnet_id
  vpc_sg_id = var.vpc_sg_id
  key_pair_name = var.key_pair_name
  ec2_profile_id = var.ec2_profile_id
  s3_bucket_name = var.s3_bucket_name
}

module "worker-nodes" {
  source          = "./worker-nodes"
  instance_name = var.instance_name
  vpc_subnet_id   = var.vpc_subnet_id
  vpc_sg_id = var.vpc_sg_id
  key_pair_name = var.key_pair_name
}