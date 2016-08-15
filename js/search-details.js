function loadDetails(id){
    var favourites = JSON.parse(localStorage.getItem('_SearchResult'));
    var foundItem = null;

    $.each(favourites, function(i, item) {
       if(item.id == id){
           foundItem = item;
           return;
       }
    });
    var data={};
    data.result=foundItem;
    $('#search-details-template').tmpl(data != null ? data : {}).appendTo(".search-details-content");
}

$(document).ready(function(){
    var id = getUrlParameter('id');
    loadDetails(id);
});