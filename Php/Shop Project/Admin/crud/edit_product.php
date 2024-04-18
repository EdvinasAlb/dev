<?php session_start();
include('../../server/connection.php'); ?>
<?php
if (!isset($_SESSION['admin_logged_in'])) {
    header('location: ../login.php');
    exit;
}
?>

<?php
if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];
    $stmt = $conn->prepare("SELECT * FROM products WHERE product_id=?");
    $stmt->bind_param('i', $product_id);
    $stmt->execute();
    $products = $stmt->get_result();
} else if (isset($_POST['edit_btn'])) {
    $product_id = $_POST['product_id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $offer = $_POST['offer'];
    $color = $_POST['color'];
    $category = $_POST['category'];

    $stmt = $conn->prepare("UPDATE products SET product_name=?, product_description=?, product_price=?, product_special_offer=?, product_color=?, product_category=?  WHERE product_id=?");
    $stmt->bind_param('ssssssi', $title, $description, $price, $offer, $color, $category, $product_id);
    if ($stmt->execute()) {
        header('location: ../products.php?product_edited= Product has been updated successfully');
    } else {
        header('location: ../products.php?product_edit_failure= Error accured, try again');
    }
} else {
    header('../products.php');
    exit;
}
?>
<?php include "header.php"; ?>
<section id="admin-dashboard">
    <?php include "sidebar.php"; ?>
    <form class="text-center mx-auto my-3" method="post" action="edit_product.php">
        <h3>Edit Product</h3>
        <?php foreach ($products as $product) { ?>
            <input type="hidden" name="product_id" value="<?php echo $product['product_id']; ?>">
            <div class="form-group my-3">
                <label>Name</label>
                <input class="form-control" type="text" id="title" value="<?php echo $product['product_name']; ?>" name="title" required="required" autocomplete="off" />
            </div>
            <div class="form-group my-3">
                <label>Discription</label>
                <input class="form-control" type="text" id="description" value="<?php echo $product['product_description']; ?>" name="description" required="required" />
            </div>
            <div class="form-group my-3">
                <label>Price</label>
                <input class="form-control" type="text" id="price" value="<?php echo  $product['product_price']; ?>" name="price" required="required" />
            </div>
            <div class="form-group my-3">
                <label>Category</label>
                <select class="form-select" required="required" name="category">
                    <option value="casual">casual</option>
                </select>
            </div>
            <div class="form-group my-3">
                <label>Color</label>
                <input class="form-control" type="text" id="color" value="<?php echo $product['product_color']; ?>" name="color" required="required" />
            </div>
            <div class="form-group my-3">
                <label>Special Offer / Sale</label>
                <input class="form-control" type="text" id="offer" name="offer" value="<?php echo $product['product_special_offer'] . "%"; ?>" required="required" />
            </div>
        <?php } ?>
        <div class="form-group my-3">
            <input class="btn btn-info" type="submit" id="login-btn" value="Save" name="edit_btn" />
        </div>

    </form>
</section>

</body>

</html>