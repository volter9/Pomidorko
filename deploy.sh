#!/bin/sh

# FTP deploy script
source ./ftp.sh

DOMAIN="$1"
LANG="$2"

ncftp <<EOF
open -u '$USER' -p '$PASS' '$HOST'
cd /www/pomidorko.$DOMAIN 
put -zf ./build/$LANG.html index.php
put -rf ./assets
EOF