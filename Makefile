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

FTP=./deploy.sh
FULL_DEPLOY=''

.PHONY: build deploy

# Tasks
all: build

# Compile templates via PHP
build_templates:
	mkdir build
	php $(BUILDER)

build_templates_production:
	mkdir build
	php $(BUILDER) true

# Link building assets
link_assets:
	for FOLDER in build/*;                  \
	do                                      \
		mkdir $$FOLDER/apps/_counter;       \
		cp builder/download.php $$FOLDER/apps/download.php; \
		cp pomidorko.zip $$FOLDER/apps/pomidorko.zip; \
		ln -s ../../assets $$FOLDER/assets; \
	done

# JS compilation
build_js:
	browserify lib/index.js -o assets/js/main.js --standalone "pomidorko"

minify_js: build_js
	minify --output assets/js/main.js assets/js/main.js

# Build testing folder
test: clean build_templates build_js link_assets

# Build a zip
zip: build
	zip -FSr build.zip ./build -x *.DS_Store\*

# Prepare build files
build: clean build_templates_production minify_js link_assets

# Clean build and tests files
clean:
	rm -rf ./build ./tests
	rm -f ./build.zip

# Deploy files
deploy_en: build
	$(FTP) 'com' 'en' $(FULL_DEPLOY)

deploy_ru: build
	$(FTP) 'ru' 'ru' $(FULL_DEPLOY)

deploy: deploy_en deploy_ru

# Start PHP webserver
server: test
	php -S localhost:2000 -t build