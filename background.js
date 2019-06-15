chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        switch(request.message){
            case "open_page": 
                chrome.tabs.create({'url': chrome.extension.getURL(request.url)}, function(tab){
                    if (request.debug) console.log("entrando en la página "+request.url);
                });
                return true;
            case "openHtml":
                files.readHtml(request.id,result=>{
                    if (result.status!= "error")
                    {
                        let wnd = window.open('about:blank');
                        wnd.document.write(result.result);
                    }
                    else 
                        alert (result.message);
                })
                return true;
            case "saveHtml": 
                files.writeHtml(request.data,request.name);
                return true;
        }
    }

);