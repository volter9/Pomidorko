#!/bin/sh
browserify lib/app.js -o assets/js/main.js --standalone "App"

rm -r tests
php builder/build.php
cp -r assets tests/assets

if [ $# -ne 1 ]
then
    minify --output assets/js/main.js assets/js/main.js
    
    zip -FSr build.zip 'assets/' 'build/' -x *.DS_Store\*
fi
