/** ----- Quick Book Logic ----- **/

document.addEventListener("DOMContentLoaded", function() {

    // Select all elements with data-action-button="true"
    const actionButtons = document.querySelectorAll('[data-book-intent="true"]');
    
    // Attach a click event listener to each of these elements
    actionButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Get the href attribute of the clicked element
            const href = button.getAttribute('href');
            
            // Check if the href is valid
            if (href) {
                // Open the URL in the same window
                window.location.href = href;
            }
        });
    });


    /* Functon to control visibility of Activity Dropdown Items */
    
          function handleDropdownUpdateClick() {
               const secondaryfilter = document.getElementById("activity-selector");
               secondaryfilter.classList.remove("is-inactive");
           
           /*Unhide all Activity dropdowns*/
               const ele_var = document.querySelectorAll('[activity-dropdown-item="true"]');  
               ele_var.forEach((element) => {  
               element.classList.remove('hide');  
               });  
       
               // Step 1: Get the text from the element with data-target-heading="true"
               let targetHeadingElement = document.querySelector('[data-target-heading="true"]');
               if (targetHeadingElement) {
                   let currentLocation = targetHeadingElement.innerText;
       
                   // Step 2: Make an alert with the value stored in currentLocation
                   /*
                   alert(currentLocation);
                   */
       
                   // Step 3: Find an element with activity-checker="true" and check if activity-checker-name matches currentLocation. Hide elements that match.
                   let activityChecker = Array.from(document.querySelectorAll('[activity-checker="true"]'))
                                               .find(element => element.getAttribute('activity-checker-name') === currentLocation);
       
                   if (activityChecker) {
                       // Step 4: Inside the activity-checker element, find the element with the class 'w-dyn-items'
                       let dynItems = activityChecker.querySelector('.w-dyn-items');
                       if (dynItems) {
                           // Get all child elements and log the value of their activity-checker-item attribute
                           let items = dynItems.querySelectorAll('[activity-checker-item]');
                           items.forEach(item => {
                             
                                                        let locationSelect = document.getElementById('location-selector');
                                                       let elements = locationSelect.querySelectorAll('[activity-dropdown-item]');
       //    console.log(locationSelect);
           // Iterate through each element
                                                           elements.forEach((element) => {
                                     if (element.textContent.trim() === item.getAttribute('activity-checker-item')) {
                                         // Add the class 'hide' to the element
                                         element.classList.add('hide');
                                     } 
       
                                 });
       
                      
                           });
                       }
                   }
               }
               
               
           }
    
    
    /* REMOVE ALL LOCATIONS from condition invisible to allow filtering without a nested list */
        // Find all elements with fs-cmsfilter-field="location" and class "w-condition-invisible"
        const elementsToRemove = document.querySelectorAll('[fs-cmsfilter-field="location"].w-condition-invisible');
        //const removedCount = elementsToRemove.length;
    
        elementsToRemove.forEach(element => element.remove());
    
        // Display alert with the count of removed elements
        //alert(`Removed ${removedCount} elements with fs-cmsfilter-field="location" and class 'w-condition-invisible'.`);
    
    
    
    /*** Bind the location ID to all buttons when a location is selected **/
    
    document.getElementById("location-select").addEventListener("change", function() {
        // Get the selected value from the location-select dropdown
        const selectedValue = this.value;
        //alert(`Selected location: ${selectedValue}`);
        
        // Find the element with the venue-location-name matching the selected value
        const matchingElement = document.querySelector(`[venue-location-name="${selectedValue}"]`);
        
        if (matchingElement) {
            // Get the venue-location-id from the matching element
            const locationId = matchingElement.getAttribute("venue-location-id");
            //alert(`Venue Location ID: ${locationId}`);
    
            // Find all anchor elements with data-action-button="true" and update their hyperlink
            const actionButtons = document.querySelectorAll('a[data-action-button="true"]');
            actionButtons.forEach(button => {
                // Add the locationId parameter to the hyperlink's href
                const url = new URL(button.href);
                url.searchParams.set("locationId", locationId);
                button.href = url.toString();
            });
        } else {
           // alert("No matching venue found for the selected location.");
        }
    });
    
    
    /*** Control visibility of activity buttons and Golf Course Finder depending on which activity is selected **/
    
    
    // Get the activity-select element
    const activitySelect = document.getElementById("activity-select");
    
    // Alert the initial value of the select element
    //alert(`Initial Activity Value: ${activitySelect.value}`);
    
    // Add event listener for changes on the select element
    activitySelect.addEventListener("change", function() {
        // Get the selected value
        const selectedValue = this.value;
        //alert(`Activity selected: ${selectedValue}`);
        
        // Get the activity-results and golf-course-finder elements
        const activityResults = document.getElementById("activity-results");
        const golfCourseFinder = document.querySelector('#golf-course-finder');
    
        // Show or hide the activity-results based on the selected value
        if (selectedValue === 'Select Activity' || selectedValue === '') {
            activityResults.classList.add('hide'); // Hide if 'Select Activity' is selected
        } else {
            activityResults.classList.remove('hide'); // Show if a valid activity is selected
        }
    
        // Show or hide the golf-course-finder based on the selected value
        if (selectedValue === 'Crazy Golf') {
            golfCourseFinder.classList.remove('hide'); // Show if 'Crazy Golf' is selected
        } else {
            golfCourseFinder.classList.add('hide'); // Hide otherwise
        }
    });
    
    
    /** Control visibility of Activity Selector **/
    
    // Get the location-select and activity-selector-dropdown elements
    const locationSelect = document.getElementById("location-select");
    const activitySelectorDropdown = document.getElementById("activity-selector-dropdown");
    
    // Add event listener for changes on the location-select element
    locationSelect.addEventListener("change", function() {
        // Get the selected value
        const selectedValue = this.value;
             //handleDropdownUpdateClick();
        // Check if the value is empty or 'Select location'
        if (selectedValue === '' || selectedValue === 'Select location') {
            activitySelectorDropdown.classList.add('is-inactive'); // Add class if no valid location is selected
        } else {
            activitySelectorDropdown.classList.remove('is-inactive'); // Remove class if a valid location is selected
        }
    });
    
    
    /*Reset Filter 2 when Filter 1 changed*/
         window.fsAttributes = window.fsAttributes || [];
         window.fsAttributes.push([
           'cmsfilter',
           (filterInstances) => {
             //console.log('cmsfilter Successfully loaded!');
       
             const [filterInstance] = filterInstances;
             const { listInstance } = filterInstance;
       
             const locationDropdown = document.getElementById('location-select');
                       
              
              
              
              
             locationDropdown.addEventListener('change', () => {
    
    // Hide the child items for this location which are not available here.
    
    // Get the location-select element and assign its current value to currentLocation
    const locationSelect = document.getElementById("location-select");
    const currentLocation = locationSelect.value;
    
    // Find the DOM element with data attribute 'activity-checker-name' matching currentLocation
    const matchingElement = document.querySelector(`[activity-checker-name="${currentLocation}"]`);
    
    // Initialize an array to hold the activity-checker-item values
    let activityItems = [];
    
    // Get all elements with activity-dropdown-item="true" and remove the 'hide' class from each
    const dropdownItems = document.querySelectorAll('[activity-dropdown-item="true"]');
    dropdownItems.forEach(item => item.classList.remove('hide'));
    
    // Check if matchingElement exists
    if (matchingElement) {
        // Select all child elements with the attribute activity-checker-item within matchingElement
        const childItems = matchingElement.querySelectorAll('[activity-checker-item]');
    
        // Populate the array with the values of the activity-checker-item attributes, excluding those with the class 'w-condition-invisible'
        childItems.forEach(item => {
            if (!item.classList.contains('w-condition-invisible')) {
                activityItems.push(item.getAttribute('activity-checker-item'));
            }
        });
    }
    
    // Alert the array of values found
    //alert(`Activity Items found for ${currentLocation}: ${activityItems.join(', ')}`);
    
    // Check each dropdown item to see if its inner text matches any activity items
    dropdownItems.forEach(item => {
        if (activityItems.includes(item.textContent.trim())) {
            item.classList.add('hide'); // Add 'hide' class if a match is found
        }
    });
    
    
    
    // Reset the Activity Filter
               filterInstance.resetFilters(['activity']);
             });
           }
         ]);
    
    
    
    
    
    // Function to hide go-button by adding the 'hide' class
    function hideGoButton() {
        const goButton = document.getElementById('go-button');
        if (goButton) {
            goButton.classList.add('hide');
            goButton.classList.remove('is-inactive');
        }
    }
    
    // Add event listeners to hide go-button when clicking elements with specific IDs
    document.getElementById('activity-selector-dropdown').addEventListener('click', hideGoButton);
    document.getElementById('select-venue').addEventListener('click', hideGoButton);
    
    // Add event listener for click events on <a> elements with data-action-button="true" to show go-button and set href
    document.querySelectorAll('a[data-action-button="true"]').forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default link behavior
            event.preventDefault();
    
            // Get the data-course-link value from the clicked element
            const courseLink = this.getAttribute('data-course-link');
            
            // Find the element with ID 'go-button'
            const goButton = document.getElementById('go-button');
            
            // Check if goButton and courseLink are defined
            if (goButton && courseLink) {
                // Remove the 'hide' class from goButton to make it visible
                goButton.classList.remove('hide');
                goButton.classList.remove('is-inactive');
                
                // Set the href attribute of goButton to the courseLink value
                goButton.href = courseLink;
            }
        });
    });
    
    
    
    });
    
    
    /* Relabel Golf Course Dropdown with the selected value */
    
    document.addEventListener('DOMContentLoaded', () => {
        // Event listener for elements with the attribute `data-golf-course-name`
        document.querySelectorAll('[data-golf-course-name]').forEach(element => {
          element.addEventListener('click', () => {
            // Get the value of the `data-golf-course-name` attribute
            const courseName = element.getAttribute('data-golf-course-name');
            
            // Find the element with the ID `course-dropdown-label`
            const courseDropdownLabel = document.getElementById('course-dropdown-label');
            
            if (courseDropdownLabel) {
              // Change the inner HTML text value to the course name
              courseDropdownLabel.innerHTML = courseName;
            } else {
              console.log('Element with ID course-dropdown-label not found.');
            }
          });
        });
    
        // Event listeners for changes in the select elements with IDs `location-select` or `activity-select`
        ['location-select', 'activity-select'].forEach(selectId => {
          const selectElement = document.getElementById(selectId);
          
          if (selectElement) {
            selectElement.addEventListener('change', () => {
              // Find the element with the ID `course-dropdown-label`
              const courseDropdownLabel = document.getElementById('course-dropdown-label');
              
              if (courseDropdownLabel) {
                // Change the inner HTML text value to 'Which Course?'
                courseDropdownLabel.innerHTML = 'Which Course?';
              } else {
                console.log('Element with ID course-dropdown-label not found.');
              }
            });
          } else {
            console.log(`Select element with ID ${selectId} not found.`);
          }
        });
      });
      /* End Relabelling */