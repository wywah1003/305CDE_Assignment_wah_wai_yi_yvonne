<?php

require_once('utility.php');
require_once("db/DbConnection.php");
require_once("session_helpers.php");

$page_name = get_page_name();
$action_name = get_action_name();
$user = null;

$session = Session::getInstance();

if (isset($session) && $session->user != null) {
    $user = $session->user;
}

//print_r($_SERVER['HTTP_AUTH_TOKEN']; die();

//echo $page_name;die;
if (!empty($page_name) && !empty($action_name)) {

    switch ($page_name) {

        case "search":
            require_once("search.php");
            run_command($action_name);
            break;
        case "user":
            require_once("user.php");
            run_command($action_name);
            break;
        case "topic":
            if ($user !=null) {
                require_once("topic.php");
                run_command($action_name);
            } else {
                send_error_message();
            }
            break;
        case "favourites":
            if ($user !=null) {
                require_once("favourite.php");
                run_command($action_name);
            } else {
                send_error_message();
            }
            break;
        case "register":
            require_once ("register.php");
            run_command($action_name);
            break;
        default:
            echo $page_name;
            die;
            break;
    }

} else {
    send_error_message();
}


?>