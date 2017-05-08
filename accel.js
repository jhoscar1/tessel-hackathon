var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
//var takePicture = require('./camera');


// Initialize the accelerometer.
accel.on('ready', function () {
// Stream accelerometer data
    accel.setOutputRate(1.56, function rateSet() {
      accel.on('data', function (xyz) {
        console.log('slower x:', xyz[0].toFixed(2),
        'slower y:', xyz[1].toFixed(2),
        'slower z:', xyz[2].toFixed(2));
      });
    });
});

accel.on('error', function(err){
  console.log('Error:', err);
});