function Game(width, height) {
  this.obj = {};
  this.width = width;
  this.height = height;
  var self = this;
  
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.x = 0;
  ctx.y = 0;
  canvas.width = this.width;
  canvas.height = this.height;
  document.body.appendChild(canvas);
  document.body.style.overflow = "hidden";
  
  this.start = function() {
    console.log(this.obj);
    this.obj.bg = new Object('Image', this.height, this.width, 'https://raw.github.com/lostdecade/simple_canvas_game/master/images/background.png', true);
    this.obj.player = new Object({
      height: 32,
      width: 32,
      url: 'https://raw.githubusercontent.com/lostdecade/simple_canvas_game/master/images/hero.png',
      display: true,
      x: (canvas.width / 2) - 16,
      y: (canvas.height / 2) - 16,
      vars: {
        health: 100
      }
    });
    this.obj.enemy = new Object('Image', 32, 32, 'https://raw.githubusercontent.com/lostdecade/simple_canvas_game/master/images/monster.png', true);
    this.obj.enemy.x = 100;
    this.obj.enemy.y = 100;
  }
  
  this.render = function() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,canvas.width,canvas.width);
    
    if(self.obj.player.vars.health > 0) {
      if (self.obj.enemy.collide(self.obj.player)) {
        self.obj.player.vars.health--;
        console.log(self.obj.player.vars.health);
      }
    
      if(key.A && key.A === true) {
        self.obj.player.x -= 5;
        ctx.x -= 5;
      }
      if(key.D && key.D === true) {
        self.obj.player.x += 5;
        ctx.x += 5;
      }
      if(key.W && key.W === true) {
        self.obj.player.y -= 5;
        ctx.y -= 5;
      }
      if(key.S && key.S === true) {
        self.obj.player.y += 5;
        ctx.y += 5;
      }
      
      self.obj.bg.draw(ctx, function(e){
        // console.log('Background: ' + e);
      });
      self.obj.player.draw(ctx);
      self.obj.enemy.draw(ctx);
    }
  }
}