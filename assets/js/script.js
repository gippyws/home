// Main client-side script for the site
// Runs after DOM is ready (script is loaded at end of body)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
        AOS.init();
    }

    /* JavaScript for showing/hiding navbar on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar.navbar-hide');

    if (navbar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Downscroll
                navbar.style.top = '-100px'; // Adjust this value based on your navbar's height
            } else {
                // Upscroll
                navbar.style.top = '0';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        });
    }
        */

    // Form handling is now done through Web3Forms redirect
    // No additional JavaScript needed as form submits normally to Web3Forms
    // which then redirects to thanks.html
});

