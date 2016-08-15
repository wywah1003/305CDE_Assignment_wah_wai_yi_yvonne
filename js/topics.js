function saveTopic(elm) {
    var id = $(elm).prop("id");
    $(".topic_text_error").addClass("hidden");
    $(".topic_details_error").addClass("hidden");

    if (!id) {
        id = 0;
    }

    var data = {};
    data.topic = $("#topictext").val();
    data.id = id;
    data.details = $("#topicdetails").val();

    if (!data.topic || !data.details) {
        if (!data.topic) {
            $(".topic_text_error").removeClass("hidden");
        }

        if (!data.details) {
            $(".topic_details_error").removeClass("hidden");
        }

        return false;
    }

    $.post("/service/index?page=topic&action=addtopic", data, function(data) {
        if (data.success) {
            data = data.topic;
            var htmlStr = "<li id='topic_id_TOPICID'><a data-ajax='false' href='/comments?topicid=TOPICID'><h2>" + data.topic + " </h2><p><strong class='topic_text'>" + data.details + "</strong></p></a><a onclick='javascript:deleteConfirm(this);' href='javascript:void(0);' id='" + data.id + "' >Delete Topic</a></li>";
            htmlStr = htmlStr.replace(/\TOPICID/g, data.id);
            $(".topic_list").prepend(htmlStr);
            $(".topic_list").listview("refresh");

            $("#add_topic").popup("close");
            $("#topictext").val("");
            $("#topicdetails").val("");
            $("#no_data").hide();
        }
    }).always(function() {
        $("#add_topic").popup("close");
    });

    return true;
}

function deleteConfirm(elm) {
    var elm = $(elm);
    var id = elm.attr("id");

    $(".delete_topic").attr("id", id);

    $("#delete_topic").popup("open", { positionTo: "window" });
}

function deleteTopic(elm) {
    var elm = $(elm);
    var id = elm.prop("id");

    $.ajax({
        url: "/service/index?page=topic&action=deletetopic&id=" + id,
        type: 'DELETE',
        dataType: 'JSON',
        success: function(data) {
            if (data.success) {
                $("#topic_id_" + id).remove();
            }

        },
        error: function() {
            console.log("error");
        }
    });

}

function getTopics() {
    $.get("/service/index?page=topic&action=gettopics", {}, function(data) {
        $('#topic-list-template').tmpl(data != null ? data : {}).appendTo(".topic_list");
    }).error(function(error) {
        console.log(error);
    }).always(function() {
        $(".topic_list").listview("refresh");
    });
}

$(document).ready(function() {
    getTopics();
});
