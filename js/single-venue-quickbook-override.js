
// Single Venue Popup Auto Select /

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsfilter',
    (filterInstances) => {
      console.log('cmsfilter Successfully loaded!');
      console.log('cmsfilter has been loaded successfully!');


// Hide Golf Items not from this venue

// Step 0: Add the 'hide' class to all elements with data-golf-course-checker-targetitem
const targetItems = document.querySelectorAll('[data-golf-course-checker-targetitem]');
targetItems.forEach((targetItem, index) => {
    targetItem.classList.add('hide');
   // console.log(`Target item ${index} initially hidden.`);
});

// Step 1: Find the parent element with data-golf-course-checker="source"
const parentElement = document.querySelector('[data-golf-course-checker="source"]');
//console.log("Parent element found:", parentElement);

if (parentElement) {
    // Step 2: Find all descendants with data-golf-course-name within the parent
    const descendantsWithNames = parentElement.querySelectorAll('[data-golf-course-name]');
  //  console.log("Descendants with names found:", descendantsWithNames);

    // Step 3: For each descendant element, check against all items in the DOM with data-golf-course-checker-targetitem
    descendantsWithNames.forEach((descendant, index) => {
        const courseName = descendant.getAttribute('data-golf-course-name');
       // console.log(`Descendant ${index} course name:`, courseName);

        targetItems.forEach((targetItem, targetIndex) => {
            const targetCourseName = targetItem.getAttribute('data-golf-course-checker-targetitem');
           // console.log(`Target item ${targetIndex} course name:`, targetCourseName);

            // Step 5: Check if the data value of targetItem matches the courseName of the descendant
            if (targetCourseName === courseName) {
               // console.log(`Match found! Showing target item ${targetIndex}`);
                // Remove the 'hide' class from the target item
                targetItem.classList.remove('hide');
            } else {
               // console.log(`No match for target item ${targetIndex}`);
            }
        });
    });
} else {
   // console.log("Parent element not found. Exiting.");
}





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

