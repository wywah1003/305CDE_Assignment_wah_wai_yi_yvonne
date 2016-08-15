<?php
require_once("db/dbhelper/login_helpers.php");
require_once("session_helpers.php");
require_once("cookie_helpers.php");

function run_command($command_name){
	 switch ($command_name) {
	 	 case "login":
	 	 	$session = Session::getInstance();

            $results = array();
            $email = $_POST["email"];
            $password = $_POST["password"];

            $user = checklogin($email, $password);

            if($user !=null && $user->is_verified == 1){
                $session->user= $user;
            	CookieHelper::setCookieLive('auth_token', $user->oauth_token, time()+60*60*24, '/');
            	$results["user"] = $user ;
            	$results["success"] = true ;

            }else{
                if($user->is_verified == 0){
                    $results["message"] = "Please confirm your account.";
                }else{
            	    $results["message"] = "User name and password doesn't match";
                }
            	$results["success"] = false;
            }            

            header('Content-Type: application/json');
            echo json_encode($results);
            break;
         case "logout":
         	$results["success"] = true;
         	$session = Session::getInstance();
         	$session->destroy();
         	CookieHelper::deleteCookieLive('auth_token','/');
         	
         	header('Content-Type: application/json');
            echo json_encode($results);
         	break;
         default:
            break;
	 }

    return Null;
}


?>