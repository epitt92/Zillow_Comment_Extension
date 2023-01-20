// document.body.style.backgroundColor = 'red';

// const newNode = document.createElement('li');
// const textNode = document.createTextNode('Water');
// newNode.appendChild(textNode);
// const body = document.querySelector('body');
// body.appendChild(newNode);

// chrome.runtime.sendMessage({ greeting: 'hello' }, function (response) {
//     console.log(response);
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
//     if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
//     return true
// });

// chrome.storage.local.get(null, (obj) => {

//     console.log("connected!!!!!", obj)
//     if(obj.connected){
//         chrome.runtime.sendMessage(
//             {
//                 type: 'request',
//                 url: `https://epicvpn.net/api/account/v1/connections/check`,
//                 method: 'get',
//                 params: { token: obj.token, vpn_name:obj.vpnName, vpn_password: obj.vpnPassword },
//             },
//             async (response) => {
//                 if (!response.error) {
//                     chrome.runtime.sendMessage({ type: 'setProxy', domain: obj.domain, port: obj.port,  vpn_name:obj.vpnName, vpn_password: obj.vpnPassword }, () => {
                    
                        
//                         console.log("connected")
//                     });
//                 } else {
//                     console.log("vpn disconnected")
//                 }
//             }
//         );
//     }
// });
    
// const messageToShow = 'message';

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     // Once we receive a message from the popup
//     if (request.msg) {
//         // If message has the `action` key `print_in_console`
//         if (request.msg.action === 'print_in_console') {
//             // print awesome text on console
//             console.log(`%c ${atob(messageToShow)}`, 'color:#38B549;');
//             console.dir(document.querySelector('.main'));
//         } else if (request.msg.action === 'change_body_color') {
//             // message contains different `action` key. This time it's a `change_body_color`.
//             document.body.style.background = request.msg.value;
//         } else if (request.msg.action === 'logout') {
//             localStorage.clear();
//             document.cookie.split(';').forEach(function (c) {
//                 document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
//             });
//             console.log(localStorage);
//         }
//     }
//     return true;
// });

// document.addEventListener('yourCustomEvent', function (e) {
//     var data = e.detail;
//     console.log('received', data);
// });