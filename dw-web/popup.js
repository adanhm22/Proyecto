var boton = document.getElementById("boton");

if(boton) boton.onclick=click;
else alert("algo no funciona");


function click() {
  // window.location.href="../vista/seleccion_carpeta.html";
        // chrome.runtime.sendMessage("hola",function(res){
        //   console.log("enviado");
        // });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "hol"});
        });
        // esto ya funciona
}





