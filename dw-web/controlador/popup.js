function click() {
   window.location.href="../vista/seleccion_carpeta.html";
}


let boton = document.getElementById("boton");

if(boton){
  boton.onclick=function() {
    click();
  };
}else{
  alert("algo no funciona");
}
