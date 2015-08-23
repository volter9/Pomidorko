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
