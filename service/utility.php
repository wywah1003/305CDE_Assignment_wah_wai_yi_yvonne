<?php

// This data will come from the session data

function get_page_name(){

    if( !empty($_GET["page"] )){
        return $_GET["page"];
    }

    return Null;

}


function get_action_name(){

    if( !empty($_GET["action"] )){
        return $_GET["action"];
    }

    return Null;

}

function send_error_message(){

    echo "please provide a page name"; die();

}

?>