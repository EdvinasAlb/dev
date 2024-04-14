<?php
if (!isset($_SESSION))
    session_start();
?>
<?php
include 'server/connection.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="assets/css/style.css" />
    <link rel="stylesheet" href="assets/css/hero.css" />
    <link rel="stylesheet" href="assets/css/info-line.css" />
    <link rel="stylesheet" href="assets/css/products.css" />
    <link rel="stylesheet" href="assets/css/shop.css" />
    <link rel="stylesheet" href="assets/css/single-product.css" />
    <link rel="stylesheet" href="assets/css/cart.css" />
    <link rel="stylesheet" href="assets/css/login.css" />
    <link rel="stylesheet" href="assets/css/order.css" />
    <link rel="stylesheet" href="assets/css/banner.css" />
    <title>Home</title>
</head>

<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
        <div class="container">
            <h2 class="brand">Fly Feet</h2>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse nav-buttons" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="shop.php">Shop</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Blog</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.php">Contacts</a>
                    </li>
                    <li class="nav-item nav-icons">
                        <?php
                        if (isset($_SESSION['cart'])) {
                            $count = count($_SESSION['cart']); ?>
                            <a href="cart.php"><i class="fas fa-shopping-bag"><sup><?php if ($count > 0) echo $count ?></sup></i></a>
                        <?php } else { ?>
                            <a href="cart.php"><i class="fas fa-shopping-bag"><sup></sup></i></a>
                        <?php } ?>

                        <a href="account.php"><i class="fas fa-user"></i></a>

                    </li>
                </ul>
            </div>
        </div>
    </nav>