<?php
include '../includes/connect.php';
if (isset($_POST['insert_product'])) {
    $product_title = $_POST['product_title'];
    $product_discription = $_POST['product_discription'];
    $product_keywords = $_POST['product_keywords'];
    $product_categories = $_POST['product_categories'];
    $product_brands = $_POST['product_brands'];
    $product_price = $_POST['product_price'];
    $product_status = 'true';
    //Images
    $product_image1 = $_FILES['product_image1']['name'];
    $product_image2 = $_FILES['product_image2']['name'];
    $product_image3 = $_FILES['product_image3']['name'];
    //Image temp.name
    $temp_image1 = $_FILES['product_image1']['tmp_name'];
    $temp_image2 = $_FILES['product_image2']['tmp_name'];
    $temp_image3 = $_FILES['product_image3']['tmp_name'];
    //Empty cond.
    if (
        $product_title == ''
        or $product_discription == ''
        or $product_keywords == ''
        or $product_categories == ''
        or $product_brands == ''
        or $product_price == ''
        or $product_image1 == ''
        or $product_image2 == ''
        or $product_image3 == ''
    ) {
        echo "<script>alert('Please fill all the available fields')</script>";
        exit();
    } else {
        move_uploaded_file($temp_image1, "./product_images/$product_image1");
        move_uploaded_file($temp_image2, "./product_images/$product_image2");
        move_uploaded_file($temp_image3, "./product_images/$product_image3");
        //Insert
        $insert_products = "insert into `products`
        (product_title, product_discription, product_keywords, category_id, brand_id, product_image1, product_image2, product_image3, product_price, date,status)
        values('$product_title','$product_discription','$product_keywords','$product_categories','$product_brands', '$product_image1','$product_image2','$product_image3', '$product_price', NOW(), '$product_status')";
        $result_query = mysqli_query($con, $insert_products);
        if ($result_query) {
            echo "<script>alert('Seccessfully inserted products')</script>";
        }
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert Products_Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" defer></script>
    <link rel="stylesheet" href="style.css">
</head>

<body class="bg-light">
    <div class="container mt-3">
        <h1 class="text-center">Insert Products</h1>
        <form action="" method="post" enctype="multipart/form-data">
            <div class="form-outline mb-4 w-50 m-auto">
                <label for="product_title" class="form-label">Product title</label>
                <input type="text" name="product_title" id="product_title" class="form-control" placeholder="Enter product title" autocomplete="off">
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <label for="product_discription" class="form-label">Product Discription</label>
                <input type="text" name="product_discription" id="product_discription" class="form-control" placeholder="Enter product discription" autocomplete="off">
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <label for="product_keywords" class="form-label">Product Keywords</label>
                <input type="text" name="product_keywords" id="product_keywords" class="form-control" placeholder="Enter product keywords" autocomplete="off">
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <select name="product_categories" class="form-select">
                    <option value="">Select a Category</option>
                    <?php
                    $select_query = "Select * from `categories`";
                    $result_query = mysqli_query($con, $select_query);
                    while ($row = mysqli_fetch_assoc($result_query)) {
                        $category_title = $row['category_title'];
                        $category_id = $row['category_id'];
                        echo "<option value='$category_id'>$category_title</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <select name="product_brands" class="form-select">
                    <option value="">Select a Brand</option>
                    <?php
                    $select_query = "Select * from `brands`";
                    $result_query = mysqli_query($con, $select_query);
                    while ($row = mysqli_fetch_assoc($result_query)) {
                        $brand_title = $row['brand_title'];
                        $brand_id = $row['brand_id'];
                        echo "<option value='$brand_id'>$brand_title</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <label for="product_image1" class="form-label">Product image 1</label>
                <input type="file" name="product_image1" id="product_image1" class="form-control">
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <label for="product_image2" class="form-labe2">Product image 2</label>
                <input type="file" name="product_image2" id="product_image2" class="form-control">
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <label for="product_image3" class="form-label">Product image 3</label>
                <input type="file" name="product_image3" id="product_image3" class="form-control">
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <label for="product_price" class="form-label">Product Price</label>
                <input type="text" name="product_price" id="product_price" class="form-control" placeholder="Enter product price" autocomplete="off">
            </div>
            <div class="form-outline mb-4 w-50 m-auto">
                <input type="submit" name="insert_product" class="btn btn-info mb-3 px-3" value="Insert product" />
            </div>
        </form>
    </div>
</body>

</html>