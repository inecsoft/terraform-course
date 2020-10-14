#-----------------------------------------------------------------------------------------------------------------
resource "aws_instance" "project_vpc-win" {
  ami = "${lookup(var.AMIS-WIN, var.AWS_REGION)}"
  instance_type = "m5.large"

  # the VPC subnet$
  subnet_id = element(module.vpc.public_subnets,0)

  security_groups = ["${aws_security_group.project_vpc_sg_win.id}"]

  key_name = aws_key_pair.project.key_name

  root_block_device     {
      volume_size = "40"
      volume_type = "gp2"
      delete_on_termination = true
  }

  user_data = <<EOF
<powershell>
net user ${var.INSTANCE_USERNAME} '${var.INSTANCE_PASSWORD}' /add /y
net localgroup administrators ${var.INSTANCE_USERNAME} /add
net user ${var.jenkins_USERNAME} '${var.jenkins_PASSWORD}' /add /y
net localgroup administrators ${var.jenkins_USERNAME} /add
winrm quickconfig -q
winrm set winrm/config/winrs '@{MaxMemoryPerShellMB="300"}'
winrm set winrm/config '@{MaxTimeoutms="1800000"}'
winrm set winrm/config/service '@{AllowUnencrypted="true"}'
winrm set winrm/config/service/auth '@{Basic="true"}'
netsh advfirewall firewall add rule name="WinRM 5985" protocol=TCP dir=in localport=5985 action=allow
netsh advfirewall firewall add rule name="WinRM 5986" protocol=TCP dir=in localport=5986 action=allow
net stop winrm
sc.exe config winrm start=auto
net start winrm

PowerShell Install-WindowsFeature Web-Server -IncludeManagementTools
PowerShell Install-WindowsFeature Web-Asp-Net45
PowerShell function Disable-ieESC {
$AdminKey = “HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components{A509B1A7-37EF-4b3f-8CFC-4F3A74704073}”
$UserKey = “HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components{A509B1A8-37EF-4b3f-8CFC-4F3A74704073}”
Set-ItemProperty -Path $AdminKey -Name “IsInstalled” -Value 0
Set-ItemProperty -Path $UserKey -Name “IsInstalled” -Value 0
Stop-Process -Name Explorer
Write-Host “IE Enhanced Security Configuration (ESC) has been disabled.” -ForegroundColor Green
}
PowerShell Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'
PowerShell Start-Service -Name "sshd" 
PowerShell Set-Service -Name "sshd" -StartupType Automatic 
PowerShell New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force 

PowerShell New-NetFirewallRule -Name "SSH" `
-DisplayName "SSH" `
-Description "Allow SSH" `
-Profile Any `
-Direction Inbound `
-Action Allow `
-Protocol TCP `
-Program Any `
-LocalAddress Any `
-RemoteAddress Any `
-LocalPort 22 `
-RemotePort Any

PowerShell New-NetFirewallRule -Name "IIS443" `
-DisplayName "IIS" `
-Description "Allow IIS" `
-Profile Any `
-Direction Inbound `
-Action Allow `
-Protocol TCP `
-Program Any `
-LocalAddress Any `
-RemoteAddress Any `
-LocalPort 443 `
-RemotePort Any

PowerShell New-NetFirewallRule -Name "IIS" `
-DisplayName "IIS" `
-Description "Allow IIS" `
-Profile Any `
-Direction Inbound `
-Action Allow `
-Protocol TCP `
-Program Any `
-LocalAddress Any `
-RemoteAddress Any `
-LocalPort 80 `
-RemotePort Any



PowerShell Install-Postgres -User "postgres" -Password "${var.INSTANCE_USERNAME}" -InstallUrl "http://get.enterprisedb.com/postgresql/postgresql-12.1-1-windows-x64.exe" -InstallPath "C:\Program Files\PostgreSQL\12.1" -DataPath "C:\Program Files\PostgreSQL\12.1\data" -Port 5432 -ServiceName "postgresql"

</powershell>
EOF


tags = {
   Name = "Windown instance"
  }
}
#-----------------------------------------------------------------------------------------------------------------
output "windows-ipaddress-public" {
  value = "${aws_instance.project_vpc-win.public_ip}"
  
}
output "windows-ipaddress-private" {
  value = "${aws_instance.project_vpc-win.private_ip}"
  
}
#-----------------------------------------------------------------------------------------------------------------
