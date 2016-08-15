<?php

function addFavourites($searchjson, $notes , $user_id){

    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $last_id = -1;

    $sql = "INSERT INTO `drug_finder`.`favourites`
              (`id`, `searchjson`, `notes`, `created_by`, `created_at`)
              VALUES (NULL, '$searchjson', '$notes', $user_id , CURRENT_TIMESTAMP);";
// For development time
/*    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        echo "New record created successfully. Last inserted ID is: " . $last_id;
    }else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
/*
 * // For production
 */
    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
    }


    $db->closeConnection();

    return $last_id;
}

function deleteFavourites($id){

    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $ret_value =false;

    $sql_details = "DELETE FROM `drug_finder`.`favourite_details` WHERE f_id=$id";
    $conn->query($sql_details);

    $sql = "DELETE FROM `drug_finder`.`favourites` WHERE id=$id";
// For development time
    /*if ($conn->query($sql) === TRUE) {
        echo "\nDocument deleted sucessfully $id \n";
        $ret_value = true;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }*/

    /*
     * // For production
     */
    if ($conn->query($sql) === TRUE) {
        $ret_value = true;
    }


    $db->closeConnection();

    return $ret_value;
}


function getFavouriteList($user_id){


    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $ret_value =array();

    $sql = "SELECT * FROM `drug_finder`.`favourites` WHERE created_by = $user_id ORDER by id desc LIMIT 40";
    $result = $conn->query($sql);
    // For development time
    /*
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - Name: " . $row["notes"]. " " . $row["searchjson"]. "\n";
            $ret_value[] = $row ;
        }
    } else {
        echo "0 results";
    }*/

    /*
     * For Production ..
     */
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $ret_value[] = $row ;
        }
    }

    $db->closeConnection();

    return $ret_value;
}

function getFavourite($id,$user_id){


    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $ret_value =null;

    $sql = "SELECT * FROM `drug_finder`.`favourite_details` WHERE created_by = $user_id AND id = $id ORDER by id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_object()) {
            $ret_value = $row ;
        }
    }

    $db->closeConnection();

    return $ret_value;
}

// getFavouriteList();


function addFavouriteDetails($f_id, $manufacturer,$name, $gen, $form,$description, $user_id ){

    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $last_id = -1;

    $sql = "INSERT INTO `drug_finder`.`favourite_details`
              (`id`, `f_id`, `manufacturer`, `item_name`, `item_gen`, `item_form`, `created_by`, `created_at`,`description`)
              VALUES (NULL, NULL, '$manufacturer','$name', '$gen', '$form', $user_id , CURRENT_TIMESTAMP,'$description');";


    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
    }

    $db->closeConnection();

    return $last_id;
}


function deleteFavouriteDetails($id){

    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $ret_value =false;

    $sql = "DELETE FROM `drug_finder`.`favourite_details` WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        $ret_value = true;
    }

    $db->closeConnection();

    return $ret_value;
}


function getFavouriteDetailsList( $f_id){

    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $ret_value =array();

    $sql = "SELECT * FROM `drug_finder`.`favourite_details` WHERE  f_id= $f_id ORDER by id desc";

    $result = $conn->query($sql);
    // For development time
    /*
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - Name: " . $row["notes"]. " " . $row["searchjson"]. "\n";
            $ret_value[] = $row ;
        }
    } else {
        echo "0 results";
    }
    */
    /*
     * For Production ..
     */
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $ret_value[] = $row ;
        }
    }

    $db->closeConnection();

    return $ret_value;
}

function getFavouriteDetailItems($user_id){

    $db = new DbConnection() ;
    $conn = $db->getDbConnection();
    $ret_value =array();

    $sql = "SELECT * FROM `drug_finder`.`favourite_details` WHERE created_by = $user_id ORDER by id desc";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $ret_value[] = $row ;
        }
    }

    $db->closeConnection();

    return $ret_value;
}
