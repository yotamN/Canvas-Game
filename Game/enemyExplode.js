var enemyExplode = {
  x: g.obj.enemies[i].x,
  y: g.obj.enemies[i].y,
  display: true,
  relative: true,
  url: 'assets/png/expl.png',
  width: 118,
  height: 118,
  speed: 10,
  frames: [0,1,2,3,4],
  size: {h:118,w:118},
  pos: {x:1,y:0},
  vars: {
    lt: 30,
    id: g.obj.enemies[i].vars.id,
    explode: true
  },
  func: {
    update: function(o, g) {
      if(o.vars.lt > 0) {
        o.vars.lt--;
      } else {
        delete g.obj.enemies[o.vars.id];
      }
    }
  }
}