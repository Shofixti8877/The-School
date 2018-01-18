<?php
session_start();
header('Access-Control-Allow-Origin: *');
 require 'connection.php';
 if (isset($_POST['courseName'])) {
   $courseName = $_POST['courseName'];
   $studentarray = $_POST['studentarray'];
   $query1 = "DELETE FROM courses WHERE Name ='$courseName'";
   $update = mysqli_query($conn,$query1);

   for ($i=0; $i <sizeof($studentarray) ; $i++) {
     $currentStudent = $studentarray[$i][0];
     $courseString = $studentarray[$i][1];
     $query = "UPDATE students SET courses = '$courseString' WHERE name = '$currentStudent'";
     $updateStudents = mysqli_query($conn,$query);
   }
   $query2 = "DROP TABLE `$courseName`";
   $deleteCourseTable = mysqli_query($conn,$query2);
   $query3 = "SELECT * FROM courses ";
   $arr1 =[];
   $result1 = mysqli_query($conn,$query3);
   while($row = mysqli_fetch_assoc($result1)){
     array_push($arr1,$row);
   }
   $query4 = "SELECT * FROM students ";
   $arr2 =[];
   $result2 = mysqli_query($conn,$query4);
   while($row = mysqli_fetch_assoc($result2)){
     array_push($arr2,$row);
   }

   if($result1 && $result2 ){
     echo json_encode(['status' => 'success', 'courses' => $arr1, 'students' => $arr2]);
   }
   mysqli_free_result($result1);
   mysqli_free_result($result2);
   mysqli_close($conn);
}
 ?>
