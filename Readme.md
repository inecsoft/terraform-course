---
<div align="center">
<img src="images/devops.JPG" width="700" />
</div>
---

### **Inicialize Repo**

```
git init

git config user.name \<username\>

git config user.email \<user@domain\>
```

- **For ssh login use following config and as credentials keypair**

```
git remote set-url origin git@github.com:inecsoft/terraform-course.git
```

- **For https login use following config and as credentials user + access tocken**

```
git remote set-url origin https://github.com/inecsoft/terraform-course.git

ssh -T git@github.com

git add .

git commit -m "first commit"

git push
```

### **Add the public key on the repo**

```
git remote remove origin

git remote show origin

git config -l

git remote add origin git@github.com:inecsoft/terraform-course.git

git push -u origin master
```

### **Review your work**

- List commit history of current branch. -n count limits list to last n commits.

```
git log [-n count]
```

- An overview with reference labels and history graph. One commit per line.

```
git log --oneline --graph --decorate
```

- List commits that are present on the current branch and not merged into ref. A ref can be a branch name or a tag name.

```
git log ref..
```

- List commit that are present on ref and not merged into current branch.

```
git log ..ref
```

- List operations (e.g. checkouts or commits) made on local repository

```
git reflog
```

### **To remove file from remote repo**

```
git checkout master

git rm -r folder-name

git commit -m "folder-name deleted"

git push origin master
```

### **Undo removed files locally without commit**

```
git ls-files --deleted | xargs git checkout
```

### **If you haven't committed the deletion, yet**

```
git checkout HEAD \<filename\>
```

### **Undo commits**

```
git log --oneline
```

- #### _The savest way to do it_

```
git checkout \<commit\>
```

- #### _Undo a commit_

```
git revert \<commit\>
```

- #### _Undoes all commits after \<commits\>, preserving changes locally_

```
git reset \<commit\>
```

- #### _Discards all history and changes back to the specified commit_

```
git reset --hard \<commit\>

git checkout master
```

### **Navigation branch**

```
git log --pretty=oneline --abbrev-commit
```

#### To rollback to previos commit

```
git reset HEAD\~1

git rebase -i HEAD\~6
```

#### **How to revert to origin's master branch's version of file**

```
git restore --source origin/master filename
```

```
git checkout {remoteName}/{branch} -- filename
```

#### Delete the line of the commit that you want to delete

```
git push

git pull

git push
```

### **Manage Branches**

- #### _Create branch_

```
git branch \<name of branch\>
```

- #### _Show branches_

```
git branch -a
```

- #### _Go to the a branch_

```
git checkout \<branch name\>
```

- #### _Get back to master branch_

```
git checkout master
```

- #### _Creates branh and select it (best practice)_

```
git checkout -b \<branch name\>
```

- #### _Delete branch when merged_

```
git branch -d \<branch name\>
```

- #### _Delete branch when branch is not merged with master_

```
git branch -D \<branch name\>
```

### **Merge into master**

```
git checkout master
```

- #### _Show content differences between two branches_

```
git diff \<first-branch\>...\<second-branch\>

git merge \<branch name\>
```

#### If error edit what you want to change and save

```
git add .

git add \<file name\>

git commit -am "comments"
```

### **Manage credentials**

- #### _Helper to store password disk_

```
git config credential.helper store
```

- #### _Helper to temporaly (2hours) store password in memory_

```
git config --global credential.helper 'cache --timeout=7200'
```

- #### _Helper to temporaly store credential in memory locally_

```
git config --local credential.helper ""
```

- #### _Edit the account in .gitconfig_

```
git config --global --list

git config --global -e
```

### **Colaboration**

```
git clone \<your fork url\>
git push origin \<branch name\>
git remote add upstream \<URL master git repo\>
git push upstream master
```

### **How can I verify that the public key I uploaded is the same key as my local key**

```
ssh-keygen -l -E md5 -f ~/.ssh/id_rsa.pub
ssh -T git@ssh.dev.azure.com
```

vim ~/.ssh/config

```
Host ssh.dev.azure.com vs-ssh.visualstudio.com
  HostkeyAlgorithms +ssh-rsa
  User ivan.arteaga
  IdentityFile ~/.ssh/inecsoft
```

### **Configuration file to manage git repos using custom ssh key pair**

