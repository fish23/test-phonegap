var facebook = {
    filename: "mobilePride",
    defaultMessage: "prague pride 2014",
    defaultImageType: "image/png",
    defaultImageQuality: 0.9,
    postCanvas: function(canvas, message, imageType, imageQuality)
    {
        message = (typeof message === "unefined") ? facebook.defaultMessage : message;
        imageType = (typeof imageType === "unefined") ? facebook.defaultImageType : imageType;
        imageQuality = (typeof imageQuality === "unefined") ? facebook.defaultImageQuality : imageQuality;
        var data = canvas.toDataURL(imageType);
        var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
        var decodedPng = Base64Binary.decode(encodedPng);
        FB.getLoginStatus(function(response) 
        {
            if (response.status === "connected") 
            {
                facebook.postImageToFacebook(response.authResponse.accessToken, facebook.filename, imageType, decodedPng, message);
            } 
            else if (response.status === "not_authorized") 
            {
                FB.login(function(response) 
                {
                    facebook.postImageToFacebook(response.authResponse.accessToken, facebook.filename, imageType, decodedPng, message);
                }, {scope: "publish_stream"});
            } 
            else 
            {
                FB.login(function(response) 
                {
                    postImageToFacebook(response.authResponse.accessToken, facebook.filename, imageType, decodedPng, message);
                }, {scope: "publish_stream"});
            }
        });
    },
    
    postImageToFacebook: function(authToken, filename, mimeType, imageData, message)
    {
        // this is the multipart/form-data boundary we'll use
        var boundary = '----ThisIsTheBoundary1234567890';
        // let's encode our image file, which is contained in the var
        var formData = '--' + boundary + '\r\n'
        formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
        formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
        for ( var i = 0; i < imageData.length; ++i )
        {
            formData += String.fromCharCode( imageData[ i ] & 0xff );
        }
        formData += '\r\n';
        formData += '--' + boundary + '\r\n';
        formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
        formData += message + '\r\n'
        formData += '--' + boundary + '--\r\n';

        var xhr = new XMLHttpRequest();
        xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
        xhr.onload = xhr.onerror = function() 
        {
            console.log( xhr.responseText );
        };
        xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
        xhr.sendAsBinary(formData);
    }


};