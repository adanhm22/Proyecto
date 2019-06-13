let grupo = document.getElementById("imagen");

if (grupo) grupo.onclick=()=>{
    
        chrome.runtime.sendMessage({
            message: 'createPage'
        });
    
};