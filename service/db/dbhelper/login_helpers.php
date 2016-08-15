<?php

function checklogin($email, $password)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = null;

    $sql = "SELECT * FROM `drug_finder`.`users` WHERE email = '" . $email ."'" . " AND password='" .sha1( $password)."'";
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

?>