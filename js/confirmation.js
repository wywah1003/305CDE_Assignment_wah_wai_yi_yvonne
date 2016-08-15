$(document).ready(function(){

    var token = getUrlParameter('token');
    var email = getUrlParameter('email');

    var confirmation_msg = $("#confirmation_msg");

    var post_data = {};
    post_data.token = token;
    post_data.email = email;


    $.post("/service/index?page=register&action=confirm_user", post_data, function(data) {
        confirmation_msg.text(data.msg);
    });
});