#cloud-config
package_update: true
package_upgrade: true
packages:
  - vim 
  - git
  - wget
  - curl 
  - lvm2


     
runcmd:
  - sudo echo "hello world" > /tmp/hello



