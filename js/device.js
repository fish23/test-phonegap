function Device() { }
Device.prototype.notificationAlert = function(message, callback, title, button)
{
    navigator.notification.alert(message, callback, title, button);
}

