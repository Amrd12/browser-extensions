console.log("anime Donwload     ::    ADDED");


  async function Anime() {
    var name = window.location.href.split("/")[4];
    console.log(name);
    let i = 1;
    let j = 0;
    const videos = [];
  document.getElementById("Anime Div").innerHTML +=`<div class="text-center d-block align-center"><span draggable="false" style="
  padding: 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  "class="ml-1 mb-1 v-chip v-chip--no-color theme--dark v-size--small">
  <span class="v-chip__content" id="Anime Div Counter"><span>episodes:  </span></span></span>
  </div>`
    while (true) {
      const link = `https://api.animeiat.co/v1/episode/${name}-episode-${i}`;
      const response = await fetch(link);
  
      if (response.status === 404 || response.status === 500) {
        j++;
        if (j === 3) {
          break; // Exit the while loop
        }
      } else {
        document.getElementById("Anime Div Counter").textContent+=`${i}     `
        j = 0;
        const data = await response.json();
        const id = data.data.video.slug;
  
        const videoResponse = await fetch(`https://api.animeiat.co/v1/video/${id}/download`);
        const videoData = await videoResponse.json();
        let video;
        try {
          video = videoData.data[0].file;
        } catch {
          video = videoData.data[1].file;
        }
  
        videos.push(video);
        console.log(video);
      }
  
      i++;
    }
  
    const clip = videos.join('\n');
    copy1(clip);
    document.getElementById("Anime Div Counter").innerHTML+="<br>Anime  ::  finished!"
    console.log("Anime  ::  finished!")
    };
  
    function copy1(text) {
      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];
    
      navigator.clipboard.write(data).then(() => {
        // success
        console.log("coppied 1")
      }, () => {
        // failure
        copy2(text)
      });
    }
    function copy2(text) {
      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];
    
      navigator.clipboard.write(data).then(() => {
        // success
        console.log("coppied 2")
      }, () => {
        // failure
        copy3(text)
      });
    }    

    function copy3(text) {
      var copyFrom = document.createElement("textarea");
      copyFrom.textContent = text;
      copyFrom.style.position = "fixed";
      copyFrom.style.opacity = "0";
      document.body.appendChild(copyFrom);
    
      copyFrom.select();
      document.execCommand("copy");
    
      document.body.removeChild(copyFrom);
      console.log("coppied 3")
    }
    
//                  ADD the Button!!

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "addButton") {
        const hrElement = document.createElement("hr");
        hrElement.setAttribute("role", "separator");
        hrElement.setAttribute("aria-orientation", "horizontal");
        hrElement.classList.add("mt-3", "v-divider", "theme--dark");
        
        const outerDivElement = document.createElement("div");
        outerDivElement.classList.add("text-center", "d-block", "align-center");
        outerDivElement.setAttribute("id","Anime Div")
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