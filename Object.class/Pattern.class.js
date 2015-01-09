function Pattern(type) {
  Object.call(this, type);
  this.url = type.url;
  this.direction = type.direction || 'repeat';
  this.pc = false;
  this.pat;

  var obj = this;

  this.draw = function(Game, callback) {
    if(obj.pc === true) {
      obj.func.update(obj, Game);
      var e;
      if(obj.display === true) {
        Game.ctx.globalAlpha = obj.opacity;
        Game.ctx.fillStyle = obj.pat;
        obj.func.draw(obj, Game);
        if(obj.relative === true) {
          Game.ctx.fillRect(obj.x - Game.ctx.x,obj.y - Game.ctx.y,obj.width,obj.height);
        } else {
          Game.ctx.fillRect(obj.x,obj.y,obj.width,obj.height);
        }
        e = 'Draw Succeful';
      } else if(obj.display === false) {
        e = 'Can\'t draw object because display set off';
      } else {
        e = 'Unknown error';
      }
      if(callback && typeof callback == 'function')
        callback(e);
    } else {
      obj.pat = Game.ctx.createPattern(window.resources.get(obj.url),obj.direction);
      obj.pc = true;
    }
  };
}

Pattern.prototype = new Object();
Pattern.prototype.constructor = Pattern;