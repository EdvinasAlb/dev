<?php
session_start();
include('../../server/connection.php');

if (!isset($_SESSION['admin_logged_in'])) {
    header('location: ../login.php');
    exit;
}


if (isset($_GET['order_id'])) {
    $order_id = $_GET['order_id'];
    $stmt = $conn->prepare("DELETE FROM orders WHERE order_id=?");
    $stmt->bind_param('i', $order_id);

    if ($stmt->execute()) {
        header('location: ../index.php?order_deleted= Order has been deleted');
    } else {
        header('location: ../index.php?order_deleted_failure= Order has not been deleted');
    }
}
