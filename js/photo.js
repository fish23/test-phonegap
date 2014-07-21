var photo = {
    width: 320, //1024,
    height: 200, //768,
    imgId: 'img-photo',
    canvasId: 'canvas-photo',
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
        var imgPhoto = document.getElementById(photo.imgId);
        imgPhoto.src = 'data:image/jpeg;base64,' + imageData;
        imgPhoto.onload = photo.loaded;
        if (imgPhoto.complete) 
        {
            photo.loaded();
        }
    },
    loaded: function()
    {
        var imgPhoto = document.getElementById(photo.imgId);
        var canvasPhoto = document.getElementById(photo.canvasId);
        canvasPhoto.width = imgPhoto.width;
        canvasPhoto.height = imgPhoto.height;

        var context = canvasPhoto.getContext("2d");
        context.globalCompositeOperation = "source-over";
        context.drawImage(imgPhoto, 0, 0, canvasPhoto.width, canvasPhoto.height);
        photo.filter(imgPhoto, canvasPhoto, context);
        canvasPhoto.style.display = 'block';
        //facebook.postCanvas(canvasPhoto);
    },
    filter: function(image, canvas, context)
    {
        var imageData = context.getImageData(0, 0, image.width, image.height);
        var data = imageData.data;
        for(var i = 0; i < data.length; i += 4) 
        {
          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }
        // overwrite original image
        context.putImageData(imageData, 0, 0);
        context.globalCompositeOperation = "soft-light";
        gradient = context.createLinearGradient(0, canvas.height, canvas.width, canvas.height);
        gradient.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
        gradient.addColorStop(0.333, 'rgba(225, 255, 0, 1.000)');
        gradient.addColorStop(0.666, 'rgba(0, 255, 17, 1.000)');
        gradient.addColorStop(1.000, 'rgba(0, 55, 255, 1.000)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    },
    error: function()
    {
        var imgPhoto = document.getElementById(photo.imgId);
        imgPhoto.src = '';
        imgPhoto.style.display = 'none';
        navigator.notification.alert("Unable to get Photo!", app.blankEvent);
    }
}