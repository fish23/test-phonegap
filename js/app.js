var app = 
{
    isReady: false,
    // Application Constructor
    initialize: function() 
    {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() 
    {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() 
    {
        app.receivedEvent('deviceready');
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
    eanResize: function() 
    {
        var width  = window.innerWidth;
        var height = window.innerHeight;

        var widthCanvas;
        var heightCanvas;
        var padding;

        if(width > height)
        {
            heightCanvas = Math.ceil(height / 4);
            widthCanvas  = heightCanvas * 2;
        }
        else
        {
            widthCanvas  = Math.ceil(width * 0.7);
            heightCanvas = Math.ceil(widthCanvas / 2);
        }

        padding = Math.ceil((width - widthCanvas) / 2);

        var c = $("#canvas-ean13"), 
        ctx = c[0].getContext('2d');
        ctx.canvas.width  = widthCanvas;
        ctx.canvas.height = heightCanvas;

        $('#canvas-ean13').css("padding-left", padding+"px");
        $('#canvas-ean13').css("padding-right", padding+"px");
    },
    eanRender: function(code)
    {
        $("#canvas-ean13").EAN13(code);
    }


};