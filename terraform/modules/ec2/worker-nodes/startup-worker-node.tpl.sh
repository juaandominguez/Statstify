#!/bin/bash
hostnamectl set-hostname worker-node-${NODE_NUMBER}

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg unzip

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm
sudo apt-mark hold kubelet kubeadm

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

wget https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.14/cri-dockerd-0.3.14.amd64.tgz -qO- | sudo tar xzvf - -C /var

echo "[Unit]
Description=Cri-dockerd Service, Container Run Interface for docker and kubernetes
After=network.target

[Service]
ExecStart=/var/cri-dockerd/cri-dockerd
Restart=always
User=root

[Install]
WantedBy=multi-user.target" | sudo tee /etc/systemd/system/cri-dockerd.service > /dev/null

sudo systemctl daemon-reload
sudo systemctl enable cri-dockerd.service
sudo systemctl start cri-dockerd.service


mkdir /run/flannel

echo "FLANNEL_NETWORK=10.240.0.0/16
FLANNEL_SUBNET=10.240.0.1/24
FLANNEL_MTU=1450
FLANNEL_IPMASQ=true" > /run/flannel/subnet.env

sudo apt-get install python3-boto3 -y

cat <<EOF > sqs_poll.py
import boto3
import time
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
import os

# Create SQS client
sqs = boto3.client("sqs", region_name="eu-west-3")

def get_queue_url(queue_name):
    try:
        response = sqs.get_queue_url(QueueName=queue_name)
        return response['QueueUrl']
    except sqs.exceptions.QueueDoesNotExist:
        print(f"Queue {queue_name} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

def poll_sqs(queue_url):
    while True:
        response = sqs.receive_message(
            QueueUrl=queue_url,
            AttributeNames=['All'],
            MaxNumberOfMessages=1,
            WaitTimeSeconds=20
        )

        messages = response.get('Messages', [])
        if not messages:
            continue
        else:
            os.system(messages[0]['Body'])
            break

if __name__ == "__main__":
    queue_name = "k8s-queue.fifo"
    queue_url = get_queue_url(queue_name)
    if queue_url:
        poll_sqs(queue_url)
EOF


python3 sqs_poll.py
