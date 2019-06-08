var  htmljs= 
{
    downloadZip: function ()
    {
        //declaracion
        let html = document.cloneNode(true);
        let zip = new JSZip();
        let zipImages = zip.folder("images");
        let zipStyles = zip.folder("styles");
        let zipScripts = zip.folder("scripts");
        let images = html.images;
        let styles = html.styleSheets;
        let scripts = html.scripts;

        if (debug)
        {
            console.log(html);
            console.log(images);
            console.log(styles);
            console.log(scripts);
        }
        //descarga de elementos
        htmljs.downloadElements(images,zipImages,".png");
        htmljs.downloadElements(styles,zipStyles,".css");
        htmljs.downloadElements(scripts,zipScripts,".js");

        zip.file("index.html",new XMLSerializer().serializeToString(html));
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            htmljs.saveAs(content, "page.zip");
        });
    },

    getNewHref: function (node,folder="",end)
    {
        let href = htmljs.getName(node,end);
        if (href)
        {
            href = ((folder)?(folder+"/"):"")+href;
            return href;
        }
        return null;
    },

    downloadElement: function (node)
    {
        if (node)
        {
            //arreglar esto
            let url = node.getAttribute("src");
            let urlDocument = document.URL;
            let index = urlDocument.indexOf('/',8);
            urlDocument = urlDocument.substring(0,(index>-1)?index:urlDocument.length);
            url = (url.startsWith('/'))?url:urlDocument+url;
            if (debug)
            {
                console.log (url);
                console.log(urlDocument)
                console.log(url)
            } 
            chrome.runtime.sendMessage(
                { 
                message: 'download',
                url: url
                },function (response)
                {
                    if (debug) console.log(response.data);
                    if (response.data)
                        return response.data
                    return null;
                }
            );
        }
        return null;
    },

    getName: function (node,end)
    {
        let name = node.getAttribute("src");

        
        if (name)
        {
            let pos = name.lastIndexOf("/");
            let pos2 = name.indexOf('?');
            //si la referencia contiene una / corta el string desde ahi, sino desde el principio
            //si contiene una ? corta hasta ahi, sino hasta ek final
            name = name.substring ((pos>-1)?pos+1:0,(pos2>-1)?pos2:name.length);
            if (name.lastIndexOf('.')<0) name= name+end;
            if (debug) console.log (name);
            return name;
        }
        return null;
    },

    saveAs: function (blob,name)
    {
      let a = document.createElement('a');
      a.download = name;
      a.href = window.webkitURL.createObjectURL(blob);//solo funciona en chrome
      a.click();
    },

    downloadElements: function(elements,folder,end)
    {
        for (let i = 0; i<elements.length; i++)
        {
            let element = elements[i];
            let name = htmljs.getName(element,end);
            let ref = htmljs.getNewHref(element,folder,end);
            
            if (name)
            {
                let content = htmljs.downloadElement(element);
                folder.file(name,content);
                element.setAttribute("href",ref);
            }
        }
    }
}