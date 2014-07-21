var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();
emitter._lastTime = 0;
emitter._frame = function(time){
    if(!this._started){
        return;
    }
    if(time != null){
        var frameTime = time - this._lastTime;
        this.emit('frame', 1000 / frameTime, frameTime);
        this._lastTime = time;
    }
    requestAnimationFrame(this._frame.bind(this));
}
emitter._stop = function(){
    this._started = false;
    this._lastTime = 0;
}

if(typeof requestAnimationFrame !== 'undefined'){
    emitter.on('newListener', function(event){
        if(event === 'frame' && !this._started){
            this._started = true;
            this._frame();
        }
    }).on('removeListener', function(event){
        if(event === 'frame' && this._started && !this.listeners('frame').length){
            this._started = false;
            this._stop();
        }
    });
}

module.exports = emitter;