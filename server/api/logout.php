<?php
session_start();
header('Access-Control-Allow-Origin: *');
session_destroy();
echo json_encode('logged out');
?>
