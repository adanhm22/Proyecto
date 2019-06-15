var saveGalery = 
{
    setHtml: async function()
    {
        this.eliminarImagenes(dom=>{
            let styles = dom.createElement('style');
            //añadir estilo
            dom.head.appendChild(styles);

            let charset = document.createElement('meta');
            charset.setAttribute('charset','UTF-8');
            dom.head.appendChild(charset);
            chrome.runtime.sendMessage({
                message: "save",
                data: new XMLSerializer().serializeToString(dom),
                name: 'prueba'
            });
        });
                /*let wnd = window.open("about:blank", "", "_blank");
                wnd.document.write(result.html);*/
    },
    eliminarImagenes:  function(callback)
    {
        let clon = document.cloneNode(true);
        let images = clon.images;

        for (image of images)
        {
            image.parentNode.removeChild(image);
        }
        callback(clon);
    }
}