console.log("background");
// ADD_Button='document.getElementsByClassName("tutor-course-complete-form-wrap")[0].innerHTML += \'<div class="tutor-course-complete-form-wrap"><input type="button" id="met_downloader" onclick="met_download()" value="Make playlist" class="course-complete-button" style="width:100%;"></div>\';';
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https:\/\/els-engmet.com\/courses/.test(tab.url)) {
        // chrome.tabs.executeScript(tabId, { file: "./popup.js" }, () => {
        //     console.log("found course");
        //     chrome.tabs.sendMessage(tabId, { action: "tabId", tabId: tabId });
        // });
        console.log("found course");
        chrome.tabs.executeScript(tabId, { code: addButtonCode }, () => {
            console.log("button_Added");
        });
        chrome.tabs.executeScript(tabId, { code: met_download }, () => {
            console.log("Function_Added");
        });
    }
});
const addButtonCode = `
        const addButton = document.createElement("input");
        addButton.type = "button";
        addButton.id = "met_downloader";
        addButton.value = "Make playlist";
        addButton.className = "course-complete-button";
        addButton.style.width = "100%";

        addButton.addEventListener("click", () => {
            chrome.tabs.sendMessage(${tabId}, { action: "met_dounload" });
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "tutor-course-complete-form-wrap";
        buttonContainer.appendChild(addButton);

        const existingContainer = document.getElementsByClassName("tutor-course-complete-form-wrap")[0];
        if (existingContainer) {
            existingContainer.appendChild(buttonContainer);
        } else {
            document.body.appendChild(buttonContainer);
        }
    `;
