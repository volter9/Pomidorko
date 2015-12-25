<!DOCTYPE html>
<html>
    <head>
<?php render('views/head.php', $__data__) ?> 
    </head>
    
    <body>
        <section id="pomidorka">
<h1 class="pa-title">
    <?php echo $title ?> 
</h1>

<div class="pa-skip">
    <span><?php echo $skip ?></span>
</div>

<button class="pa-settings-button"><?php echo $settings ?></button>
<button class="pa-about-button"><?php echo $about ?></button>

<?php render('views/settings.php', $__data__) ?> 
<?php render('views/timer.php', $__data__) ?> 
<?php render('views/goals.php', $__data__) ?> 
<?php render('views/about.php', $__data__) ?> 
        </section>

<?php render('views/footer.php', $__data__) ?>  
    </body>
</html>