// Wait until the DOM is fully loaded
// Transform div into Popup when clicked
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the attribute data-booknow-mode="home"
    const bookNowElements = document.querySelectorAll('[data-booknow-mode="home"]');
    
    // Function to toggle classes
    function toggleClasses() {
        // Select the element with class 'homehero-card-inner'
        const homeHeroCardInner = document.querySelector('.homehero-card-inner');
        if (homeHeroCardInner) {
            homeHeroCardInner.classList.toggle('is-popup');
        }
        
        // Select the element with class 'closemenu-wrapper'
        const closeMenuWrapper = document.querySelector('.closemenu-wrapper');
        if (closeMenuWrapper) {
            closeMenuWrapper.classList.toggle('hide');
        }
    }

    // Add click event listeners to each selected element
    bookNowElements.forEach(function(element) {
        element.addEventListener('click', toggleClasses);
    });
});