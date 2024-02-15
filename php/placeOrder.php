<?php
require_once '../vendor/midtrans/midtrans-php/Midtrans.php';

try {
    // Set your Merchant Server Key
    \Midtrans\Config::$serverKey = 'SB-Mid-server-8vJoRjbe-WYAPuMRZWX6Qs2s';
    // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transactions).
    \Midtrans\Config::$isProduction = false;
    // Set sanitization on (default)
    \Midtrans\Config::$isSanitized = true;
    // Set 3DS transaction for credit card to true
    \Midtrans\Config::$is3ds = true;

    // Validate required POST data
    if (empty($_POST['total']) || empty($_POST['items']) || empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone'])) {
        throw new Exception('Missing required POST data.');
    }

    $params = array(
        'transaction_details' => array(
            'order_id' => rand(),
            'gross_amount' => $_POST['total'],
        ),
        'item_details' => json_decode($_POST['items'], true),
        'customer_details' => array(
            'first_name' => $_POST['name'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
        ),
    );

    $snapToken = \Midtrans\Snap::getSnapToken($params);
    echo $snapToken;
} catch (\Exception $e) {
    // Handle errors
    echo 'Error: ' . $e->getMessage();
}
?>
