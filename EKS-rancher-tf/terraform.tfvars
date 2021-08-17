# Amazon AWS Access Key
#aws_access_key = "your-aws-access-key"
# Amazon AWS Secret Key
#aws_secret_key = "your-aws-secret-key"
# Amazon AWS Key Pair Name
ssh_key_name = "suluq-inchora"
# Region where resources should be created
region = "eu-west-1"
# Resources will be prefixed with this to avoid clashing names
prefix = "suluq-inchora"
# Admin password to access Rancher
# openssl rand -base64 30
admin_password = "zbYY08km79i8M1FXOhFbtHybFymqtWk83gr9lzJZ"
# Name of custom cluster that will be created
cluster_name = "suluq-inchora"
# rancher/rancher image tag to use
rancher_version = "latest"
# Count of agent nodes with role all
count_agent_all_nodes = "2"
# Count of agent nodes with role etcd
count_agent_etcd_nodes = "0"
# Count of agent nodes with role controlplane
count_agent_controlplane_nodes = "0"
# Count of agent nodes with role worker
count_agent_worker_nodes = "0"
# Docker version of host running `rancher/rancher`
docker_version_server = "19.03"
# Docker version of host being added to a cluster (running `rancher/rancher-agent`)
docker_version_agent = "19.03"
# AWS Instance Type
type = "t3.medium"



