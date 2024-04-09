<?php
include('server/connection.php');

$stmt = $conn->prepare("SELECT * FROM products");
$stmt->execute();
$products = $stmt->get_result();
?>

<?php include('layouts/header.php') ?>


<!-- Shop -->
<section id="shop" class="my-5 py-5">
  <div class="container mt-5 py-5">
    <h3>Our Products</h3>
    <hr />
    <p>Here you can check out our featured products</p>
  </div>
  <div class="row mx-auto container">
    <?php while ($row = $products->fetch_assoc()) { ?>
      <div onclick="window.location.href='single_product.html';" class="product text-center col-lg-3 col-md-4 col-sm-12">
        <img class="img-fluid mb-3" src="assets/img/<?php echo $row['product_image']; ?>" />
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h5 class="p-name"><?php echo $row['product_name']; ?></h5>
        <h4 class="p-price">$ <?php echo $row['product_price']; ?></h4>
        <a class="btn buy-btn" href="<?php echo "single_product.php?product_id=" . $row['product_id'] ?>">Buy Now</a>
      </div>
    <?php } ?>
    <nav aria-label="Page navigation example">
      <ul class="pagination mt-5">
        <li class="page-item">
          <a class="page-link" href="#">Prev</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</section>

<?php include('layouts/footer.php') ?>