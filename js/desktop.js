function Desktop() 
{ 
    window.onload = function()
    {
        app.onDeviceReady();    
    }
}
Desktop.prototype.notificationAlert = function(message, callback, title, button)
{
    window.alert(message);
}


