
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "name") {
      const Name = message.Name;
document.getElementsByTagName("title")[0].textContent = Name
document.getElementsByTagName("h1")[0].textContent = Name 
      }});
    
