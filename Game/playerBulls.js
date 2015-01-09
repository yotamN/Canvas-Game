var playerBulls = {
  update: function(o, g) {
    o.y -= o.vars.speed / g.class().speed;
    o.vars.lt++;
    if(o.vars.lt > 300) {
      delete g.obj.playerBulls[o.vars.id];
    }

    for(var i=0; i<g.obj.met.length; i++) {
      if(typeof g.obj.met[i] == 'object') {
        if(o.collide(g.obj.met[i])) {
          g.obj.met[i]['vars']['health']--;
          console.log(g.obj.met[i]['vars']['health']);
          if(g.obj.met[i]['vars']['health'] == 0 || g.obj.met[i]['vars']['health'] < 0) {
            delete g.obj.met[i];
            g.obj.player.vars.score++;
            g.obj.score.text = g.obj.player.vars.score;
          }
          delete g.obj.playerBulls[o.vars.id];
        }
      }
    }

    for(var i=0; i<g.obj.enemies.length; i++) {
      if(typeof g.obj.enemies[i] == 'object') {
        if(o.collide(g.obj.enemies[i]) && !(g.obj.enemies[i].vars.explode === true)) {
          g.obj.enemies[i] = new Sprite(g.class().enemyExplode(g.obj.enemies[i], g));
          g.obj.player.vars.score++;
          delete g.obj.playerBulls[o.vars.id];
          g.obj.score.text = g.obj.player.vars.score;
        }
      }
    }
  }
};