console.log("backend")
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https:\/\/animeiat\.tv\/anime\//.test(tab.url)) {
      chrome.tabs.sendMessage(tabId, { action: "addButton" });
    }
  });

