function Text(type) {
  Object.call(this, type);
  var obj = this;
  this.color = type.color;
  this.font = type.font;
  this.text = type.text;

  this.draw = function(Game, callback) {
    obj.func.update(obj, Game);
    var e;
    if(obj.display === true) {
      Game.ctx.fillStyle = obj.color;
      Game.ctx.font = obj.font;
      Game.ctx.globalAlpha = obj.opacity;
      obj.func.draw(obj, Game);
      if(obj.relative === true) {
        Game.ctx.fillText(obj.text, obj.x - Game.ctx.x, obj.y - Game.ctx.y);
      } else {
        Game.ctx.fillText(obj.text, obj.x, obj.y);
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

Text.prototype = new Object();
Text.prototype.constructor = Text;