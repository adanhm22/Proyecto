function click() {
  alert("hola");
}


let boton = document.getElementById("boton");

if(boton){
  boton.onclick=function() {
    click();
  };
}else{
  alert("algo no funciona");
}
