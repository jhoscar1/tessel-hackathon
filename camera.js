var http = require('http');
var av = require('tessel-av');
var camera = new av.Camera();

var takePicture = camera.capture();

takePicture.on('data', function (image) {
    
    var request = http.request({
        hostname: '192.168.2.54', // Where your other process is running
        port: 3001,
        path: '/upload-pic',
        method: 'POST',
        headers: {
            'Content-Type': 'image/jpg',
            'Content-Length': image.length
        }
    });

    request.write(image);
    
});

takePicture.on('error', function (err) {
    console.error(err);
});

module.exports = takePicture;