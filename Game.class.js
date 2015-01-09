function Game(width, height, name) {
  this.obj = {};
  this.width = width;
  this.height = height;
  this.execute = false;
  this.dt, this.ctx;
  var Game = this;
  var lastTime, canvas;
  var outer;

  this.pre = function() {
    outer = window['game_' + name];

    canvas = document.createElement("canvas");
    Game.ctx = canvas.getContext("2d");
    Game.ctx.x = 0;
    Game.ctx.y = 0;
    canvas.width = this.width;
    canvas.height = this.height;
    document.body.appendChild(canvas);
    document.body.style.overflow = "hidden";

    outer.pre(Game);

    window.resources.onReady(Game.start);
    lastTime = Date.now();
  };

  this.start = function() {
    var now = Date.now();
    Game.ctx.dt = (now - lastTime) / 1000.0;

    if(Game.execute === false) {
      outer.start(Game);
      Game.execute = true;
    }

    update(Game.ctx.dt);
    render(Game.obj);

    lastTime = now;
    window.requestAnimFrame(Game.start);
  };

  var update = function(dt) {
    outer.update(Game);
  };

  var render = function(ob) {
    for(var i in ob) {
      var value = ob[i];
      if(typeof value.draw == 'function') {
        value.draw(Game);
      } else {
        render(value);
      }
    }
    outer.render(Game);
  };

  this.class = function() {
    return outer;
  };
}