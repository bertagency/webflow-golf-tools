
// Override Book Now Button
document.addEventListener('DOMContentLoaded', () => {
    // Function to handle button clicks
    function handleButtonClick(event) {
        // Prevent the default action if needed
        event.preventDefault();
        
        // Get the clicked button
        const clickedButton = event.target;
        
        // Get the target element and remove the 'is-inactive' class
        const targetElement = document.getElementById('booknow-target');
        if (targetElement) {
            targetElement.classList.remove('is-inactive');
            
            // Get the data attributes from the clicked button
            const locationId = clickedButton.getAttribute('data-golf-location-id');
            const productId = clickedButton.getAttribute('data-golf-link');
            
            // Get the current href of the target element
            const currentUrl = new URL(targetElement.href);
            
            // Add/Update the URL parameters
            currentUrl.searchParams.set('locationid', locationId);
            currentUrl.searchParams.set('productid', productId);
            
            // Set the updated href back to the target element
            targetElement.href = currentUrl.toString();
        }
        
        // Remove 'is-selected' class from all buttons
        document.querySelectorAll('[data-crazy-golf-option="true"]').forEach(button => {
            button.classList.remove('is-selected');
        });
        
        // Add the 'is-selected' class to the clicked button
        clickedButton.classList.add('is-selected');
    }

    // Attach the event listener to all buttons with the data attribute
    document.querySelectorAll('[data-crazy-golf-option="true"]').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});