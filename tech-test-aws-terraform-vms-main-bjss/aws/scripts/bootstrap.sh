#!/usr/bin/env bash

set -eoux pipefail

sudo yum update -y
sudo yum install -y httpd

cat <<EOF > /var/www/html/index.html
<html>
<body>
<p>hostname is: $(hostname)</p>
</body>
</html>
EOF

sudo service httpd start
