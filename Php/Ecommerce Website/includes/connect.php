<?php
$con = mysqli_connect("localhost", "root", "", "mystore");
if (!$con) {
    global $con;
    die(mysqli_error($con));
}
