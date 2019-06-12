var utiles = {
   serializar: function (dom)
   {
      return new XMLSerializer().serializeToString(dom);
   },

   tratarDom: function ()
   {
      let dom = document.cloneNode(true);
      
      // pasos: necesito descargar todas las imagenes, ponerlas en una carpeta
      // y todos los link pasarlos a su respectivo archivo en esa carpeta.

      return dom;
   },

   descargarArchivo: function(dom,nombre)
   {
      let blob = new Blob([dom],{type: 'text/plain'});
      let a = document.createElement('a');
      a.download = nombre;
      a.href = window.webkitURL.createObjectURL(blob);//solo funciona en chrome
      a.click();
   },

   crearPdf: function()
   {
      var opt = {
         margin:       0.5,
         filename:     'myfile.pdf',
         image:        { type: 'jpeg', quality: 0.98 },
         html2canvas:  { scale: 2 },
         jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
       };
      html2pdf().from(document.body).outputImg().set(opt).save();
   },
   crearInstantanea: function ()
   {
      html2canvas(document.body, {
         onrendered (canvas) {
           let link = document.getElementById('download');;
           let image = canvas.toDataURL();
           link.href = image;
           link.download = 'screenshot.png';
         }
        });
   }
};