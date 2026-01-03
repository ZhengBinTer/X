document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const body = document.body;
    const html = document.documentElement;
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
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.left = '';
            body.style.right = '';
            
            // Use requestAnimationFrame to ensure DOM is updated before scrolling
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollPosition);
            });
            
            if (menuIcon && closeIcon) {
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        } else {
            // Open menu - save scroll position and lock
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            body.classList.add('no-scroll');
            body.style.top = `-${scrollPosition}px`;
            mobileMenu.classList.add('active');
            
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

    // Close menu when clicking a link - DON'T preventDefault, let smooth scroll handle it
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active')) {
                // Close menu immediately
                mobileMenu.classList.remove('active');
                body.classList.remove('no-scroll');
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                body.style.left = '';
                body.style.right = '';
                
                // Restore scroll position immediately
                window.scrollTo(0, scrollPosition);
                
                // Toggle icons
                if (menuIcon && closeIcon) {
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
                
                // Let the smooth scroll script in HTML handle the navigation
                // (Don't call e.preventDefault() here)
            }
        });
    });

    // Ensure scroll is not locked on page load or resize
    const ensureScrollEnabled = () => {
        if (!mobileMenu.classList.contains('active')) {
            body.classList.remove('no-scroll');
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.left = '';
            body.style.right = '';
        }
    };

    // Check on resize and page visibility change
    window.addEventListener('resize', ensureScrollEnabled);
    document.addEventListener('visibilitychange', ensureScrollEnabled);
    window.addEventListener('pageshow', ensureScrollEnabled);
    
    // Initial check - CRITICAL for preventing scroll lock on load
    ensureScrollEnabled();
    
    // Double-check after a brief delay to catch any late-loading issues
    setTimeout(ensureScrollEnabled, 50);
    setTimeout(ensureScrollEnabled, 200);
});
