ajax = {
    get: function(message)
    {
        $.get("http://192.168.1.123", { message: message }).done(function(data) 
        {
            navigator.notification.alert( data, app.blankEvent );
        });
    },
    post: function(message)
    {
        $.post("http://192.168.1.123", { message: message }).done(function(data) 
        {
            navigator.notification.alert( data, app.blankEvent );
        });
    }

}