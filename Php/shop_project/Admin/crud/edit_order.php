<?php session_start();
include('../../server/connection.php'); ?>
<?php
if (!isset($_SESSION['admin_logged_in'])) {
    header('location: ../login.php');
    exit;
}
?>

<?php
if (isset($_GET['order_id'])) {
    $order_id = $_GET['order_id'];
    $stmt = $conn->prepare("SELECT * FROM orders WHERE order_id=?");
    $stmt->bind_param('i', $order_id);
    $stmt->execute();
    $order = $stmt->get_result();
} else if (isset($_POST['edit_btn'])) {
    $order_status = $_POST['order_status'];
    $order_id = $_POST['order_id'];

    $stmt = $conn->prepare("UPDATE orders SET order_status=?  WHERE order_id=?");
    $stmt->bind_param('si', $order_status, $order_id);
    if ($stmt->execute()) {
        header('location: ../index.php?order_updated= Order has been updated successfully');
    } else {
        header('location: ../index.php?order_updaited_failure= Error accured, try again');
    }
} else {
    header('location: ../index.php');
}
?>

<?php include "header.php"; ?>
<section id="admin-dashboard">
    <?php include "sidebar.php" ?>
    <form class="text-center mx-auto my-3" method="post" action="edit_order.php">
        <h3>Edit Product</h3>
        <?php foreach ($order as $r) { ?>
            <input type="hidden" name="order_id" value="<?php echo $r['order_id']; ?>">
            <div class="form-group my-3">
                <label>Order Id</label>
                <p class="my-4"><?php echo  $r['order_id'] ?></p>
            </div>
            <div class="form-group my-3">
                <label>Order Price</label>
                <p class="my-4"><?php echo  $r['order_cost'] ?></p>
            </div>
            <div class="form-group mx-auto my-3">
                <label>Category</label>
                <select class="form-select" required="required" name="order_status">
                    <option value="not paid" <?php if ($r['order_status'] == 'not paid') {
                                                    echo "selected";
                                                } ?>>Not Paid</option>
                    <option value="paid" <?php if ($r['order_status'] == 'paid') {
                                                echo "selected";
                                            } ?>>Paid</option>
                    <option value="shipped" <?php if ($r['order_status'] == 'shipped') {
                                                echo "selected";
                                            } ?>>Shipped</option>
                    <option value="delivered" <?php if ($r['order_status'] == 'delivered') {
                                                    echo "selected";
                                                } ?>>Delivered</option>
                </select>
            </div>
            <div class="form-group my-4">
                <label>Order Date</label>
                <p class="my-4"><?php echo  $r['order_date'] ?></p>
            </div>
        <?php } ?>
        <div class="form-group my-3">
            <input class="btn btn-info" type="submit" id="login-btn" value="Save" name="edit_btn" />
        </div>

    </form>
</section>

</body>

</html>