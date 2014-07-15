navigator.notification = { };
navigator.notification.alert = function(message, callback, title, button)
{
    window.alert(message);
}

window.onload = function()
{
    app.onDeviceReady();    
}

