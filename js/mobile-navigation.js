document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const body = document.body;
    let scrollPosition = 0;

    if (!menuToggle || !mobileMenu) {
        console.error('Menu elements not found!');
        return;
    }

    // Toggle Menu Function with scroll position preservation
    const toggleMenu = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu - restore scroll position
            mobileMenu.classList.remove('active');
            body.classList.remove('no-scroll');
            body.style.top = '';
            window.scrollTo(0, scrollPosition);
            
            if (menuIcon && closeIcon) {
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        } else {
            // Open menu - save scroll position and lock
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            mobileMenu.classList.add('active');
            body.classList.add('no-scroll');
            body.style.top = `-${scrollPosition}px`;
            
            if (menuIcon && closeIcon) {
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
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
