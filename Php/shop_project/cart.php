<?php include 'layouts/header.php' ?>

<?php
if (isset($_POST['add_to_cart'])) {
  //if user has already added a product to cart
  if (isset($_SESSION['cart'])) {
    $products_array_ids = array_column($_SESSION['cart'], "product_id");
    //if product has already been added to cart or not
    if (!in_array($_POST['product_id'], $products_array_ids)) {
      $product_id = $_POST['product_id'];
      $product_array = array(
        'product_id' => $_POST['product_id'],
        'product_name' => $_POST['product_name'],
        'product_price' => $_POST['product_price'],
        'product_image' => $_POST['product_image'],
        'product_quantity' => $_POST['product_quantity']
      );
      $_SESSION['cart'][$product_id] = $product_array;
      //product has already been added
    } else {
      echo '<script>alert("Product was already added to cart")</script>';
    }
    //if this is the first product
  } else {
    $product_id = $_POST['product_id'];
    $product_name = $_POST['product_name'];
    $product_price = $_POST['product_price'];
    $product_image = $_POST['product_image'];
    $product_quantity = $_POST['product_quantity'];
    $product_array = array(
      'product_id' => $product_id,
      'product_name' => $product_name,
      'product_price' => $product_price,
      'product_image' => $product_image,
      'product_quantity' => $product_quantity
    );
    $_SESSION['cart'][$product_id] = $product_array;
  }
  //calc. total
  calculateTotalCart();
  //remove product from cart
} else if (isset($_POST['remove_product'])) {
  $product_id = $_POST['product_id'];
  unset($_SESSION['cart'][$product_id]);
  //calc. total
  calculateTotalCart();
  //add product quantity
} else if (isset($_POST['edit_quantity'])) {
  //get id and quantityt from form
  $product_id = $_POST['product_id'];
  $product_quantity = $_POST['product_quantity'];
  //get the product array from the session
  $product_array = $_SESSION['cart'][$product_id];
  //update product quantity
  $product_array['product_quantity'] = $product_quantity;
  //return updated array 
  $_SESSION['cart'][$product_id] = $product_array;
  //calc. total
  calculateTotalCart();
} else {
  // header('locations: index.php');
}
//calc. total price
function calculateTotalCart()
{
  $total_price = 0;
  foreach ($_SESSION['cart'] as $key => $value) {
    $product = $_SESSION['cart'][$key];

    $price = $product['product_price'];
    $quantity = $product['product_quantity'];

    $total_price = $total_price + ($price * $quantity);
  }
  $_SESSION['total'] = $total_price;
}
?>


<!-- Cart -->
<section class="cart container my-5 py-5">
  <div class="container mt-5">
    <!-- empty session -->
    <?php if (isset($_SESSION['cart'])) { ?>
      <!-- 0 products in cart -->
      <?php if (count($_SESSION['cart']) > 0) { ?>

        <h2 class="font-weight-bold">Your Cart</h2>
        <hr />
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          <?php foreach ($_SESSION['cart'] as $key => $value) { ?>
            <tr>
              <td>
                <div class="product-info p-3">
                  <img src="assets/img/<?php echo $value['product_image']; ?>" alt="" />
                  <div>
                    <p class="ms-3"><?php echo $value['product_name']; ?></p>
                    <small class="ms-3"><span>$</span><?php echo $value['product_price']; ?></small>
                    <br />
                    <form method="post" action="cart.php">
                      <input type="hidden" name="product_id" value="<?php echo $value['product_id']; ?>" />
                      <input type="submit" name="remove_product" value="remove" class="remove-btn" />
                    </form>
                  </div>
                </div>
              </td>
              <td>
                <form method="post" action="cart.php">
                  <input type="hidden" name="product_id" value="<?php echo $value['product_id']; ?>" />
                  <input type="number" name="product_quantity" value="<?php echo $value['product_quantity']; ?>" />
                  <input type="submit" class="edit-btn" name="edit_quantity" value="edit" />
                </form>
              </td>
              <td>
                <span>$</span>
                <span class="price"><?php echo $value['product_quantity'] * $value['product_price'] ?></span>
              </td>
            </tr>

          <?php } ?>

        </table>
        <div class="cart-total">
          <table>
            <tr>
              <td>Total</td>
              <td>$ <?php echo $_SESSION['total']; ?></td>
            </tr>
          </table>
        </div>
        <div class="checkout-container">
          <form method="post" action="checkout.php">
            <input type="submit" class="btn checkout-btn" value="Checkout" name="checkout" />
          </form>
        </div>

        <!-- 0 products in cart -->
      <?php } else { ?>

        <h2 class="font-weight-bold">Your Cart</h2>
        <hr />
        <table class="mt-5 pt-5">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <h5 class="my-5 text-center">Cart is empty.</h5>
            </td>
            <td></td>
          </tr>
        </table>
        <div class="cart-total">
          <table>
            <tr>
              <td>Total</td>
              <td>$ 0</td>
            </tr>
          </table>
        </div>
        <div class="checkout-container">
          <form method="post" action="checkout.php">
            <input type="submit" class="btn checkout-btn" value="Checkout" name="checkout" />
          </form>
        </div>

      <?php } ?>

      <!-- empty session -->
    <?php } else { ?>

      <h2 class="font-weight-bold">Your Cart</h2>
      <hr />
      <table class="mt-5 pt-5">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        <tr>
          <td></td>
          <td>
            <h5 class="my-5 text-center">Cart is empty.</h5>
          </td>
          <td></td>
        </tr>
      </table>
      <div class="cart-total">
        <table>
          <tr>
            <td>Total</td>
            <td>$ 0</td>
          </tr>
        </table>
      </div>
      <div class="checkout-container">
        <form method="post" action="checkout.php">
          <input type="submit" class="btn checkout-btn" value="Checkout" name="checkout" />
        </form>
      </div>

    <?php } ?>

  </div>
</section>


<?php include 'layouts/footer.php' ?>