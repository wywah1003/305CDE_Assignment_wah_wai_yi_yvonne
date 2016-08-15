$().ready(function() {
    $("#registerForm").validate({
        errorElement: 'span', //default input error message container
        errorClass: 'red_color', // default input error message class
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            },
            password_confirmation: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: { // custom messages for radio buttons and checkboxes
            name: "Please enter name",
            email: "Not valid email",
            password: "Please enter password",
            password_confirmation: {
                required: "Please enter confirm password",
                equalTo: "Does not match with password"
            }
        },

        errorPlacement: function( error, element ) {
            error.insertAfter( element.parent() );
        },

        submitHandler: function (form) {
            //form.submit();
            event.preventDefault();
            console.log("inside submit handler");
            submitForm();
        }
    });
});


function submitForm(){

    var error = $(".server_error");
    redirect_url = "/login";

    submit_url = "/service/index?page=register&action=register_user";

    $.ajax({
        type:"POST",
        beforeSend: function (request)
        {
            $.mobile.loading('show');
        },
        url: submit_url,
        processData: false,
        data: $('#registerForm').serialize(),
        success: function(data) {
            if(!data.error){
                alert(data.msg);
                window.location.replace(redirect_url);
            }else{
                error.removeClass("hidden");
                error.text("");
                error.text(data.msg);
            }
            $.mobile.loading('hide');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            error.removeClass("hidden");
            error.text("");
            error.text("Server returned error");
            $.mobile.loading('hide');
        }
    });
}