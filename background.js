chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download') {
    chrome.downloads.download({
      url: message.url,
      filename: message.filename
    }, (downloadId) => {
      sendResponse({ downloadId: downloadId });
    });
    return true; // Will respond asynchronously.
  }
});
