<?php session_start() ?>
<?php include 'server/connection.php' ?>
<?php
if (!isset($_SESSION['logged_in'])) {
  header('location: login.php');
  exit;
}
if (isset($_GET['logout'])) {
  if (isset($_SESSION['logged_in'])) {
    unset($_SESSION['logged_in']);
    unset($_SESSION['user_email']);
    unset($_SESSION['user_name']);
    header('location: login.php');
    exit;
  }
}

if (isset($_POST['change_password'])) {
  $password = $_POST['password'];
  $confirm_password = $_POST['confirm_password'];
  $user_email = $_SESSION['user_email'];

  //if passwords dont match
  if ($password !== $confirm_password) {
    header('location: account.php?password_error= Passwords dont match');
  }
  //if password less then 6 char
  else if (strlen($password) < 6) {
    header('location: account.php?password_error= Passwords must be at least 6 charakters');
    //no errors
  } else {
    $stmt = $conn->prepare("UPDATE users SET user_password=? WHERE user_email=?");
    $stmt->bind_param('ss', md5($password), $user_email);
    if ($stmt->execute()) {
      header('location: account.php?password_message= Password has been updated successfully');
    } else {
      header('location: account.php?password_error= Could not update password');
    }
  }
}

//get orders

if (isset($_SESSION['logged_in'])) {
  $user_id = $_SESSION['user_id'];
  $stmt = $conn->prepare("SELECT * FROM orders WHERE user_id=?");
  $stmt->bind_param('i', $user_id);
  $stmt->execute();
  $orders = $stmt->get_result();
}
?>
<?php include 'layouts/header.php' ?>
<!-- Account -->
<section class="my-5 py-5">
  <div class="row container mx-auto">

    <?php if (isset($_GET['payment_message'])) {  ?>
      <p style="color: green;" class="mt-5 text-center"><?php echo $_GET['payment_message']; ?></p>
    <?php } ?>

    <div class="text-center mt-3 pt-5 col-lg-6 col-md-12 col-sm-12">
      <p class="text-center" style="color: green;"><?php if (isset($_GET['loged_success'])) {
                                                      echo $_GET['loged_success'];
                                                    } ?></p>
      <p class="text-center" style="color: green;"><?php if (isset($_GET['loged_error'])) {
                                                      echo $_GET['loged_error'];
                                                    } ?></p>
      <h3 class="font-weight-bold">Acount info</h3>
      <hr class="mx-auto" />
      <div class="account-info">
        <p>Name: <span>
            <?php if (isset($_SESSION['user_name'])) {
              echo $_SESSION['user_name'];
            } ?>
          </span></p>
        <p>Email: <span>
            <?php if (isset($_SESSION['user_email'])) {
              echo $_SESSION['user_email'];
            } ?> </span></p>
        <p><a href="#orders" id="orders-btn">Your orders</a></p>
        <p><a href="account.php?logout=1" id="logout-btn">Logout</a></p>
      </div>
    </div>
    <div class="col-lg-6 col-md-12 col-sm-12">
      <form id="account-form" method="post" action="account.php">
        <p class="text-center" style="color: red;"><?php if (isset($_GET['password_error'])) {
                                                      echo $_GET['password_error'];
                                                    } ?></p>
        <p class="text-center" style="color: green;"><?php if (isset($_GET['password_message'])) {
                                                        echo $_GET['password_message'];
                                                      } ?></p>
        <h3>Change Password</h3>
        <hr class="mx-auto" />
        <div class="form-group">
          <label>Password</label>
          <input class="form-control" type="password" id="account-password" name="password" placeholder="Password" required="required" />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input class="form-control" type="password" id="account-password-confirm" name="confirm_password" placeholder="Password" required="required" />
        </div>
        <div class="form-group">
          <input type="submit" value="Change Password" class="btn" id="change-pass-btn" name="change_password" />
        </div>
      </form>
    </div>
  </div>
</section>
<!-- Orders -->
<section id="orders" class="orders container my-5 py-3">
  <div class="container mt-1">
    <h2 class="font-weight-bold text-center">Your Orders</h2>
    <hr class="mx-auto" />
    <table class="mt-5 pt-5">
      <tr>
        <th>Order id</th>
        <th class="text-center">Order cost</th>
        <th class="text-center">Order status</th>
        <th class="text-center">Order date</th>
        <th>Order details</th>
      </tr>

      <?php while ($row = $orders->fetch_assoc()) { ?>
        <tr>
          <td>
            <span><?php echo $row['order_id'] ?></span>
          </td>
          <td class="text-center">
            <span>€ <?php echo $row['order_cost'] ?></span>
          </td>
          <td class="text-center">
            <span><?php echo $row['order_status'] ?></span>
          </td>
          <td class="text-center">
            <span><?php echo $row['order_date'] ?></span>
          </td>
          <td>
            <form method="post" action="order_details.php">
              <input type="hidden" value="<?php echo $row['order_status']; ?>" name="order_status">
              <input type="hidden" value="<?php echo $row['order_id'] ?>" name="order_id">
              <input type="submit" class="btn details-btn" value="details" name="order_details_btn">
            </form>
          </td>
        </tr>
      <?php } ?>

    </table>
  </div>
</section>

<?php include('layouts/footer.php') ?>