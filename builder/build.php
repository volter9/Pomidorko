<?php

function render ($__view__, $__data__) {
    extract($__data__);
    
    require($__view__);
}

$files = glob('lang/*.json');

if (!file_exists('build')) {
    mkdir('build');
}

if (!file_exists('tests')) {
    mkdir('tests');
}

foreach ($files as $file) {
    $filename = str_replace(dirname($file), '', $file);
    $filename = ltrim($filename, '/');
    
    $data = json_decode(file_get_contents($file), true);
    $file = explode('.', $filename);
    $file = current($file);
    
    ob_start();
    
    render(__DIR__ . '/template.php', $data);
    
    if (!file_exists("build/$file")) {
        mkdir("build/$file");
    }
    
    $filepath = "build/$file/index.html";
    
    file_put_contents($filepath, ob_get_clean());
    
    copy($filepath, "tests/$file.html");
}