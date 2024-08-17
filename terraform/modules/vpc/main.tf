resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr_block

  tags = {
    Name = var.vpc_prefix
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.subnet_cidr_blocks[0]
  map_public_ip_on_launch = true

  tags = {
    Name = format("%s/public-%s", var.vpc_prefix, "subnet")
  }
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = var.subnet_cidr_blocks[1]

  tags = {
    Name = format("%s/private-%s", var.vpc_prefix, "subnet")
  }
}

resource "aws_network_interface" "public" {
  subnet_id       = aws_subnet.public.id
  security_groups = [aws_security_group.main.id]
}

resource "aws_network_interface" "private" {
  subnet_id       = aws_subnet.private.id
  security_groups = [aws_security_group.main.id]
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = format("%s/%s", var.vpc_prefix, "igw")
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = format("%s/public-%s", var.vpc_prefix, "rt")
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = format("%s/private-%s", var.vpc_prefix, "rt")
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id

  depends_on = [aws_internet_gateway.main]
}

resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}

resource "aws_security_group" "main" {
  name        = "SshAccess"
  description = "Allow access to SSH port 22"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = format("%s/%s", var.vpc_prefix, "sg")
  }
}

# For testing purposes, allowing all traffic from all sources, in production this should be more restrictive

resource "aws_vpc_security_group_ingress_rule" "allow_internet_access_ipv4" {
  security_group_id = aws_security_group.main.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 0
  ip_protocol       = "tcp"
  to_port           = 65535
}


resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.main.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}


# For testing purposes, allowing all traffic from all sources, in production this should be more restrictive

resource "aws_network_acl" "main" {
  vpc_id = aws_vpc.main.id

  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 65535
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 65535
  }

  tags = {
    Name = format("%s/%s", var.vpc_prefix, "nacl")
  }
}

resource "aws_network_acl_association" "public" {
  subnet_id      = aws_subnet.public.id
  network_acl_id = aws_network_acl.main.id
}

resource "aws_network_acl_association" "private" {
  subnet_id      = aws_subnet.private.id
  network_acl_id = aws_network_acl.main.id
}

resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${var.region}.s3"
  vpc_endpoint_type = "Gateway"

  route_table_ids = [aws_route_table.private.id]
}


