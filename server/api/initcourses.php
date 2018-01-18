<?php
header('Access-Control-Allow-Origin: *');
session_start();
require 'connection.php';
$query1 = "SELECT * FROM courses ";
$arr =[];
$result = mysqli_query($conn,$query1);
while($row = mysqli_fetch_assoc($result)){
  array_push($arr,$row);
}
if($result){
  echo json_encode(['status' => 'success', 'courses' => $arr]);
}
mysqli_free_result($result);
mysqli_close($conn);

 ?>
