//Aquests siran els objectes que representan les fitxes.
function Fitxa(x, y, radi,id) {
    this.x = x;
    this.y = y;
    this.radi = radi;
    this.id = id;
    this.painted = false;
    this.jugador = "";
    this.xx = 0;
    this.yy = 0;
    //Pinta en blanc
    this.draw = function () {
      c.beginPath();
      c.fillStyle = "white";
      c.arc(this.x,this.y,this.radi,0,2*Math.PI);
      c.fill();
    };
    //Pinta en el color del jugador.
    this.fill = function (jugador) {
      this.jugador = jugador;
      c.beginPath();
      c.fillStyle = this.jugador;
      c.arc(this.x,this.y,this.radi,0,2*Math.PI);
      c.fill();
      this.painted = true;
    };
}

// preparam les variables a emprar
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var color = localStorage.getItem("color");
var s = localStorage.getItem("size");
var jugador1;
var jugador2;
var win = " ";
var temp = [];
var array = [];
//Definim mitjançant localStorage els colors ddels jugadors
if (color != null) {
  jugador1 = "yellow";
  jugador2 = "blue";
} else {
  jugador1 = "red";
  jugador2 = "black";
}
var jugador = jugador1;

//Definim el tamany del taulell mitjançant localStorage
if (s != null) {
  if (s == "small") {
    canvas.width ="366";
    canvas.height="233";
  } else if (s == "med") {
    canvas.width ="733";
    canvas.height="466";
  }
}
//Inicialitzam el canvas.
var p = canvas.getBoundingClientRect();
c.moveTo(0,0);
var xincr = canvas.width/7;
var yincr = canvas.height/6;
c.fillStyle = "green";
c.fillRect(0, 0, canvas.width, canvas.height);
c.fill();

//Pintam el taulell amb les peces en blanc.
var count = 0;
var id = 0;
for (var j = 0; j <= canvas.height; j+= yincr) {
  for (var i = 0; i <= canvas.width; i+= xincr) {
    c.moveTo(i,0);  c.lineTo(i,canvas.height);
    c.moveTo(0,j);  c.lineTo(canvas.width,j);
    var fitxa = new Fitxa(i+(xincr/2), j+(yincr/2), (yincr/2),id);
    id++;
    c.stroke();
    fitxa.draw();
    if ( (id % 7) == 0 ) {
      temp.push(fitxa);
      array[count] = temp;
      count++;
      temp = [];
      break;
    } else {
      temp.push(fitxa);
    }
  }
}
c.stroke();


canvas.addEventListener('click',function(event){
  var caselladef;
  //Identificam a quina casella a fet click.
  var x = Math.floor((event.clientX - p.left)/xincr);
  var y = Math.floor((event.clientY - p.top)/yincr);
  var casella = array[y][x];
  //Pintam i seleccionam la fitxa al final de la columna clickada.
  var caselladef = pintafitxa(casella,x,y);
  //Miram la seva posicio dins l'array
  x = caselladef.xx;
  y =  caselladef.yy;
  //
  victoria(caselladef,x,y);
  if (win != " ") {
    alert("Victoria del jugador: " + win);
    location.reload();
  }
});

//Funcio que a partir de una casella ens torna
//la ultima de la columna que no estigui pintada
function pintafitxa(casella,x,y) {
  for (var i = y; i < 6; i++) {
    if (array[i][x].painted == false) {
      casella= array[i][x];
      casella.yy = i;
      casella.xx = x;
    }
  }
  if (!casella.painted) {
    casella.fill(jugador);
    c.fill();
    if (jugador == jugador1) {
      jugador = jugador2;
    } else {
      jugador = jugador1;
    }
  }
  return casella;
}

//Funcio que crida a les condicions de victoria
function victoria(casella,x,y) {
  victoriacol(casella,x,y);
  victorialinea(casella,x,y);
  victoriadiag(casella,x,y);
  victoriadiag2(casella,x,y);
}

//Funcio que comprova la columna de la casella pintada
function victoriacol(casella,x,y) {
  var pj = casella.jugador;
  var int = 0;
  for (var i = 0; i < 6; i++) {
    if (array[i][x].jugador == pj) {
      int++;
    } else {
      int = 0;
    }
    if (int == 4) {win = pj;}
  }
  int = 0;
}
//Funcio que comprova la linea de la casella pintada
function victorialinea(casella,x,y) {
  var pj = casella.jugador;
  var int = 0;
  for (var i = 0; i < 6; i++) {
    int = 0;
    for (var j = 0; j < 7; j++) {
      if (array[i][j].jugador == pj) {
        int++;
      } else {
        int = 0;
      }
      if (int == 4) {
        win = pj;
      }
    }
  }
  int = 0;
}
//Funcio que comprova diagonalment(\)
function victoriadiag(casella,x,y) {
  var pj = casella.jugador;
  var int = 0;
  while (x >= 0 && y >= 0) {
    x--; y--;
  }
  while (true) {
    x++; y++;
    if (x < 7 && y < 6) {
      casella = array[y][x];
      if (casella.jugador == pj) {
        int++;
      } else {
        int = 0;
      }
    } else {
      break;
    }
  }
  if (int >= 4) {
    win = pj;
  }
}

//Funcio que comprova diagonalment(/)
function victoriadiag2(casella,x,y) {
  var pj = casella.jugador;
  var int = 0;
  while (x < 7 && y >= 0) {
    x++; y--;
  }
  while (true) {
    x--; y++;
    if (x >= 0 && y < 6) {
      casella = array[y][x];
      if (casella.jugador == pj) {
        int++;
      } else {
        int = 0;
      }
    } else {
      break;
    }
  }
  if (int >= 4) {
  win = pj;
  }
}
