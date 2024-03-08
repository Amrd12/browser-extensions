console.log("backend")
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https:\/\/www.animeiat.tv\/anime/.test(tab.url)) {
      chrome.tabs.sendMessage(tabId, { action: "addButton" });
    }
  });

  

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openFile") {
      const Name = message.Name;

      // Generate the HTML content dynamically
      chrome.tabs.create({ url: "./file.html" }, (tab) => {
        chrome.runtime.sendMessage({ Name: Name });
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["file.js"]
        });
      });
    }
  });
  chrome.runtime.onInstalled.addListener(() => {
    const extensionId = chrome.runtime.id;
    const manifest = chrome.runtime.getManifest();
    const web_accessible_resources = [
      {
        "matches": ["extension://%extension_id%/*"],
        "resources": ["file.html"]
      }
    ];
    for (const resource of web_accessible_resources) {
      const matches = resource.matches.map(match => match.replace('%extension_id%', extensionId));
      chrome.runtime.setManifest({ web_accessible_resources: [{ ...resource, matches }] });
    }
  });