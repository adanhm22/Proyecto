var  htmljs= 
{
    downloadZip: function (element)
    {
        let html = element.cloneNode(true);
        let zip = new JSZip();
        let images = zip.folder("images");
        let childNodes = html.childNodes;
        for (let i = 0; i < childNodes.length; i++)
        {
            if (childNodes[i].nodeName == "IMG")
            {
                //download image
                let download = htmljs.downloadElement(childNodes[i]);
                //change reference
                let href = htmljs.getNewHref(childNodes[i]);
                child.setAttribute("src",href);
                //add to zip
                images.file(htmljs.getName(childNodes[i]), download/*, {base64: true}*/);
            }
            if (childNodes[i].nodeName == "LINK")
            {
                //download image
                let download = htmljs.downloadElement(childNodes[i]);
                //change reference
                let href = htmljs.getNewHref(childNodes[i]);
                childNodes[i].setAttribute("src",href);
                //add to zip
                zip.file(htmljs.getName(childNodes[i]), download/*, {base64: true}*/);
            }
        }
        zip.file("index.html",new XMLSerializer().serializeToString(html));
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            htmljs.saveAs(content, "page.zip");
        });
    },

    getNewHref: function (node,folder=null)
    {
        let href = htmljs.getName(node);
        href = ((folder)?(folder+"/"):"")+href;
        return href;
    },

    downloadElement: function (node)
    {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'blob:http%3A//'+node.getAttribute("src"), true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
            if (this.status == 200) 
            {
                var myBlob = this.response;
                return myBlob;
            // myBlob is now the blob that the object URL pointed to.
            }
        };
        xhr.send();
    },

    getName: function (node)
    {
        let name = node.getAttribute("href");
        let pos = name.lastIndexOf("/");
        name = name.substring ((pos>-1)?pos:0,name.length);
        return name;
    },

    saveAs: function (blob,name)
    {
      let a = document.createElement('a');
      a.download = name;
      a.href = window.webkitURL.createObjectURL(blob);//solo funciona en chrome
      a.click();
    }
}