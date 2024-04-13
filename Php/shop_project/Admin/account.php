<?php include "header.php"; ?>
<?php
if (!isset($_SESSION['admin_logged_in'])) {
    header('location: login.php');
    exit;
}
?>

<section id="accounts">
    <?php include "sidebar.php"; ?>
    <div class="container account-info">
        <h3 class="my-3 text-center">Account</h3>
        <p>Id: <strong><?php echo $_SESSION['admin_id'] ?></strong></p>
        <p>Name: <strong><?php echo $_SESSION['admin_name'] ?></strong></p>
        <p>Email: <strong><?php echo $_SESSION['admin_email'] ?></strong></p>
    </div>
</section>