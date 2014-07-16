var photo = {
    get: function()
    {
        navigator.camera.getPicture(photo.success, photo.error, {
            quality: 85, 
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType : Camera.PictureSourceType.CAMERA
        });
    },
    success: function(imageData)
    {
        ajax.post(imageData);
        navigator.notification.alert("Photo has been successfully retrived!", app.blankEvent);
        var imgPhoto = document.getElementById('img-photo');
        imgPhoto.src = imageData;
    },
    error: function()
    {
        navigator.notification.alert("Unable to get Photo!", app.blankEvent);
    }
}