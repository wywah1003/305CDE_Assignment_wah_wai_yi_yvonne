function makeApiCall(accessToken) {
    localStorage.accessToken = accessToken;
    var url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + accessToken;
    $.get(url, {}).then(function(results) {
        console.log(results);
        var respData = {},
            data;
        data = results;
        respData.provider_id = data.id;
        respData.provider = "google";
        respData.name = data.name;
        respData.avatar = data.picture;
        respData.email = data.email;
        respData.oauth_token = accessToken;

        var error = $(".error");
        redirect_url = "/index";
        error.addClass("hidden");

        submit_url = "/service/index?page=register&action=register_user";

        $.post(submit_url, respData, function(data) {
            if (data.success) {
                if (!data.error) {

                    $.cookie("auth_token", data.user.oauth_token, {
                        expires: 1,
                        path: '/',
                    });
                    localStorage.auth_token = data.user.oauth_token;
                    localStorage.userid = data.user.id;
                    location.href = "/index";
                } else {
                    error.removeClass("hidden");
                    error.text("");
                    error.text(data.msg);
                }
            }else {
                error.removeClass("hidden");
                error.text("");
                error.text(data.msg);
            }
        }).error(function(xhr, ajaxOptions, thrownError) {
            error.removeClass("hidden");
            error.text("");
            error.text("Server returned error");
        });
    });
}

function handleAuthClick(event) {
    gapi.client.setApiKey(Settings.API_KEY);
    gapi.auth.authorize({
        client_id: Settings.CLIENT_ID,
        scope: Settings.SCOPES,
        immediate: false
    }, this.handleAuthResult);
    return false;
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        makeApiCall(authResult.access_token);
    } else {
        console.log("Error occurred");
    }
};
