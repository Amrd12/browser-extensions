console.log("backend")

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https:\/\/akwam.im\/series/.test(tab.url)) {
      chrome.tabs.sendMessage(tabId, { action: "addButton" });
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if(message.action == "openSec"){
    getlinks(message.url)
  }
}
)

async function getlinks(url){
      const response2 = await fetch(url);
      const html2 = await response2.text();
      const part = new DOMParser().parseFromString(html2, 'text/html').querySelector('div.content').querySelector('a.download-link').getAttribute('href');
      const response3 = await fetch(part, { credentials: 'include' });
      const html3 = await response3.text();
      const video = new DOMParser().parseFromString(html3, 'text/html').querySelector('a.link.btn.btn-light').getAttribute('href');
      console.log(video)
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

// if(message.action == "openSec"){
//   if(tab2){
//     chrome.tabs.update(tab2, { url: playListURL });

//   }else{
//     chrome.tabs.create({ url: playlistUrl }, (tab) => {
//       tab2 = tab.id;

//       chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo, updatedTab) {
//         if (updatedTabId === tabId && changeInfo.status === "complete") {
//           chrome.tabs.onUpdated.removeListener(listener);

//         }
//       });
//     });
//   }
// }
// })