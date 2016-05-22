# Pomidorko the web app

Pomodoro timer in your browser. Front-end is written on JS with the use of CommonJS modules and compilation of code base into one file (with browserify). HTML templates are compiled for different languages via small PHP script.

## Build requirements

To build Pomidorko you need following software:

- PHP 5.4+
- npm modules: browerify and minifier
- ncftp (only for FTP deploy)

<!-- I'm way too lazy to translate the software installation process -->

## Initialization and building

To build the project you need to run following bash command into terminal (first `cd` to repository):

    make release

After the command is finished, you'll see folder `build` in repository's folder. This folder contains compiled files of Pomidorko web app (compiled JS, localized HTMLs). If you want to test the application, you need to run another comamnd:

    make test

This command will build the project, but also will create `test` folder with testing files. Open `.html`s in the browser and test the application.

If you want to build and zip the app, you can run `make zip` to build and zip the application in file `build.zip`.

Read `Makefile` for more information.

### Deploy via FTP

To deploy this app via FTP, you'll need to create file `ftp.sh` in the main folder of repository (where files `Makefile` and `.gitignore` are located) and save it with following variables:

    # FTP host
    HOST='host'
    
    # User name and password for FTP auth
    USER='user'
    PASS='****'

After creating this file and filling it with proper data to authorize on your FTP server, you may use following commands to deploy the application:

- `make deploy` deploy all localized versions
- `make deploy_en` deploy only English version
- `make deploy_ru` deploy only Russian version

You may want to modify the `deploy.sh` command to suit your server folder structure.

## Wanna continue development?

Please contact pasha@omelekhin.ru. He's the organizer of this project, he'll need a new developer to continue developing this project (Pomidorko for iOS and iWatch).

Happy coding 😄 !

Also checkout the Pomidorko OS X repository.