navigator.notification = { };
navigator.notification.alert = function(message, callback, title, button)
{
    window.alert(message);
}

window.device = {
	platform: "desktop",
	version: "1.0"
}


//navigator.geolocation = { };
//navigator.geolocation.getCurrentPosition(app.blankEvent, app.blankEvent);

window.onload = function()
{
    events.receivedEvent();
    app.isOnline = true;
}

