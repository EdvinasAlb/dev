<?php include "header.php"; ?>
<?php
if (!isset($_SESSION['admin_logged_in'])) {
    header('location: login.php');
    exit;
}
?>


<section id="admin-dashboard">
    <?php include "sidebar.php"; ?>
    <form id="add-products-form" class="mx-auto text-center" method="post" action="crud/create_product.php" enctype="multipart/form-data">
        <input type="hidden" name="product_id" value="<?php echo $product['product_id']; ?>">
        <h3 class="text-center mt-5">Add Product</h3>
        <div class="d-flex">
            <div class="container mt-5">
                <div class="form-group">
                    <label>Name</label>
                    <input class="form-control my-3" type="text" id="name" name="name" required="required" placeholder="Name" autocomplete="off" />
                </div>
                <div class="form-group">
                    <label>Discription</label>
                    <input class="form-control my-3" type="text" id="description" name="description" placeholder="Description" required="required" />
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input class="form-control my-3 " type="text" id="price" name="price" placeholder="Price" required="required" />
                </div>
                <div class="form-group mx-auto my-3">
                    <label>Category</label>
                    <select class="form-select" required="required" name="category">
                        <option value="casual">casual</option>
                    </select>
                </div>
                <div class="form-group my-3">
                    <label>Color</label>
                    <input class="form-control" type="text" id="color" name="color" placeholder="Color" required="required" />
                </div>
                <div class="form-group my-3">
                    <label>Special Offer / Sale</label>
                    <input class="form-control" type="text" id="offer" name="offer" placeholder="Special Offer" required="required" />
                </div>
            </div>
            <div class="container my-5 py-5">
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

            </div>
        </div>
        <div class="form-group my-3">
            <input class="btn btn-info" type="submit" id="create-product-btn" value="Create" name="create_product" />
        </div>
    </form>
</section>

</body>

</html>