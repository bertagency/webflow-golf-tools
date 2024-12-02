
document.addEventListener("DOMContentLoaded", function() {

    // Define the reusable location change handler function
    function handleLocationChange() {
        const locationSelect = document.getElementById("location-select");
        const currentLocation = locationSelect.value;
        
        const matchingElement = document.querySelector(`[activity-checker-name="${currentLocation}"]`);
        let activityItems = [];
        
        const dropdownItems = document.querySelectorAll('[activity-dropdown-item="true"]');
        dropdownItems.forEach(item => item.classList.remove('hide'));
        
        if (matchingElement) {
            const childItems = matchingElement.querySelectorAll('[activity-checker-item]');
            childItems.forEach(item => {
                if (!item.classList.contains('w-condition-invisible')) {
                    activityItems.push(item.getAttribute('activity-checker-item'));
                }
            });
        }
        
        dropdownItems.forEach(item => {
            if (activityItems.includes(item.textContent.trim())) {
                item.classList.add('hide');
            }
        });
    }

    /** ----- Quick Book Logic ----- **/

    // Select all elements with data-action-button="true"
    const actionButtons = document.querySelectorAll('[data-book-intent="true"]');
    
    // Attach a click event listener to each of these elements
    actionButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const href = button.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });

    /* REMOVE ALL LOCATIONS from condition invisible to allow filtering without a nested list */
    const elementsToRemove = document.querySelectorAll('[fs-cmsfilter-field="location"].w-condition-invisible');
    elementsToRemove.forEach(element => element.remove());

    // Bind the location ID to all buttons when a location is selected
    document.getElementById("location-select").addEventListener("change", function() {
        const selectedValue = this.value;
        const matchingElement = document.querySelector(`[venue-location-name="${selectedValue}"]`);
        
        if (matchingElement) {
            const locationId = matchingElement.getAttribute("venue-location-id");
            const actionButtons = document.querySelectorAll('a[data-action-button="true"]');
            actionButtons.forEach(button => {
                const url = new URL(button.href);
                url.searchParams.set("locationId", locationId);
                button.href = url.toString();
            });
        }
    });

    /*** Control visibility of activity buttons and Golf Course Finder depending on which activity is selected **/
    const activitySelect = document.getElementById("activity-select");
    activitySelect.addEventListener("change", function() {
        const selectedValue = this.value;
        const activityResults = document.getElementById("activity-results");
        const golfCourseFinder = document.querySelector('#golf-course-finder');
    
        if (selectedValue === 'Select Activity' || selectedValue === '') {
            activityResults.classList.add('hide');
        } else {
            activityResults.classList.remove('hide');
        }
    
        if (selectedValue.toLowerCase() === 'crazy golf') {
            golfCourseFinder.classList.remove('hide');
        } else {
            golfCourseFinder.classList.add('hide');
        }
    });

    /** Control visibility of Activity Selector **/
    const activitySelectorDropdown = document.getElementById("activity-selector-dropdown");
    const locationSelect = document.getElementById("location-select");
    locationSelect.addEventListener("change", function() {
        const selectedValue = this.value;
        if (selectedValue === '' || selectedValue === 'Select location') {
            activitySelectorDropdown.classList.add('is-inactive');
        } else {
            activitySelectorDropdown.classList.remove('is-inactive');
        }

        // Call handleLocationChange when location is changed
        handleLocationChange();
    });

    /* Reset Filter 2 when Filter 1 changed */
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsfilter',
        (filterInstances) => {
            // Execute the location filtering logic after filterInstances load
            handleLocationChange();

            // Reset filters as needed
            const [filterInstance] = filterInstances;
            filterInstance.resetFilters(['activity']);
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
            event.preventDefault(); // Prevent the default link behavior
            const courseLink = this.getAttribute('data-course-link');
            const goButton = document.getElementById('go-button');
            if (goButton && courseLink) {
                goButton.classList.remove('hide');
                goButton.classList.remove('is-inactive');
                goButton.href = courseLink;
            }
        });
    });

    // Relabel Golf Course Dropdown with the selected value
    document.querySelectorAll('[data-golf-course-name]').forEach(element => {
        element.addEventListener('click', () => {
            const courseName = element.getAttribute('data-golf-course-name');
            const courseDropdownLabel = document.getElementById('course-dropdown-label');
            if (courseDropdownLabel) {
                courseDropdownLabel.innerHTML = courseName;
            }
        });
    });

    // Event listeners for changes in location-select or activity-select
    ['location-select', 'activity-select'].forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        if (selectElement) {
            selectElement.addEventListener('change', () => {
                const courseDropdownLabel = document.getElementById('course-dropdown-label');
                if (courseDropdownLabel) {
                    courseDropdownLabel.innerHTML = 'Which Course?';
                }
            });
        }
    });

});