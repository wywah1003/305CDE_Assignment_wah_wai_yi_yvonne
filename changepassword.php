<?php

$hostname = "127.0.0.1";
$user = "root";
$password ="";
$connection = mysql_connect($hostname, $user, $password) or die("Could not open connection to database");

mysql_select_db("drug_finder", $connection) or die("Could not select database");


$method = $_SERVER['REQUEST_METHOD'];
echo $method;


switch ($method){

case 'PUT':

 echo "Here is PUT";

    parse_str(file_get_contents("php://input"),$post_vars);

    $email=$post_vars['email'];

    $newpass=$post_vars['password'];
    
	$passwordmd5=sha1($newpass);
  
   $checkid=mysql_query("SELECT * from users WHERE email='$email' ") or die("Could not issue MySQL query");

$records = mysql_num_rows($checkid);

if($records>0){
	
		$sqlstring="update users set password='$passwordmd5' where email='$email'";
	
	mysql_query($sqlstring);
	
	
}else{
	 echo "No user found";
	 return;
}
 
    break;

  default:

    rest_error($request); 

    break;
}
	?>