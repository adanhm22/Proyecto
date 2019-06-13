chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        if (request.message == "open_url")
        {
            chrome.tabs.create({'url': chrome.extension.getURL(request.url)}, function(tab){
                if (request.debug) console.log("entrando en la página "+request.url);
                return true;
            });
        }else if (request.message == 'createPage')
        {
            chrome.tabs.create({'url': 'https://www.google.com'}, function(tab){
                chrome.storage.local.get(['html'],result=>{
                    chrome.tabs.executeScript(tab.id,{code:'document.write;', matchAboutBlank: true},write=>{
                        write(result.html);
                    });
                });
                    
            });
        }

    }

);