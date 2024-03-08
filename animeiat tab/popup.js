console.log("anime Donwload     ::    ADDED");

function Anime() {
  var name = window.location.href.split("/")[4];
  console.log(name);
  chrome.runtime.sendMessage({ action: "openFile", Name: name });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addButton") {
    const hrElement = document.createElement("hr");
    hrElement.setAttribute("role", "separator");
    hrElement.setAttribute("aria-orientation", "horizontal");
    hrElement.classList.add("mt-3", "v-divider", "theme--dark");
    
    const outerDivElement = document.createElement("div");
    outerDivElement.classList.add("text-center", "d-block", "align-center");
    
    const innerDivElement = document.createElement("div");
    innerDivElement.classList.add("v-card__text", "pb-0", "px-1");
    
    const spanElement = document.createElement("span");
    spanElement.classList.add("ml-1", "mb-1", "v-chip", "v-chip--no-color", "theme--dark", "v-size--small");
    spanElement.style.backgroundColor = "red";
    spanElement.style.fontSize = "1.5rem";
    spanElement.style.padding = "1rem";
    
    const nestedSpanElement = document.createElement("span");
    nestedSpanElement.classList.add("v-chip__content");
    
    const buttonElement = document.createElement("input");
    buttonElement.type = "button";
    buttonElement.value = "Create links";
    buttonElement.addEventListener("click", () => {
      Anime();
    });
    
    nestedSpanElement.appendChild(buttonElement);
    spanElement.appendChild(nestedSpanElement);
    innerDivElement.appendChild(spanElement);
    outerDivElement.appendChild(innerDivElement);
    
    const existingContainer = document.getElementsByClassName("v-card v-sheet")[1].getElementsByClassName("col-md-9 col-lg-10 col-12")[0];
    
    if (existingContainer) {
      existingContainer.appendChild(hrElement);
      existingContainer.appendChild(outerDivElement);
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.appendChild(hrElement);
      body.appendChild(outerDivElement);
    }    
  }
});
