var  htmljs= 
{
    downloadZip:function ()
    {
        //declaracion
        let html = document.cloneNode(true);
        let images = html.images;
        let scripts = html.scripts;
        let styles = html.styleSheets;
        let elements = [];
        elements.push(scripts);
        elements.push(styles)
        elements.push(images);

        if (debug)
        {
            console.log(html);
            console.log(images);
            console.log(styles);
            console.log(scripts);
        }
        //descarga de elementos
        this.downloadElements(html,elements,zip=>{
            zip.generateAsync({type: "blob"})
            .then(blob=>{
                console.log(zip)
                this.saveAs(blob,"page.zip");
            })
        })
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

    downloadElements: async function(html,Aelements,callback)
    {
        let zip = new JSZip();
        let a = 0;
        while ( a<Aelements.length)
        {
                for (let i=0; i<Aelements[a].length; i++)
                {
                    let element = Aelements[a][i];
                    console.log(element);
                    if (element.getAttribute("src"))
                    await fetch(element.getAttribute("src"))
                        .then(function(response) {
                            return response.blob();
                        }).then(blob=>{
                            
                            let name; 
                            let ref; 
                            switch(element.nodeName){
                                
                                case "IMG":
                                    name = htmljs.getName(element,".png");
                                    ref = htmljs.getNewHref(element,"images",".png");
                                    zip.folder('images').file(name,blob,{base64: true}); 
                                    element.setAttribute("src",ref)
                                    break;
                                case "SCRIPT":
                                    name = htmljs.getName(element,".js");
                                    ref = htmljs.getNewHref(element,"scripts",".js");
                                    zip.folder('scripts').file(name,blob,{base64: false});
                                    element.setAttribute("src",ref)
                                    break;
                                default:
                                    if (element.type == "text/css")
                                    { 
                                        name = htmljs.getName(element,".css");
                                        ref = htmljs.getNewHref(element,"styles",".css");
                                        zip.folder('styles').file(name,blob,{base64: false});
                                        element.setAttribute("src",ref)
                                    };
                            }
                        });
                }
            a++;
            if (a==Aelements.length){
                zip.file("index.html",new XMLSerializer().serializeToString(html));
                callback(zip);
            } 
        }
        
    }
}