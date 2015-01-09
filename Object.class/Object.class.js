function Object(type) {
  var obj = this;

  this.x = type.x || 0;
  this.y = type.y || 0;
  this.display = type.display || false;
  this.width = type.w || type.width;
  this.height = type.h || type.height;
  this.vars = type.vars || {};
  this.func = type.func || {};
  this.relative = type.relative || false;
  this.opacity = type.opacity || 1;
  this.rotate = type.rotate || 0;

  if(!this.func.pre) {
    this.func.pre = function() {};
  }
  if(!this.func.update) {
    this.func.update = function() {};
  }
  if(!this.func.draw) {
    this.func.draw = function() {};
  }

  this.func.pre(obj, Game);

  this.collide = function(objb) {
    if (obj.x < objb.x + objb.width  && obj.x + obj.width  > objb.x &&
		    obj.y < objb.y + objb.height && obj.y + obj.height > objb.y) {
  	  return true;
  	} else {
  	  return false;
  	}
  }

  this.setRotate = function(angle) {
    this.rotate = Math.pi/180 * angle;
  }

  this.getRotate = function() {
    return this.rotate / (Math.PI/180);
  }

}