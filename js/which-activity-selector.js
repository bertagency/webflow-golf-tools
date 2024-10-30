//-- ******************* Activity Selector Conditional Logic --- Version 2.1

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
    var filtermonitor = false;
   
    function createEventListeners() {
        /* Add Event Listener to dropdowns * SHOULD be only when CMSfiltering has changed the dom */
        document.querySelectorAll('[activity-dropdown-item="true"]').forEach(item => {
            item.addEventListener('click', function() {
                // No actions within this event listener
            });
        });
   
        document.querySelectorAll('[data-location-item="true"]').forEach(item => {
            item.addEventListener('click', function() {
                document.getElementById('filter-results-dropdown').classList.add('hide');
                
                document.querySelectorAll('[activity-dropdown-item="true"]').forEach(item => {
                    if (item.textContent.trim() === 'Select Activity') {
                        const dropdownToggle = document.querySelector('#secondary-filter-toggle');
                        if (dropdownToggle) {
                            setTimeout(() => {}, 10); // A short delay ensures that events are distinguished
                        }
                    }
                });
            });
        });
   
        /* Hide Filters if Secondary Filter selects 'Select Activity'. If it contains 'Golf' then transform it to a dropdown */    
        document.querySelectorAll('[activity-dropdown-item="true"]').forEach(item => {
            item.addEventListener('click', function() {
                if (item.textContent.trim() === 'Crazy Golf') {
                    //document.getElementById('filter-results-dropdown').classList.remove('hide');
                    //transformGolf();
                } else {
                    //document.getElementById('filter-results-dropdown').classList.remove('hide');
                    //resetGolf();
                }
                if (item.textContent.trim() === 'Select Activity') {
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
        /* Unhide all Activity dropdowns */
        const ele_var = document.querySelectorAll('[activity-dropdown-item="true"]');  
        ele_var.forEach((element) => {  
            element.classList.remove('hide');  
        });  
        /* hide dropdown Activities if this activity is not available at the Location clicked */ 
        let targetHeadingElement = document.querySelector('[data-target-heading="true"]');
        if (targetHeadingElement) {
            let currentLocation = targetHeadingElement.innerText;
           
            let activityChecker = Array.from(document.querySelectorAll('[activity-checker="true"]'))
                                       .find(element => element.getAttribute('activity-checker-name') === currentLocation);
            if (activityChecker) {
                let dynItems = activityChecker.querySelector('.w-dyn-items');
                if (dynItems) {
                    let items = dynItems.querySelectorAll('[activity-checker-item]');
                    items.forEach(item => {
                        let locationSelect = document.getElementById('location-selector');
                        let elements = locationSelect.querySelectorAll('[activity-dropdown-item]');
                        elements.forEach((element) => {
                            if (element.textContent.trim() === item.getAttribute('activity-checker-item')) {
                                element.classList.add('hide');
                            } 
                        });
                    });
                }
            }
        }
    }

    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsload',
        (listInstances) => {
            const [listInstance] = listInstances;
            listInstance.on('renderitems', (renderedItems) => {
                document.querySelectorAll('[activity-selected="true"]').forEach(item => {
                    item.addEventListener('click', function() {
                        const sibling = item.parentElement.querySelector('[activity-inner-link-destination="true"]');
                        if (sibling) {
                            const linkElement = sibling.querySelector('a');
                            if (linkElement) {
                                const hrefValue = linkElement.getAttribute('href');
                                const goButton = document.getElementById('go-button');
                                if (goButton) {
                                    goButton.setAttribute('href', hrefValue);
                                    goButton.classList.remove('is-inactive');
                                }
                            }
                        }
                    });
                });

                if (!filtermonitor) {
                    createEventListeners();
                }
                filtermonitor = true;
                handleDropdownUpdateClick();
            });
        },
    ]);

    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsfilter',
        (filterInstances) => {
            const [filterInstance] = filterInstances;
            const locationDropdown = document.getElementById('location-select');
            locationDropdown.addEventListener('change', () => {
                var courseDropdownLabel = document.getElementById('course-dropdown-label');
                courseDropdownLabel.innerText = "Which Course?";
                filterInstance.resetFilters(['activity']);
            });
        }
    ]);

    document.addEventListener('click', function (event) {
        if (event.target.matches('a[activity-selected="true"]')) {
            var linkText = event.target.innerText;
            var courseDropdownLabel = document.getElementById('course-dropdown-label');
            if (courseDropdownLabel) {
                courseDropdownLabel.innerText = linkText;
            }
        }
    });
});
