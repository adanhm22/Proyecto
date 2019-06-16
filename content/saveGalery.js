var saveGalery = 
{
    setHtml: async function()
    {
        let clon = document.cloneNode(true);
        clon = await this.eliminarImagenes(clon);
        clon = await this.eliminarScripts(clon);

        let charset = document.createElement('meta');
        charset.setAttribute('charset','UTF-8');
        clon.head.appendChild(charset);
        chrome.runtime.sendMessage({
            message: "saveHtml",
            data: new XMLSerializer().serializeToString(clon)
        });
    },
    eliminarImagenes: async function(dom)
    {
        let images = dom.images;
        for (image of images)
            await image.parentNode.removeChild(image);
        console.log(dom)
        return dom;
    },
    eliminarScripts: async function(dom)
    {
        let scripts = dom.scripts;
        for (let i = 0; i<scripts.length; i++)
           await  scripts[i].parentNode.removeChild(scripts[i]);
        return dom
    }
}