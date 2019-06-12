chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        if (request.message == "open_url")
        {
            chrome.tabs.create({'url': chrome.extension.getURL(request.url)}, function(tab){
                if (request.debug) console.log("entrando en la página "+request.url);
                return true;
            });
        }
        else return false;

    }

);