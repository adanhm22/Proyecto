var botonCaptura = document.getElementById("boton");
var botonGaleria = document.getElementById("galeria");
var select = document.getElementById("seleccion").options;

if(botonCaptura) botonCaptura.onclick=()=>{click()};
if(botonGaleria) botonGaleria.onclick=()=>{click('galeria')};

function click(mensaje = "") {
        if (mensaje=="") mensaje=select[select.selectedIndex].value;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: mensaje});
        return true;
        });
        // esto ya funciona
}





