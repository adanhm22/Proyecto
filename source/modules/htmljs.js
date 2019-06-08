var  htmljs= 
{
    downloadZip: function ()
    {
        //declaracion
        let html = document.cloneNode(true);
        let zip = new JSZip();

        if (debug)
        {
            console.log(html);
            console.log(images);
            console.log(styles);
            console.log(scripts);
        }
        //descarga de elementos
        htmljs.downloadHTML(zip,html,content=>{
            this.saveAs(content,"page.zip");
        });
    },

    downloadHTML: function(zip,html,callback)
    {
        //declaracion
        let images = html.images;
        let scripts = html.scripts;
        let styles = html.styleSheets;

        this.downloadElements(images,zip.folder('images'),'.png',imageFolder=>{
            this.downloadElements(scripts,zip.folder('scripts'),'.js',scriptsFolder=>{
                this.downloadElements(styles,zip.folder('styles'),'.css',stylesFolder=>{
                    zip.generateAsync({type: 'blob'})
                    .then(content=>{
                        callback(content);
                    })
                })
            })
        },true);
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

    downloadElement: function (node,callback)
    {
        if (node)
        {
            let url = node.getAttribute("src");
            let domain = document.domain;
            let htt = document.URL.substring(0,document.URL.indexOf('//'));
            let urlDocument = htt + '//' + domain;

            if (url.startsWith('/') && !url.startsWith('//'))
            {
                url = urlDocument + url;
            }
            else if (url.startsWith('//'))
            {
                url = url.substring(2);
            }
            if (debug)
            {
                console.log(url);
                console.log(urlDocument);
            } 
            chrome.runtime.sendMessage(
                { 
                message: 'download',
                url: url
                },function (response)
                {
                    if (response.data)
                    {
                        if (debug) console.log(response.data);
                        callback(response.data)
                    }
                    else
                        callback(null);
                }
            );
        }
    },

    getName: function (node,end)
    {
        let name = node.getAttribute("src");

        
        if (name)
        {
            let pos = name.lastIndexOf("/");
            let pos2 = name.indexOf('?');
            //si la referencia contiene una / corta el string desde ahi, sino desde el principio
            //si contiene una ? corta hasta ahi, sino hasta el final
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

    downloadElements: function(elements,folder,end,callback,images=false)
    {
        for (let i = 0; i<elements.length; i++)
        {
            let element = elements[i];
            let name = htmljs.getName(element,end);
            let ref = htmljs.getNewHref(element,folder,end);
            
            if (name)
            {
                htmljs.downloadElement(element, content =>{
                    if (debug) console.log(content);
                    let download; 
                    if (images) download = new Blob([content],{type: 'text/plain'})
                    else download = content;
                    if (content)
                    {
                        folder.file(name,download,{binary: true});
                        element.setAttribute("href",ref);
                    }
                });
            }
        }
        callback(folder);
    }
}