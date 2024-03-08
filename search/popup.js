document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', function () {
    const count = document.getElementById('count').value;
    chrome.runtime.sendMessage({ action: 'start', count: count });
  });
});
console.log("popup")

// content.js
// content.js

// content.js

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'tabUpdated') {
      const targetElement = document.getElementById('id_rc');
      if (targetElement) {
        const observer = new MutationObserver((mutations) => {
          const newTextContent = targetElement.textContent;
          console.log('Element text changed:', newTextContent);
          
          // Disconnect the observer once the text has changed
          observer.disconnect();
          setTimeout(function() {
            // Your code here
          }, 60000);
          // Send the text content as the response to the background script
          sendResponse(newTextContent);
        });

        observer.observe(targetElement, { childList: true, subtree: true });
      }

      // Return true to indicate that sendResponse will be called asynchronously
      return true;
    }
  });