#generate a password
openssl rand 20 -base64 

#aws ec2 get-password-data --instance-id i-enter-instance-id --priv-launch-key mykey
#user Administrator
xfreerdp -g 800x600 -u Serverworld 10.0.0.100

power shell
Rename-LocalUser -Name "Administrator" -NewName "ServerworldAdmin" 
Get-LocalUser 

# download
PS C:\Users\Administrator> Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.7.4/python-3.7.4-amd64.exe" -OutFile "python-3.7.4-amd64.exe" 

# install (to System Wide + set PATH)
PS C:\Users\Administrator> .\python-3.7.4-amd64.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0 

# reload environment variables
PS C:\Users\Administrator> $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 

PS C:\Users\Administrator> python -V 