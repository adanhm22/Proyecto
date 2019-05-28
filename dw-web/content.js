class Utiles
{
   serializar (dom)
   {
      return new XMLSerializer().serializeToString(dom);
   }

   tratarDom ()
   {
      let dom = document.cloneNode(true);
      console.log(a[0].parentNode);
      
      // pasos: necesito descargar todas las imagenes, ponerlas en una carpeta
      // y todos los link pasarlos a su respectivo archivo en esa carpeta.

      return dom;
   }

   descargarArchivo(dom,nombre)
   {
      let blob = new Blob([dom],{type: 'text/plain'});
      let a = document.createElement('a');
      a.download = nombre;
      a.href = window.webkitURL.createObjectURL(blob);//solo funciona en chrome
      a.click();
   }
}

//main
var utiles = new Utiles();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
   if (request.message == "html")
   {  
      let dom = utiles.tratarDom();
      console.log(dom);
      let pagina = utiles.serializar(dom);
      utiles.descargarArchivo(pagina,'pagina.html');
      return true;
   } 
      
 });

