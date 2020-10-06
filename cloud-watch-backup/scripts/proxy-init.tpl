#cloud-config
package_update: true
package_upgrade: true
packages:
  - vim 
  - git
  - wget
  - curl 
  - lvm2

  #- git-all

runcmd:
  - sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.back
  - sudo sed -ie 's/#Port 22/Port 24922/' /etc/ssh/sshd_config
  - sudo systemctl restart sshd
  - curl https://get.docker.com | bash
  
  
preserve_hostname: false
fqdn: gitlab.inecsoft.co.uk
hostname: gitlab