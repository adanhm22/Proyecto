chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        if (request.message == "open_url")
        {
            chrome.tabs.create({'url': chrome.extension.getURL(request.url)}, function(tab){
                if (request.debug) console.log("entrando en la página "+request.url);
                return true;
            });
        }else if(request.message=="pruebas")
        {
            chrome.tabs.create({'url': 'about:blank'}, function(tab){
                chrome.tabs.sendMessage(tab.id,{message:'escribir',data:request.data});
                return true;
            })
        }
        else return false;

    }

);