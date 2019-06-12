var botonCaptura = document.getElementById("boton");
var botonGaleria = document.getElementById("galeria");
var botonHelp = document.getElementById('help');
var select = document.getElementById("seleccion").options;

if(botonCaptura) botonCaptura.onclick=()=>{captura()};
if(botonGaleria) botonGaleria.onclick=()=>{galeria()};
if(botonHelp) botonHelp.onclick=()=>{help()};

function captura(mensaje = "") 
{
        if (mensaje=="") mensaje=select[select.selectedIndex].value;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: mensaje});
        return true;
        });
        // esto ya funciona
}

function galeria()
{
  location.href = 'galery.html'
}

function help()
{
  chrome.tabs.create({'url': chrome.extension.getURL('/doc/index.html')}, function(tab){
    if (request.debug) console.log("entrando en la página /doc/index.html");
});
}





