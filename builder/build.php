<?php

/**
 * Render (pass) data in PHP template
 * 
 * @param string $__view__
 * @param array $__data__
 */
function render ($__view__, $__data__) {
    extract($__data__);
    
    require(__DIR__ . "/$__view__");
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

/**
 * @param string $path
 * @param string $basepath
 */
function expand_path($path, $basepath = '') {
    $frags = explode('/', trim($path, '/'));
    $path  = rtrim($basepath, '/');
    
    while ($frags) {
        $frag  = array_shift($frags);
        $path .= "/$frag";
        
        if (!file_exists($path) && strpos($frag, '.') <= 0) {
            mkdir($path);
        }
    }
}

$schemes = json_file(__DIR__ . '/schemes.json');

foreach ($schemes as $scheme) {
    foreach ($scheme['lang'] as $language => $destination) {
        $data = [
            'production' => isset($_SERVER['argv'][1])
        ];
    
        if (!empty($scheme['data'])) {
            foreach ($scheme['data'] as $key => $value) {
                $data[$key] = json_file(__DIR__ . "/$value");
            }
        }
        
        $data = array_merge(json_file(__DIR__ . "/$language"), $data);
        
        expand_path($destination, dirname(__DIR__));
        file_put_contents($destination, capture($scheme['layout'], $data));
    }
}