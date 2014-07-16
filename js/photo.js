var photo = {
    width: 320, //1024,
    height: 200, //768,
    get: function()
    {
        var options = {
            quality: 70, 
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            sourceType : Camera.PictureSourceType.CAMERA
        };

        if(window.innerWidth > window.innerHeight)
        {
            options.tagetWidth = photo.width;
            options.tagetHeight = photo.height;
        }
        else
        {
            options.tagetWidth = photo.height;
            options.tagetHeight = photo.width;
        }

        navigator.camera.getPicture(photo.success, photo.error, options);
    },
    success: function(imageData)
    {
        navigator.notification.alert("Photo has been successfully retrived!", app.blankEvent);
        var imgPhoto = document.getElementById('img-photo');
        imgPhoto.src = 'data:image/jpeg;base64,' + imageData;
        imgPhoto.style.display = 'block';
    },
    error: function()
    {
        var imgPhoto = document.getElementById('img-photo');
        imgPhoto.src = '';
        imgPhoto.style.display = 'none';
        navigator.notification.alert("Unable to get Photo!", app.blankEvent);
    }
}