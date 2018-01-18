$(document).ready(function(){
  $('#b1').click(function(){
    var $user = $('#user').val();
    var $pass = $('#pass').val();
    $pass = md5($pass);
    $.ajax({
      type: 'POST',
      data: {
        user: $user,
        pass: $pass
      },
      url: 'http://localhost/theschool/server/api/login.php',
      success: function(data){

        if (data) {
          window.location.href='project2.html';
        }else{
            $('#d1').html('invalid username/password');
        }
      },
      error: function(data){
        $('#d1').html('connection failed');
      }
    });

  });



});
