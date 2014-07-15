navigator.notification = { };
navigator.notification.alert = function(message, callback, title, button)
{
    window.alert(message);
}


//navigator.geolocation = { };
//navigator.geolocation.getCurrentPosition(app.blankEvent, app.blankEvent);




window.onload = function()
{
    app.onDeviceReady();    
}

