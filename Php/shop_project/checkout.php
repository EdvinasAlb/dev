<?php
session_start();
if (!empty($_SESSION['cart'])) {
  //let user in
} else {
  //send user to home page
  header('location:index.php');
}
?>

<?php include('layouts/header.php') ?>

<!-- Checkout -->
<section class="my-5 py-5">
  <div class="container text-center mt-3 pt-5">
    <h2 class="font-weight-bold">Check out</h2>
    <hr class="mx-auto" />
  </div>
  <div class="mx-auto container">
    <form id="checkout-form" action="server/place_order.php" method="post">
      <p class="text-center" style="color: red">
        <?php if (isset($_GET['message'])) {
          echo $_GET['message'];
        } ?>
        <?php if (isset($_GET['message'])) { ?>
          <a class="btn btn-primary" href="login.php">Login</a>
        <?php } ?>
      </p>
      <div class="form-group checkout-small-element">
        <label>Name</label>
        <input class="form-control" type="text" id="checkout-name" name="name" placeholder="Name" required="required" autocomplete="off" />
      </div>
      <div class="form-group checkout-small-element">
        <label>Email</label>
        <input class="form-control" type="text" id="checkout-email" name="email" placeholder="Email" required="required" autocomplete="off" />
      </div>
      <div class="form-group checkout-small-element">
        <label>Phone</label>
        <input class="form-control" type="tel" id="checkout-phone" name="phone" placeholder="Phone" required="required" />
      </div>
      <div class="form-group checkout-small-element">
        <label>City</label>
        <input class="form-control" type="text" id="checkout-city" name="city" placeholder="City" required="required" />
      </div>
      <div class="form-group checkout-large-element">
        <label>Address</label>
        <input class="form-control" type="text" id="checkout-address" name="address" placeholder="Address" required="required" />
      </div>
      <div class="form-group checkout-btn-container">
        <p>Total amount: $ <?php echo $_SESSION['total']; ?></p>
        <input class="btn" type="submit" id="checkout-btn" value="Place Order" name="place_order" />
      </div>
    </form>
  </div>
</section>

<?php include('layouts/footer.php') ?>