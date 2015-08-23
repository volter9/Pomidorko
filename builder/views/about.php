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
