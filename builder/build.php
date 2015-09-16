<?php

/**
 * Render (pass) data in PHP template
 * 
 * @param string $__view__
 * @param array $__data__
 */
function render ($__view__, $__data__) {
    extract($__data__);
    
    require(__DIR__ . '/' . $__view__);
}

/**
 * Capture view output
 * 
 * @param string $view
 * @param array $data
 * @return string
 */
function capture ($view, $data) {
    ob_start();
    
    render($view, $data);
    
    return ob_get_clean();
}

/**
 * Get JSON from a file
 * 
 * @param string $file
 * @return array
 */
function json_file ($file) {
    $data = json_decode(file_get_contents($file), true);
    
    if ($data === null) {
        throw new Exception("File '$file' isn't valid");
    }
    
    return $data;
}

!file_exists('build') and mkdir('build');
!file_exists('tests') and mkdir('tests');

foreach (glob('lang/*.json') as $file) {
    $filename = str_replace(dirname($file), '', $file);
    $filename = ltrim($filename, '/');
    
    $data = json_file($file);
    $file = explode('.', $filename);
    $file = current($file);
    
    $data = array_merge($data, [
        'data'       => json_file(__DIR__ . '/preferences.json'),
        'production' => isset($_SERVER['argv'][1])
    ]);
    
    $filepath = "build/$file/index.html";
    
    !file_exists("build/$file") and mkdir("build/$file");
    
    file_put_contents($filepath, capture('layout.php', $data));
    
    copy($filepath, "tests/$file.html");
}