#!/bin/bash

hostnamectl set-hostname control-plane

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg unzip

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

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

sudo kubeadm init --cri-socket=unix:///var/run/cri-dockerd.sock --ignore-preflight-errors=NumCPU,Mem

DEFAULT_USER=$(cat /etc/passwd | grep bash | awk -F: '$3 >= 1000 {print $1; exit}')

mkdir -p /home/$DEFAULT_USER/.kube
sudo cp -i /etc/kubernetes/admin.conf /home/$DEFAULT_USER/.kube/config
sudo chown $(id -u $DEFAULT_USER):$(id -g $DEFAULT_USER) /home/$DEFAULT_USER/.kube/config

su -c "kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml" $DEFAULT_USER

msg=$(echo "$(kubeadm token create --print-join-command) --cri-socket=unix:///var/run/cri-dockerd.sock")

sqs_url=$(aws sqs get-queue-url --queue-name ${SQS_QUEUE_NAME} --query 'QueueUrl' --region ${AWS_REGION} | tr -d '"')

aws sqs send-message --queue-url $sqs_url --message-body "$msg" --region ${AWS_REGION} --message-group-id "k8s-group" --message-deduplication-id "unique-id-123"