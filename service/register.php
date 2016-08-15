<?php
require_once("db/dbhelper/register_helper.php");
require_once("lib/mail_helper.php");
require_once("cookie_helpers.php");

function run_command($command_name)
{
    switch ($command_name) {
        case "register_user":
            register_user();
            break;
        case 'confirm_user':
            confirm_user();
            break;
    }
    return null;
}


function register_user()
{
    $results = array();

    $email = safeReadValue('email');
    $password = safeReadValue("password");
    $name = safeReadValue("name");
    $provider_id = safeReadValue("provider_id");
    $provider = safeReadValue("provider");
    $oauth_token = safeReadValue("oauth_token");
    $avatar = safeReadValue("avatar");

    if (!userExists($email)) {

        $token = uniqid();

        if (isset($provider) && $provider == "google") {
            $password = null;
        } else {
            $password = sha1($password);
        }

        $userId = createUser($email, $name, $password, $token, $provider, $provider_id, $avatar, $oauth_token);

        if ($userId != 0) {

            if (isset($provider) && $provider == "google") {
                $session = Session::getInstance();
                $user = getUser($email);
                $session->user = $user;
                CookieHelper::setCookieLive('auth_token', $user->oauth_token, time() + 60 * 60 * 24, '/');
                $results["user"] = $user;
                $results["success"] = true;
            } else {
                $results['msg'] = "Thanks for registering.";

                $confirm_url = "http://$_SERVER[HTTP_HOST]  /confirmation.html?token=" . $token . "&email=" . urlencode($email);

                $html = "<html><body>";
                $html .= "<p>Dear $name</p>";
                $html .= "<p>Thanks for registering.";
                $html .= "<br/>";
                $html .= $confirm_url;
                $html .= "<br/>";
                $html .= "Regards<br/>Drug Finder Team</p></body></html>";

                $subject = "Confirmation of your account from Drug Finder";

                //if (send_mail_extended($email, $subject, $html)) {
                  //  $results['msg'] = "Thanks for registering. Please confirm your email";
                //} else {
                  //  $results['error'] = true;
                   // $results['msg'] = "Sorry unable to send the confirmation link now!!";
               // }
                //var_dump($results);die;
            }
        } else {
            $results['error'] = true;
            $results['msg'] = "Sorry service are currently down";
        }
    } else {
        $user = getUser($email);

        if (isset($provider) && $provider == "google" && isset($user->provider_id) && $provider_id == $user->provider_id) {
            $session = Session::getInstance();
            $user = getUser($email);
            $session->user = $user;

            CookieHelper::setCookieLive('auth_token', $user->oauth_token, time() + 60 * 60 * 24, '/');
            //var_dump($session);die;
            $results["user"] = $user;
            $results["success"] = true;
        } else {
            $results['error'] = true;
            $results['msg'] = "User already exists with same email";
        }
    }

    header("Content-Type: application/json");
    echo json_encode($results);
}


function confirm_user()
{

    $results = array();

    $email = urldecode($_REQUEST["email"]);
    $token = $_REQUEST["token"];

    $results['email'] = $email;
    $results['token'] = $token;

    if (validateToken($email, $token)) {
        $results['msg'] = 'Email successfully validated';
    } else {
        $results['msg'] = 'Sorry email not validated';
    }

    header("Content-Type: application/json");
    echo json_encode($results);

}

function safeReadValue($key){
    if(isset($_POST[$key])){
        return $_POST[$key];
    }
    if (isset($_GET[$key])){
        return $_GET[$key];
    }
    return "";
}