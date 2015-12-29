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
mkdir apps/_counter
put -z ./assets/js/main.js ./assets/js/main .js
put -z ./builder/download.php apps/download.php
put -z ./build/$LANG/apps/index.html apps/index.php
put -z ./build/$LANG/index.html index.php
$FILES
EOF