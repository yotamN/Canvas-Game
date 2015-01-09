function Sprite(type) {
  Object.call(this, type);
  this.url = type.url;
  this._index = 0;
  this.speed = type.speed;
  this.frame = type.frames;
  this.size = type.size;
  this.pos = type.pos || {x:0, y:0};
  var obj = this;

  this.draw = function(Game, callback) {
    obj.func.update(obj, Game);
    obj._index += obj.speed*Game.ctx.dt;
    var max = obj.frame.length;
    var idx = Math.floor(obj._index);
    frame = obj.frame[idx % max];
    var e;
    var x = obj.pos.x;
    var y = obj.pos.y;
    x += frame * obj.size.w;
    if(obj.display === true) {
      Game.ctx.globalAlpha = obj.opacity;
      obj.func.draw(obj, Game);
      if(obj.relative === true) {
        Game.ctx.drawImage(window.resources.get(obj.url), x, y, obj.size.h, obj.size.w, obj.x - Game.ctx.x, obj.y - Game.ctx.y, obj.width, obj.height);
      } else {
        Game.ctx.drawImage(window.resources.get(obj.url), x, y, obj.size.h, obj.size.w, obj.x, obj.y, obj.width, obj.height);
      }
      e = 'Draw Succeful';
    } else if(obj.display === false) {
      e = 'Can\'t draw object because display set off';
    } else {
      e = 'Unknown error';
    }
    if(callback && typeof callback == 'function')
      callback(e);
  };
}

Sprite.prototype = new Object();
Sprite.prototype.constructor = Sprite;