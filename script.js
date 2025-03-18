// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Theme switching
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIndicator = document.querySelector('.theme-indicator');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeIndicator.textContent = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1);
    }

    // Add click event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIndicator.textContent = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
        });
    }

    // Clipboard functionality for contact links
    const copyLinks = document.querySelectorAll('.copy-link');
    copyLinks.forEach(link => {
        // Create tooltip element if it doesn't exist
        if (!link.querySelector('.copy-tooltip')) {
            const tooltip = document.createElement('span');
            tooltip.className = 'copy-tooltip';
            tooltip.textContent = 'Copy';
            link.appendChild(tooltip);
        }
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = link.getAttribute('data-copy');
            const tooltip = link.querySelector('.copy-tooltip');
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Update tooltip text
                    tooltip.textContent = 'Copied!';
                    link.classList.add('copied');
                    
                    // Reset tooltip after 2 seconds
                    setTimeout(() => {
                        tooltip.textContent = 'Copy';
                        link.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    tooltip.textContent = 'Failed';
                    link.classList.add('copied');
                    
                    setTimeout(() => {
                        tooltip.textContent = 'Copy';
                        link.classList.remove('copied');
                    }, 2000);
                });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (!this.classList.contains('copy-link')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'var(--navbar-background)';
                navbar.style.boxShadow = '0 4px 30px var(--shadow-color)';
                navbar.style.border = '1px solid var(--border-color)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.boxShadow = 'none';
                navbar.style.border = 'none';
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}); 