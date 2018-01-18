<?php
session_start();
header('Access-Control-Allow-Origin: *');
 require 'connection.php';
 if (isset($_POST['courseName']) && isset($_POST['courseDesc']) && isset($_POST['action'])) {
   $courseName = $_POST['courseName'];
   $courseDesc = $_POST['courseDesc'];
   $image = $_POST['image'];
   if ($_POST['action'] === 'add') {
     $query1 = "INSERT INTO courses (name,description,image) VALUES ('$courseName','$courseDesc','$image')";
   }
   else { //EDIT
    $query1 = "UPDATE courses SET name = '$courseName', description = '$courseDesc', image = '$image' WHERE name = '$courseName'";
   }
   $update = mysqli_query($conn,$query1);
   $query2 = "CREATE TABLE `$courseName` (`id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, `studentName` VARCHAR(255) NOT NULL)";
   $createCourseTable = mysqli_query($conn,$query2);
   $query3 = "SELECT * FROM courses ";
   $arr =[];
   $result = mysqli_query($conn,$query3);
   while($row = mysqli_fetch_assoc($result)){
     array_push($arr,$row);
   }
   if($result){
     echo json_encode(['status' => 'success', 'courses' => $arr]);
   }
   mysqli_free_result($result);
   mysqli_close($conn);
}

 ?>
