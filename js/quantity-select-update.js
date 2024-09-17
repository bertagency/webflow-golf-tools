document.addEventListener('DOMContentLoaded', function() {
    // Function to update the button link with the selected quantity
    function updateButtonLink(parentElement) {
      // Find all select elements within the parent
      const selects = parentElement.querySelectorAll('select');
      
      // Iterate over each select element
      selects.forEach(select => {
        // Add event listener to detect changes in any select element
        select.addEventListener('change', function() {
          // Get the selected value from the changed select
          const selectedValue = this.value;
          
          // Find the button with data-quantity-selection="target"
          const targetButton = parentElement.querySelector('[data-quantity-selection="target"]');
          
          if (targetButton) {
            // Get the current href of the button
            let buttonLink = targetButton.getAttribute('href');
            
            // Update or add the `qty` query parameter in the link
            const url = new URL(buttonLink, window.location.href);
            url.searchParams.set('qty', selectedValue);
            
            // Set the updated link back to the button
            targetButton.setAttribute('href', url.href);
          }
        });
      });
    }
  
    // Find all parent elements with data-quantity-selection="parent"
    const parentElements = document.querySelectorAll('[data-quantity-selection="parent"]');
  
    // Apply the updateButtonLink function to each parent element
    parentElements.forEach(parentElement => updateButtonLink(parentElement));
  });
  