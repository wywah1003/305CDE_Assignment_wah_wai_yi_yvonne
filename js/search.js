$().bind('pageinit', function () {
   $("#search_result").listview("refresh");

});

$('#addTofavourite').on('click',function (e) {
    addtofavourite();
});

function searchDrugs(noError) {

    var search_term = $("#search").val();
    var search_li = $("#search_result");
    var error = $(".search_text_error");
    var inputerror = $(".search-help-block");

    if (search_term != null && search_term != ""){
        search_url = "https://developer.pillfill.com:443/service/v1/products?term="+encodeURI(search_term)+"&type=name&page=0";
        $.ajax({
            type:"GET",
            beforeSend: function (request)
            {
                request.setRequestHeader("api_key", "92a56ac1f3a69e47c68f3cae207f2a87");
                $.mobile.loading('show');
                localStorage.setItem('_SearchResult', "");
            },
            url: search_url,
            processData: false,
            success: function(data) {
                inputerror.text("");
                error.text("");
                for(var key in data)
                {
                    html = constructSearchElem(data[key]);
                    search_li.append(html);
                }
                saveSearchResult(data);
            },
            error: function () {
                error.removeClass("hidden");
                error.text("");
                error.text("Some error occured");
            },
            complete: function() {
                $.mobile.loading('hide');
                $("#search_result").listview("refresh");

            }
        });
    }else if(!noError) {
        inputerror.removeClass("hidden");
        inputerror.text("");
        inputerror.text("Please provide search text");
    }

    return false;
}

function constructSearchElem(item) {
//add_to_favourite
    appendHtml = "<li>";

    var classStr="ui-state-disabled";

    if(localStorage.userid){
        classStr="";
    }
    appendHtml += "<a href='search-details?id="+ item.splId +"' id='"+item.splId+"'>";
    appendHtml += "<h3>"+item.product.name+"</h3>";
    appendHtml += "</a>";
    appendHtml += "<a class='"+classStr+"' onclick='javascript:openFavouritePopUp(this);' href='javascript:void(0);' id='"+ item.splId +"'>Add To Favourite </a>";
    appendHtml += "</li>";

    return appendHtml;
}

function saveSearchResult(data){

    var results = [];

    for(key in data)
    {
        var searchItem = {};
        searchItem['id'] = data[key].splId;
        searchItem['name'] = data[key].product.name;
        searchItem['form'] = data[key].product.form;
        searchItem['gen'] = data[key].product.genericMedicine;
        searchItem['manufacturer'] =data[key].manufacturer;

        results.push( searchItem );
    }

    localStorage.setItem('_SearchResult', JSON.stringify(results));
}

function addtofavourite(){
    var id =$("#productid").val();
    var favouritenote = $("#note").val();

    if(!favouritenote){
        $(".note_text_error").removeClass("hidden");
        return false;
    }

    var favourites = JSON.parse(localStorage.getItem('_SearchResult'));
    var foundItem = null;

    $.each(favourites, function(i, item) {
        if(item.id == id){
            foundItem = item;
            return;
        }
    });

    var data ={};
    data.product = foundItem ;
    data.description = favouritenote;

    $.ajax({
        type:"POST",
        beforeSend: function (request)
        {

        },
        url: "/service/index?page=favourites&action=addfavourite",
        data: data,
        success: function(data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        },
        complete: function() {
            $("#pop_add_to_favourite").popup("close");
        }
    });
}

function openFavouritePopUp(elm) {
    $(".note_text_error").addClass("hidden");

    var elm = $(elm);
    var id = elm.attr("id");

    $("#note").val("");
    $("#productid").val(id);

    $("#pop_add_to_favourite").popup("open", { positionTo: "window" });
}

$(document).ready(function(){
    searchDrugs(true);
});