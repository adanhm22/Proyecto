let grupo = document.getElementById("imagen");

if (grupo) grupo.onclick=()=>{
    console.log("hola")
    chrome.storage.local.get(['html'],result=>{
        window.document.write(result.html);
    })
};