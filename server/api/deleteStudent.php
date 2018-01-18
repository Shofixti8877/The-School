<?php
session_start();
header('Access-Control-Allow-Origin: *');
 require 'connection.php';
 if (isset($_POST['studentName']) && isset($_POST['courses'])) {
   $studentName = $_POST['studentName'];
   $courses = $_POST['courses'];
   $query1 = "DELETE FROM students WHERE name ='$studentName'";
   $update = mysqli_query($conn,$query1);
   for ($i=0; $i <sizeof($courses) ; $i++) { //DELETE STUDENT FROM COURSE TABLE
     $currentCourse = $courses[$i];
        $query3 = "DELETE FROM `$currentCourse` WHERE studentName = '$studentName'";
        $deleteFromCourse = mysqli_query($conn,$query3);
        $studentsArr=[];
        $query = "SELECT `studentName` FROM `$currentCourse`";
        $studentsQuery = mysqli_query($conn,$query);
        while($row = mysqli_fetch_array($studentsQuery)){
          array_push($studentsArr,$row);
        }
        $studentsStr='';
        for ($j=0; $j <sizeof($studentsArr) ; $j++) {
          $studentsStr =$studentsStr . $studentsArr[$j][0] . ',';
        }
        $studentsStr= rtrim($studentsStr,',');
        $query5 = "UPDATE courses SET students = '$studentsStr' WHERE name = '$currentCourse'";
        $updateCourses = mysqli_query($conn,$query5);

   }
   $query2 = "SELECT * FROM students ";
   $arr1 =[];
   $result1 = mysqli_query($conn,$query2);
   while($row = mysqli_fetch_assoc($result1)){
     array_push($arr1,$row);
   }
   $query6 = "SELECT * FROM courses ";
   $arr2 =[];
   $result2 = mysqli_query($conn,$query6);
   while($row = mysqli_fetch_assoc($result2)){
     array_push($arr2,$row);
   }
   if($result1 && $result2){
     echo json_encode(['status' => 'success', 'students' => $arr1, 'courses' => $arr2]);
   }
   mysqli_free_result($result1);
   mysqli_free_result($result2);
   mysqli_close($conn);
}
 ?>
