<div align="center">
    <h1>NGINX PROXY</h1>
</div>

***

### __Notes:__

1. sed "a" command lets us append lines to a file, based on the line number or regex provided. So, the lines will be added to the file AFTER the line where condition matches.  
2. sed "i" command lets us insert lines in a file, based on the line number or regex provided. So, the lines will be added to the file AT the location where line number matches or BEFORE the line where pattern matches.  
3. sed with option -i will edit the file in place, i.e. unless you use the option -i, the changes will not be written to the file. (Explained in later section)  

***
### __1. Append a line after 'N'th line__

``` bash
sed 'N a <LINE-TO-BE-ADDED>' FILE.txt
```

### __2. Append Line using Regular Expression/Pattern__

``` bash
sed '/PATTERN/ a <LINE-TO-BE-ADDED>' FILE.txt
```
### __3. Insert line using the Line number__

``` bash
sed 'N i <LINE-TO-BE-ADDED>' FILE.txt
```
***

### __Running the Nikto Scanning Tool__

   ```bash
   $ git clone https://github.com/sullo/nikto
   Cloning into 'nikto'...
   $ cd nikto
   $ perl program/nikto.pl -h localhost
   - Nikto v2.1.6
   ...
   + 7531 requests: 0 error(s) and 324 item(s) reported on remote host
   ```
#### __note:__

### __Enabling the OWASP CRS__

  1. Download the latest OWASP CRS from GitHub and extract the rules into /usr/local or another location of your choice.

    ``` bash
    wget https://github.com/SpiderLabs/owasp-modsecurity-crs/archive/v3.0.2.tar.gz
    tar -xzvf v3.0.2.tar.gz
    sudo mv owasp-modsecurity-crs-3.0.2 /usr/local
    ```
   2. Create the crs‑setup.conf file as a copy of crs‑setup.conf.example.

    ``` bash
    cd /usr/local/owasp-modsecurity-crs-3.0.2
    sudo cp crs-setup.conf.example crs-setup.conf

    ```
   3. Add Include directives in the main NGINX WAF configuration file (/etc/nginx/modsec/main.conf, created in Step 4 of Protecting the Demo Web Application) to read in the CRS configuration and rules. Comment out any other rules that might already exist in the file, such as the sample SecRule directive created in that section. 

    ```bash
    # Include the recommended configuration
Include /etc/nginx/modsec/modsecurity.conf
# OWASP CRS v3 rules
Include /usr/local/owasp-modsecurity-crs-3.0.2/crs-setup.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-901-INITIALIZATION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-905-COMMON-EXCEPTIONS.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-910-IP-REPUTATION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-911-METHOD-ENFORCEMENT.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-912-DOS-PROTECTION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-913-SCANNER-DETECTION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-920-PROTOCOL-ENFORCEMENT.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-921-PROTOCOL-ATTACK.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-930-APPLICATION-ATTACK-LFI.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-931-APPLICATION-ATTACK-RFI.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-932-APPLICATION-ATTACK-RCE.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-933-APPLICATION-ATTACK-PHP.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-941-APPLICATION-ATTACK-XSS.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-942-APPLICATION-ATTACK-SQLI.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-943-APPLICATION-ATTACK-SESSION-FIXATION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/REQUEST-949-BLOCKING-EVALUATION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-950-DATA-LEAKAGES.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-951-DATA-LEAKAGES-SQL.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-952-DATA-LEAKAGES-JAVA.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-953-DATA-LEAKAGES-PHP.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-954-DATA-LEAKAGES-IIS.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-959-BLOCKING-EVALUATION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-980-CORRELATION.conf
Include /usr/local/owasp-modsecurity-crs-3.0.2/rules/RESPONSE-999-EXCLUSION-RULES-AFTER-CRS.conf

    ```

***
#### __Ref:__
https://docs.nginx.com/nginx-waf/admin-guide/nginx-plus-modsecurity-waf-owasp-crs/
***