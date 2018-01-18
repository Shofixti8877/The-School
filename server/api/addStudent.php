<?php
session_start();
header('Access-Control-Allow-Origin: *');
require 'connection.php';
if (isset($_POST['studentName']) && isset($_POST['studentPhone']) && isset($_POST['studentEmail']) && isset($_POST['coursesTaken']) && isset($_POST['action'])) {
   $studentName = $_POST['studentName'];
   $studentPhone = $_POST['studentPhone'];
   $studentEmail = $_POST['studentEmail'];
   $image = $_POST['image'];
   $coursesTaken = $_POST['coursesTaken'];
   if (isset($_POST['selectedCourses'])) {
     $selectedCourses = $_POST['selectedCourses'];
   }
   else {
     $selectedCourses = [];
   }
   if (isset($_POST['removeCourses'])) {
   $removeCourses = $_POST['removeCourses'];
 }else {
   $removeCourses = [];
 }
   if ($_POST['action'] === 'add') {
     $query1 = "INSERT INTO students (name,phone,email,courses,image) VALUES ('$studentName','$studentPhone','$studentEmail','$coursesTaken','$image')";
   }
   else { //EDIT
     $query1 = "UPDATE students SET name = '$studentName', phone = '$studentPhone', email = '$studentEmail', courses = '$coursesTaken', image = '$image' WHERE name = '$studentName'";
   }
   $update = mysqli_query($conn,$query1);
   for ($i=0; $i <sizeof($selectedCourses) ; $i++) { //ADD STUDENT TO COURSE TABLE
     $currentCourse = $selectedCourses[$i];
     $query2 = "SELECT COUNT(*) FROM `$currentCourse` WHERE studentName = '$studentName'";
     $sizeQuery = mysqli_query($conn,$query2);
     $row1 = mysqli_fetch_array($sizeQuery);
     $size = $row1[0];
      if($size == 0){
        $query3 = "INSERT INTO `$currentCourse` (studentName) VALUES ('$studentName')";
        $updateCourse = mysqli_query($conn,$query3);
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
   }
   for ($i=0; $i <sizeof($removeCourses) ; $i++) { //REMOVE STUDENT FROM COURSE TABLE
     $currentCourse = $removeCourses[$i];
     $query4 = "DELETE FROM `$currentCourse` WHERE studentName = '$studentName'";
     $updateCourse = mysqli_query($conn,$query4);
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


   $query6 = "SELECT * FROM students ";
   $arr1 =[];
   $result1 = mysqli_query($conn,$query6);
   while($row = mysqli_fetch_assoc($result1)){
     array_push($arr1,$row);
   }
   $query7 = "SELECT * FROM courses ";
   $arr2 =[];
   $result2 = mysqli_query($conn,$query7);
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
