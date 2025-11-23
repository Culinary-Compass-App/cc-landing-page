document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('api-request-modal');
    const closeButton = document.querySelector('.close-button');
    const apiTriggerButtons = document.querySelectorAll('a[href="#request-api"]'); // Targets links to the #request-api section

    // Function to show the modal
    function showModal() {
        modal.style.display = 'flex'; // Use flex for centering
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    // Function to hide the modal
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Show modal automatically on page load (with a slight delay for better UX)
    // Consider using localStorage/sessionStorage to only show it once per session for a real app.
    // For now, it will pop up on every page load after 1.5 seconds.
    setTimeout(showModal, 1500);

    // Close button functionality
    closeButton.addEventListener('click', hideModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Trigger modal from navigation links/buttons AND allow smooth scroll to section
    apiTriggerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior initially
            
            // showModal(); // Show the modal

            // Optional: Smooth scroll to the visible section after a short delay
            // This creates a smoother transition if the user closes the modal but still wants to see the section
            setTimeout(() => {
                document.querySelector('#request-api').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300); // Scroll after 0.5 seconds
        });
    });

    // Existing script.js content (hamburger menu, smooth scroll, scroll animations)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                // This handles general smooth scrolling for nav links
                if (link.getAttribute('href').startsWith('#') && link.getAttribute('href') !== '#request-api') {
                    document.querySelector(link.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                // For the Request API key link, the event listener above already handles modal + scroll
            });
        });
    }

    // Original smooth scroll for hash links that are NOT the API request trigger
    // (already mostly covered by the specific handler for apiTriggerButtons)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Ensure this doesn't conflict with the apiTriggerButtons handler
        if (anchor.getAttribute('href') !== '#request-api') {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });


    const sections = document.querySelectorAll('.section, .request-api-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    // const modalForm = document.getElementById('api-key-request-form-modal');
    // const bottomForm = document.getElementById('api-key-request-form-bottom');

    // // Function to handle form submission with reCAPTCHA verification
    // const handleFormSubmission = (event, formElement) => {
    //     event.preventDefault(); // Prevent default form submission

    //     const response = grecaptcha.getResponse(); // Get the reCAPTCHA response token

    //     if (response.length === 0) {
    //         // reCAPTCHA not completed
    //         alert('Please complete the reCAPTCHA challenge.'); // Use a custom modal instead of alert in production
    //         return;
    //     }

    //     // If reCAPTCHA is completed, proceed with form submission
    //     // You can also add more client-side validation here
    //     formElement.submit(); // Submit the form programmatically
    // };

    // // Attach event listener to the modal form
    // if (modalForm) {
    //     modalForm.addEventListener('submit', (event) => handleFormSubmission(event, modalForm));
    // }

    // // Attach event listener to the bottom form
    // if (bottomForm) {
    //     bottomForm.addEventListener('submit', (event) => handleFormSubmission(event, bottomForm));
    // }

});