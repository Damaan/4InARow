function desa(){
  //Recollim els valors true/false del document
  var big = document.querySelector('#G').checked;
  var med = document.querySelector('#M').checked;
  var small = document.querySelector('#P').checked;
  var dal = document.querySelector('#dal').checked;

//En funcio de quina estigui seleccionada
//guardam a localStorage els valors
  if (med == true) {
    var m = "med";
    localStorage.setItem("size",m);
  } else if (small == true) {
    var m = "small";
    localStorage.setItem("size",m);
  } else {
    localStorage.removeItem("size");

  }
  if (dal == true) {
    var m = "ae";
    localStorage.setItem("color",m);
  } else {
    localStorage.removeItem("color");
  }
}
