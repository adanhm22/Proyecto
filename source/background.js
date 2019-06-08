chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        if (request.message == "download")
        {
            $.get(request.url,function(algo){
                console.log ("tratando de obtener "+request.url);
            }).done(function (data){
                senderResponse({data: data});
                console.log (data);
                console.log(senderResponse);
            }).fail(function (failure){
                console.log("no se ha podido obtener "+request.url);
            });
            return true;
        }
        else return false;

    }

);