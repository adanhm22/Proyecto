var files =
{ 
    writeHtml: function(value,name)
    {
        //get last id
        chrome.storage.local.get(['id'],async id=>{
            let htmlid;
            if (id.id >= 0) //al ser un numero, al comprobar si existe, si solo pongo "id.id" como comienza en 0 no entra en el if (0 == false)
            htmlid = id.id;
            else 
            htmlid = -1;
            
            htmlid++;
            await chrome.storage.local.set({'id': htmlid});
            //sethtml
            chrome.storage.local.get(['htmls'],htmls=>{
                let obj = {
                    html: value,
                    name: name,
                    id: htmlid
                };
                if (htmls.htmls){
                    htmls.htmls[htmlid]=obj;
                }else{
                    htmls.htmls=[obj];
                }
                chrome.storage.local.set({
                        htmls: htmls.htmls
                });
            })
        })
        
    },

    readHtml:async function(id,callback)
    {
        await chrome.storage.local.get(['id'],idhtml=>{
            if (id>idhtml.id||!idhtml.id||!id)
            {
                callback({
                    message: "error al tratar de leer el html, alguno de los campos es indefinido"
                   + " o el id que se trata de leer es menor que el ultimo guardado",
                   status: "error",
                   function: "readHtml",
                   idhtml: id
                });
            } 
        });
        
        chrome.storage.local.get(['htmls'],htmls=>{
            console.log(htmls)
            callback({
                result: htmls.htmls[id].html,
                status: "ok",
                function: "readHtml",
                idhtml: id
            });
        })
    },

    writeGroup: function(value)
    {

    },

    readGroup: function(callback)
    {

    }
}