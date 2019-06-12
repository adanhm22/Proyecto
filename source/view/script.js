let grupo = document.getElementById("grupo");

if (grupo) grupo.onclick=()=>{
    console.log("hola")
    storage.local.get(['html'],result=>{
        window.document.write(result);
    })
};