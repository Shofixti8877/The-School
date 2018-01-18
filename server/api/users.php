<?php
session_start();
header('Access-Control-Allow-Origin: *');
if (isset($_SESSION['user'])) {
echo json_encode($_SESSION);
}
 ?>
