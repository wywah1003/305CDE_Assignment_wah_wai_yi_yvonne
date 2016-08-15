
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function logout() {
    $.cookie("auth_token", "", {
        expires: -1,
        path: '/',
    });

    localStorage.clear();

    $.post("/service/index?page=user&action=logout", {}, function(data) {
        location.href = "/index";
    });
}

$(document).ready(function() {
    if (localStorage.userid) {
        $("#login").addClass("hidden");
        $("#loginIndex").addClass("hidden");
        
        $("#logout").removeClass("hidden");
        $("#add_to_favourite").removeClass("hidden");
        if (location.pathname == "/login") {
            location.href = "/index";
        }
    } else {
        $("#login").removeClass("hidden");
        $("#loginIndex").removeClass("hidden");
        $("#logout").addClass("hidden");
        $("#add_to_favourite").addClass("hidden");

        if (location.pathname == "/favourites" || location.pathname == "/topics" || location.pathname == "/comments") {
            location.href = "/login";
        }
    }

});
