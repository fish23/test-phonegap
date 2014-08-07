var events = {
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() 
    {
        events.receivedEvent('deviceready');
    },
    onOffline: function() 
    {
        app.isOnline = false;
    },
    onOnline: function() 
    {
        app.isOnline = true;
    },
    onLogin: function(e)
    {
    	e.preventDefault();

    	var email = $("#login-email").val();
    	var password = $("#login-password").val();

    	if(utils.isEmpty(email) === false || utils.isEmpty(password) === false)
    	{
    		navigator.notification.alert("Pro prihlaseni je potreba zadat email a heslo.", function(){return false;}, "Prihlaseni", "Potvrdit");
    		return false;
    	}

    	if(app.isOnline === false)
    	{
    		navigator.notification.alert("Pro prihlaseni je potreba aktivni pripojeni k internetu.", function(){return false;}, "Prihlaseni", "Potvrdit");
    		return false;
    	}
    	
		ajax.get({
			"cmd": "login",
			"email": email,
			"password": password
		}, events.onLoginResponse);
		return true;
    	
    },
    onLoginResponse: function(e)
    {

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) 
    {
        app.isReady = true;

        if (window.device.platform === "iOS" && parseFloat(window.device.version) >= 7.0) 
        {
            // ...
        }
        //Resize canvas for EAN13
        app.eanResize();
        app.eanRender("9002236311036");
    },
    blankEvent: function() 
    {
        return;
    },
    loginEvent: function(e)
    {
        
    }
};