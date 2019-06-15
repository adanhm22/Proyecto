// var filesystem;
// var root;

// if(chrome.fileSystem)
// {
//     chrome.fileSystem.requestFileSystem({writable:true},fs=>{
//         filesystem = fs;
//         root = fs.root;
//     });
// }
// else{
//     var requestedBytes = 1024*1024*280; 

//     navigator.webkitPersistentStorage.requestQuota (
//         requestedBytes, function(grantedBytes) {  
//             window.webkitRequestFileSystem(PERSISTENT, grantedBytes, fs=>{
//                 filesystem=fs;
//                 root = fs.root;
//             });
//         }, function(e) { console.log('Error', e); }
//     );
// }

function openCreateFolder(name,callback)
{
    folder.getFolder(name,{create: true},result=>{
        callback(result);
    },onError=>{
       //lo ignoramos
    })
}
function writeFile(value)
{
    // folder.getFile(name,{create: true},file=>{
    //     file.createWriter(writer=>{
    //         writer.write(blob);
    //     },e=>{})
    // },e=>{})

    chrome.storage.local.set({'html': value});
}
function readFile(callback)
{
    // folder.getFile(name,{},file=>{
    //     file.file(blob=>{
    //         let reader = new FileReader();
    //         reader.onloadend=()=>{
    //             callback(reader.result);
    //         }
    //     reader.readAsText(blob);
    //     },errorBlob=>{});
    // })

    chrome.storage.local.get(['html'],result=>{
        callback(result);
    })
}
// async function openFile(name)
// {
//     // folder.getFile(name,{},file=>{
//     //     chrome.tabs.create({'url': file.fullPath});
//     // },error=>{});
//     let html;
//     await readFile(name,result=>{
//         html = result;
//     });

//     chrome.tabs.create({url: 'https://www.google.es'},tab=>{
        
//         chrome.tabs.sendMessage(tab.id,{message: 'open_page',data: html});
//         return true;
//     })
// }

chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        if (request.message == "save")
        {
            writeFile(request.data);
            return true;
        }
        if(request.message=="open")
        {
            readFile(result=>{
                let wind= window.open('about:blank');
                wind.document.write(result.html);
            })
        }
    });