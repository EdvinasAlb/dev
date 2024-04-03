<?php
include '../includes/connect.php';
if (isset ($_POST['insert_brand'])) {
    $brand_title = $_POST['brand_title'];
    $select_query = "Select * from `brands` where brand_title= '$brand_title'";
    $result_select = mysqli_query($con, $select_query);
    $number = mysqli_num_rows($result_select);
    if ($number > 0) {
        echo "<script>alert('This Brand is present inside the database')</script>";
    } else {
        $insert_query = "insert into `brands` (brand_title) values ('$brand_title')";
        $result = mysqli_query($con, $insert_query);
        if ($result) {
            echo "<script>alert('Brand has been inserted succesfully')</script>";
        }
    }
}
?>
<h2 class="text-center">Insert Brands</h2>
<form action="" method="post" class="mb-2">
    <div class="input-group w-90 mb-2">
        <input type="text" class="form-control" placeholder="Insert Brands" name="brand_title">
    </div>
    <div class="input-group w-10 mb-2 m-auto">
        <input type="submit" class="bg-info border-0 p-2 my-3" name="insert_brand" value="Insert Brands" />
    </div>
</form>