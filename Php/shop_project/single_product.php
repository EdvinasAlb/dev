<?php include 'layouts/header.php' ?>


<?php
if (isset($_GET['product_id'])) {
  $product_id = $_GET['product_id'];
  $stmt = $conn->prepare("SELECT * FROM products WHERE product_id = ? ");
  $stmt->bind_param('i', $product_id);

  $stmt->execute();
  $product = $stmt->get_result();
} else {
  header('location: index.php');
}

?>


<!-- Single product -->
<section class="container single-product my-5 pt-5">
  <div class="row mt-5">

    <?php while ($row = $product->fetch_assoc()) { ?>

      <div class="col-lg-5 col-md-6 col-sm-12">
        <img id="mainImg" class="img-fluid w-100 pb-1" src="assets/img/<?php echo $row['product_image']; ?>" alt="" />
        <div class="small-img-group">
          <div class="small-img-col">
            <img class="small-img" src="assets/img/<?php echo $row['product_image']; ?>" width="100%" alt="" />
          </div>
          <div class="small-img-col">
            <img class="small-img" src="assets/img/<?php echo $row['product_image2']; ?>" width="100%" alt="" />
          </div>
          <div class="small-img-col">
            <img class="small-img" src="assets/img/<?php echo $row['product_image3']; ?>" width="100%" alt="" />
          </div>
          <div class="small-img-col">
            <img class="small-img" src="assets/img/<?php echo $row['product_image4']; ?>" width="100%" alt="" />
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <h6>Men/Shoes</h6>
        <h3 class="py-4"><?php echo $row['product_name']; ?></h3>
        <h2><?php echo $row['product_price']; ?>$</h2>

        <!-- Cart form -->
        <Form method="post" action="cart.php">
          <input type="hidden" name="product_id" value="<?php echo $row['product_id']; ?>" />
          <input type="hidden" name="product_image" value="<?php echo $row['product_image']; ?>" />
          <input type="hidden" name="product_name" value="<?php echo $row['product_name']; ?>" />
          <input type="hidden" name="product_price" value="<?php echo $row['product_price']; ?>" />
          <input type="number" name="product_quantity" value="1" />
          <button class="buy-btn" type="submit" name="add_to_cart">Add To Cart</button>
        </form>

        <h4 class="mt-5 mb-5">Product details</h4>
        <span><?php echo $row['product_description']; ?>.</span>
      </div>
    <?php } ?>

  </div>
</section>
<!-- Related products -->
<section id="related-products" class="my-5 pb-5">
  <div class="container text-center mt-5 py-5">
    <h3>Related Products</h3>
    <hr class="mx-auto" />
  </div>
  <div class="row mx-auto container-fluid">
    <div class="product text-center col-lg-3 col-md-4 col-sm-12">
      <img class="img-fluid mb-3" src="assets/img/Nike Killshot OG1.jpg" />
    </div>
    <div class="product text-center col-lg-3 col-md-4 col-sm-12">
      <img class="img-fluid mb-3" src="assets/img/Nike Blazer Mid '77 Multi-Swoosh1.jpg" />
    </div>
    <div class="product text-center col-lg-3 col-md-4 col-sm-12">
      <img class="img-fluid mb-3" src="assets/img/Nike Air Max 903.jpg" />
    </div>
    <div class="product text-center col-lg-3 col-md-4 col-sm-12">
      <img class="img-fluid mb-3" src="assets/img/Nike Blazer Mid Pro Club2.jpg" />
    </div>
  </div>
</section>

<!-- JavaScript -->
<script>
  const mainImg = document.getElementById("mainImg");
  const smallImg = document.getElementsByClassName("small-img");
  for (let i = 0; i < 4; i++) {
    smallImg[i].onclick = function() {
      mainImg.src = smallImg[i].src;
    };
  }
</script>
<?php include 'layouts/footer.php' ?>