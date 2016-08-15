function editComment(elm, id) {
    var elm = $(elm);
    var commentText = elm.find(".comment_text").text();
    $("#commenttext").val(commentText);
    $(".save_comment").attr("id", id);

    $("#add_comment").popup("open", { positionTo: "window" });
}

function saveComment(elm) {
    var id = $(elm).prop("id");
    $(".comment_text_error").addClass("hidden");

    if (!id) {
        id = 0;
    }

    var data = {};
    data.commenttext = $("#commenttext").val()
    data.id = id;
    data.topicid = $("#topicId").val();

    if (!data.commenttext) {
        $(".comment_text_error").removeClass("hidden");
        return false;
    }

    $.post("/service/index?page=topic&action=addcomment", data, function(data) {
        data = data.comment;
        if (id > 0) {
            $("#comment_id_" + id).find(".comment_text").text(data.commenttext);
        } else {
            var htmlStr = "<li id='comment_id_COMMENTID'><a onclick='javascript:editComment(this,COMMENTID);' href='javascript:void(0);'><h2>" + data.fullname + " says: </h2><p><strong class='comment_text'>" + data.commenttext + "</strong></p></a><a onclick='javascript:deleteConfirm(this);' href='javascript:void(0);' id='" + data.id + "' >Delete Comment</a></li>";
            htmlStr = htmlStr.replace(/\COMMENTID/g, data.id);

            $(".comment_list").prepend(htmlStr);
            $(".comment_list").listview("refresh");
        }
        $("#no_data").hide();
        $("#add_comment").popup("close");
        $("#commenttext").val("");
    }).always(function() {
        $("#add_comment").popup("close");
        $(".save_comment").attr("id", "");
    });

    return true;
}

function deleteConfirm(elm) {
    var elm = $(elm);
    var id = elm.attr("id");

    $(".delete_comment").attr("id", id);

    $("#delete_comment").popup("open", { positionTo: "window" });
}

function deleteComment(elm) {
    var elm = $(elm);
    var id = elm.prop("id");

    $.ajax({
        url: "/service/index?page=topic&action=deletcomment&id=" + id,
        type: 'DELETE',
        dataType: 'JSON',
        success: function(data) {
            $("#comment_id_" + id).remove();
        },
        error: function() {
            console.log("error");
        }
    });

}

function getComments(topicid) {
    $.get("/service/index?page=topic&action=getcomments&topicid=" + topicid, {}, function(data) {
        $('#comment-list-template').tmpl(data != null ? data : {}).appendTo(".comment_list");
        $("#topic_text").text(data.topic.topic);
        $("#topicId").val(topicid);
    }).error(function(error) {
        console.log(error);
    }).always(function() {
        $(".comment_list").listview("refresh");
    });
}

$(document).ready(function() {
    var topicid = getUrlParameter('topicid');
    $( "#add_comment" ).on( "popupafterclose", function( event, ui ) {
        $(".save_comment").attr("id", "");
        $("#commenttext").val("");
    } );

    getComments(topicid);
});
