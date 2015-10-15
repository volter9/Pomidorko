<script src="assets/js/main.js" 
        type="text/javascript"></script>
<script src="assets/js/likely.js" 
        type="text/javascript"></script>
<script type="text/javascript">
    var components = pomidorko.components,
        dom        = pomidorko.dom;
    
    pomidorko.bootstrap.reset();
    
    var container = dom.find('#pomidorka'),
        timer     = new pomidorko.Timer,
        data      = pomidorko.bootstrap(pomidorko.config);

    var settings = data.settings,
        goals    = data.goals;

    pomidorko.lang.set(<?php echo json_encode($js, JSON_UNESCAPED_UNICODE) ?>);

    var services = [
        new components.PlayPause(dom.find('.pa-timer-control'), timer),
        new components.State(container, timer, goals, settings),
        new components.Scale(dom.find('.pa-timer-wrapper'), timer),
        new components.Time(dom.find('.pa-timer-time'), timer),
        new components.Skip(dom.find('.pa-skip'), timer, goals),
        new components.Goals(dom.find('.pa-goals'), goals, settings),
        new components.TickTock(
            timer, settings, new Audio('assets/sounds/tick.mp3')
        ),
        new components.Sound(
            timer, settings, new Audio('assets/sounds/bell.mp3')
        ),
        new components.About(
            dom.find('.pa-about-button'), dom.find('.pa-about')
        ),
        new components.Favicon(dom.find('[rel=icon]'), timer, goals),
        new components.Title(timer, goals),
        new components.Notifications(timer, goals, settings),
        new components.Settings(
            dom.find('.pa-settings-button'), 
            dom.find('.pa-settings'), settings
        ),
        new components.Save(timer, goals)
    ];

    services.forEach(function (service) {
        service.activate();
    });
</script>

<?php if ($production): ?>
<!-- Yandex.Metrika counter -->
<script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter<?php echo $metrika_id ?> = new Ya.Metrika({id:<?php echo $metrika_id ?>, webvisor:true, clickmap:true, accurateTrackBounce:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script>
<noscript><div><img src="//mc.yandex.ru/watch/<?php echo $metrika_id ?>" style="display:hidden;" alt=""></div></noscript>
<?php endif; ?> 