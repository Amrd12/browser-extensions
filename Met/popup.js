console.log("Met Donwload     ::    ADDED");

function met_download() {
  const list = [];
  const id = [];
  const a = document.getElementsByClassName("tutor-course-topics-contents")[0].getElementsByTagName("a");
  let completedRequests = 0;

  const processRequest = (index) => {
    const link = a[index];
    const href = link.getAttribute("href");
    console.log(link.textContent +"   link  :"+href)  
    fetch(href, { credentials: 'include' })
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const youtubeLink = htmlDoc.getElementsByClassName("plyr__video-embed")[0].getElementsByTagName("iframe")[0].getAttribute("src");
        list[index] = youtubeLink;
        id[index] = youtubeLink.split('/').pop().split('?')[0];
        completedRequests++;

        if (completedRequests === a.length) {
          const videoIds = id.reduce((acc, i) => i ? [...acc, i] : acc, []).join(',');
          chrome.runtime.sendMessage({ action: "openPlaylist", videoIds });
          console.log("https://www.youtube.com/watch_videos?video_ids="+videoIds)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        completedRequests++; // Increment the counter even if an error occurs
      });
  };

  for (let i = 0; i < a.length; i++) {
    processRequest(i);
  }
}




// function met_download() {
//   const list = [];
//   const id = [];
//   const a = document.getElementsByClassName("tutor-course-topics-contents")[0].getElementsByTagName("a");

//   Array.from(a).forEach((link) => {
//     const href = link.getAttribute("href");
//     console.log(href);

//     fetch(href, { credentials: 'include' }) // Use "same-origin" to include tab session
//       .then(response => response.text())
//       .then(data => {
//         console.lod()
//         const parser = new DOMParser();
//         const htmlDoc = parser.parseFromString(data, 'text/html');
//        // console.log(htmlDoc)
//         const youtubeLink = htmlDoc.getElementsByClassName("plyr__video-embed")[0].getElementsByTagName("iframe")[0].getAttribute("src");
//         console.log(youtubeLink);
//         list.push(youtubeLink);
//         id.push(youtubeLink.split('/').pop().split('?')[0]);       
//         if (list.length === a.length) {
//             const videoIds = id.join(',');
//             chrome.runtime.sendMessage({ action: "openPlaylist", videoIds });
//           }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//   });
// }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addButton") {
    const addButton = document.createElement("input");
    addButton.type = "button";
    addButton.id = "met_downloader";
    addButton.value = "Make playlist";
    addButton.className = "course-complete-button";
    addButton.style.width = "100%";

    addButton.addEventListener("click", () => {
      met_download();
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "tutor-course-complete-form-wrap";
    buttonContainer.appendChild(addButton);

    const existingContainer = document.getElementsByClassName("tutor-lead-info-btn-group")[0];
    if (existingContainer) {
      existingContainer.appendChild(buttonContainer);
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.appendChild(buttonContainer);
    //alert("Met-Donloader :: Not Enrolled to the course")
    }
  }
});
