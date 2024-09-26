//-- ******************* Activity Selector Conditional Logic 

$("#location-select").change(function(){
    // alert("The text has been changed.");
     const locationselect = document.getElementById("location-select");
     const targetHeading = document.querySelector('[data-target-heading="true"]');
   if(locationselect.selectedIndex == 0) {
       $(".activity-item").addClass("hide");
       targetHeading.textContent = '';
   
   }
   else {
       var selectedText = locationselect.options[locationselect.selectedIndex].text;
       $(".activity-item").removeClass("hide");
       const selectedOption = locationselect.options[locationselect.selectedIndex].text;
           targetHeading.textContent = selectedOption;
   
   }
   });
   
   
   document.addEventListener("DOMContentLoaded", function() {
   // var filtermonitor = "Filtering is available";
   var filtermonitor = false;
   //console.log(filtermonitor);
   
   function createEventListeners() {
   //console.log("Creating Event Listeners");
      /**/
    /* Add Event Listener to dropdowns * SHOULD be only when CMSfiltering has changed the dom */
    document.querySelectorAll('[activity-dropdown-item="true"]').forEach(item => {
       item.addEventListener('click', function() {
       });
   });
   
   document.querySelectorAll('[data-location-item="true"]').forEach(item => {
       item.addEventListener('click', function() {
        document.getElementById('filter-results-dropdown').classList.add('hide');
       /* Reset Secondary Filter every time the first dropdown is used */
           //console.log("Reset Dropdown 2");
       /* First trigger a click on the 'Select Activity' dropdown item to RESET the selection */
       
   //    filterInstance.resetFilters(['activity']);
               document.querySelectorAll('[activity-dropdown-item="true"]').forEach(item => {
           if (item.textContent.trim() === 'Select Activity') {
   
           //item.click();
           //console.log(item);
   
           /* Next click the dropdown Toggle to close the dropdown */
           const dropdownToggle = document.querySelector('#secondary-filter-toggle');
              if (dropdownToggle) {
               //dropdownToggle.dispatchEvent(new Event('mousedown'));
               setTimeout(() => {
                // dropdownToggle.dispatchEvent(new Event('mouseup'));
               }, 10); // A short delay ensures that events are distinguished
   
             }
     
   
   
           }
           
       });
   
       });
   
    
   });
   
   /* Hide Filters id Secondary Filter selects 'Select Activity'. If it contains 'Golf' then transform it to a dropdown */    
   document.querySelectorAll('[activity-dropdown-item="true"]').forEach(item => {
       item.addEventListener('click', function() {
       //console.log("Secondary filter clicked");
       //console.log(item.textContent);

       if (item.textContent.trim() === 'Golf') {
        document.getElementById('filter-results-dropdown').classList.remove('hide');
       //console.log("Golf Selected");
       /*Change the results appearance into a Dropdown*/
       transformGolf();
       } else {
        // If 'Select Activity' is Selected then the filter results should be hidden.
        document.getElementById('filter-results-dropdown').classList.remove('hide');
       resetGolf();
       }
       if (item.textContent.trim() === 'Select Activity') {
        //console.log("Select Selected");
        document.getElementById('filter-results-dropdown').classList.add('hide');
        }
   
       });
   });    
       
   
   
   
   
   }
   
   function transformGolf() {
   document.getElementById('filter-results-dropdown').classList.remove('hide');
   document.getElementById('go-button').classList.remove('hide');
       document.getElementById('filter-results-dropdown').classList.remove('is-normalview');
       document.getElementById('filter-results-toggle').classList.remove('is-normalview');
       document.getElementById('filter-results-list').classList.remove('is-normalview');
   //console.log(filtermonitor);
   //console.log("Thingy");
   }
   
   function resetGolf() {
   document.getElementById('go-button').classList.add('hide');
       document.getElementById('filter-results-dropdown').classList.add('is-normalview');
       document.getElementById('filter-results-toggle').classList.add('is-normalview');
       document.getElementById('filter-results-list').classList.add('is-normalview');
   }
   
   
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
   
   // Attach the click event listener to the element with ID dropdown-update
   /*
   document.getElementById("dropdown-update").addEventListener("click", handleDropdownUpdateClick);
   */
   
   
   /* Update Dropdown when Activity Filter is activated */
   
   window.fsAttributes = window.fsAttributes || [];
   window.fsAttributes.push([
     'cmsload',
     (listInstances) => {
       // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
       const [listInstance] = listInstances;
   
       // The `renderitems` event runs whenever the list renders items after switching pages.
       listInstance.on('renderitems', (renderedItems) => {
       
   
       document.querySelectorAll('[activity-selected="true"]').forEach(item => {
   
   item.addEventListener('click', function() {
           // Find the sibling element with the attribute activity-inner-link-destination="true"
   
           const sibling = item.parentElement.querySelector('[activity-inner-link-destination="true"]');
   
           // Check if the sibling exists and contains an <a> element
           if (sibling) {
               const linkElement = sibling.querySelector('a');
               if (linkElement) {
                   // Get the href value from the <a> element
                   const hrefValue = linkElement.getAttribute('href');
   
                   // Update the href of the button with ID go-button
                   const goButton = document.getElementById('go-button');
                   if (goButton) {
                       goButton.setAttribute('href', hrefValue);
                       goButton.classList.remove('is-inactive');
                   }
               }
           }
       });
   
   });
           // Run these the first time filtering happens
       
       // Log that filtering has happened
       //console.log("Filtering is");
       //console.log(filtermonitor);
       if (filtermonitor) {
       //console.log("I'm not repeating myself");
       } else {
       createEventListeners();
       }
       
       
       filtermonitor = true;
       //console.log(filtermonitor);
   //if filteringhappened {console.log("Filtering has happened")};
   
         handleDropdownUpdateClick();
         
   
       });
     },
   ]);
   
   
   
   
   });
   
     window.fsAttributes = window.fsAttributes || [];
     window.fsAttributes.push([
       'cmsfilter',
       (filterInstances) => {
         //console.log('cmsfilter Successfully loaded!');
   
         const [filterInstance] = filterInstances;
         const { listInstance } = filterInstance;
   
         const locationDropdown = document.getElementById('location-select');
   
         locationDropdown.addEventListener('change', () => {
           //console.log('location changed');
           // Change its text to "Which Course?"
           var courseDropdownLabel = document.getElementById('course-dropdown-label');
           courseDropdownLabel.innerText = "Which Course?";
   
           filterInstance.resetFilters(['activity']);
         });
       }
     ]);
   
   // Update Golf Course Label with name.
   document.addEventListener('click', function (event) {
       // Log the element that was clicked
       console.log('Element clicked:', event.target);
   
       // Check if the clicked element is a link with data-activity-selected="true"
       if (event.target.matches('a[activity-selected="true"]')) {
           // Get the inner text of the clicked link
           var linkText = event.target.innerText;
           console.log('Link with data-activity-selected="true" clicked. Inner text:', linkText);
   
           // Set the text of the element with ID course-dropdown-label to match the clicked link's text
           var courseDropdownLabel = document.getElementById('course-dropdown-label');
           if (courseDropdownLabel) {
               console.log('Found element with ID course-dropdown-label. Changing text to:', linkText);
               courseDropdownLabel.innerText = linkText;
           } else {
               console.log('Element with ID course-dropdown-label not found.');
           }
       } else {
           console.log('Clicked element is not a link with data-activity-selected="true".');
           //document.getElementById('filter-results-dropdown').classList.add('hide');

       }
   });
   