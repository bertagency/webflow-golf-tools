
// Add location to all links
document.addEventListener('DOMContentLoaded', () => {
    // Get all elements in the DOM that have a data attribute of `offer-block=true`
    const offerBlocks = document.querySelectorAll('[data-offer-block="true"]');
  
    offerBlocks.forEach(offerBlock => {
      // Get the value of the `data-location` attribute
      const locationValue = offerBlock.getAttribute('data-location');
  
      // Find all links (anchor tags) within the current offer block
      const links = offerBlock.querySelectorAll('a[href]');
  
      links.forEach(link => {
        // Create a URL object to easily manage query parameters
        const url = new URL(link.href);
        
        // Append the location query parameter
        url.searchParams.set('venue', locationValue);
  
        // Update the href attribute with the new URL
        link.href = url.toString();
      });
    });
  });
  