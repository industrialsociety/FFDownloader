let downloadLinks = [];
let index = 0;

// Function to scroll the page down
function scrollPage() {
  window.scrollBy(0, window.innerHeight);
}

// Function to find and queue download links
function findDownloadLinks() {
  const links = document.querySelectorAll('a.wp-workCard--action');
  links.forEach(link => {
    const span = link.querySelector('span:contains("Download")');
    if (span && !downloadLinks.includes(link)) {
      downloadLinks.push(link);
    }
  });
}

// Function to download the next file in the queue
function downloadNext() {
  if (index < downloadLinks.length) {
    const link = downloadLinks[index];
    chrome.runtime.sendMessage({
      action: 'download',
      url: link.href,
      filename: `file_${index + 1}.pdf`
    }, (response) => {
      console.log(`Download started for ${link.href} with ID: ${response.downloadId}`);
      index++;
      setTimeout(downloadNext, 2000); // Pause for 2 seconds before downloading the next file
    });
  } else {
    console.log('All downloads started.');
  }
}

// Function to handle the loading of new content
function handleNewContent() {
  findDownloadLinks();
  if (downloadLinks.length < 600) {
    scrollPage();
    setTimeout(handleNewContent, 3000); // Wait for 3 seconds for new content to load
  } else {
    downloadNext();
  }
}

// Initial call to start the process
findDownloadLinks();
handleNewContent();
