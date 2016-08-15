<?php
/**
 * Created by PhpStorm.
 * User: mhossain
 * Date: 04/08/16
 * Time: 19:15
 */


/**
 * @param $email
 * @return bool
 */
function userExists($email)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $retVal = false;

    $sql = "SELECT * FROM `drug_finder`.`users` WHERE username = '$email'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $retVal = true;
    }

    $db->closeConnection();

    return $retVal;
}

/**
 * @param $email
 * @param $name
 * @param $password
 * @param $token
 * @return mixed
 */
function createUser($email, $name, $password, $token, $provider, $provider_id, $avatar, $oauth_token)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $last_id = 0;

    if(!isset($password)){
        $password = null;
    }

    if (!isset($oauth_token)) {
        $oauth_token = uniqid("token", true);
    }
    $sql = "INSERT INTO `drug_finder`.`users`
              (`id`, `username`, `fullname`, `email`, `password`,`oauth_token`, `oauth_token_secret`,`provider`,`provider_id`,`avatar`, `created_at`)
              VALUES (NULL, '$email', '$name', '$email', '$password', '$oauth_token', '$token','$provider','$provider_id','$avatar', CURRENT_TIMESTAMP);";

    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
    }
    //var_dump($sql);die;
    $db->closeConnection();

    return $last_id;

}

function getUser($email)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = null;

    $sql = "SELECT * FROM `drug_finder`.`users` WHERE email = '" . $email ."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_object()) {
            $ret_value = $row;
        }
    }

    $db->closeConnection();
    return $ret_value;
}

function validateToken($email, $token)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = false;

    $sql = "UPDATE `drug_finder`.`users` SET `is_verified`=1 WHERE email = '" . $email ."'" ." AND oauth_token_secret = '" .$token ."'";


    if ($conn->query($sql) === TRUE) {
        $ret_value = true;
    }

    $db->closeConnection();

    return $ret_value;
}