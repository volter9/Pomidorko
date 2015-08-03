#!/bin/sh
browserify lib/app.js -o js/main.js --standalone "App"

if [ $# -ne 1 ]
then
    minify --output js/main.js js/main.js
fi