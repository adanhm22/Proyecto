var galery = 
{
    setHtml: async function()
    {
        this.eliminarImagenes(dom=>{
            let styles = dom.createElement('style');
            //añadir estilo
            dom.head.appendChild(styles);
            dom.createElement('stylesh')
            chrome.storage.local.set({html:new XMLSerializer().serializeToString(dom)},()=>{
                if (debug) console.log("añadiendo la pagina web")
            })
        });
                /*let wnd = window.open("about:blank", "", "_blank");
                wnd.document.write(result.html);*/
    },
    getHtml: function(callback)
    {
        chrome.storage.local.get(['html'],html=>{
            callback(html);
        })
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