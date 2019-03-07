<?php
    $sql_hostname = "www-std.se.cuhk.edu.hk";
    $sql_username = "fyp_r18";
    $sql_password = "BnR19q182";
    $sql_database = "fyp_r18";

    $sql_conn = new mysqli($sql_hostname, $sql_username, $sql_password, $sql_database);
    if ($sql_conn->connect_error) {
        die("Connection failed: " . $sql_conn->connect_error);
    }

    $sql_conn->query("SET NAMES 'utf8'");

    //Only have to change the below code to select different record.
    $sql = 'SELECT * FROM product WHERE barcode = "' . $_GET["barcode"] . '";';

    $record = $sql_conn->query($sql);
    $prod_data = $record->fetch_assoc();

    echo json_encode($prod_data);

    $sql_conn->close();
