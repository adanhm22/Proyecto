//main

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
   switch(request.message)
   {
      case "html":
         let dom = utiles.tratarDom();
         let pagina = utiles.serializar(dom);
         utiles.descargarArchivo(pagina,'pagina.html');
         return true;
      case "pdf":
         pdf.ActivateOptions= false;
         pdf.createPdf();
         return true;
      case "imagen":
         image();
         return true;
      default:
         console.log("opcion no encontrada");
         return false;
   }
 });

