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
### __What is SAST and DAST__
SAST and DAST are application security testing methodologies used to find security vulnerabilities that can make an application susceptible to attack. Static application security testing (SAST) is a white box method of testing. It examines the code to find software flaws and weaknesses such as SQL injection and others listed in the OWASP Top 10. Dynamic application security testing (DAST) is a black box testing method that examines an application as it’s running to find vulnerabilities that an attacker could exploit.
SAST should be performed early and often against all files containing source code. DAST should be performed on a running application in an environment similar to production. So the best approach is to include both SAST and DAST in your application security testing program.

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
#### __Demo web platform__
```
docker run --name bodgeit --rm -p 8080:8080 -it psiinon/bodgeit
echo "127.0.0.1 bodgeit"  | sudo tee -a /etc/hosts
```
```
docker run -t --rm=true -v $(pwd):/working -w /working gauntlt/gauntlt ./xss.attack
```
```
mkdir gauntlt && cd gauntlt
cat << EOF > xss.attack
@slow @final
Feature: Look for cross site scripting (xss) using arachni against word-cloud-generator

Scenario: The site is running on localhost:8080 and we are testing for xss
  Given "arachni" is installed
  And the following profile:
     | name                | value                          |
     | url                 | http://bodgeit:8080          |
  When I launch an "arachni" attack with:
  """
  arachni --checks=xss --scope-directory-depth-limit=1 <url>
  """
  Then the output should contain "0 issues were detected."
EOF
echo "127.0.0.1 bodgeit"  | sudo tee -a /etc/hosts

docker run -t --rm=true --name gauntlt -v $(pwd):/working -w /working gauntlt/gauntlt ./xss.attack
```
```
cat << EOF > nmap.attack
@slow
Feature: simple nmap attack (sanity check)

  Background:
    Given "nmap" is installed
    And the following profile:
      | name     | value      |
      | hostname | bodgeit |

  Scenario: Verify server is available on standard web ports
    When I launch an "nmap" attack with:
      """
      nmap -p 8080 <hostname>
      """
    Then the output should match /80.tcp\s+open/
    And the output should not match:
      """
      443/tcp\s+open
      """
EOF

docker run -t --rm=true --name gauntlt -v $(pwd):/working -w /working gauntlt/gauntlt nmap nmap.attack
```

#### __ZAP - Baseline Scan__
```
mkdir zap && cd zap
mkdir -p $(pwd)/wrk && chmod -R 777 $(pwd)/wrk
docker run --name zap -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py \
-t https://www.example.com -g gen.conf -r testreport.html
```

```
SCAN_URL=http://bodgeit:8080
SECURITY_DOCKER_IMAGE=owasp/zap2docker-stable
mkdir -p $(pwd)/wrk && chmod -R 777 $(pwd)/wrk && cp security-levels.conf security-in-progress.json $(pwd)/wrk
docker run --rm -u zap --name zap -v "$(pwd)/wrk":/zap/wrk/:rw -i $SECURITY_DOCKER_IMAGE zap-baseline.py -j -s -r security-scan.html -c security-levels.conf -p security-in-progress.json -z "-config globalexcludeurl.url_list.url.regex=$SCAN_URL/mockapi.*" -t $SCAN_URL
```

***
signalsciences.com
***
### __Open Source SAST Options__


|  Language / framework   | Scanning tool  |
|-------------------------|----------------|
| C/C++                   | Flawfinder     |
| Go                      | Go	Gosec      |
|Java                     |  find-sec-bugs |
| JavaScript              |  ESLint        |
| .NET                    | Security Code Scan |
| Node.js                 | NodeJsScan    |
| PHP                     | Phan,	Phpcs-security-audit  |
| Python                  |  bandit       |
| Ruby / Ruby on Rails    | brakeman      |
| Scala                   | Scala	find-sec-bugs |

***
### __DevOps Audit Defense Toolkit__

[ Manual Doc](doc/DevOps_Audit_Defense_Toolkit_v1.0.pdf)

***