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
$stmt1 = $conn->prepare("SELECT COUNT(*) AS total_records FROM products");
$stmt1->execute();
$stmt1->bind_result($total_records);
$stmt1->store_result();
$stmt1->fetch();

//3.products per page

$total_records_per_page = 5;
$offset = ($page_no - 1) * $total_records_per_page;
$previuos_page = $page_no - 1;
$next_page = $page_no + 1;

$adjacents = "2";

$total_no_of_pages = ceil($total_records / $total_records_per_page);

//4. get all products

$stmt2 = $conn->prepare("SELECT * FROM products LIMIT $offset, $total_records_per_page");
$stmt2->execute();
$products = $stmt2->get_result();
?>


<section id="admin-dashboard">
    <?php include "sidebar.php"; ?>
    <table class="table table-hover mx-5">
        <thead>
            <tr>
                <th colspan="8">
                    <h3 class="my-3">Products</h3>

                    <?php if (isset($_GET['product_edited'])) { ?>
                        <p class="text-center" style="color: green;"><?php echo $_GET['product_edited'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['product_edit_failure'])) { ?>
                        <p class="text-center" style="color: red;"><?php echo $_GET['product_edit_failure'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['product_deleted'])) { ?>
                        <p class="text-center" style="color: green;"><?php echo $_GET['product_deleted'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['product_delet_failure'])) { ?>
                        <p class="text-center" style="color: red;"><?php echo $_GET['product_delet_failure'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['product_created'])) { ?>
                        <p class="text-center" style="color: green;"><?php echo $_GET['product_created'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['product_created_failure'])) { ?>
                        <p class="text-center" style="color: red;"><?php echo $_GET['product_created_failure'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['image_updated'])) { ?>
                        <p class="text-center" style="color: green;"><?php echo $_GET['image_updated'] ?></p>
                    <?php } ?>
                    <?php if (isset($_GET['image_updaite_failure'])) { ?>
                        <p class="text-center" style="color: red;"><?php echo $_GET['image_updaite_failure'] ?></p>
                    <?php } ?>

                </th>
            </tr>
            <tr>
                <th>Product Id</th>
                <th>product Image</th>
                <th>Products Name</th>
                <th>Product Price</th>
                <th>Product Offer</th>
                <th>Product Category</th>
                <th>Product Color</th>
                <th>Edit Image</th>
                <th>Edit</th>
                <th class="text-center">Delete</th>
            </tr>
        </thead>
        <tbody>

            <?php foreach ($products as $product) { ?>
                <tr>
                    <td><?php echo $product['product_id']; ?></td>
                    <td><img style="width: 70px; height:70px;" src="../assets/img/<?php echo $product['product_image']; ?>"></td>
                    <td><?php echo $product['product_name']; ?></td>
                    <td><?php echo $product['product_price']; ?></td>
                    <td><?php echo $product['product_special_offer']; ?></td>
                    <td><?php echo $product['product_category']; ?></td>
                    <td><?php echo $product['product_color']; ?></td>
                    <td><a class="btn btn-info" href="<?php echo "crud/edit_images.php?product_id=" . $product['product_id'] . "&product_name=" . $product['product_name']; ?>">Edit Image</a></td>
                    <td><a class="btn btn-primary" href="crud/edit_product.php?product_id=<?php echo $product['product_id']; ?>">Edit</a></td>
                    <td class="text-center"><a class="btn btn-danger" href="crud/delete_product.php?product_id=<?php echo $product['product_id']; ?>">Delete</a></td>
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