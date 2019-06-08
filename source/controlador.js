//main
var debug = false;
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
      default:
         console.log("opcion no encontrada");
         return false;
   }
 });

