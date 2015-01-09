var game_po = {
  pre: function(Game) {
    this.stage = 1;
    Game.class().speed = 1;

    // Load game assets
    window.resources.load(
      ['assets/png/bg/starBackground.png',
       'assets/png/bg/speedLine.png',
       'assets/png/meteorBig.png',
       'assets/png/player.png',
       'assets/png/playerLeft.png',
       'assets/png/playerRight.png',
       'assets/png/UI/textGameOver.png',
       'assets/png/laserRed.png',
       'assets/png/enemyShip.png',
       'assets/png/laserGreen.png',
       'assets/png/expl.png']
    );


    // Background
    Game.obj.patt = new Pattern({
      relative: false,
      x: 0,
      y: 0,
      display: true,
      url: "assets/png/bg/starBackground.png",
      w: Game.width,
      h: Game.height
    });

  },



  start: function(Game) {
    // Creat all the objects
    Game.obj.player = new Img({
      height: 75,
      width: 99,
      url: 'assets/png/player.png',
      display: true,
      relative: true,
      x: (Game.width / 2) - 50,
      y: Game.height - 130,
      vars: {
        health: 1,
        ls: 30,
        lt: 15,
        score: 0,
        speed: 8
      },
      func: player
    });

    // Container for the speedLines, meteors, player Bullets and enemies Bullets
    Game.obj.sl = [];
    Game.obj.met = [];
    Game.obj.playerBulls = [];
    Game.obj.enemiesBulls = [];

    // Summon level 1 enemy's
    this.levels.a(Game);

    Game.obj.gameOver = new Img({
      height: 78,
      width: 415,
      url: 'assets/png/UI/textGameOver.png',
      display: false,
      relative: true,
      x: (Game.width / 2) - 207,
      y: (Game.height / 2) - 39
    });

    Game.obj.score = new Text({
      relative: false,
      x: 10,
      y: 30,
      display: true,
      color: "#ffffff",
      font: "bold 28px Tahoma",
      text: Game.obj.player.vars.score
    });

    console.log('Started');
  },



  update: function(Game) {
    // test if stage 1 (level 1)
    if(this.stage == 1) {
      var won = true;
      for(var i=0; i<Game.obj.enemies.length; i++) {
        if(!(typeof Game.obj.enemies[i] == 'undefined')) {
          won = false;
        }
      }

      if(won === true) {
        Game.class().speed = Game.class().speed * 2;
        this.wait = 0;
        this.stage = 2;
      }
    }

    // test if stage 2 (speed flight)
    if(this.stage == 2) {
      if(this.wait < 100) {
        this.wait++;
        console.log('Wait');
      } else {
        Game.class().speed = Game.class().speed / 2;
        this.stage = 3;
        console.log(Game.class().speed);
      }
    }

    // test if stage 3 (summon level 3)
    if(this.stage == 3) {
      this.levels.b(Game);
      this.stage = 4;
    }

    // Summon speed lines particles with chance of 1 to 4
    if(getRandomInt(1,4) == 2) {
      var xp = getRandomInt(0,Game.width);
      var yp = -200;

      Game.obj.sl.push(new Img({
        height: 186,
        width: 7,
        url: 'assets/png/bg/speedLine.png',
        display: true,
        relative: true,
        x: xp,
        y: yp,
        vars: {
          lt: 0,
          speed: 50,
          id: Game.obj.sl.length
        },
        func: speedLine,
        opacity: 0.1
      }));
    }

    // summon astroids with chance of 1 to 600
    if(getRandomInt(1,600) == 2) {
      var xp = getRandomInt(0,Game.width);
      var yp = -200;

      Game.obj.met.push(new Img({
        height: 111,
        width: 136,
        url: 'assets/png/meteorBig.png',
        display: true,
        relative: true,
        x: xp,
        y: yp,
        vars: {
          lt: 0,
          speed: 5,
          id: Game.obj.met.length,
          health: 5
        },
        func: meteor
      }));
    }

    // check for errors
    if(!(Game.ctx.y < 0 || Game.ctx.y == 0 || Game.ctx.y > 0)) {
      console.log('Error');
      Game.ctx.y = 0;
    }
    if(!(Game.ctx.x < 0 || Game.ctx.x == 0 || Game.ctx.x > 0)) {
      console.log('Error');
      Game.ctx.x = 0;
    }
  },



  render: function() {

  },



  levels: {
    a: function(g) {
      g.obj.enemies = [];
      var sx = ((g.width - 1100) / 2) - 120;
      for(var i=0; i<1; i++) {
        for(var t=0; t<10; t++) {
          g.obj.enemies.push(new Img({
            width: 98,
            height: 50,
            display: true,
            relative: true,
            url: 'assets/png/enemyShip.png',
            x: sx + (t * 110),
            y: 20 + (i * 80),
            func: enemy,
            vars: {
              lm: 120,
              right: true,
              id: g.obj.enemies.length
            }
          }));
        }
      }
    },
    b: function(g) {
      g.obj.enemies = [];
      var sx = ((g.width - 1100) / 2) - 120;
      for(var i=0; i<5; i++) {
        for(var t=0; t<10; t++) {
          g.obj.enemies.push(new Img({
            width: 98,
            height: 50,
            display: true,
            relative: true,
            url: 'assets/png/enemyShip.png',
            x: sx + (t * 110),
            y: -580 + (i * 80),
            func: enemyb,
            vars: {
              lm: 120,
              right: true,
              id: g.obj.enemies.length,
              lt: 0
            }
          }));
        }
      }
    }
  },


  enemyExplode: function(o, g) {
    return {
      x: o.x,
      y: o.y,
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
        lt: 25,
        id: o.vars.id,
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
    };
  }
};



var meteor = {
  update: function(o, g) {
    o.y += o.vars.speed * g.class().speed;
    o.vars.lt++;
    if(o.vars.lt > 300) {
      delete g.obj.met[o.vars.id];
    }
  },
  draw: function(o) {

  }
};



var enemyb = {
  update: function(o, g) {
    if(o.vars.lt > 300) {
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
    } else {
      o.vars.lt++;
      o.y += 2;
    }

    for(var i=0; i<g.obj.met.length; i++) {
      if(typeof g.obj.met[i] == 'object') {
        if(o.collide(g.obj.met[i])) {
          g.obj.enemies[o.vars.id] = new Sprite({
            x: o.x,
            y: o.y,
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
              lt: 25,
              id: o.vars.id
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
          });
        }
      }
    }
  }
};



var eb = {
  update: function(o, g) {
    o.y += o.vars.speed;
    o.vars.lt++;
    if(o.vars.lt > 300) {
      delete g.obj.enemiesBulls[o.vars.id];
    }

    if(typeof g.obj.player == 'object') {
      if(o.collide(g.obj.player)) {
        g.obj.player.vars.health-- ;
        delete g.obj.enemiesBulls[o.vars.id];
      }
    }
  }
};
