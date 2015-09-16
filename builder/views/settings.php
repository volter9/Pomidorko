<div class="pa-settings hidden">
    <ul>
    <?php foreach ($preferences as $key => $caption): 
        $item = $data[$key];
        $type = $item['type'];
        
        $item['name'] = $key;
        
        $separator = !empty($item['separator']);
    ?> 
        <li class="clearfix <?php echo $separator ? 'separator' : '' ?>">
            <?php echo $caption ?> 
            <?php render("views/fields/$type.php", array_merge($__data__, $item)) ?> 
        </li>
    <?php endforeach; ?> 
    </ul>
</div>
