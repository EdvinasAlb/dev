<? session_start(); ?>
<?php include 'server/connection.php' ?>
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

$total_records_per_page = 8;
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
<?php include 'layouts/header.php' ?>
<!-- Shop -->
<section id="shop" class="my-5 py-5">
  <div class="container mt-5 py-5">
    <h3>Our Products</h3>
    <hr />
    <p>Here you can check out our featured products</p>
  </div>
  <div class="row mx-auto container">
    <?php while ($row = $products->fetch_assoc()) { ?>
      <div class="product text-center col-lg-3 col-md-4 col-sm-12">
        <a href="<?php echo "single_product.php?product_id=" . $row['product_id'] ?>">
          <img class="img-fluid mb-3" src="assets/img/<?php echo $row['product_image']; ?>" />
        </a>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h5 class="p-name"><?php echo $row['product_name']; ?></h5>
        <h4 class="p-price">€ <?php echo $row['product_price']; ?></h4>
        <a class="btn buy-btn" href="<?php echo "single_product.php?product_id=" . $row['product_id'] ?>">Buy Now</a>
      </div>
    <?php } ?>
    <?php include('./pagination.php') ?>
  </div>
</section>

<?php include 'layouts/footer.php' ?>