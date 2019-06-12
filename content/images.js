var image = function ()
{
    let link = document.createElement("a");
    html2canvas(document.body).then(function(canvas){
        let image = canvas.toDataURL();
        link.href = image;
        link.download = 'screenshot.png';
        link.click();
      });
 }