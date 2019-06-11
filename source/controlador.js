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
      case "galeria":
         
            chrome.runtime.sendMessage({message: "open_url",url: 'view/index.html',debug: debug}, response=>{
               if (debug) console.log('abriendo pagina: view/index.html');
            });
            return true;
      case "guardar":
            galery.setHtml();
            galery.getHtml(html=>{
               console.log(html.html)
            })
            return true;
      default:
         console.log("opcion no encontrada");
         return false;
   }
 });

