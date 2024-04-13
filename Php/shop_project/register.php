<?php include 'layouts/header.php' ?>

<?php
// if user has already register
if (isset($_SESSION['logged_in'])) {
  header('location: account.php');
  exit;
}
if (isset($_POST['register'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  $confirm_password = $_POST['confirm_password'];
  //if passwords dont match
  if ($password !== $confirm_password) {
    header('location: register.php?register_error= Passwords dont match');
  }
  //if password less then 6 char
  else if (strlen($password) < 6) {
    header('location: register.php?register_error= Passwords must be at least 6 charakters');
    // if there is no error
  } else {
    //check whether there is a user with this email or not
    $stmt1 = $conn->prepare("SELECT count(*) FROM users where user_email=?");
    $stmt1->bind_param('s', $email);
    $stmt1->execute();
    $stmt1->bind_result($num_rows);
    $stmt1->store_result();
    $stmt1->fetch();
    //if there is a user already registered with this email
    if ($num_rows != 0) {
      header('location: register.php?register_error= User with this email already exists');
    } else {  //create a new user
      $stmt = $conn->prepare("INSERT INTO users (user_name, user_email, user_password)
                  VALUES (?,?,?)");
      $stmt->bind_param('sss', $name, $email, md5($password));
      //if account was created successfully
      if ($stmt->execute()) {
        $user_id = $stmt->insert_id;
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_name'] = $name;
        $_SESSION['logged_in'] = true;
        header('location: account.php?register_success= You registered seccessfully');
        //account could net be created
      } else {
        header('location: register.php?register_error= Could not create an account at the moment');
      }
    }
  }
}
?>

<!-- Register -->
<section class="my-5 py-5">
  <div class="container text-center mt-3 pt-5">
    <h2 class="font-weight-bold">Register</h2>
    <hr class="mx-auto" />
  </div>
  <div class="mx-auto container">
    <form id="register-form" method="post" action="register.php">
      <p style="color:red;"><?php if (isset($_GET['register_error'])) {
                              echo $_GET['register_error'];
                            } ?></p>
      <p style="color:green;"><?php if (isset($_GET['register_success'])) {
                                echo $_GET['register_success'];
                              } ?></p>
      <div class="form-group">
        <label>Name</label>
        <input class="form-control" type="text" id="register-name" name="name" placeholder="Name" required="required" autocomplete="off" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="text" id="register-email" name="email" placeholder="Email" required="required" autocomplete="off" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" type="password" id="register-password" name="password" placeholder="Password" required="required" />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input class="form-control" type="password" id="register-confirm-password" name="confirm_password" placeholder="Confirm Password" required="required" />
      </div>
      <div class="form-group">
        <input class="btn" type="submit" name="register" id="register-btn" value="Register" />
      </div>
      <div class="form-group">
        <a class="btn" id="login-url" href="login.php">Do you have an account? Login</a>
      </div>
    </form>
  </div>
</section>

<?php include 'layouts/footer.php' ?>