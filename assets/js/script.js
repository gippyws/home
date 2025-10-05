// Main client-side script for the site
// Runs after DOM is ready (script is loaded at end of body)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
        AOS.init();
    }
    // Form submits naturally to Web3Forms - no JavaScript handling needed
});

