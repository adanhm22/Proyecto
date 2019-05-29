//main

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
   if (request.message == "html")
   {  
      let utiles = new Utiles(); 
      let dom = utiles.tratarDom();
      console.log(dom);
      let pagina = utiles.serializar(dom);
      utiles.descargarArchivo(pagina,'pagina.html');
      return true;
   } 
   else
   {
      let utiles = new Utiles();
      utiles.crearPdf();
      return true;
   }
      
 });

