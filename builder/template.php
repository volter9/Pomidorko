<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta content="assets/img/icon.jpg" property="og:image">
        <meta content="<?php echo $description ?>" property="og:description">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="viewport" content="minimal-ui">
        <meta http-equiv="cleartype" content="on">
        
        <title><?php echo $title ?></title>
        
        <link href="assets/css/likely.css"
              rel="stylesheet"
              type="text/css">
        <link href="<?php echo $stylesheet ?>"
              rel="stylesheet"
              type="text/css">
        <link href="http://fonts.googleapis.com/css?family=Lato:300" 
              rel="stylesheet" 
              type="text/css">
        <link href="assets/img/work.ico" 
              rel="icon" 
              type="image/x-icon">
        <link href="assets/img/app.png" 
              rel="apple-touch-icon">
    </head>
    
    <body>
        <section id="pomidorka">
            <h1 class="pa-title"><?php echo $title ?></h1>
            
            <div class="pa-skip">
                <span><?php echo $skip ?></span>
            </div>
            
            <button class="pa-settings-button"><?php echo $settings ?></button>
            
            <div class="pa-settings hidden">
                <ul>
                <?php foreach ($preferences as $key => $preference): 
                    $separator = $key === 'round' ? ' separator' : '';
                    $full     = $preference['full'] ? ' pa-full-control' : '';
                    ?> 
                    <li class="clearfix<?php echo $separator ?>">
                        <?php echo $preference['caption'] ?> 
                        <div class="pa-control<?php echo $full ?>">
                            <span class="minus">&minus;</span>
                            <span class="pa-cell">
                                <input class="<?php echo $key ?>" type="text" maxlength="2">
                                <?php echo $preference['full'] ? '' : $min ?> 
                            </span>
                            <span class="plus">+</span>
                        </div>
                    </li>
                <?php endforeach ?> 
                </ul>
            </div>
            
            <div class="pa-timer">
                <div class="pa-timer-time">
                    <span class="pa-min">00</span>
                    <span class="pa-colon">:</span>
                    <span class="pa-sec">00</span>
                </div>
                
                <div class="pa-timer-scale">
                    <div class="pa-timer-wrapper">
                        <img src="assets/img/scale.png" alt="<?php echo $scale ?>">
                    </div>
                </div>
                
                <div class="pa-timer-control pa-play">
                    <span class="pa-icon pa-play"></span>
                </div>
            </div>
            
            <div class="pa-goals">
                <span class="pa-current">0</span> <?php echo $of_total ?> 
                <span class="pa-total">0</span> <?php echo $pomidorkas ?> 
                <span class="pa-status hidden"></span>
            </div>
            
            <button class="pa-about-button"><?php echo $about ?></button>
            
            <div class="pa-about hidden">
                <button class="pa-close">
                    <img src="assets/img/close.png" 
                         alt="<?php echo $close ?>" 
                         title="<?php echo $close ?>">
                </button>
                
                <p class="pa-subtitle">
                    <?php foreach ($instructions as $index => $text): ?> 
                    <?php echo ($index + 1) . '. ' . $text ?><br>
                    <?php endforeach ?> 
                </p>
                
                <p class="pa-credits">
                <?php foreach ($creators as $creator): ?> 
                    <?php echo $creator['role'] ?> &mdash;
                    <a href="<?php echo $creator['website'] ?>" target="_blank">
                        <?php echo $creator['name'] ?> 
                    </a><br>
                <?php endforeach ?> 
                </p>
                
                <div class="likely likely-light">
                <?php foreach ($share as $network => $caption): ?> 
                    <div class="<?php echo $network ?>"><?php echo $caption ?></div>
                <?php endforeach ?> 
                </div>
                
                <div class="pa-donate">
                    <p class="pa-we-need">
                         <span class="pa-support"><?php echo $support['us'] ?></span><br>
                         <?php echo $support['text'] ?> 
                    </p>
                    
                    <?php echo $donate_form ?>
                </div>
            </div>
        </section>
        
        <script src="assets/js/main.js" 
                type="text/javascript"></script>
        <script src="assets/js/likely.js" 
                type="text/javascript"></script>
        <script type="text/javascript">
            App.language = <?php echo json_encode($js, JSON_UNESCAPED_UNICODE) ?>;
            App.initiate(document.getElementById('pomidorka'));
        </script>
        
        <!-- Yandex.Metrika counter -->
        <script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter<?php echo $metrika_id ?> = new Ya.Metrika({id:<?php echo $metrika_id ?>, webvisor:true, clickmap:true, accurateTrackBounce:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script>
        <noscript><div><img src="//mc.yandex.ru/watch/<?php echo $metrika_id ?>" style="display:hidden;" alt=""></div></noscript>
    </body>
</html>