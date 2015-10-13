# Помидорка

Помидорковый таймер в браузере. 

Front-end написан на JS с использованием модулей (а ля CommonJS) и компиляция через browerify. Шаблоны для разных локализаций (ru, en) собираются с помощью PHP.

## Что нужно для работы над помидокой

Для работы над помидоркой нужны следующии инструменты и ПО:

- PHP 5.4 и выше
- npm модули: browerify и minifier
- ncftp (только для деплоя по FTP)

Если все это есть то можно начать инициализацию.

## Установить нужное ПО для работы (для OS X)

Установи сначала [brew](http://brew.sh).

### PHP 5.4

Сначала надо проверить версию. Если версия PHP (`php -v`) меньше чем 5.4 то надо установить PHP 5.4 или выше:

    # К примеру, PHP 5.5
    brew install php55

### npm модули

Если npm не установлен в системе (можно это посмотреть попробовав запустить комманду `npm`), тогда нужно сначала установить npm:

    brew install npm

После этого можно установить два нужных пакета:

    sudo npm install -g browserify
    sudo npm install -g minify

### ncftp

Для деплоя нужна коммандная утилита ncftp. Если она еще не установлена в системе то:

    brew install ncftp

## Инициализация и сборка

Чтобы собрать проект (не загрузив файлы через FTP на сервер), нужно запустить мэйк таском `release`:

    make release

После завершения работы этой команды должна появится папка `build` и там будет скомпилированные файлы готовые к отправке или тестированию. Для того что бы собрать проект и потестировать воспользуйся таском `test`:

    make test

Также есть таск `zip` для сборки всего (скомпилированного) проекта в zip файл:

    make zip

### Деплой

Для деплоя проекта на FTP сервер нужно указать создать файл `ftp.sh` рядом с `deploy.sh` и указать там информацию о подсоединение к FTP серверу. Что-то вроде:

    # FTP хост
    HOST='host'
    
    # Имя и пароль FTP пользователя
    USER='user'
    PASS='****'

После создания этого файла, можно воспользоватся тасками:

- `make deploy` чтобы залить все локализации (Русскую и Английскую)
- `make deploy_en` чтобы залить только Английскую версию
- `make deploy_ru` чтобы залить только Русскую версию

    var container = pomidorko.dom.find('#pomidorko'),
        data      = pomidorko.bootstrap(App.config.key);

    var timer = new pomidorko.Timer();

    var services = {
        notifications: new pomidorko.components.Notifications(),
        playPause:     new pomidorko.components.PlayPause(),
        settings:      new pomidorko.components.Settings(),
        tickTock:      new pomidorko.components.TickTock()
        favicon:       new pomidorko.components.Favicon(),
        about:         new pomidorko.components.About(),
        goals:         new pomidorko.components.Goals(),
        scale:         new pomidorko.components.Scale(),
        sound:         new pomidorko.components.Sound(),
        title:         new pomidorko.components.Title(),
        time:          new pomidorko.components.Time(),
        skip:          new pomidorko.components.Skip()
    };

    var app = new pomidorko.App(container, services);

    app.run();