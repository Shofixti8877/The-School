<?php
header('Access-Control-Allow-Origin: *');
session_start();
require 'connection.php';
$query = "SELECT * FROM students ";
$arr =[];
$result = mysqli_query($conn,$query);
while($row = mysqli_fetch_assoc($result)){
  array_push($arr,$row);
}
if($result){
  echo json_encode(['status' => 'success', 'students' => $arr]);
}
mysqli_free_result($result);
mysqli_close($conn);

 ?>
