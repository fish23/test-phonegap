function Device() { }
Device.prototype.notificationAlert = function(message, callback, title, button)
{
    callback = (typeof callback === "undefined") ? app.blankEvent : callback;
    navigator.notification.alert(message, callback, title, button);
}

