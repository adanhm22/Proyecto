let imagen = document.getElementById("imagen");
let contenedor = document.getElementById("contenedor");
let pagina = document.getElementById("pagina");
let grupo = document.getElementById("grupo");
let mod = document.getElementById("mod");
let add = document.getElementById("addgroup");
let buttonCancel = document.getElementById("buttonCancel");
let cancel = document.getElementById("cancelar");
let delpage = document.getElementById("delpage");
let anterior;
let num;

if (delpage) delpage.onclick=()=>{
    borrar=true;
    anterior = "pagina";

    pagina.hidden=true;
    grupo.hidden=true;
    cancel.hidden=false;
    mod.hidden=true;
}
if (mod) mod.onclick=()=>{
    cambioNombre=true;
    if(pagina.hidden)
        anterior = "grupo";
    else anterior = "pagina";

    pagina.hidden=true;
    grupo.hidden=true;
    cancel.hidden=false;
    mod.hidden=true;
}

if(buttonCancel) buttonCancel.onclick=()=>{
    cambioNombre=false;
    if(anterior=="pagina")
        pagina.hidden=false;
    else grupo.hidden=false;
    cancel.hidden=true;
    mod.hidden=false;

    cambioNombre = false;
    borrar = false; 
    mover = false;
}

let cambioNombre = false;
let borrar = false;
let mover = false;


function clearChilds(node)
{
    if (node)
    {
        let all = node.children;
        console.log(all);
        for (let i = 0; i<all.length; i++) all[i].parentNode.removeChild(all[i]);
    }
}

function printAllHtml(){
    files.getHtmls(htmls=>{
        clearChilds(contenedor);
        console.log(htmls);
        if(htmls && htmls.length>0)
        {
            num = htmls.length;
            for (html of htmls)
            {
                if (html)
                {
                    let div = document.createElement('div');
                    div.className="col-lg-12";
                    div.htmlid = html.id;
                    div.textContent=html.name;
                    div.onclick=()=>
                    {
                        if (cambioNombre)
                        {
                            let nuevoNombre = window.prompt("introduce el nuevo nombre",undefined);
                            console.log(nuevoNombre);
                            if(nuevoNombre)
                            {
                                files.cambioNombreHtml(div.htmlid,nuevoNombre,callback=>{
                                    console.log(callback.message);
                                    if(callback.status!="error")
                                    {
                                        this.printAllHtml();
                                        buttonCancel.click();
                                    }
                                });
                            }
                        }
                        else if (borrar)
                        {
                            files.delHtml(html.id,callback=>{
                                console.log(callback.message);
                                if(callback.status!="error")
                                {
                                    this.printAllHtml();
                                    buttonCancel.click();
                                }
                            })
                        }
                        else if (mover)
                        {

                        }
                        else
                            chrome.runtime.sendMessage({message: "openHtml",id: div.htmlid})
                    };
                    contenedor.appendChild(div);
                }
            }   
        }
        if (contenedor.children.length<1)
        {
            cancel.hidden=true;
            grupo.hidden=true;
            pagina.hidden=true;
            mod.hidden=true;
            num=0;
            let div = document.createElement('div');
            div.className="col-lg-12";
            div.textContent="no hay páginas";
            contenedor.appendChild(div);
        }
    });
}

function printGroups(){

}

printAllHtml();