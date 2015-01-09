var enemy = {
  update: function(o, g) {

    // Check which direction to go, down or sides
    if(o.vars.lm == 0) {
      o.y += 5;
      o.vars.lm = 120;
      o.vars.right = !o.vars.right;
    } else {
      o.vars.lm--;
      if(o.vars.right === true) {
        o.x += 2;
      } else {
        o.x -= 2;
      }
    }

    // Test for collision with meteors
    for(var i=0; i<g.obj.met.length; i++) {
      if(typeof g.obj.met[i] == 'object') {
        if(o.collide(g.obj.met[i])) {
          g.obj.enemies[o.vars.id] = new Sprite(g.class().enemyExplode(g.obj.enemies[o.vars.id], g));
        }
      }
    }

    // got chance of 1/1000 to shoot a laser
    if(getRandomInt(1,1000) == 2) {
      g.obj.enemiesBulls.push(new Img({
        height: 33,
        width: 9,
        url: 'assets/png/laserGreen.png',
        display: true,
        relative: true,
        x: o.x + (o.width / 2),
        y: o.y + 65,
        vars: {
          lt: 0,
          speed: 20,
          id: g.obj.enemiesBulls.length
        },
        func: eb
      }));
    }
  }
};