<?php

require_once("db/dbhelper/favourite_helpers.php");


function run_command($command_name)
{

    $user_id = null;
    $session = Session::getInstance();

    if (isset($session) && $session->user != null) {
        $user_id = $session->user->id;
    }

    switch ($command_name) {
        case "addfavourite":
            _add_favourite($user_id);

            break;
        case "addfavourites":
            _add_favourites($user_id);

            break;
        case "getfavourite":
            _get_favourite($user_id);
            break;
        case "getfavourites":
            _get_favourites($user_id);
            break;
        case "deletefavourites":
            _del_favourites();
            break;

        case "getfavouritedetails":
            _get_favourites_details($user_id);
            break;
        case "delfavouritedetails":
            _del_favourite_details();
            break;
        default:
            break;
    }
}

function _add_favourite($user_id)
{

    $results = array();

    $description = $_POST["description"];
    $product = $_POST["product"];

    $insert_id = addFavouriteDetails(null, $product["manufacturer"], $product["name"], $product["gen"], $product["form"], $description, $user_id);


    if ($insert_id != -1) {
        $results["success"] = true;
        $results["detailid"] = $insert_id;
    } else {
        $results["success"] = false;
    }
    header('Content-Type: application/json');
    echo json_encode($results);
}

function _add_favourites($user_id)
{

    $results = array();

    $searchterm = $_POST["searchterm"];
    $note = $_POST["note"];
    $favourites = json_decode($_POST["favourites"], true);
    $insert_id = addFavourites($searchterm, $note, $user_id);

    if ($insert_id != -1) {

        foreach ($favourites as $favourite) {

            //addFavouriteDetails($f_id, $manufacturer,$name, $gen, $form);
            addFavouriteDetails($insert_id, $favourite["manufacturer"], $favourite["name"]
                , $favourite["gen"], $favourite["form"], $user_id);

        }
    }

    if ($insert_id != -1) {
        $results["success"] = true;
        $results["topicid"] = $insert_id;
    } else {
        $results["success"] = false;
    }
    header('Content-Type: application/json');
    echo json_encode($results);
}

function _get_favourites($user_id)
{

    $values = getFavouriteList($user_id);

    if ($values != null) {
        $results["success"] = true;
        $results["results"] = $values;
    } else {
        $results["success"] = false;
    }
    header('Content-Type: application/json');
    echo json_encode($results);

}

function _get_favourite($user_id)
{
    $id = $_GET["id"];
    $values = getFavourite($id,$user_id);

    if ($values != null) {
        $results["success"] = true;
        $results["result"] = $values;
    } else {
        $results["success"] = false;
    }
    header('Content-Type: application/json');
    echo json_encode($results);

}

function _del_favourites()
{

    $favourites_id = $_GET["id"];
    $results = array();

    $results["success"] = deleteFavourites($favourites_id);

    header('Content-Type: application/json');
    echo json_encode($results);


}

function _get_favourites_details($user_id)
{
    $results = array();

    $values = getFavouriteDetailItems($user_id);

    if ($values != null) {
        $results["success"] = true;
        $results["results"] = $values;
    } else {
        $results["success"] = false;
    }

    header('Content-Type: application/json');
    echo json_encode($results);

}

function _del_favourite_details()
{


    $id = $_GET["id"];
    $results = array();

    $results["success"] = deleteFavouriteDetails($id);

    header('Content-Type: application/json');
    echo json_encode($results);

}

?>