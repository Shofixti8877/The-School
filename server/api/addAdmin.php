<?php
session_start();
header('Access-Control-Allow-Origin: *');
 require 'connection.php';
 if (isset($_POST['action']) && $_POST['action'] === 'add'){
   if (isset($_POST['adminName']) && isset($_POST['adminPhone']) && isset($_POST['adminEmail']) && isset($_POST['adminPass']) && isset($_POST['adminRole'])) {
     $adminName = $_POST['adminName'];
     $adminPhone = $_POST['adminPhone'];
     $adminEmail = $_POST['adminEmail'];
     $adminRole = $_POST['adminRole'];
     $adminPass = $_POST['adminPass'];
     $image = $_POST['image'];
     $query1 = "INSERT INTO users (user,phone,email,role,pass,image) VALUES ('$adminName','$adminPhone','$adminEmail','$adminRole','$adminPass','$image')";

   $update = mysqli_query($conn,$query1);
   $query3 = "SELECT * FROM users";
   $arr =[];
   $result = mysqli_query($conn,$query3);
   while($row = mysqli_fetch_assoc($result)){
     array_push($arr,$row);
   }
   if($result){
     echo json_encode(['status' => 'success', 'admins' => $arr]);
   }
   mysqli_free_result($result);
   mysqli_close($conn);
 }
}

if (isset($_POST['action']) && $_POST['action'] === 'edit'){
  if (isset($_POST['adminName']) && isset($_POST['adminPhone']) && isset($_POST['adminEmail']) && isset($_POST['adminPass'])) {
    $adminName = $_POST['adminName'];
    $adminPhone = $_POST['adminPhone'];
    $adminEmail = $_POST['adminEmail'];
    $adminPass = $_POST['adminPass'];
    $image = $_POST['image'];
    if(isset($_POST['adminRole'])){
      $adminRole = $_POST['adminRole'];
       $query1 = "UPDATE users SET user = '$adminName', phone = '$adminPhone', email = '$adminEmail', pass = '$adminPass', role = '$adminRole', image = '$image' WHERE user = '$adminName'";
    }else{
      $query1 = "UPDATE users SET user = '$adminName', phone = '$adminPhone', email = '$adminEmail', pass = '$adminPass', image = '$image' WHERE user = '$adminName'";
    }
  $update = mysqli_query($conn,$query1);
  $query3 = "SELECT * FROM users";
  $arr =[];
  $result = mysqli_query($conn,$query3);
  while($row = mysqli_fetch_assoc($result)){
    array_push($arr,$row);
  }
  if($result){
    echo json_encode(['status' => 'success', 'admins' => $arr]);
  }
  mysqli_free_result($result);
  mysqli_close($conn);
}
}
 ?>
