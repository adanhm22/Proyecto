
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
   if (request.message == "dom")
   {
      let respuesta;
      console.log(document)
      chrome.runtime.sendMessage({message: "transform_doc",data : document},function (response){
         respuesta = response(document);
      });
      dom = new XMLSerializer().serializeToString(respuesta);
         descargarPagina(dom,'pagina.html');
      return true;
   } 
      
 });


   function descargarPagina(dom,nombre)
    {
      let blob = new Blob([dom],{type: 'text/plain'});
      let a = document.createElement('a');
      a.download = nombre;
      a.href = window.webkitURL.createObjectURL(blob);//solo funciona en chrome
      a.click();
    }
 
