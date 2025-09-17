// Enhanced Mobile Menu with Arrow Testing - Replace your mobile menu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Test and setup arrow fallbacks
    function setupArrowFallbacks() {
        const dropdowns = document.querySelectorAll('.dropdown > a');
        
        dropdowns.forEach(link => {
            // Test if CSS triangles are working, if not, use Unicode fallback
            const afterElement = window.getComputedStyle(link, '::after');
            
            // If Font Awesome is not available and CSS triangles might not work
            if (!document.head.innerHTML.includes('font-awesome') && 
                !document.head.innerHTML.includes('fontawesome')) {
                
                // Use Unicode arrow as backup
                link.style.setProperty('--arrow-fallback', '"▼"');
                
                // Apply inline style for better compatibility
                const style = document.createElement('style');
                style.textContent = `
                    @media (max-width: 992px) {
                        .dropdown > a::after {
                            content: var(--arrow-fallback, "▼") !important;
                            font-family: inherit !important;
                            font-size: 14px !important;
                            border: none !important;
                            width: auto !important;
                            height: auto !important;
                            color: var(--primary-color) !important;
                            font-weight: bold !important;
                        }
                        
                        .dropdown.active > a::after {
                            color: var(--secondary-color) !important;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
    
    // Call arrow fallback setup
    setupArrowFallbacks();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mainNav.classList.contains('active')) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
                // Close all open dropdowns when closing menu
                const openDropdowns = document.querySelectorAll('.dropdown.active');
                openDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Enhanced Dropdown Menu for Mobile with Visual Feedback
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('> a'); // Only direct child link
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Only prevent default on mobile when it's a dropdown parent
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    
                    console.log('Dropdown clicked:', dropdown); // Debug log
                    
                    // Check if this dropdown is currently active
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close other open dropdowns first
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isActive) {
                        dropdown.classList.remove('active');
                    } else {
                        dropdown.classList.add('active');
                        
                        // Smooth scroll to show dropdown if needed
                        setTimeout(() => {
                            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                            if (dropdownMenu) {
                                dropdownMenu.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'nearest' 
                                });
                            }
                        }, 100);
                    }
                }
            });
            
            // Add touch feedback for better mobile UX
            link.addEventListener('touchstart', function() {
                if (window.innerWidth <= 992) {
                    this.style.backgroundColor = 'var(--neutral-color)';
                }
            });
            
            link.addEventListener('touchend', function() {
                if (window.innerWidth <= 992) {
                    setTimeout(() => {
                        if (!dropdown.classList.contains('active')) {
                            this.style.backgroundColor = '';
                        }
                    }, 150);
                }
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
                if (mainNav && mainNav.classList.contains('active')) {
                    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('menu-open');
                    
                    // Close all dropdowns
                    const openDropdowns = document.querySelectorAll('.dropdown.active');
                    openDropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            }
        }
    });
    
    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            if (mainNav) mainNav.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Close all dropdowns
            const openDropdowns = document.querySelectorAll('.dropdown.active');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Handle dropdown menu items clicks (navigate to actual pages)
    const dropdownItems = document.querySelectorAll('.dropdown-menu a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Allow normal navigation for dropdown items
            // Close mobile menu after clicking a dropdown item
            if (window.innerWidth <= 992) {
                setTimeout(() => {
                    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                    if (mainNav) mainNav.classList.remove('active');
                    body.classList.remove('menu-open');
                }, 100);
            }
        });
    });
    
    // Debug function to test arrows
    window.testArrows = function() {
        const dropdowns = document.querySelectorAll('.dropdown');
        console.log('Found dropdowns:', dropdowns.length);
        
        dropdowns.forEach((dropdown, index) => {
            console.log(`Dropdown ${index}:`, dropdown);
            dropdown.classList.toggle('active');
        });
    };
    
    // Console log for debugging
    console.log('Mobile menu script loaded successfully');
    console.log('Dropdowns found:', document.querySelectorAll('.dropdown').length);
    
    // Rest of your existing JavaScript...
    // (Keep all your other functions like back to top, form validation, etc.)
});