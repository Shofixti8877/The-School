<?php
header('Access-Control-Allow-Origin: *');
session_start();
require 'connection.php';
if(isset($_SESSION['role'])){
  if($_SESSION['role'] === 'manager'){
  $query1 = "SELECT * FROM users WHERE role = 'manager' OR role = 'sales'";
  }
  elseif($_SESSION['role'] === 'owner'){
  $query1 = "SELECT * FROM users";
  }
  else{
    die('Unauthorized User!');
  }
  $arr =[];
  $result = mysqli_query($conn,$query1);
  while($row = mysqli_fetch_assoc($result)){
    array_push($arr,$row);
  }
  if($result){
    echo json_encode(['status' => 'success', 'admins' => $arr]);
  }
  mysqli_free_result($result);
  }
mysqli_close($conn);

 ?>
