var photo = {
    get: function()
    {
        navigator.camera.getPicture(photo.success, photo.error, {
            quality: 85, 
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit : true,
            sourceType : Camera.PictureSourceType.CAMERA
        });
    },
    success: function(imageData)
    {
        navigator.notification.alert("Photo has been successfully retrived!", app.blankEvent);
        window.resolveLocalFileSystemURI(imageData, photo.place, photo.error);

    },
    error: function()
    {
        navigator.notification.alert("Unable to get Photo!", app.blankEvent);
        var imgPhoto = document.getElementById('img-photo');
        imgPhoto.src = '';
        imgPhoto.style.display = 'none';
    },
    place: function(fileEntry)
    {
        var imgPhoto = document.getElementById('img-photo');
        console.log('fish');
        console.log(fileEntry);
        imgPhoto.src = fileEntry.fullPath;
        imgPhoto.style.display = 'block';
        
    }
}