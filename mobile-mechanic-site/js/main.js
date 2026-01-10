// Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
});

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active'); // For potential hamburger animation

            // Toggle hamburger icon to X logic (simple css based usually, but here's js hook)
            const bars = toggle.querySelectorAll('.bar');
            /* Add simple cross animation toggle here if needed via class */
        });
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    // document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
}
