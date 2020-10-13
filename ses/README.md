***


<div align="center">
    <h1 style="text-align:center;">Amazon SES</h1>
    <img src="images/ses.JPG" width="700" />
</div>


***
<div align="center">
    <h1 style="text-align:center;">SES Records</h1>
    <img src="images/records.JPG" width="700" />
</div>

***
### __DKIM records__

<div align="center">
    <img src="images/private-public-key.JPG" width="700" />
</div>

  * DKIM stands for DomainKeys Identified Mail and it is a spam prevention technique where your outgoing email server signs your emails so that the receiving email servers can verify that you were really the sender.
  * The DKIM records will be created as CNAME type records. CNAME is short for Canonical Name, and it's a DNS record that can point to another domain name record inside or outside of your current domain.
  * DKIM works by using public and private key cryptography Which are generated on the server. The public key is stored as a TXT record which is a special type of DNS record that can store text and notes about domain without necessarily pointing to an IP address or another place in the internet.

### __TXT Record__

   * The domain verification record is a TXT record that is required by AWS so they can prove that you own this domain name. A TXT record in your DNS zone file is a special type of record that includes additional information about domain that doesn't necessarily link to another domain or IP address.


***
  ### __Testing DKIM__
```
nslookup -tpye=TXT 5hsmshtyezjnopraccwmlrxdwg5z2don._domainkey.cloud.inecsoft.co.uk

nslookup -type=TXT _amazonses.cloud.inecsoft.co.uk
```

***

### __Verify your email address with SES__
  * Email address
  * Set email address, confirm and Test the email

***
### __Send Email through amazon SES with SMTP__
#### __SMTP Connections__
  * SMTP server name
  * SMTP port number
  * Encryption
  * Username and password

  In SMTP settings set create my smtp credentials.
   * An IAM user for SMTP authentication with Amazon SES
   * Get User credentials

***
### __WP Mail SMTP__
  __Settings__

  * From Email: info@inecsoft.co.uk
    - Force from email
  * From Name: Inecsoft
  * Mailer: Other SMTP
  * SMTP Host: email-smtp.eu-west-1.amazonaws.com
  * port: 587
  * Encryption: TLS
  * Authentication: On
  * SMTP Username:  
  * SMTP Password: 
  

***
### __SES for Cloud Watch and SNS-topic__
  * Set cloud watch alarm to send you emails if you send more than 100 mails in a day.
  * Bounce rate below 10%
  * Complaint rate below 1/10th of a percent.

***
### __SES bounce__
  * You need to know which email addresses on your email list are causing your bounce and complaint rates to go up, because you need to quickly remove them from your email list before you try sending email to them again, which would further decrease your sender reputation and then you would risk probation. this is done with aws_ses_identity_notification_topic. if you do not find this extra info useful turn it off.

  * Email feedback forwarding is not need to be sent to us. set is to desable.

  __note:__ test sending an email to bounce@simulator.amazonses.com

***