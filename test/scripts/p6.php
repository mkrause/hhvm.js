<?php

$newArray = array(1, 41);
//array_push($newArray, 42);
$newArray[] = 42;
for($i = 0; $i < count($newArray); $i++){
    $newArray[$i]++;
}
print_r($newArray);
