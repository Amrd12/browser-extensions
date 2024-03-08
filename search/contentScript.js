console.log("backend");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const count = message.count;
    let tabId;

    chrome.tabs.create({}, function (tab) {
      tabId = tab.id;
      let iteration = 0;

      const updateTab = async () => {
        if (iteration < count) {
          let randomCharacter = "";
          const randomIndex = Math.floor(Math.random() * alphabet.length);
          for(j=0;j<randomIndex;j++){
            const rand = Math.floor(Math.random() * alphabet.length);
            randomCharacter += alphabet[rand]
            if((j%4)==0) randomCharacter +="  "
          }
          const url = `https://www.bing.com/search?q=${randomCharacter}`;
          if(!tabId) return;
          await update(tabId, url);
          iteration++;
        } else {
          // All iterations are completed
          console.log('Tab update iterations completed');
          chrome.tabs.remove(tabId);
          return;
        }

        // Send a message to the updated tab
        chrome.tabs.sendMessage(tabId, { action: 'tabUpdated' }, function (response) {
          console.log('Received response:', response);
          updateTab(); // Proceed to the next iteration
        });
      };

      updateTab(); // Start the initial tab update
    });
  }
});

async function update(tabId, url) {
  return new Promise((resolve) => {
    const completeListener = (updatedTabId, changeInfo) => {
      if (updatedTabId === tabId && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(completeListener);
        resolve();
      }
    };

    chrome.tabs.onUpdated.addListener(completeListener);

    chrome.tabs.update(tabId, { url: url });
  });
}
