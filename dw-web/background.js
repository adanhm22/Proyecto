// chrome.runtime.onMessage.addListener(function(msg) {
//   // Send a message to the active tab
//   if (msg == "hola")
//   {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "hol"});
    
//   });
//   }
//   return true;
// });
// esto ya funciona