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
FTP=./deploy.sh
FULL_DEPLOY=''

.PHONY: build deploy

# Tasks
all: build

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

# Build testing folder
test: build_templates build_js
	rm -rf $(TEST_FOLDER)
	mkdir $(TEST_FOLDER)
	
	ln -s ../assets tests/assets
	
	for FILE in build/*.html;                   \
do                                              \
    cp $$FILE "$(TEST_FOLDER)/$${FILE#build/}"; \
done

# Build a zip
zip: build
	zip -FSr build.zip ./build -x *.DS_Store\*

# Prepare build files
build: build_templates_production minify_js
	cp -r assets build

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