# Framerate

get the current framerate

# usage

npm install framerate

var framerate = require('framerate');

framerate.on('frame', function(fps, frameTime){
    .. do something
});