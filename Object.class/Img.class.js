function Img(type) {
  Object.call(this, type);
  this.url = type.url;
  if(type.s) {
    this.s.x = type.s.x;
    this.s.y = type.s.y;
    this.s.height = type.s.h || type.s.height;
    this.s.width = type.s.w || type.s.width;
  }
  var obj = this;

  this.draw = function(Game, callback) {
    obj.func.update(obj, Game);
    var e;
    if(obj.display === true) {
      Game.ctx.globalAlpha = obj.opacity;
      Game.ctx.save();
      if(obj.relative === true) {
        Game.ctx.translate(obj.x - Game.ctx.x, obj.y - Game.ctx.y);
      } else {
        Game.ctx.translate(obj.x, obj.y);
      }
      Game.ctx.translate(obj.width / 2, obj.height / 2);
      Game.ctx.rotate(obj.rotate);
      obj.func.draw(obj, Game);
      Game.ctx.drawImage(window.resources.get(obj.url), -(obj.width / 2), -(obj.height / 2), obj.width, obj.height);
      Game.ctx.restore();
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

Img.prototype = new Object();
Img.prototype.constructor = Img;