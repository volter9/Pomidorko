<div class="pa-settings hidden">
    <ul>
    <?php foreach ($preferences as $key => $caption): 
        if (in_array($key, ['sound', 'tick'])) {
            continue;
        }
        
        $item = $data[$key];
        $type = $item['type'];
        
        $separator = !empty($item['separator']);
        $full      = !empty($item['full']);
        
        $class  = 'pa-control';
        $class .= $full ? ' pa-full-control' : '';
        ?> 
        <li class="clearfix<?php echo $separator ? ' separator' : '' ?>">
            <?php echo $caption ?> 
            <div class="<?php echo $class ?>" 
                 data-type="<?php echo $type ?>">
                <span class="minus">&minus;</span>
                <span class="pa-cell">
                    <input class="<?php echo $key ?>" type="text" maxlength="2">
                    <?php echo $type === 'time' ? $min : '' ?> 
                </span>
                <span class="plus">+</span>
            </div>
        </li>
    <?php endforeach ?> 
    </ul>
</div>
