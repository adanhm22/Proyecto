let grupo = document.getElementById("grupo");
console.log(grupo)

if (grupo) grupo.onclick=()=>{
    console.log("hola")
    storage.local.get(['html'],result=>{
        window.document.write(result);
    })
};