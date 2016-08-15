
function getFavouriteDetail(id) {

    $.get("/service/index?page=favourites&action=getfavourite&id="+id, {}, function(data) {
        if(data.success){
            $('#favourite-details-template').tmpl(data != null ? data : {}).appendTo(".favourite-details-content");
        }else{
            $('#favourite-details-template').tmpl({result:{}}).appendTo(".favourite-details-content");
        }

    }).error(function(error) {
        console.log(error);
    });
}

$(document).ready(function() {
    getFavouriteDetail(getUrlParameter('id'));
});