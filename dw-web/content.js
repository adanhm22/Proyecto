
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
   if (request.message == "dom")
   {
      alert("recogiendo dom");
      let tratamiento = new TratarDom();

      let dom = new XMLSerializer().serializeToString(tratamiento.nuevoDom());
      tratamiento.descargarPagina(dom,'pagina.html');
   } 
      return true;
 });

 class TratarDom
 {
    nuevoDom() 
    {
       let dom = document;
       let a = dom.getElementsByName("a");
       if(a.parentNode)
         a.parentNode.removeChild(a);
       return dom;
    }

    descargarPagina(dom,nombre)
    {
      let blob = new Blob([dom],{type: 'text/plain'});
      let a = document.createElement('a');
      a.download = nombre;
      a.href = window.webkitURL.createObjectURL(blob);//solo funciona en chrome
      a.click();
    }
 }
