$(document).ready(function(){
//*********FUNCTIONS***********
  function HideAll(){
    $('#newCourse').hide();
    $('#newStudent').hide();
    $('#newAdmin').hide();
    $('#courseInfo').hide();
    $('#studentInfo').hide();
    $('#adminInfo').hide();
  }
  function returnSessionData(data){
    currentSessionData = data;
    currentSessionData = JSON.parse(currentSessionData);
  };
  function returnStudentData(data){
    savedStudentsData = data;
  };
  function returnCurrentStudent(data){
    currentStudentData = data;
  };
  function returnCoursesData(data){
    savedCoursesData = data;
  };
  function returnCurrentCourse(data){
    currentCourseData = data;
  };
  function returnAdminsData(data){
    savedAdminsData = data;
  };
  function returnCurrentAdmin(data){
    currentAdminData = data;
  };
  function uploadImage(element){
    $(element).on('click', function() {
                var fileData = $(this).siblings('input').prop('files')[0];
                var formData = new FormData();
                formData.append('file', fileData);
              $.ajax({
                    type: 'post',
                    cache: false,
                    contentType: false,
                    processData: false,
                    url: 'http://localhost/theschool/upload.php',
                    dataType: 'text',
                    data: formData,
                    success: function(data){
                        var parsedResponse = JSON.parse(data);
                        if(parsedResponse.status === 'success'){
                            var path = window.location.href.split('/project2.html')[0];
                            $('.imgUpload').attr('src',path + '/uploads/' + parsedResponse.fileName );
                        }
                    }
                });
            });
  }
  function populateStudentList(){
	$('#studentsList').html('');
	$('#studentsList').append('<ul></ul>');
          for (var i = 0; i < student.length; i++) {
            $('#studentsList ul').append("<li class = 'click'>"+"<img class ='si' src ='"+student[i].image+"'>"+"<span class ='ss' >"+student[i].name+'</span></li>');
          }
          returnStudentData(student);
  }
  function populateCourseList(){
	 $('#coursesList').html('');
	 $('#coursesList').append('<ul></ul>');
          for (var i = 0; i < courses.length; i++) {
            $('#coursesList ul').append("<li class = 'click'>"+"<img class ='si' src ='"+courses[i].image+"'>"+"<span class ='ss' >"+courses[i].name+'</span></li>');
          }
          returnCoursesData(courses);
  }
  function populateAdminList(){
	 $('#adminsList').html('');
	 $('#adminsList').append('<ul></ul>');
            for (var i = 0; i < admins.length; i++) {
              $('#adminsList ul').append("<li class = 'click' name= "+admins[i].user+'>'+"<img class ='si' src ='"+admins[i].image+"'>"+"<span class ='ss' >"+admins[i].user+', '+admins[i].role+'</br>'
              +admins[i].phone+'</br>'+admins[i].email+'</span></li></br>');
            }
            returnAdminsData(admins);
  }
  var addNewStudentPressed=false;
  var currentCourseData=null;
  var currentStudentData=null;
  var currentAdminData=null;
  HideAll();
  uploadImage('#courseImgBtn');
  uploadImage('#studentImgBtn');
  uploadImage('#adminImgBtn');
  $('#admins').hide();
  //***********USERS CHECK***********
  $.ajax({
    url: 'http://localhost/theschool/server/api/users.php',
    success: function(data){
      if(!data){
        window.location.href='login.html';
      }
      else {
          returnSessionData(data);
          $('#userDisplay').html(currentSessionData.user+', '+currentSessionData.role);
          if(currentSessionData.role === 'sales'){
            $('#adminButton').hide();
          }
      }
    },
      error: function(){
        $('#d1').html('error');
      }
  })
//************PAGE INIT**********
  $.ajax({
      type: "POST",
      url: 'http://localhost/theschool/server/api/initstudents.php',
      success: function(data){
        var response= JSON.parse(data)
        if(response.status === 'success'){
          student = response.students;
          populateStudentList();
        }
      },
      error: function(){
        $('#students').html('error');
      }
    });

  $.ajax({
      type: "POST",
      url: 'http://localhost/theschool/server/api/initcourses.php',
      success: function(data){
        var response= JSON.parse(data);
        if(response.status === 'success'){
          courses = response.courses;
          populateCourseList();
        }
      },
      error: function(){
        $('#courses').html('error');
      }
    });

    $.ajax({
        type: "POST",
        url: 'http://localhost/theschool/server/api/initadmins.php',
        success: function(data){
          if(data == 'Unauthorized User!'){
            return;
          }
          var response= JSON.parse(data);
          if(response.status === 'success'){
            admins = response.admins;
            populateAdminList();
          }
        },
        error: function(){
          $('#admins').html('error');
        }
    });

    //************NAV BUTTONS**********

    $('#adminButton').click(function(){
      HideAll()
      $('#courses').hide();
      $('#students').hide();
      $('#admins').show();
      $('#adminInfo').html('');
      $('#adminInfo').append('</br><h4> Administrators Summary</h4></br></br></br><p>Total '+ savedAdminsData.length+' Administrators in the system</p>');
      $('#adminInfo').show();
    });

    $('#schoolButton').click(function(){
      $('#admins').hide();
      $('#adminInfo').hide();
      $('#students').show();
      $('#courses').show();
      $('#newAdmin').hide();
    });

    $('#logout').click(function(){
      $.ajax({
          type: "POST",
          url: 'http://localhost/theschool/server/api/logout.php',
          success: function(data){
            data = JSON.parse(data);
            if (data === 'logged out') {
                window.location.href='login.html';
            }
          },
          error: function(){
            $('#main').html('error');
          }
        });
    });

    //************NEW COURSE BUTTON**********

  $('#addCourse').click(function(){
    HideAll();
    $('#newCourse').show();
    $('#newCourse h4').html('Add New Course');
    $("input[name='courseName']").val('');
    $("textarea").val('');
    $('#courseImage').attr('src','');
    $('#d3').html('');
    $('#deleteCourse').hide();
    addNewCoursePressed=true;
  });

    //************NEW STUDENT BUTTON**********

  $('#addStudent').click(function(){
    HideAll();
    $('#newStudent').show();
    $('#newStudent h4').html('Add New Student');
    $("input[name='studentName']").val('');
    $("input[name='studentPhone']").val('');
    $("input[name='studentEmail']").val('');
    $('#studentImage').attr('src','');
    var checkboxes ="</br>";
    for (var i = 0; i < savedCoursesData.length; i++) {
      checkboxes =checkboxes+ "<input type= 'checkbox' name= 'courseSelect' value='"+savedCoursesData[i].name+"' >";
      checkboxes= checkboxes+savedCoursesData[i].name+"</br>"
    }
    $("#d2").html(checkboxes);
    $('#deleteStudent').hide();
    addNewStudentPressed=true;
  });

    //************NEW ADMIN BUTTON**********

  $('#addAdmin').click(function(){
    HideAll();
    $('#newAdmin').show();
    $('#newAdmin h4').html('Add New Administrator');
    $("input[name='adminName']").val('');
    $("input[name='adminPhone']").val('');
    $("input[name='adminEmail']").val('');
    $("input[name='adminRole']").val('');
    $("input[name='adminPass']").val('');
    $('#courseImage').attr('src','');
    $('#deleteAdmin').hide();
    addNewAdminPressed=true;
  });

    //************SAVE COURSE BUTTON****************

    $('#saveCourse').click(function(){
      var $action='add';
      var $courseName = $("input[name='courseName']").val();
      var $courseDesc = $("textarea").val();
      if($courseName == '' || $courseDesc == ''){
        alert('All fields must be filled');
        return;
      }
      var $image = $("#courseImage").attr('src');
      if($image === "" && !addNewcoursePressed){
        $image = currentCourseData.image;
      }
      else if ($image === "" && addNewCoursePressed){
        var path = window.location.href.split('/project2.html')[0];
        $image = path + '/client/images/No_image.jpg'
      }
      for (var i = 0; i < savedCoursesData.length; i++) {
        if (savedCoursesData[i].name == $courseName) {
          if(addNewCoursePressed){
            alert('Course already exists!');
            return;
          }
          $action = 'edit';
          break;
        }
      }
      $.ajax({
        type: 'POST',
        data: {
          courseName: $courseName,
          courseDesc: $courseDesc,
          image: $image,
          action: $action
        },
        url: 'http://localhost/theschool/server/api/addCourse.php',
        success: function(data){
          var response= JSON.parse(data);
          if(response.status === 'success'){
            courses = response.courses;
            populateCourseList();
            if(!addNewCoursePressed){
              courseName = currentCourseData.name;
            }else{
              courseName = $courseName;
            }
            for (var i = 0; i < savedCoursesData.length; i++) {
              if(savedCoursesData[i].name === courseName ){
                returnCurrentCourse(savedCoursesData[i]);
                var studentsPerCourse= savedCoursesData[i].students.split(",");
                $('#courseInfo').html("<h3>Course Information</h3><button type='button' id='editCourse' name='editCourse'>Edit</button></br></br</br></br><p>Name: "
                +savedCoursesData[i].name+"</p><p>Description: "+savedCoursesData[i].description);
                $('#courseInfo').append('<h3>Students</h3></br></br><ul></ul>');
                if(studentsPerCourse.length != 0){
                  for (var j = 0; j < studentsPerCourse.length; j++) {
                    $('#courseInfo ul').append('<li>'+studentsPerCourse[j]+'</li>');
                  }
                }else{
                  $('#courseInfo ul').append('None');
                }
              }
            }
            HideAll();
            $('#courseInfo').show();
          }
        },
        error: function(data){
          $('#main').html('connection failed');
        }
      });

    });

      //************SAVE STUDENT BUTTON**********

    $('#saveStudent').click(function(){
      phonePattern =/[0-9]{2}\d{8}/;
      if($("#studentForm")[0].checkValidity()) {
        var $action='add';
        var $studentName = $("input[name='studentName']").val();
        var $studentPhone = $("input[name='studentPhone']").val();
        var phoneRegEx = phonePattern.test($studentPhone);
        var $studentEmail = $("input[name='studentEmail']").val();
        if($studentName == '' || $studentPhone == '' || $studentEmail == ''){
          alert('Name, Phone number and Email must be filled');
          return;
        }
        if(!phoneRegEx){
          alert('invalid phone number, must be 10 digits.');
          return;
        }
        var $image = $("#studentImage").attr('src');
        if($image === "" && !addNewStudentPressed){
          $image = currentStudentData.image;
        }
        else if ($image === "" && addNewStudentPressed){
          var path = window.location.href.split('/project2.html')[0];
          $image = path + '/client/images/No_image.jpg'
        }
        var $selectedCourses = [];
        var $removeCourses = [];
        var $coursesTaken ='';
        var counter2 = 0;
        $("input:checkbox:checked").each(function(){
          $selectedCourses.push($(this).val());
        });
        for (var i = 0; i < $selectedCourses.length; i++) {
          $coursesTaken =$coursesTaken+$selectedCourses[i]+',';
        }
        for (var i = 0; i < savedCoursesData.length; i++) {
          for (var j = 0; j < $selectedCourses.length; j++) {
            if ($selectedCourses[j] == savedCoursesData[i].name ) {
              counter2 = 0;
              break;
            }
            else{
              counter2++;
            }
            if (counter2 == $selectedCourses.length) {
              $removeCourses.push(savedCoursesData[i].name);
              counter2=0;
            }
          }
        }
        $coursesTaken = $coursesTaken.slice(0, -1);
        for (var i = 0; i < savedStudentsData.length; i++) {
          if (savedStudentsData[i].name == $studentName) {
            if(addNewStudentPressed){
              alert('Student already exists!');
              return;
            }
            $action = 'edit';
            break;
          }
        }
        $.ajax({
          type: 'POST',
          data: {
            studentName: $studentName,
            studentPhone: $studentPhone,
            studentEmail: $studentEmail,
            coursesTaken: $coursesTaken,
            selectedCourses: $selectedCourses,
            removeCourses: $removeCourses,
            image: $image,
            action: $action
            },
            url: 'http://localhost/theschool/server/api/addStudent.php',
            success: function(data){
              var response= JSON.parse(data);
              if(response.status === 'success'){
                student = response.students;
                courses = response.courses;
                populateStudentList();
                if(!addNewStudentPressed){
                  studentName = currentStudentData.name;
                }else{
                  studentName = $studentName;
                }
                for (var i = 0; i < savedStudentsData.length; i++) {
                  if(savedStudentsData[i].name === studentName ){
                    returnCurrentStudent(savedStudentsData[i]);
                    var coursesTaken= savedStudentsData[i].courses.split(",");
                    $('#studentInfo').html("<h3>Student Information</h3><button type='button' id='editStudent' name='editStudent'>Edit</button></br></br</br></br><p>Name: "
                    +savedStudentsData[i].name+"</p><p>Phone Number: "+savedStudentsData[i].phone+"</p><p>Email: "+savedStudentsData[i].email+"</p>");
                    $('#studentInfo').append('<h3>Courses</h3></br></br><ul></ul>');
                    for (var j = 0; j < coursesTaken.length; j++) {
                      $('#studentInfo ul').append('<li>'+coursesTaken[j]+'</li>');
                    }
                  }
                }
                returnCoursesData(courses);
                HideAll();
                $('#studentInfo').show();
              }
            },
            error: function(data){
              $('#main').html('connection failed');
            }
          });
        }else alert("invalid Email");
      });

    //****************SAVE ADMIN BUTTON****************

    $('#saveAdmin').click(function(){
        phonePattern =/[0-9]{2}\d{8}/;
        if($("#adminForm")[0].checkValidity()) {
          var $action='add';
          var $adminName = $("input[name='adminName']").val();
          var $adminPhone = $("input[name='adminPhone']").val();
          var phoneRegEx = phonePattern.test($adminPhone);
          var $adminEmail = $("input[name='adminEmail']").val();
          var $adminRole = $("input[name='adminRole']").val();
          var $adminPass = $("input[name='adminPass']").val();
          var $image = $("#adminImage").attr('src');
          if($image === "" && !addNewAdminPressed){
            $image = currentAdminData.image;
          }
          else if ($image === "" && addNewAdminPressed){
            var path = window.location.href.split('/project2.html')[0];
            $image = path + '/client/images/No_image.jpg'
          }
          if($adminName == '' || $adminPhone == '' || $adminEmail == '' || $adminRole == '' || $adminPass == ''){
            alert('All fields must be filled');
            return;
          }
          if(!phoneRegEx){
            alert('invalid phone number, must be 10 digits.');
            return;
          }
          if(!($adminRole === 'sales' || $adminRole === 'manager' || $adminRole === 'owner')){
            alert('role must be sales or manager')
            return;
          }
          $adminPass = md5($adminPass);
          for (var i = 0; i < savedAdminsData.length; i++) {
            if (savedAdminsData[i].user == $adminName) {
              if(addNewAdminPressed){
                alert('Admin already exists!');
                return;
              }
              $action = 'edit';
              break;
            }
          }
          if($adminRole === 'owner' && $action === 'add'){
            alert('there can be only one owner in the system!');
            return;
          }
          if($adminRole === 'owner' && $action === 'edit' && currentAdminData.user != $adminName){
            alert('there can be only one owner in the system!');
            return;
          }
          $.ajax({
            type: 'POST',
            data: {
              adminName: $adminName,
              adminPhone: $adminPhone,
              adminEmail: $adminEmail,
              adminRole: $adminRole,
              adminPass: $adminPass,
              image: $image,
              action: $action
            },
            url: 'http://localhost/theschool/server/api/addAdmin.php',
            success: function(data){
              var response = JSON.parse(data);
              if(response.status === 'success'){
                admins = response.admins;
                populateAdminList();
                if(!addNewAdminPressed){
                  adminName = currentAdminData.user;
                }else{
                  adminName = $adminName;
                }
                HideAll();
                $('#adminInfo').html('');
                $('#adminInfo').append('</br><h4> Administrators Summary</h4></br></br></br><p>Total '+ savedAdminsData.length+' Administrators in the system</p>');
                $('#adminInfo').show();
              }
            },
            error: function(data){
              $('#main').html('connection failed');
            }
          });
        }else alert("invalid Email");
      });

    //************DISPLAY COURSE/STUDENT INFO**********

  $('#courses').on('click','li',function(){
    var picture='';
    courseName = $(this).find('span').html();
    HideAll();
    $('#courseInfo').empty();
    $('#courseInfo').show();
    for (var i = 0; i < savedCoursesData.length; i++) {
      if(savedCoursesData[i].name === courseName ){
        returnCurrentCourse(savedCoursesData[i]);
        var studentsPerCourse = savedCoursesData[i].students.split(",");
        $('#courseInfo').html("<h3>Course Information</h3><button type='button' id='editCourse' name='editCourse'>Edit</button></br></br</br></br><p>Name: "
        +savedCoursesData[i].name+"</p><p>Description: "+savedCoursesData[i].description+"</p>");
        $('#courseInfo').append('<h3>Students</h3></br></br><ul></ul>');
        for (var j = 0; j < studentsPerCourse.length; j++){
          for (var k = 0; k < savedStudentsData.length; k++){
            if(savedStudentsData[k].name === studentsPerCourse[j]){
              picture = savedStudentsData[k].image;
              break;
            }
          }
          if(picture != ''){
            $('#courseInfo ul').append('<li>'+"<img class ='si' src='"+picture+"'>"+studentsPerCourse[j]+'</li>');
          }
          else{
            $('#courseInfo ul').append('None');
          }
        }
      }
    }
    if(currentSessionData.role === 'sales'){
      $('#editCourse').hide();
    }
  });

  $('#students').on('click','li',function(){
    var picture='';
    studentName = $(this).find('span').html();
    HideAll();
    $('#studentInfo').empty();
    $('#studentInfo').show();
    for (var i = 0; i < savedStudentsData.length; i++) {
      if(savedStudentsData[i].name === studentName ){
        returnCurrentStudent(savedStudentsData[i]);
        var coursesTaken = savedStudentsData[i].courses.split(",");
        $('#studentInfo').html("<h3>Student Information</h3><button type='button' id='editStudent' name='editStudent'>Edit</button></br></br</br></br><img class= 'dispImg' src='"+savedStudentsData[i].image+"'><p>Name: "
        +savedStudentsData[i].name+"</p><p>Phone Number: "+savedStudentsData[i].phone+"</p><p>Email: "+savedStudentsData[i].email+"</p>");
        $('#studentInfo').append('<h3>Courses</h3></br></br><ul></ul>');
        for (var j = 0; j < coursesTaken.length; j++){
          for (var k = 0; k < savedCoursesData.length; k++){
            if(savedCoursesData[k].name === coursesTaken[j]){
              picture = savedCoursesData[k].image;
              break;
            }
          }
          if(picture != ''){
            $('#studentInfo ul').append('<li>'+"<img class ='si' src='"+picture+"'>"+coursesTaken[j]+'</li>');
          }
          else{
            $('#studentInfo ul').html('None');
          }
        }
      }
    }
  });

    //************EDIT COURSE BUTTON**********

    $('#courseInfo').on('click','#editCourse',function(){
      addNewCoursePressed=false;
      HideAll();
      $('#newCourse').show();
      $('#deleteCourse').show();
      $("#d3").html('');
      $('#newCourse').find('h4').html('Edit Course '+currentCourseData.name);
      $("input[name='courseName']").val(currentCourseData.name);
      $("textarea").val(currentCourseData.description);
      $('#courseImage').attr('src',currentCourseData.image);
      var studentsPerCourse = currentCourseData.students.split(",");
      if(studentsPerCourse[0] != [""]){
        $('#d3').append("Total " + studentsPerCourse.length + " students taking this course</br>");
      }else{
        $('#d3').append("No Students are taking this course");
      }
    });

      //***************EDIT STUDENT BUTTON**********

  $('#studentInfo').on('click','#editStudent',function(){
    addNewStudentPressed=false;
    HideAll();
    $('#newStudent').show();
    $('#deleteStudent').show();
    $("#d2").html('');
    $('#newStudent').find('h4').html('Edit Student '+currentStudentData.name);
    $("input[name='studentName']").val(currentStudentData.name);
    $("input[name='studentPhone']").val(currentStudentData.phone);
    $("input[name='studentEmail']").val(currentStudentData.email);
    $('#studentImage').attr('src',currentStudentData.image);
    var coursesTaken = currentStudentData.courses.split(",");
    var x ="</br>";
    var counter=0;
    for (var i = 0; i < savedCoursesData.length; i++) {
      for (var j = 0; j < coursesTaken.length; j++) {
        if (coursesTaken[j] === savedCoursesData[i].name) {
          $('#d2').append($('<input>', {
            type: "checkbox",
            name: "courseSelect",
            value: savedCoursesData[i].name,
            "checked" :"checked"
          }));
          $('#d2').append(savedCoursesData[i].name+"</br>");
          counter=0;
          break;
        }else{
          counter++;
        }
        if (counter === coursesTaken.length) {
          $('#d2').append($('<input>', {
            type: "checkbox",
            name: "courseSelect",
            value: savedCoursesData[i].name
          }));
          $('#d2').append(savedCoursesData[i].name+"</br>");
            counter=0;
        }
      }
    }
  });

  //************EDIT ADMIN BUTTON**********

  $('#admins').on('click','li',function(){
    adminName = $(this).attr('name');
    for (var i = 0; i < savedAdminsData.length; i++) {
      if(savedAdminsData[i].user === adminName ){
        returnCurrentAdmin(savedAdminsData[i]);
      }
    }
    addNewAdminPressed=false;
    HideAll();
    $('#deleteAdmin').hide();
    $('#newAdmin').show();
    if (adminName != currentSessionData.user) {
      $('#deleteAdmin').show();
    }
    if(currentSessionData.role != 'owner'){
      $("#role").hide();
    }
    $("#d4").html('');
    $('#newAdmin').find('h4').html('Edit Administrator '+currentAdminData.user+ ' ('+currentAdminData.role+')');
    $("input[name='adminName']").val(currentAdminData.user);
    $("input[name='adminPhone']").val(currentAdminData.phone);
    $("input[name='adminEmail']").val(currentAdminData.email);
    $("input[name='adminRole']").val(currentAdminData.role);
    $("input[name='adminPass']").val(currentAdminData.pass);
    $('#adminImage').attr('src',currentAdminData.image);
  });

  //************DELETE COURSE********************

  $('#deleteCourse').click(function(){
    var $courseName = currentCourseData.name;
    var conf=confirm("Course "+currentCourseData.name+ " will be permenantly deleted! are you sure?");
    if(conf){
      var $studentarray = [];
      var arr1 = [];
      var courseList =[];
      var $newCourses='';
      var $studentsToRemove =currentCourseData.students.split(",");
        for (var i = 0; i < $studentsToRemove.length; i++) {
          for (var j = 0; j < savedStudentsData.length; j++) {
            if(savedStudentsData[j].name === $studentsToRemove[i]){
              courseList = savedStudentsData[j].courses.split(",");
              for (var k = 0; k < courseList.length; k++) {
                if(courseList[k] != currentCourseData.name){
                  $newCourses = $newCourses+courseList[k]+',';
                }
              }
              $newCourses = $newCourses.slice(0, -1);
            }
          }
          arr1.push($studentsToRemove[i]);
          arr1.push($newCourses);
          $studentarray.push(arr1);
          arr1 = [];
          $newCourses = '';
        }
      $.ajax({
        type: 'POST',
        data: {
          courseName: $courseName,
          studentarray: $studentarray
          },
          url: 'http://localhost/theschool/server/api/deleteCourse.php',
          success: function(data){
            var response = JSON.parse(data);
            if(response.status === 'success'){
              courses = response.courses;
              students = response.students;
              populateCourseList();
              returnCoursesData(courses);
              returnStudentData(students);
              HideAll();
            }
          },
          error: function(data){
            $('#main').html('connection failed');
          }
        });
      }
  });

  //************DELETE STUDENT********************
  $('#deleteStudent').click(function(){
    $courses=[];
    for (var i = 0; i < savedCoursesData.length; i++) {
      $courses.push(savedCoursesData[i].name);
    }
    var $studentName = currentStudentData.name;
    var conf=confirm("Student "+currentStudentData.name+ " will be permenantly deleted! are you sure?");
    if(conf){
      $.ajax({
        type: 'POST',
        data: {
          studentName: $studentName,
          courses: $courses
          },
          url: 'http://localhost/theschool/server/api/deleteStudent.php',
          success: function(data){
            var response= JSON.parse(data);
            if(response.status === 'success'){
              student = response.students;
              courses = response.courses;
              populateStudentList();
              returnCoursesData(courses);
              returnStudentData(student);
              HideAll();
            }
          },
          error: function(data){
            $('#main').html('connection failed');
          }
        });
      }
  });

  //************DELETE ADMIN********************
  $('#deleteAdmin').click(function(){
    var $adminName = currentAdminData.user;
    var conf=confirm("Administrator "+currentAdminData.user+ " will be permenantly deleted! are you sure?");
    if(conf){
      $.ajax({
        type: 'POST',
        data: {
          adminName: $adminName
        },
        url: 'http://localhost/theschool/server/api/deleteAdmin.php',
        success: function(data){
          var response = JSON.parse(data);
          if(response.status === 'success'){
            admins = response.admins;
            populateAdminList();
            returnAdminsData(admins);
            HideAll();
            $('#adminInfo').html('');
            $('#adminInfo').append('</br><h4> Administrators Summary</h4></br></br></br><p>Total '+ savedAdminsData.length+' Administrators in the system</p>');
            $('#adminInfo').show();
          }
        },
        error: function(){
          $('#admins').html('error');
        }
      });
    }
  });
});
