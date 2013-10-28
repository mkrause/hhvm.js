<?php

$newArray = array(1, 41);
push($newArray, 42);
for($i = 0; $i < sizeof($newArray); $i++){
    $newArray[$i++];
}
print_r($newArray);