# Pomidorka's makefile
# 
# What do you need to have/install in order to get it running:
#
# - PHP 5.4+
# - Browserify: npm install -g browserify
# - Minify:     npm install -g minify

# PHP Builder stuff
BUILD_FILES=build/*.html
BUILDER=builder/build.php

TEST_FOLDER=tests

# Tasks
all: zip

# Compile templates via PHP
build_templates:
	php $(BUILDER)

build_templates_production:
	php $(BUILDER) true

# JS compilation
build_js:
	browserify lib/app.js -o assets/js/main.js --standalone "App"

minify_js: build_js
	minify --output assets/js/main.js assets/js/main.js

# Misc.
.PHONY: echo

# Build testing folder
test: build_templates build_js
	rm -rf $(TEST_FOLDER)
	mkdir $(TEST_FOLDER)
	
	ln -s ../assets tests/assets
	
	for FILE in build/*.html;                   \
do                                              \
    cp $$FILE "$(TEST_FOLDER)/$${FILE#build/}"; \
done

# Build a release, zip it and remove the release folder
zip: release
	zip -FSr build.zip ./release -x *.DS_Store\*
	
	rm -rf ./release

# Prepare files for release
release: build_templates_production minify_js
	rm -rf ./release
	
	mkdir release
	cp build/*.html release/
	cp -r assets release

# Clean build and tests files
clean:
	rm -rf ./release ./build ./tests