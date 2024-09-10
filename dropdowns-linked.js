document.addEventListener('DOMContentLoaded', function () {
    // Get all select elements with the data attribute "fs-cmsfilter-field"
    const selectElements = document.querySelectorAll('select[fs-cmsfilter-field]');

    // Add change event listeners to all matching select elements
    selectElements.forEach(select => {
        select.addEventListener('change', function () {
            const selectedValue = this.value;

            // Loop through the other select elements and update their value
            selectElements.forEach(otherSelect => {
                if (otherSelect !== this) { // Skip the currently changed select element
                    otherSelect.value = selectedValue;

                    // Optional: trigger the change event on the other element (if needed)
                    const event = new Event('change');
                    otherSelect.dispatchEvent(event);
                }
            });
        });
    });
});