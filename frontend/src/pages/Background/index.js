console.log('This is the background page.');
console.log('Put the background scripts here.');

async function reply(res) {
  console.log(res);
}
chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url && tab.favIconUrl === "https://www.zillow.com/favicon.ico") {
      console.log("URL changed", changeInfo.url)
      try{
        console.log("send message")
        chrome.tabs.sendMessage( tabId, {
          message: 'urlupdated',
          url: changeInfo.url,
          reply
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
);

