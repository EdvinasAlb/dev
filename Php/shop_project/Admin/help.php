<?php include "header.php"; ?>
<?php
if (!isset($_SESSION['admin_logged_in'])) {
    header('location: login.php');
    exit;
}
?>

<section id="help">
    <?php include "sidebar.php"; ?>
    <div class="container help-info">
        <h3 class="my-3 text-center">Help</h3>
        <p>Please contact: <strong>admin@gmail.com</strong></p>
        <p>Please call: <strong>123456789</strong></p>
    </div>
</section>