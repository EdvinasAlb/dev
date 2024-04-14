<?php session_start() ?>
<?php include 'layouts/header.php' ?>

<!-- hero -->
<section id="hero">
  <img class="image-fluid" src="/assets/img/hero.jpg" alt="">
  <div class="container">
    <div class="hero-text">
      <h5>NEW ARRIVALS</h5>
      <h1><span>Best Prices</span> This Season</h1>
      <p>Eshop offers the best products for the most affordable prices</p>
      <button><a href="shop.php">Shop Now</a></button>
    </div>
  </div>
</section>
<!-- info-line line -->
<section class="info-line top-info-line">
  <strong><i class="fa-regular fa-heart"></i> our new drop is here - <a href="shop.php">Shop Now</a></strong>
  <strong><i class="fa-solid fa-tag"></i> enjoy free shiping & free returns on all orders!</strong>
</section>
<!-- products01 -->
<section id="products01">
  <div class="row">
    <!--One-->
    <div class="one col-lg-3 col-md-3 col-sm-12 px-3">
      <img class="img-fluid" src="assets/img/new.jpg" alt="" />
      <div class="details px-5">
        <h2>new arivals</h2>
        <button class="text-uppercase"><a href="shop.php">Shop Now</a></button>
      </div>
    </div>
    <!--Two-->
    <div class="one col-lg-3 col-md-3 col-sm-12 px-3">
      <img class="img-fluid" src="assets/img/new1.jpg" alt="" />
      <div class="details px-3">
        <h2>our faves</h2>
        <button class="text-uppercase"><a href="shop.php">Shop Now</a></button>
      </div>
    </div>
    <!--Three-->
    <div class="one col-lg-3 col-md-3 col-sm-12 px-3">
      <img class="img-fluid" src="assets/img/new2.jpg" alt="" />
      <div class="details px-5">
        <h2>sale now on</h2>
        <button class="text-uppercase"><a href="shop.php">Shop Now</a></button>
      </div>
    </div>
  </div>
</section>
<!-- products02 -->
<section id="product02">
  <div class="container text-center mb-5">
    <h3>Sneakers</h3>
    <hr class="mx-auto" />
    <p>Here you can check out our products.</p>
    <a href="shop.php">Wiev all</a>
  </div>
  <div class="row mx-auto container-fluid">

    <?php include('server/get_featured_products.php'); ?>
    <?php while ($row = $featured_products->fetch_assoc()) { ?>

      <div class="product text-center col-lg-3 col-md-4 col-sm-12">
        <img class="img-fluid mb-3" src="assets/img/<?php echo $row['product_image']; ?>" />
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h5 class="p-name"><?php echo $row['product_name']; ?></h5>
        <h4 class="p-price">$<?php echo $row['product_price']; ?></h4>
        <a href="single_product.php?product_id=<?php echo $row['product_id'] ?>"><button class="buy-btn">Buy Now</button></a>
      </div>

    <?php } ?>

  </div>
</section>

<!-- Banner -->
<section id="banner">
  <img class="image-fluid" src="/assets/img/banner.jpg" alt="">
  <div class="conatiner">
    <h3>sale ending soon</h3>
    <p>Save up to 60% off clearance and end os season items. <br> All sales finali, must end soon</p>
    <a href="shop.php"><button class="buy-btn">Buy Now</button></a>
  </div>
</section>

<!-- products03 -->
<section id="product03">
  <div class="container text-center">
    <h3>Tops</h3>
    <hr class="mx-auto" />
    <p>Check out our top products.</p>
  </div>
  <div class="row mx-auto container-fluid">

    <?php include('server/get_featured_products.php'); ?>
    <?php while ($row = $featured_products->fetch_assoc()) { ?>

      <div class="product text-center col-lg-3 col-md-4 col-sm-12">
        <img class="img-fluid mb-3" src="assets/img/<?php echo $row['product_image']; ?>" />
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h5 class="p-name"><?php echo $row['product_name']; ?></h5>
        <h4 class="p-price">$<?php echo $row['product_price']; ?></h4>
        <a href="single_product.php?product_id=<?php echo $row['product_id'] ?>"><button class="buy-btn">Buy Now</button></a>
      </div>

    <?php } ?>

  </div>
</section>

<!-- info-line line -->
<section class="info-line bottom-info-line">
  <p>THANKS FOR STOPPING BY - TAKE 20% OFF WITH CODE <strong>SAVE20</strong></p>
</section>
<?php include 'layouts/footer.php' ?>