ssh-keygen -t rsa -t 2048 -f github
vim ~/.ssh/config

```
Host your.hostname.com
    HostName github.com
    User username
    IdentityFile C:\Users\Ivan\.ssh\github
```

```
git config -e
```

```
# .git/config
[remote "origin"]
    url = git@your.hostname.com:username/reponame.git
```

```
git clone <repo URL>
git add .
git commit -am "message"
ssh-agent bash
ssh-add -k github
git push
```

---

### **Working with local version of the module**

```
module "staging_vpc" {
    #tag to be uppded to 1.4.20 once prod migration is complete"
    source = "../../terraform-modules/template"
    #source = "github.com/inecsoft/terraform-modules.git//template?ref=branchname"

```

```
terraform get --update
terraform init
terraform plan
terraform apply -lock-timeout=120m
```

### **How to retrieve passwords for the windows instance**

```
aws ec2 get-password-data --instance-id i-03051e6ee9df4a949 --priv-launch-key bastion_proxy --profile log-dev-beenetwork
```

#### **How to retrieve sensitive data**

```
echo "nonsensitive(aws_ssm_parameter.elastic-search-master-user.value) | terraform console
```

---

### **Precommit tool**

```
curl https://pre-commit.com/install-local.py | python -
echo 'export PATH=$PATH:~/bin' >> ~/.bashrc
source ~/.bashrc
pre-commit --version
curl -sSLo ./terraform-docs.tar.gz https://terraform-docs.io/dl/v0.16.0/terraform-docs-v0.16.0-$(uname)-amd64.tar.gz
tar -xzf terraform-docs.tar.gz
chmod +x terraform-docs
mv terraform-docs /usr/bin
curl -s https://raw.githubusercontent.com/terraform-linters/tflint/master/install_linux.sh | bash
curl -s https://raw.githubusercontent.com/aquasecurity/tfsec/master/scripts/install_linux.sh | bash
```

```
vim ~/.pre-commit-config.yaml
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.83.5
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      #- id: terraform_tflint
      - id: terraform_tfsec
      - id: terraform_docs
      #- id: terraform_checkov

```

### **Install the git hook scripts**

```
pre-commit install
```

### **Run hooks**

```
pre-commit run -a
```

---

### **Terraform exposes the TF_LOG environment variable for setting the level of logging verbosity, of which there are five:**

- TRACE: the most elaborate verbosity, shows every step taken by Terraform and produces enormous outputs with internal logs.
- DEBUG: describes what happens internally in a more concise way compared to TRACE.
- ERROR: shows errors that prevent Terraform from continuing.
- WARN: logs warnings, which may indicate misconfiguration or mistakes, but are not critical to execution.
- INFO: shows general, high-level messages about the execution process.

### **To persist logs, set env var:**

**linux**

```
export AWS_PROFILE="dumy"
export TF_LOG_PROVIDER=TRACE
export TF_LOG_PATH=logs.txt
```

**powershell**

```
$env:AWS_PROFILE="dumy"
$env:TF_LOG_CORE=TRACE
$env:TF_LOG_PATH=logs.txt
```

### **To undo env var, reset values to null:**

```
export TF_LOG=
export TF_LOG_CORE=""
```

---

### **Migrating Terraform State**

terraform init –backend-config="profile=infra"

---

#### **Install tfenv**

```
git clone https://github.com/tfutils/tfenv.git ~/.tfenv
echo 'export PATH="$HOME/.tfenv/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
which tfenv
```

---

### **Terraformer**

```
export PROVIDER={all,google,aws,kubernetes}
curl -LO https://github.com/GoogleCloudPlatform/terraformer/releases/download/$(curl -s https://api.github.com/repos/GoogleCloudPlatform/terraformer/releases/latest | grep tag_name | cut -d '"' -f 4)/terraformer-${PROVIDER}-linux-amd64
chmod +x terraformer-${PROVIDER}-linux-amd64
sudo mv terraformer-${PROVIDER}-linux-amd64 /usr/local/bin/terraformer
```

```
terraformer import aws --resources=vpc,subnet --filter=vpc=vpc_id1:vpc_id2:vpc_id3 --regions=eu-west-1 --profile=prod
```

---

```
code tunnel service install

code tunnel service log
```

---
