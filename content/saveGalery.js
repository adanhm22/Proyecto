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
                message: "saveHtml",
                data: new XMLSerializer().serializeToString(dom),
                name: 'prueba'
            });
        });
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