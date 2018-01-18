<?php

define('host','127.0.0.1');
define('user','root');
define('pass','');
define('db','amitdb') ;
class ConnectDb {
  private static $instance = null;
  private $conn;
  
  public function __construct(){
    $this->conn = mysqli_connect(host,user,pass,db);
  }
  public static function getInstance(){
    if(!self::$instance){
      self::$instance = new ConnectDb();
    }
    return self::$instance;
  }
  public function getConnection(){
    return $this->conn;
  }
}
$instance = ConnectDb::getInstance();
$conn = $instance->getConnection();
if (mysqli_connect_error()) {
    die('could not connect to DB');
  }


 ?>
