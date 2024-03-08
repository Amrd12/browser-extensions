console.log("backend")

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https:\/\/kolnovel.com\/series/.test(tab.url)) {
      chrome.tabs.sendMessage(tabId, { action: "addButton" });
    }
  });

  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPlaylist") {
      const playlistUrl = "https://www.youtube.com/watch_videos?video_ids=" + message.videoIds;
  
      chrome.tabs.create({ url: playlistUrl }, (tab) => {
        const tabId = tab.id;
  
        chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo, updatedTab) {
          if (updatedTabId === tabId && changeInfo.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);
  
            const playlistLink = updatedTab.url.split('list=')[1];
            const playListURL = `https://www.youtube.com/playlist?list=${playlistLink}&disable_polymer=true`;
  
            chrome.tabs.update(tabId, { url: playListURL });
          }
        });
      });
    }
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openFile") {
    const messageName = message.Name;

    // Generate the HTML content dynamically
    const htmlContent = `
      <html>
        <head>
          <title>${messageName}</title>
        </head>
        <body>
          <h1>${messageName}</h1>
          <script src="file.js"></script>
        </body>
      </html>
    `;
  chrome.tabs.create({url: url}, (tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });
}});

  