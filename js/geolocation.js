var geo = {
    get: function()
    {
        if(app.isReady === true)
        {
            navigator.geolocation.getCurrentPosition(geo.success, geo.error);
        }
    },
    success: function(position)
    {
        var divGeo = document.getElementById('geo');
        var cor = position.coords;
        divGeo.innerHTML += '<p>TIME: '+position.timestamp+'<br/>Lat: '+cor.latitude+'<br />Long:'+cor.longitude+'</p>';
    },
    error: function()
    {
        navigator.notification.alert("GPS coords not recived!", app.blankEvent);
    }
}