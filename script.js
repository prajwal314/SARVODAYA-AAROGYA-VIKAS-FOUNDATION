document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    
    if (mobileMenuBtn && navContainer) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navContainer.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && 
            !event.target.closest('.nav-container') && 
            navContainer.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navContainer.classList.remove('active');
        }
    });
    
    // Dropdown menu touch support for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const navItem = dropdown.querySelector('.nav-item');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            navItem.addEventListener('click', function(e) {
                // Only prevent default if dropdown-content exists (i.e., is a parent dropdown)
                if (dropdownContent) {
                    e.preventDefault();
                    // Close all other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherContent = otherDropdown.querySelector('.dropdown-content');
                            if (otherContent && otherContent.style.display === 'block') {
                                otherContent.style.display = 'none';
                            }
                        }
                    });
                    // Toggle this dropdown
                    if (dropdownContent.style.display === 'block') {
                        dropdownContent.style.display = 'none';
                    } else {
                        dropdownContent.style.display = 'block';
                    }
                }
                // If no dropdown-content, allow default navigation
            });
        });
    }

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-item h3');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
});

