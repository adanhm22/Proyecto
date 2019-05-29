class Utiles
{
   serializar (dom)
   {
      return new XMLSerializer().serializeToString(dom);
   }

   tratarDom ()
   {
      let dom = document.cloneNode(true);
      
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

   crearPdf()
   {
      let doc = new jsPDF();
      doc.text(20, 20, 'Hello world!');
      doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
      doc.addPage();
      doc.text(20, 20, 'Do you like that?');

      // Output as Data URI
      doc.output('datauri');
   }
}