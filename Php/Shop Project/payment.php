<?php session_start() ?>
<?php include 'server/connection.php' ?>
<?php
if (isset($_POST['order_pay_btn'])) {
    $order_status = $_POST['order_status'];
    $order_total_price = $_POST['order_total_price'];
}
?>


<!-- Payment -->
<section class="my-5 py-5">
    <div class="container text-center my-5 py-5">
        <h2 class="font-weight-bold">Payment</h2>
        <hr class="mx-auto" />
    </div>
    <div class="mx-auto container text-center">
        <?php if (isset($_POST['order_status']) && $_POST['order_status'] == "not paid") { ?>
            <?php $_amount = strval($_POST['order_total_price']); ?>
            <?php $order_id = $_POST['order_id']; ?>
            <p>Total payment: € <?php echo $_POST['order_total_price']; ?></p>
            <div id="paypal-button-container"></div>


        <?php } else if (isset($_SESSION['total']) && $_SESSION['total']) { ?>
            <?php $_amount = strval($_SESSION['total']); ?>
            <?php $order_id = $_SESSION['order_id']; ?>
            <p>Total payment: € <?php echo $_SESSION['total']; ?></p>
            <div id="paypal-button-container"></div>

        <?php } else { ?>
            <p class="text-center">You don't have an order</p>
        <?php } ?>
    </div>
</section>
<?php include 'layouts/header.php' ?>
<!-- Payment - Paypal -->
<script src="https://www.paypal.com/sdk/js?client-id=AVXnGi2W7W0qVnjQAMVICYcRm0r3U1SFrvKM7_U-vMrWT8-0pdiOBmg-lzDFwQTocgMOZJ5aPhIexk_h"></script>
<script>
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '<?php echo $_amount; ?>'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
                // console.log('Capture results', orderData, JSON.stringify(orderData, null, 2));
                var transaction = orderData.purchase_units[0].payments.captures[0];
                alert('Transaction ' + transaction.status + ': ' + transaction.id);
                window.location.href = "server/complete_payment.php?transaction_id=" + transaction.id + "&order_id=" + <?php echo $order_id; ?>;
            });

        }
    }).render('#paypal-button-container')
</script>

<?php include 'layouts/footer.php' ?>
</div>