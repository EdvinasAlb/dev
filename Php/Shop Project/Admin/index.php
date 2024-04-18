<?php include "header.php"; ?>
<?php
if (!isset($_SESSION['admin_logged_in'])) {
    header('location: login.php');
    exit;
}
?>

<?php
//1.determine page number
if (isset($_GET['page_no']) && $_GET['page_no'] !== "") {
    //if user has already entered page then page number is the one that they selected
    $page_no = $_GET['page_no'];
} else {
    //if user just entered the page then default page is 1;
    $page_no = 1;
}

//2.return number of products
$stmt1 = $conn->prepare("SELECT COUNT(*) AS total_records FROM orders");
$stmt1->execute();
$stmt1->bind_result($total_records);
$stmt1->store_result();
$stmt1->fetch();

//3.products per page

$total_records_per_page = 8;
$offset = ($page_no - 1) * $total_records_per_page;
$previuos_page = $page_no - 1;
$next_page = $page_no + 1;

$adjacents = "2";

$total_no_of_pages = ceil($total_records / $total_records_per_page);

//4. get all products

$stmt2 = $conn->prepare("SELECT * FROM orders LIMIT $offset, $total_records_per_page");
$stmt2->execute();
$orders = $stmt2->get_result();
?>


<section id="admin-dashboard">
    <?php include "sidebar.php"; ?>
    <table class="table table-hover mx-5">
        <thead>
            <tr>
                <th colspan="8">
                    <h3 class="my-3">Orders</h3>
                    <?php if (isset($_GET['order_updated'])) { ?>
                        <p class="text-center" style="color: green;"><?php echo $_GET['order_updated'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['order_updaited_failure'])) { ?>
                        <p class="text-center" style="color: red;"><?php echo $_GET['order_updaited_failure'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['order_deleted'])) { ?>
                        <p class="text-center" style="color: green;"><?php echo $_GET['order_deleted'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['order_deleted_failure'])) { ?>
                        <p class="text-center" style="color: red;"><?php echo $_GET['order_deleted_failure'] ?></p>
                    <?php } ?>
                </th>
            </tr>
            <tr>
                <th>Order Id</th>
                <th>Order Status</th>
                <th>User Id</th>
                <th>Order Date</th>
                <th>User Phone</th>
                <th>User Address</th>
                <th>Edit</th>
                <th class="text-center">Delete</th>
            </tr>
        </thead>
        <tbody>

            <?php foreach ($orders as $order) { ?>
                <tr>
                    <td><?php echo $order['order_id']; ?></td>
                    <td><?php echo $order['order_status']; ?></td>
                    <td><?php echo $order['user_id']; ?></td>
                    <td><?php echo $order['order_date']; ?></td>
                    <td><?php echo $order['user_phone']; ?></td>
                    <td><?php echo $order['user_address']; ?></td>
                    <td><a class="btn btn-primary" href="crud/edit_order.php?order_id=<?php echo $order['order_id'] ?>">Edit</a></td>
                    <td class="text-center"><a class="btn btn-danger" href="crud/delete_order.php?order_id=<?php echo $order['order_id']; ?>">Delete</a></td>
                </tr>
            <?php } ?>
            <tr>
                <caption> <?php include "../pagination.php" ?></caption>
            </tr>
        </tbody>

    </table>
</section>

</body>

</html>