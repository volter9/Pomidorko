#!/bin/sh

# FTP deploy script
source ./ftp.sh

# Variables
DOMAIN="$1"
LANG="$2"
FILES=$(git diff --name-only HEAD~1 HEAD)

if [ "$3" == "true" ]
then
    FILES=$(git ls-files)
fi

FILES=$(echo "$FILES" | grep ^assets | awk '{print "put -z ./" $0 " ./" $0}')

ncftp <<EOF
open -u '$USER' -p '$PASS' '$HOST'
cd /www/pomidorko.$DOMAIN 
mkdir assets
mkdir assets/apps
mkdir assets/js
mkdir assets/css
mkdir assets/img
mkdir assets/sounds
mkdir apps
put -zf ./pomidorko.zip apps/pomidorko.zip
put -zf ./build/$LANG/apps/index.html apps/index.php
put -zf ./build/$LANG/index.html index.php
$FILES
EOF