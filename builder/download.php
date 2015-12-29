<?php

header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary");
header("Content-Disposition: attachment; filename=\"pomidorko.zip\""); 

$file    = '_counter/' . date('Y-m-d') . '.txt';
$counter = is_file($file) ? (int)file_get_contents($file) : 0;

file_put_contents($file, $counter + 1);

readfile(__DIR__ . '/pomidorko.zip');