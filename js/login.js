function login() {
    $(".email_error").addClass("hidden");
    $(".password_error").addClass("hidden");

    var data = {};
    data.email = $("#email").val();
    data.password = $("#password").val();

    if (!data.email || !data.password) {
        if (!data.email) {
            $(".email_error").removeClass("hidden");
        }

        if (!data.password) {
            $(".password_error").removeClass("hidden");
        }

        return false;
    }

    $.post("/service/index?page=user&action=login", data, function(data) {
        if (data.success) {
            //console.log(data.user);
            $.cookie("auth_token", data.user.oauth_token, {
                expires: 1,
                path: '/',
            });
            localStorage.auth_token = data.user.oauth_token;
            localStorage.userid = data.user.id;
            location.href = "/index";

        } else {
            $(".error").html(data.message);
        }
    });

    return true;
}



$(document).on('submit', 'form', function() {
    login();
});


