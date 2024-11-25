window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsfilter',
  (filterInstances) => {
    console.log('cmsfilter Successfully loaded!');
    console.log('cmsfilter has been loaded successfully!');

    // Find the element with `data-venue-override`
    const venueOverrideElement = document.querySelector('[data-venue-override]');

    if (venueOverrideElement) {
      // Get the stored value from the element's attribute
      const venueValue = venueOverrideElement.getAttribute('data-venue-override');
      
      // Show an alert with the stored value
      console.log(`Venue Override Value: ${venueValue}`);

      // Find the select element with the ID `location-select`
      const locationSelect = document.getElementById('location-select');

      if (locationSelect) {
        // Change the value of the select element to the `data-venue-override` value
        locationSelect.value = venueValue;

        // Optionally, trigger a change event if needed
        locationSelect.dispatchEvent(new Event('change'));
      } else {
        console.log('Select element with ID location-select not found.');
      }

      // Find the div with `activity-checker-name` matching `venueValue`
      const matchingElement = document.querySelector(`[activity-checker-name="${venueValue}"]`);

      if (matchingElement) {
        // Get all child elements with the `activity-checker-item` attribute and `w-condition-invisible` class
        const invisibleItems = Array.from(matchingElement.querySelectorAll('[activity-checker-item]:not(.w-condition-invisible)'));
        
        if (invisibleItems.length > 0) {
          // Alert the list of `activity-checker-item` values that have the class `w-condition-invisible`
          console.log(`Found ${invisibleItems.length} 'activity-checker-item' elements with 'w-condition-invisible':\n` + 
                invisibleItems.map(item => item.getAttribute('activity-checker-item')).join(', '));

          // Loop through each `activity-checker-item` value
          invisibleItems.forEach(item => {
            const itemValue = item.getAttribute('activity-checker-item');
            
            // Find the matching element in the DOM with `activity-dropdown-item="true"` and matching inner HTML
            const matchingDropdownItem = Array.from(document.querySelectorAll('[activity-dropdown-item="true"]')).find(dropdownItem => 
              dropdownItem.textContent.trim() === itemValue);
            
            if (matchingDropdownItem) {
              // Add the 'hide' class to the matching dropdown item
              matchingDropdownItem.classList.add('hide');
            }
          });
        } else {
          console.log('No activity-checker-item elements with "w-condition-invisible" class found.');
        }
      } else {
        console.log(`No matching element found for activity-checker-name="${venueValue}"`);
      }
    } else {
      console.log('No element with data-venue-override found.');
    }
  }
]);