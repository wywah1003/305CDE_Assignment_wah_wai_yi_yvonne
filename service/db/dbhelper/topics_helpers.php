<?php

function addTopics($topic, $details)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $last_id = -1;    
    $created_by = 1;
    
    $session = Session::getInstance();

    if (isset($session) && $session->user != null) {
        $user = $session->user;
        $created_by = $user->id;
    }   
//var_dump($user);die;
    

    $sql = "INSERT INTO `drug_finder`.`topics`
              (`id`, `topic`, `details`, `created_by`, `created_at`)
              VALUES (NULL, '$topic', '$details', $created_by , CURRENT_TIMESTAMP);";
    

    // For production
    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
    }


    $db->closeConnection();

    return $last_id;
}


function deleteTopics($id)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = false;

    $sql_details = "DELETE FROM `drug_finder`.`replies` WHERE topicid= " . $id;
    $conn->query($sql_details);

    $sql = "DELETE FROM `drug_finder`.`topics` WHERE id= " . $id;

    // For production
    if ($conn->query($sql) === TRUE) {
        $ret_value = true;
    }


    $db->closeConnection();

    return $ret_value;
}

function getTopic($id)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = null;

    $sql = "SELECT * FROM `drug_finder`.`topics` WHERE id = " . $id;
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

function getTopicList()
{


    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = array();

    $sql = "SELECT * FROM `drug_finder`.`topics` ORDER by id desc LIMIT 40";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $ret_value[] = $row;
        }
    }

    $db->closeConnection();
    return $ret_value;
}

function addReplies($topic_id, $comments)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $last_id = -1;

    $created_by = 1;
    
    $session = Session::getInstance();

    if (isset($session) && $session->user != null) {
        $user = $session->user;
        $created_by = $user->id;
    }   

    $sql = "INSERT INTO `drug_finder`.`replies`
              (`id`, `topicid`, `commenttext`, `created_by`, `created_at`)
              VALUES (NULL, $topic_id, '$comments', $created_by , CURRENT_TIMESTAMP);";


    // For production
    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
    }


    $db->closeConnection();

    return $last_id;
}

function updateReplies($id, $topic_id, $comments)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = false;

    $sql = "UPDATE `drug_finder`.`replies` SET `commenttext` = '" . $comments ."'" . " WHERE id=" . $id;

    if ($conn->query($sql) === TRUE) {
        $ret_value = true;
    }


    $db->closeConnection();

    return $ret_value;
}

function getComment($id)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = null;

    $sql = "SELECT a.*, b.fullname FROM `drug_finder`.`replies` a INNER JOIN  `drug_finder`.`users` b ON a.created_by = b.id WHERE a.id = " . $id;
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $ret_value = $row;
        }
    }

    $db->closeConnection();
    return $ret_value;
}


function deleteReplies($id)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = false;

    $sql = "DELETE FROM `drug_finder`.`replies` WHERE id=" . $id;

    // For production
    if ($conn->query($sql) === TRUE) {
        $ret_value = true;
    }


    $db->closeConnection();

    return $ret_value;
}

function getReplyList($topic_id)
{

    $db = new DbConnection();
    $conn = $db->getDbConnection();
    $ret_value = array();

    $sql = "SELECT a.*, b.fullname FROM `drug_finder`.`replies` a INNER JOIN  `drug_finder`.`users` b ON a.created_by = b.id  WHERE topicid= " . $topic_id . " ORDER by id desc";
    $result = $conn->query($sql);


    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $ret_value[] = $row;
        }
    }

    $db->closeConnection();

    return $ret_value;
}


?>