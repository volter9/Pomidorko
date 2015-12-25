<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta content="../assets/apps/icon.jpg" property="og:image">
        <meta content="<?php echo $description ?>" property="og:description">

        <title><?php echo $title ?></title>

        <link href="../assets/css/apps.css"
            rel="stylesheet"
            type="text/css">
        <link href="../assets/css/likely.css"
          rel="stylesheet"
          type="text/css">
    </head>

    <body>
        <h1 class="pa-title">
            <a href="../"><?php echo $pomodoro_timer ?></a>
        </h1>

        <img src="../assets/apps/time.png" srcset="../assets/apps/time@2x.png 2x" id="time">

        <div id="center">
            <h1 id="main-h"><?php echo $tagline ?></h1>
            <br>
            <a href="./pomidorko.zip" id="download"><?php echo $download_for_osx ?></a>
            <br>
            <span class="caption">Если вы&nbsp;увидите предупреждение &laquo;Программа &bdquo;Помидорко&ldquo; не&nbsp;может быть открыта...&raquo;, в&nbsp;Настройках в&nbsp;Защите и&nbsp;безопасности нажмите <i>Подтвердить вход</i></span>
        </div>

        <div class="likely likely-light">
            <div class="vkontakte"></div>
            <div class="twitter"></div>
            <div class="facebook"></div>
            <div class="gplus"></div>
        </div>

        <div id="donate">
            <h2 id="donate-h"><?php echo $support ?></h2>

            <div class="col yad">
                <span><?php echo $yad ?></span><br>
                <iframe class="donate-btn" frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/embed/small.xml?account=41001865839740&quickpay=small&yamoney-payment-type=on&button-text=01&button-size=s&button-color=white&targets=%D0%A7%D1%82%D0%BE%D0%B1%D1%8B+%D1%82%D0%B0%D0%B9%D0%BC%D0%B5%D1%80+%D0%BF%D0%BE%D0%BF%D0%B0%D0%BB+%D0%B2+%D0%90%D0%BF%D0%BF%D1%81%D1%82%D0%BE%D1%80&default-sum=100&successURL=" width="137" height="31"></iframe>
            </div>
            
            <div class="col card">
                <span><?php echo $cards ?></span><br>
                <iframe class="donate-btn" frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/embed/small.xml?account=41001865839740&quickpay=small&any-card-payment-type=on&button-text=01&button-size=s&button-color=white&targets=%D0%A7%D1%82%D0%BE%D0%B1%D1%8B+%D1%82%D0%B0%D0%B9%D0%BC%D0%B5%D1%80+%D0%BF%D0%BE%D0%BF%D0%B0%D0%BB+%D0%B2+%D0%90%D0%BF%D0%BF%D1%81%D1%82%D0%BE%D1%80&default-sum=100&successURL=" width="137" height="31"></iframe>
            </div>
        </div>

        <script src="../assets/js/likely.js" 
                type="text/javascript"></script>

        <?php if ($production): ?> 
        <!-- Yandex.Metrika counter -->
        <script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter32028086 = new Ya.Metrika({id:32028086, webvisor:true, clickmap:true, accurateTrackBounce:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script>
        <noscript><div><img src="//mc.yandex.ru/watch/32028086" style="display:hidden;" alt=""></div></noscript>
        <?php endif; ?> 
    </body>
</html>
