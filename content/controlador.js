//main
var debug = true;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
   switch(request.message)
   {
      case "html":
         htmljs.downloadZip();
         return true;
      case "pdf":
         pdf.ActivateOptions= false;
         pdf.createPdf();
         return true;
      case "imagen":
         image();
         return true;
      case "guardar":
            saveGalery.setHtml();
            if (debug) console.log("html guardado")
            return true;
      case "open_page":
            console.log("hola")
            document.write(request.data);
            return true;
      default:
         console.log("opcion no encontrada");
         return false;
   }
 });

