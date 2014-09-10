function Object(type, width, height, url, display) {
  var self = this;
  
  this.img;
  this.ready = false;
  this.img = new Image();
  
  this.img.onload = function() {
    self.ready = true;
  };
  
  if(typeof type == 'object') {
    this.img.src = type.url || 'http://fcdn.co.il/images3/logo-fxp.png';
    // var meta = getMeta(this.img.src);
    
    this.x = type.x || 0;
    this.y = type.y || 0;
    this.display = type.display || false;
    this.width = type.w || type.width || 1;
    this.height = type.h || type.height || 1;
    this.vars = type.vars || {};
    
    
  } else {
    this.img.src = url || 'http://fcdn.co.il/images3/logo-fxp.png';
    // var meta = getMeta(type.url);
    
    this.x = 0;
    this.y = 0;
    this.display = display || false;
    this.width = width || 1;
    this.height = height || 1;
    this.vars = {};
  }
  
  this.draw = function(ctx, callback) {
    var e;
    if(self.display === true && self.ready === true) {
      ctx.drawImage(self.img, self.x - ctx.x, self.y - ctx.y, self.height, self.width);
      e = 'Draw Succeful';
    } else if(self.display === false) {
      e = 'Can\'t draw object because display set off';
    } else if(self.ready === false) {
      e = 'Can\'t draw object because object is not yet ready';
    } else {
      e = 'Unknown error';
    }
    if(callback)
      callback(e);
  };
  
  this.collide = function(obj) {
    if(self.x < obj.x + obj.width  && self.x + self.width  > obj.x &&
  	   self.y < obj.y + obj.height && self.y + self.height > obj.y) {
  	  return true;
  	} else {
  	  return false;
  	}
  }
  
}