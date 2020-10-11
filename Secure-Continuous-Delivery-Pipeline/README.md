***

<div align="center">
   <h1>DevOps Audit Defense Toolkit</h1>
</div>

***

<div align="center">
   <img src="images/devops.JPG" width="700"/>
</div>

***
### __Git-secrets installation__
```
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
sudo make install
```

***
git clone https://github.com/wickett/word-cloud-generator.git
cd word-cloud-generator
```
git secrets --install
git secrets --register-aws
git secrets --scan
#if keys are found check echo $? which exit on 1
git secrets --scan-history
```
***

__Install git hooks to the current directory__
```
git secrets --install
```
### __I set analisys for AWS credentials__
```
git secrets --register-aws
```
### __Scan all files in the repo:__
```
git secrets --scan
```
### __Scans a single file for secrets:__
```
git secrets --scan /path/to/file
```
***
### __Rapid Risk Assessment__

*__REF:__* https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment

***
### __OWASP Dependency Check in__

*__REF:__* https://jeremylong.github.io/DependencyCheck/dependency-check-cli/index.html

### __Retire.js__
```
git clone github.com/wickett/docker-retire.js.git
cd docker-retirejs

docker build . -t:retire 

docker run --rm -v $PWD:/app retire -v

```
#### __Check for exit code__
```
echo $?
```

### __Docker containers checks__

  * clair 
  * aqua
  * twistlock
 
***
### __DAST tools__
  * zap
  * burp
  * sqlmap
  * SSLScan and SSLyze

***
### __DevSecOps for Automated security testing__
  * Guntlt + Aracni


```
docker pull gauntlt/gauntlt
```
### __Run the test__
```
docker run -t --rm=true -v $(pwd):/working -w /working gauntlt/gauntlt ./xss.attack
```
***
signalsciences.com
***
### __Open Source SAST Options__


|  Language / framework   | Scanning tool  |
|-------------------------|----------------|
| C/C++                   | Flawfinder  |
| Go                        | Go	Gosec
|Java   |  find-sec-bugs |
| JavaScript  | ESLint  |
| .NET  |  Security Code Scan |
| Node.js  | NodeJsScan   |
| PHP  | 	Phan,	Phpcs-security-audit  |
| Python  |  bandit |
| Ruby / Ruby on Rails  | brakeman  |
| Scala             | Scala	find-sec-bugs |

***
### __DevOps Audit Defense Toolkit__

[ Manual Doc](doc/DevOps_Audit_Defense_Toolkit_v1.0.pdf)

***