
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
   if (request.message == "hol")
      alert("me han dicho hola!");
   return true;
 });


//var cabeza = document.getElementsByTagName("title")[0];
//if(cabeza)
//  chrome.runtime.sendMessage(cabeza.innerText);
//
//  chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse){
//  console.log("c");
//  alert(request.data);
//});

// let ps = document.body.getElementsByTagName("p");
// for  ( p of ps)
//     p.style['background-color']= '#FF00FF';
