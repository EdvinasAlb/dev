<?php
session_start();
include('../../server/connection.php');

if (!isset($_SESSION['admin_logged_in'])) {
    header('location: login.php');
    exit;
}


if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];
    $stmt = $conn->prepare("DELETE FROM products WHERE product_id=?");
    $stmt->bind_param('i', $product_id);


    if ($stmt->execute()) {
        header('location: ../products.php?product_deleted= Product has been deleted');
    } else {
        header('location: ../products.php?product_delet_failure= Product has been deleted');
    }
}
