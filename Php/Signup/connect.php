<?php
$HOSTNAME = 'localhost';
$USERNAME = 'root';
$PASSWORD = 'Za81as@#1212';
$DATABaSE = 'signupforms';


$con=mysqli_connect($HOSTNAME,$USERNAME,$PASSWORD,$DATABaSE);


if(!$con){
    die(mysqli_error($con));
}
?>