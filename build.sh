#!/bin/sh
browserify lib/app.js -o assets/js/main.js --standalone "App"

rm -r tests
php builder/build.php $1
ln -s ../assets tests/assets

if [ $# -eq 1 ]
then
    minify --output assets/js/main.js assets/js/main.js
    
    rm -rf ./release
    
    mkdir release
    cp tests/*.html release/
    cp -r assets release
    
    zip -FSr build.zip ./release -x *.DS_Store\*
fi
