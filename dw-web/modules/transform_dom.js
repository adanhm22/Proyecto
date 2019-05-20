class TransformDom
{
    nuevoDom(dom) 
    {
        console.log(typeof dom.getElementsByName)
       let a = dom.getElementsByName("a");
       if(a.parentNode)
         a.parentNode.removeChild(a);
       return dom;
    }

}


chrome.runtime.onMessage.addListener(function (request,sender,sendResponse){
    if(request.message=='transform_doc')
    { 
        sendResponse(new TransformDom().nuevoDom(request.data));
        return true;
    }
});
