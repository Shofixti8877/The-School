<?php
session_start();
header('Access-Control-Allow-Origin: *');
 require 'connection.php';
 $stmt = $conn->prepare("SELECT * FROM users WHERE user = ? AND pass = ? ");
 $stmt->bind_param("ss", $user, $pass);
 $user =$_POST['user'];
 $pass =$_POST['pass'];
 $stmt->execute();
$table= $stmt->get_result();
$row= mysqli_fetch_row($table);

 if (sizeof($row) == 7) {
   $_SESSION['user'] = $user;
   $_SESSION['role'] = $row[3];
   echo json_encode($row);
 }

 ?>
