<?php

function render ($__view__, $__data__) {
    extract($__data__);
    
    require(__DIR__ . '/' . $__view__);
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
    
    $data['data'] = json_decode(file_get_contents(__DIR__ . '/preferences.json'), true);
    
    ob_start();
    
    render('layout.php', $data);
    
    if (!file_exists("build/$file")) {
        mkdir("build/$file");
    }
    
    $filepath = "build/$file/index.html";
    
    file_put_contents($filepath, ob_get_clean());
    
    copy($filepath, "tests/$file.html");
}