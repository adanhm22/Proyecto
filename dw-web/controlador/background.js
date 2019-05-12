chrome.runtime.onMessage.addListener(msg=>
  {
    if(msg=="hola")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: msg}, function(response) {
        console.log(response?Response.greeting:"NADA");
      });
    });
  });