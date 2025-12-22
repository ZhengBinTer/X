document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const body = document.body;

    // Toggle Menu Function
    const toggleMenu = () => {
        const isOpening = !mobileMenu.classList.contains('active');
        
        mobileMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');

        if (isOpening) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    };

    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close button inside menu
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});
