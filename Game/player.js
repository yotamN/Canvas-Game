var player = {
  update: function(o, g) {
    // Test if player alive
    if(o.vars.health > 0) {

      // test if player is collide with a meteor
      for(var i=0; i<g.obj.met.length; i++) {
        if(typeof g.obj.met[i] == 'object') {
          if(o.collide(g.obj.met[i])) {
            o.vars.health--;
          }
        }
      }

      // Space key listener to shoot
      if(key.Space && key.Space === true) {
        if(o.vars.ls >= o.vars.lt) {
          o.vars.ls = 0;
          g.obj.playerBulls.push(new Img({
            width: 9,
            height: 33,
            display: true,
            relative: true,
            url: 'assets/png/laserRed.png',
            x: o.x + 45,
            y: o.y - 40,
            func: playerBulls,
            vars: {
              speed: 30,
              lt: 0,
              id: g.obj.playerBulls.length
            }
          }));
        }
      }

      if(o.vars.ls <= o.vars.lt) {
        o.vars.ls++;
      }

      // Left and right movement
      if(key.A && key.A === true && !(key.D || key.D === true)) {
        o.x -= o.vars.speed;
        o.url = 'assets/png/playerLeft.png';
      } else if(key.D && key.D === true && !(key.A || key.A === true)) {
        o.x += o.vars.speed;
        o.url = 'assets/png/playerRight.png';
      } else {
        o.url = 'assets/png/player.png';
      }

      // Rotate movement
      if(key.Q && key.Q === true && !(key.E || key.E === true)) {
        o.rotate -= 0.05;
        console.log('Angle: ' + o.getRotate());
        console.log('Graph: ' + Math.tan(o.getRotate() * (Math.PI/180)));
        // g.ctx.x -= mv;
      } else if(key.E && key.E === true && !(key.Q || key.Q === true)) {
        o.rotate += 0.05;
        console.log('Angle: ' + o.getRotate());
        console.log('Graph: ' + Math.tan(o.getRotate() * (Math.PI/180)));
        // console.log(o.getRotate() % 180);
        // g.ctx.x -= mv;
      }

      // Down and up movement
      if(key.W && key.W === true && !(key.S || key.S === true)) {
        o.y -= o.vars.speed;
      } else if(key.S && key.S === true && !(key.W || key.W === true)) {
        o.y += o.vars.speed;
      }
    } else {
      o.display = false;
      g.obj.gameOver.display = true;
    }
  }
}