<?php session_start();
include('../../server/connection.php'); ?>
<?php
if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];
    $product_name = $_GET['product_name'];
} else {
    header('location: ../products.php');
}
?>
<?php include "header.php"; ?>
<section id="admin-dashboard">
    <?php include "sidebar.php"; ?>
    <form class="mx-auto text-center" method="post" action="update_images.php" enctype="multipart/form-data">
        <h3 class="text-center my-3">Edit Images</h3>
        <input type="hidden" name="product_id" value="<?php echo $product_id; ?>">
        <input type="hidden" name="product_name" value="<?php echo $product_name; ?>">
        <div class="form-group my-3">
            <label>Image 1</label>
            <input class="form-control" type="file" id="image1" name="image1" placeholder="image1" required="required" />
        </div>
        <div class="form-group my-3">
            <label>Image 2</label>
            <input class="form-control" type="file" id="image2" name="image2" placeholder="image2" required="required" />
        </div>
        <div class="form-group my-3">
            <label>Image 3</label>
            <input class="form-control" type="file" id="image3" name="image3" placeholder="image3" required="required" />
        </div>
        <div class="form-group my-3">
            <label>Image 4</label>
            <input class="form-control" type="file" id="image4" name="image4" placeholder="image4" required="required" />
        </div>
        <div class="form-group my-3">
            <input class="btn btn-info" type="submit" id="login-btn" value="Save" name="update_images" />
        </div>

    </form>
</section>

</body>

</html>