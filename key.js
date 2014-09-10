var key = {};

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  if(charCode == 13) {
    key['Enter'] = true;
  } else if(charCode == 32) {
    key['Space'] = true;
  } else if(charCode == 27) {
    key['Esc'] = true;
  } else {
    key[charStr] = true;
  }
  console.log(key);
};

window.onkeyup = function(evt){
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  if(charCode == 13) {
    key['Enter'] = false;
  } else if(charCode == 32) {
    key['Space'] = false;
  } else if(charCode == 27) {
    key['Esc'] = false;
  } else {
    key[charStr] = false;
  }
  console.log(key);
};