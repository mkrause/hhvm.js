<?php

$newArray = array(1, 41);
$newArray[] = 42;


foreach($newArray as $element){
    $element++;
}
print_r($newArray);