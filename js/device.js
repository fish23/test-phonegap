function Device() { }
Device.prototype.notificationAlert = function(message, callback, title, button)
{
    callback = (typeof callback === "undefined") ? app.blankEvent : callback;
    title = (typeof title === "undefined") ? "Alert" : title;
    button = (typeof button === "undefined") ? "OK" : button;
    navigator.notification.alert(message, callback, title, button);
}

