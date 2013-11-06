<?php

function doubleAndAdd($number, $add){
    $result = doubleNumber($number);
    $result += $add;
    return $result;
}

function doubleNumber($number){
    return $number * 2;
}

$result = doubleAndAdd(42, 8);
echo "Result: " + $result;
