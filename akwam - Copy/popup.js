console.log("Akwam Donwload     ::    ADDED");
  
  async function series() {
    const links = document.querySelectorAll('div.bg-primary2.p-4.col-lg-4.col-md-6.col-12');
    const reversedLinks = Array.from(links).reverse();
  
    for (const div of reversedLinks) {
      const a = div.getElementsByTagName("a")[0];
      const link = a.getAttribute('href');
      const response1 = await fetch(link, { credentials: 'include' });
      const html1 = await response1.text();
      const url = new DOMParser().parseFromString(html1, 'text/html').querySelector('a.link-btn.link-download.d-flex.align-items-center.px-3').getAttribute('href').replace('http://', 'https://');;
        //get the 'https://re.two.re/link/4897' 
      chrome.tabs.sendMessage({ action: "getlink", url:url})
      // const response3 = await fetch(part, { credentials: 'include' });
      // const html3 = await response3.text();
      // const video = new DOMParser().parseFromString(html3, 'text/html').querySelector('a.link.btn.btn-light').getAttribute('href');
      console.log(`${link}    ${a.textContent}`);
      // console.log(`Video: ${video}`);
    }
  }
  
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
       // Get the target div
const targetDiv = document.querySelector('div.col-lg-2.col-md-3.col-sm-4.d-flex.flex-column.px-4.px-sm-0');
  // Create the input element
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'button');
  inputElement.setAttribute('value', 'تحميل الحلقات');
  inputElement.classList.add('btn', 'btn-light', 'btn-pill', 'd-flex', 'align-items-center', 'font-size-20', 'font-weight-bold');  

  
  // Optional: Add an event listener to the input element
  inputElement.addEventListener('click', function() {
    // Handle button click event
    series()
    });
// Check if the div is found
if (targetDiv) {
  // Add the input element to the target div
  targetDiv.appendChild(inputElement);
} else {
  // The div is not found
  trdocument.getElementsByClassName("row py-4")[0].getElementsByTagName("div")[0].appendChild(inputElement);
}

      }
    });


    /*    const links = document.querySelectorAll('div.bg-primary2.p-4.col-lg-4.col-md-6.col-12');
    const reversedLinks = Array.from(links).reverse();
  
    for (const div of reversedLinks) {
      const a = div.getElementsByTagName("a")[0];
      const link = a.getAttribute('href');
      const response1 = await fetch(link, { credentials: 'include' });
      const html1 = await response1.text();
      const url = new DOMParser().parseFromString(html1, 'text/html').querySelector('a.link-btn.link-download.d-flex.align-items-center.px-3').getAttribute('href').replace('http://', 'https://');;
      const response2 = await fetch(url);
      const html2 = await response2.text();
      const part = new DOMParser().parseFromString(html2, 'text/html').querySelector('div.content').querySelector('a.download-link').getAttribute('href');
      const response3 = await fetch(part, { credentials: 'include' });
      const html3 = await response3.text();
      const video = new DOMParser().parseFromString(html3, 'text/html').querySelector('a.link.btn.btn-light').getAttribute('href');
      console.log(`${link}    ${a.textContent}`);
      console.log(`Video: ${video}`);
    } */