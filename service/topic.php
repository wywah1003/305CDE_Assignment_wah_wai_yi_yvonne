<?php
require_once("db/dbhelper/topics_helpers.php");

function run_command($command_name)
{


    switch ($command_name) {
        case "addtopic":
            $results = array();
            $topic = $_POST["topic"];
            $details = $_POST["details"];

            $inserted_id = addTopics($topic, $details);

            if ($inserted_id != -1) {
                $results["success"] = true;
                $results["topic"] = getTopic($inserted_id);
            } else {
                $results["success"] = false;
            }

            header('Content-Type: application/json');
            echo json_encode($results);
            break;

        case "gettopics":
            $data["results"] = getTopicList();
            $data["current_user_id"] = 1;

            $session = Session::getInstance();

            if (isset($session) && $session->user != null) {
                $user = $session->user;
                $data["current_user_id"] = $user->id;
            }

            header('Content-Type: application/json');
            echo json_encode($data);
            break;
        case "deletetopic":
            $results = array();
            $topicid = $_GET["id"];
            $is_deleted = deleteTopics($topicid);

            if ($is_deleted) {
                $results["success"] = true;
            } else {
                $results["success"] = false;
            }

            header('Content-Type: application/json');
            echo json_encode($results);
            break;
        case "addcomment":
            $results = array();
            $id = $_POST["id"];
            $topicid = $_POST["topicid"];
            $comment = $_POST["commenttext"];

            if ($id > 0) {
                updateReplies($id, $topicid, $comment);
            } else {
                $id = addReplies($topicid, $comment);
            }

            if ($id > 0) {
                $results["success"] = true;
                $results["comment"] = getComment($id);
            } else {
                $results["success"] = false;
            }

            header('Content-Type: application/json');
            echo json_encode($results);
            break;
        case "deletcomment":
            $results = array();
            $commentid = $_GET["id"];
            $is_deleted = deleteReplies($commentid);

            if ($is_deleted) {
                $results["success"] = true;
            } else {
                $results["success"] = false;
            }

            header('Content-Type: application/json');
            echo json_encode($results);
            break;
            break;
        case "getcomments":
            $topicid = $_GET["topicid"];
            $data["results"] = getReplyList($topicid);
            $data["current_user_id"] = 1;

            $session = Session::getInstance();

            if (isset($session) && $session->user != null) {
                $user = $session->user;
                $data["current_user_id"] = $user->id;
            }

            $data["topic"] = getTopic($topicid);
            header('Content-Type: application/json');

            echo json_encode($data);
            break;
        default:
            break;

    }

    return Null;
}

?>