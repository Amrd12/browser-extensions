// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "tabId") {
//         const tabId = message.tabId;
//         // Use the tabId as needed in your popup.js script
//         console.log("Received tabId:", tabId);
//     }
// });
// ADD_Button=`document.getElementsByClassName("tutor-lead-info-btn-group")[0].innerHTML +='<div class="tutor-lead-info-btn-group"  >
//  <input type="button" id="met_downloader" onclick="met_dounload()" class="tutor-lead-info-btn-group" value="Make playlist"></div>'
// `
// chrome.tabs.executeScript(tabId, { code: ADD_Button }, () => {
//     console.log("button_Added");
// });
console.log("popup.js")
function met_dounload() {
    const list = [];
    const id = [];
    const a = document.getElementsByClassName("tutor-course-topics-contents")[0].getElementsByTagName("a");

    Array.from(a).forEach((link) => {
        const href = link.getAttribute("href");
        console.log(href);

        fetch(href, { credentials: 'same-origin' }) // Use "same-origin" to include tab session
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                const iframeSrc = htmlDoc.getElementsByTagName("iframe")[1].getAttribute("src");
                const youtubeLink = new URL(iframeSrc).searchParams.get("widget_referrer");
                console.log(youtubeLink);

                list.push(youtubeLink);
                id.push(youtubeLink.split('/').pop().split('?')[0]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Convert the list of video IDs to a comma-separated string
    const videoIds = id.join(',');

    // Construct the playlist URL
    const playlistUrl = "http://www.youtube.com/watch_videos?video_ids=" + videoIds;

    // Open the playlist URL in a new tab
    window.open(playlistUrl, "_blank");
}
