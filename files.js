var files =
{ 
    writeHtml: function(value,name)
    {
        //get last id
        chrome.storage.local.get(['htmlid'],async id=>{
            
            let htmlid;
            if (id.htmlid >= 0) //al ser un numero, al comprobar si existe, si solo pongo "id.id" como comienza en 0 no entra en el if (0 == false)
            htmlid = id.htmlid;
            else 
            {
                htmlid = -1;
                await this.createGroup("sin grupo");
            }
            
            htmlid++;
            console.log(htmlid);
            await chrome.storage.local.set({'htmlid': htmlid});
            //sethtml
            chrome.storage.local.get(['htmls'],htmls=>{
                let obj = {
                    html: value,
                    name: "page "+htmlid,
                    id: htmlid
                };
                if (htmls.htmls){
                    htmls.htmls[htmlid]=obj;
                }else{
                    htmls.htmls=[obj];
                }
                chrome.storage.local.set({'htmls':htmls.htmls});
                this.add2group(htmlid,0);
            })
        })
        
    },

    readHtml:function(id,callback)
    {
        chrome.storage.local.get(['htmlid'],idhtml=>{
            if (id>idhtml.htmlid||idhtml.htmlid==undefined||id==undefined)
            {
                callback({
                    message: "error al tratar de leer el html, alguno de los campos es indefinido"
                   + " o el id que se trata de leer es menor que el ultimo guardado",
                   status: "error",
                   function: "readHtml"
                });
                return;
            }
            chrome.storage.local.get(['htmls'],htmls=>{
                if(!htmls.htmls[id])
                {
                    callback({
                       message: "error al tratar de leer el html, el html no existe",
                       status: "error",
                       function: "readHtml"
                    });
                    return;
                }
                callback({
                    message: "html leido correctamente",
                    result: htmls.htmls[id].html,
                    status: "ok",
                    function: "readHtml",
                    idhtml: id
                });
            })
        });
        
        
    },

    add2group:async function(idhtml,idgroup,callback=response=>{console.log(response.message)})
    {
        let groupid;
        let htmlid;
        chrome.storage.local.get(['htmlid'],id=>{
            htmlid=id.htmlid;
            chrome.storage.local.get(['groupid'],id=>{
                groupid=id.groupid;
                if (idgroup>groupid||idhtml>htmlid||idgroup==undefined||idhtml==undefined||groupid==undefined||htmlid==undefined)
                {
                    callback({
                        message: "error al tratar de leer el html o grupo, alguno de los campos es indefinido"
                        + " o alguno de los id que se trata de leer es menor que el ultimo guardado",
                        status: "error",
                        function: "add2group"
                    })
                    return;
                }
                chrome.storage.local.get(['groups'],groups=>{
                    if(!groups.groups||!groups.groups[groupid]){
                        callback({
                            message: "error al tratar de leer el grupo, el grupo no existe",
                            status: "error",
                            function: "add2group"
                        })
                        return;
                    }
                    let group = groups.groups[groupid];
                    chrome.storage.local.get(['htmls'],htmls=>{
                        if(!htmls.htmls||!htmls.htmls[htmlid]){
                            callback({
                                message: "error al tratar de leer el html, el html no existe",
                                status: "error",
                                function: "add2group"
                            })
                            return;
                        }
                        group.htmls.push(groupid);
                        callback({
                            message: "html nº "+htmlid+" añadido al grupo nº "+groupid,
                            status: "ok",
                            function: "add2group"
                        })
                    })

                })

            });
        });
        
        
    },

    cambioNombreHtml: function(htmlid,nombre,callback=e=>console.log(e.message))
    {
        chrome.storage.local.get(['htmlid'],id=>{
            let idhtml = id.htmlid;
            if(htmlid>idhtml||idhtml==undefined||htmlid==undefined)
            {
                callback({
                    message: "error, alguno de los valores no está definido o se trata de leer un valor mas alto "+
                             "que el ultimo registrado",
                    status: "error",
                    function: "cambioNombreHtml"
                });
                return;
            }
            chrome.storage.local.get(['htmls'],htmls=>{
                if(!htmls.htmls||!htmls.htmls[htmlid])
                {
                    callback({
                        message: "error, al tratar de leer el html, el html no existe",
                        status: "error",
                        function: "cambioNombreHtml"
                    });
                    return;
                }
                htmls.htmls[htmlid].name = nombre;

                chrome.storage.local.set({htmls: htmls.htmls});
                callback({
                    message: "se ha cambiado el nombre",
                    status: "ok",
                    function: "cambioNombreHtml"
                })
            })
        });
    },

    createGroup(name)
    {
        //get last group id
        chrome.storage.local.get(['groupid'],id=>{
            let groupid;
            if (id.groupid >= 0) //al ser un numero, al comprobar si existe, si solo pongo "id.groupid" como comienza en 0 no entra en el if (0 == false)
                groupid = id.groupid;
            else 
                groupid = -1;
            groupid++;

            chrome.storage.local.set({'groupid': groupid});
            chrome.storage.local.get(['groups'],groups=>{
                let obj = {
                    id: groupid,
                    name: name,
                    htmls: []
                };
                if (groups.groups){
                    groups.groups[groupid]=obj;
                }else{
                    groups.groups=[obj];
                }
                
                chrome.storage.local.set({
                    'groups': groups.groups
                });
            });
        });
    },

    getGroups: function(callback)
    {
        chrome.storage.local.get(['groups'],groups=>{
            callback(groups.groups);
        })
    },
    getHtmls: function(callback)
    {
        chrome.storage.local.get(['htmls'],htmls=>{
            callback(htmls.htmls);
        })
    },

    delHtml: function(htmlid,callback=response=>console.log(response.message))
    {
        chrome.storage.local.get(['htmls'],htmls=>{
            if(!htmls.htmls||!htmls.htmls[htmlid])
            {
                callback({
                    message: "error al tratar de leer el html, el html no existe o el parametro pasado no está definido",
                    status: "error",
                    function: "delHtml"
                });
                return;
            }
            htmls.htmls[htmlid]="";
            chrome.storage.local.set({htmls: htmls.htmls});
            callback({
                message: "se ha eliminado el html nº "+htmlid,
                status: "ok",
                function: "delHtml"
            })
        })
    },

    delHtmlFromGroup: function(htmlid,groupid,callback=response=>console.log(response.message))
    {
        chrome.storage.local.get(['htmls'],htmls=>{
            if(!htmls.htmls||!htmls.htmls[htmlid])
            {
                callback({
                    message: "error al tratar de leer el html, el html no existe o el parametro pasado no está definido",
                    status: "error",
                    function: "delHtmlFromGroup"
                });
                return;
            }
            chrome.storage.local.get(['groups'],groups=>{
                if (!groups.groups||!groups.groups[groupid])
                {
                    callback({
                        message: "error al tratar de leer el grupo, el grupo no existe o el parametro pasado por parametro no está definido",
                        status: "error",
                        function: "delHtmlFromGroup"
                    });
                    return;
                }
                let htmls = groups.groups[groupid].htmls;
                for (let i = 0; i<htmls.length; i++)
                {
                    if (htmls[i]===htmlid)
                    {
                        htmls.slice(i,1);
                        callback({
                            message: "se ha eliminado el html nº "+htmlid+" del grupo "+groupid,
                            status: "ok",
                            function: "delHtmlFromGroup"
                        })
                        return;
                    }
                }
                callback({
                    message: "error, el html no estaba en el grupo",
                    status: "error",
                    function: "delHtmlFromGroup"
                })
            })
        })
    }
}