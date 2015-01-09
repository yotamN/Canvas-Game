var speedLine = {
  update: function(o, g) {
    o.y += o.vars.speed * g.class().speed;
    o.vars.lt++;
    if(o.vars.lt > 100) {
      delete g.obj.sl[o.vars.id];
    }
  }
};