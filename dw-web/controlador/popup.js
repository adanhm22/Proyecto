var boton = document.getElementById("boton");

if(boton) boton.onclick=click;
else alert("algo no funciona");


function click() {
  // window.location.href="../vista/seleccion_carpeta.html";
    chrome.runtime.sendMessage("hola");
  
}





