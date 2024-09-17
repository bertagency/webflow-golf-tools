document.addEventListener('DOMContentLoaded', function() {
    // Function to copy the current URL to the clipboard
    function copyToClipboard() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        console.log('URL copied to clipboard:', url);
      }).catch(err => {
        console.error('Failed to copy URL to clipboard:', err);
      });
    }
  
    // Function to add fade effect by manipulating opacity
    function fadeOut(element, duration = 300) {
      element.style.transition = `opacity ${duration}ms ease-in-out`;
      element.style.opacity = 0;
    }
  
    function fadeIn(element, duration = 300) {
      element.style.transition = `opacity ${duration}ms ease-in-out`;
      element.style.opacity = 1;
    }
  
    // Add event listener to elements with data-share="clicktarget"
    const shareElements = document.querySelectorAll('[data-share="clicktarget"]');
    shareElements.forEach(element => {
      element.addEventListener('click', function() {
        // Copy the URL to the clipboard
        copyToClipboard();
  
        // Fade out the text and then change it
        fadeOut(this, 300);
  
        setTimeout(() => {
          this.textContent = 'Copied!';
  
          // Fade in the new text
          fadeIn(this, 300);
  
          // Revert the text after 2 seconds
          setTimeout(() => {
            fadeOut(this, 300);
            setTimeout(() => {
              this.textContent = 'Share';
              fadeIn(this, 300);
            }, 300); // Wait for the fade-out to finish before changing the text
          }, 2000); // After 2 seconds show the original text
        }, 300); // Wait for the fade-out to finish
      });
    });
  });