#!/bin/sh
browserify lib/app.js -o assets/js/main.js --standalone "App"

if [ $# -ne 1 ]
then
    minify --output assets/js/main.js assets/js/main.js
    
    zip -r build.zip ./ -x *.git*\* *.DS_Store\* lib\* build.sh\*
fi