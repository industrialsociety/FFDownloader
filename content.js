document.addEventListener('DOMContentLoaded', () => {
  const downloadSpans = document.querySelectorAll('span:contains("Download")');
  let index = 0;

  const downloadNext = () => {
    if (index < downloadSpans.length) {
      const span = downloadSpans[index];
      const link = span.closest('a'); // Assuming the span is inside an <a> tag

      if (link) {
        chrome.runtime.sendMessage({
          action: 'download',
          url: link.href,
          filename: `file_${index + 1}.pdf`
        }, (response) => {
          console.log(`Download started for ${link.href} with ID: ${response.downloadId}`);
          index++;
          setTimeout(downloadNext, 2000); // Pause for 2 seconds before downloading the next file
        });
      }
    } else {
      console.log('All downloads started.');
    }
  };

  downloadNext();
});
