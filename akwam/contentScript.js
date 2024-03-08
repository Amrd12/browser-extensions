console.log("backend")

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https:\/\/akwam.one\/series/.test(tab.url)) {
      chrome.tabs.sendMessage(tabId, { action: "addButton" });
    }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action == "SendArray"){
    getlinks(message.array, sendResponse)
    return true;
  }
}
)

async function getlinks(array, sendResponse) {
  const reversedLinks = Array.from(array);
  const tabIds = [], links = [];
  let currentLinkIndex = 0, AkwamLinks = '';

  // Open three tabs
  for (let i = 0; i < 3; i++) {
    const tab = await chrome.tabs.create({});
    tabIds[i] = tab.id;
  }

  for (const currentLink of reversedLinks) {
    await new Promise((resolve) => {
      chrome.tabs.update(tabIds[0], { url: currentLink }, function () {
        // Wait for the first tab navigation to complete
        chrome.tabs.onUpdated.addListener(function listener1(tabId, info) {
          if (tabId === tabIds[0] && info.status === 'complete') {
            // Extract the link from the first tab
            chrome.tabs.sendMessage(tabIds[0], { action: "tab1" }, function (results1) {
              const link1 = results1.link1;

              // Update the second tab with the link from the first tab
              chrome.tabs.update(tabIds[1], { url: link1 }, function () {
                // Wait for the second tab navigation to complete
                chrome.tabs.onUpdated.addListener(function listener2(tabId2, info2) {
                  if (tabId2 === tabIds[1] && info2.status === 'complete') {
                    // Extract the link from the second tab
                    chrome.tabs.sendMessage(tabIds[1], { action: "tab2" }, function (results2) {
                      const link2 = results2.link2;

                      // Update the third tab with the link from the second tab
                      chrome.tabs.update(tabIds[2], { url: link2 }, function () {
                        // Wait for the third tab navigation to complete
                        chrome.tabs.onUpdated.addListener(function listener3(tabId3, info3) {
                          if (tabId3 === tabIds[2] && info3.status === 'complete') {
                            chrome.tabs.onUpdated.removeListener(listener3);

                            // Extract the link from the third tab
                            chrome.tabs.sendMessage(tabIds[2], { action: "tab3" }, function (results3) {
                              const link3 = results3.link3;

                              // Store the link from the third tab
                              links.push(link3);

                              // Process the next link
                              currentLinkIndex++;
                              if (currentLinkIndex === reversedLinks.length) {
                                AkwamLinks = links.join('\n');
                                sendResponse({ copy: AkwamLinks });
                              }
                              chrome.tabs.onUpdated.removeListener(listener1);
                              chrome.tabs.onUpdated.removeListener(listener2);
                              chrome.tabs.onUpdated.removeListener(listener3);
                              resolve();
                            });
                          }
                        });
                      });
                    });
                  }
                });
              });
            });
          }
        });
      });
    });
  }

      for (const tabId of tabIds) {
       chrome.tabs.remove(tabId);
    }
}



// function getlinks(array,sendResponse ){
//   const reversedLinks = Array.from(array);
//   const tabIds = []  , links =[] ;
//   let currentLinkIndex = 0, AkwamLinks = '';
  
  
//   // Open three tabs
//   for (let i = 0; i < 3; i++) {
//     chrome.tabs.create({}, function(tab) {
//       tabIds[i] = tab.id;
//     });
//   }

//   reversedLinks.forEach(
//     (currentLink)=>{
//       //  const a = div.getElementsByTagName("a")[0];
//       //  const currentLink = a.getAttribute('href');
//       chrome.tabs.update(tabIds[0], { url: currentLink }, function() {
//         // Wait for the first tab navigation to complete
//         chrome.tabs.onUpdated.addListener(function listener1(tabId, info) {
//           if (tabId === tabIds[0] && info.status === 'complete') {  
//             // Extract the link from the first tab
//             chrome.tabs.sendMessage(tabIds[0], { action: "tab1" }, function(results1) {
//               const link1 = results1.link1;
  
//               // Update the second tab with the link from the first tab
//               chrome.tabs.update(tabIds[1], { url: link1 }, function() {
//                 // Wait for the second tab navigation to complete
//                 chrome.tabs.onUpdated.addListener(function listener2(tabId2, info2) {
//                   if (tabId2 === tabIds[1] && info2.status === 'complete') {  
//                     // Extract the link from the second tab
//                     chrome.tabs.sendMessage(tabIds[1], { action: "tab2" }
//                     , function(results2) {
//                       const link2 = results2.link2;
  
//                       // Update the third tab with the link from the second tab
//                       chrome.tabs.update(tabIds[2], { url: link2 }, function() {
//                         // Wait for the third tab navigation to complete
//                         chrome.tabs.onUpdated.addListener(function listener3(tabId3, info3) {
//                           if (tabId3 === tabIds[2] && info3.status === 'complete') {
//                             chrome.tabs.onUpdated.removeListener(listener3);
  
//                             // Extract the link from the third tab
//                             chrome.tabs.sendMessage(tabIds[2], { action: "tab3" }
//                             , function(results3) {
//                               const link3 = results3.link3;
  
//                               // Store the link from the third tab
//                               links.push(link3);
  
//                               // Process the next link
//                               currentLinkIndex++;
//                               if (currentLinkIndex === reversedLinks.length) {
//                                 AkwamLinks = links.join('\n');
//                                 console.log(AkwamLinks)
//                                 sendResponse({copy :AkwamLinks})
//                               }
//                               chrome.tabs.onUpdated.removeListener(listener1);
//                               chrome.tabs.onUpdated.removeListener(listener2);
//                               chrome.tabs.onUpdated.removeListener(listener3);
//                             });
//                           }
//                         });
//                       });
//                     });
//                   }
//                 });
//               });
//             });
//           }
//         });
//       });
   
   
   
//     }
//   )

// }

