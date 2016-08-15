function deleteConfirm(elm) {
    var elm = $(elm);
    var id = elm.attr("id");

    $(".delete_favourite_details").attr("id", id);
    $("#favouritedetails").popup("open", { positionTo: "window" });
}

function deleteFavouriteDetails(elm) {
    var elm = $(elm);
    var id = elm.prop("id");

    $.ajax({
        url: "/service/index?page=favourites&action=delfavouritedetails&id=" + id,
        type: 'DELETE',
        dataType: 'JSON',
        success: function(data) {
            if (data.success) {
                $("#favourites_details_id_" + id).remove();
            }
        },
        error: function() {
            console.log("error");
        }
    });
}

function getFavouriteDetails() {

    $.get("/service/index?page=favourites&action=getfavouritedetails", {}, function(data) {
        if(data.results){
            $('#favourite-details-list-template').tmpl(data != null ? data : {}).appendTo("#data-list");
        }else{
            $('#favourite-details-list-template').tmpl({results:{}}).appendTo("#data-list");
        }

    }).error(function(error) {
        console.log(error);
    }).always(function() {
        $("#data-list").listview("refresh");
    });
}

$(document).ready(function() {
    getFavouriteDetails();
});