ajax = {
    get: function(message, successEvent)
    {
        $.get("http://localhost/ajax.php", { message: message }).done(function(data) 
        {
            navigator.notification.alert( data, app.blankEvent );
        });
    },
    post: function(message, successEvent)
    {
        $.post("http://localhost/ajax.php", { message: message }).done(function(data) 
        {
            navigator.notification.alert( data, app.blankEvent );
        });
    }

}