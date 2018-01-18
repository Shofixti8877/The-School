<?php
session_start();
header('Access-Control-Allow-Origin: *');
 require 'connection.php';
 if (isset($_POST['adminName'])) {
   $adminName = $_POST['adminName'];
   $query1 = "DELETE FROM users WHERE user ='$adminName'";
   $update = mysqli_query($conn,$query1);
   $query2 = "SELECT * FROM users ";
   $arr =[];
   $result = mysqli_query($conn,$query2);
   while($row = mysqli_fetch_assoc($result)){
     array_push($arr,$row);
   }
   if($result){
     echo json_encode(['status' => 'success', 'admins' => $arr]);
   }
   mysqli_free_result($result);
   mysqli_close($conn);
}
 ?>
