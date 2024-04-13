<?php include "header.php" ?>

<?php
include('../server/connection.php');
if (isset($_SESSION['admin_logged_in'])) {
    header('location: index.php');
    exit;
}
if (isset($_POST['login_btn'])) {
    $email = $_POST['email'];
    $password = md5($_POST['password']);
    $stmt = $conn->prepare("SELECT admin_id, admin_name, admin_email, admin_password FROM admins WHERE admin_email=? AND admin_password=? LIMIT 1");
    $stmt->bind_param('ss', $email, $password);
    if ($stmt->execute()) {
        $stmt->bind_result($admin_id, $admin_name, $admin_email, $admin_password);
        $stmt->store_result();
        if ($stmt->num_rows() == 1) {
            $stmt->fetch();
            $_SESSION['admin_id'] = $admin_id;
            $_SESSION['admin_name'] = $admin_name;
            $_SESSION['admin_email'] = $admin_email;
            $_SESSION['admin_logged_in'] = true;
            header('location: index.php?login_success=logged in successfully');
        } else {
            header('location:login.php?error=could not werify you account');
        }
    } else {
        header('location:login.php?error=something went wrong');
    }
}
?>

<!-- Login -->
<section id="login-form" class="text-center w-25 mx-auto pt-5 mt-5">
    <form class="mt-5 pt-5" action="login.php" method="post">
        <h2 class="font-weight-bold">Admin Login</h2>
        <p style="color: red;" class="text-center"><?php if (isset($_GET['error'])) {
                                                        echo $_GET['error'];
                                                    } ?></p>
        <div class="form-group my-3">
            <label>Email</label>
            <input class="form-control" type="text" id="login-email" name="email" placeholder="Email" required="required" autocomplete="off" />
        </div>
        <div class="form-group my-">
            <label>Password</label>
            <input class="form-control" type="password" id="login-password" name="password" placeholder="Password" required="required" />
        </div>
        <div class="form-group my-3">
            <input class="btn btn-info" type="submit" id="login-btn" value="Login" name="login_btn" />
        </div>
    </form>
</section>

</body>

</html>