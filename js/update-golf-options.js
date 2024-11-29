// Golf Options Book Now Button
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
            const baseURL = clickedButton.getAttribute('data-golf-baseurl');
            const golfLink = clickedButton.getAttribute('data-golf-link');

            // Ensure both baseURL and golfLink are present
            if (baseURL && golfLink) {
                // Clean up the baseURL and golfLink to avoid double slashes or missing slashes
                const formattedBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
                const formattedGolfLink = golfLink.startsWith('/') ? golfLink.slice(1) : golfLink;

                // Construct the new URL
                const newURL = `${formattedBaseURL}/${formattedGolfLink}?locationId=${locationId}`;
                console.log("New URL constructed:", newURL);

                // Set the updated href to the target element
                targetElement.href = newURL;
            } else {
                console.error("Missing baseURL or golfLink on the clicked button.");
            }
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