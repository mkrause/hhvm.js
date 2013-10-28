<?php

function multiplyBelow100($number) {
    if($number < 100){
        return multiplyBelow100(2 * $number);
    } else {
        return $number;
    }
}

$i = 1;
while($i <= 4){
    echo "result of round " + $i + ": " + multiplyBelow100($i);
    $i++;
}
