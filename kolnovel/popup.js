console.log("kol Donwload     ::    ADDED");


  async function kol() {
   
    ;div =document.getElementById("kol_content").getElementsByTagName("p")
    Array.from(div).forEach((p)=>{
        if(getComputedStyle(p).bottom != "-999px"){
            console.log(p)
        }
    }
    )
  }
    
//                  ADD the Button!!

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "addButton") {
        document.getElementsByClassName("sertoinfo")[0].innerHTML +=
        `<input type="button" class="hima-button" id="kol-downloader" onclick="kol()" value="Make website" style="width:100%">`  
      }
    });