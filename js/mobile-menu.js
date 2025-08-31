/**
 * Mobile Menu Controller
 * يدير قائمة التنقل في الجوال وجميع التفاعلات المتعلقة بالجوال
 */

class MobileMenuController {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.body = document.body;
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupResponsiveFeatures();
        this.optimizeForMobile();
    }
    
    bindEvents() {
        // Toggle menu on hamburger click
        if (this.navToggle) {
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMenu();
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.navToggle.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Handle dropdown menus in mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.toggleDropdown(dropdown);
                }
            });
        });
        
        // Close menu on link click (mobile)
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && !link.nextElementSibling) {
                    this.closeMenu();
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
            this.adjustForScreenSize();
        });
        
        // Touch events for better mobile experience
        this.setupTouchEvents();
    }
    
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.navToggle.classList.add('active');
        this.navMenu.classList.add('active');
        this.body.style.overflow = 'hidden';
        this.isMenuOpen = true;
        
        // Animation
        this.navMenu.style.transform = 'translateY(0)';
        this.navMenu.style.opacity = '1';
        this.navMenu.style.visibility = 'visible';
    }
    
    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.body.style.overflow = '';
        this.isMenuOpen = false;
        
        // Animation
        this.navMenu.style.transform = 'translateY(-20px)';
        this.navMenu.style.opacity = '0';
        this.navMenu.style.visibility = 'hidden';
        
        // Close all dropdowns
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active', !isActive);
    }
    
    setupResponsiveFeatures() {
        // Optimize images for mobile
        this.optimizeImages();
        
        // Setup viewport-based font sizes
        this.setupResponsiveFonts();
        
        // Mobile-specific animations
        this.setupMobileAnimations();
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Lazy loading for mobile
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
            
            // Responsive image sizes
            if (img.classList.contains('work-image') || img.classList.contains('hero-image')) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }
    
    setupResponsiveFonts() {
        // Dynamic font sizing based on screen width
        const updateFontSizes = () => {
            const screenWidth = window.innerWidth;
            const root = document.documentElement;
            
            if (screenWidth <= 480) {
                root.style.fontSize = '14px';
            } else if (screenWidth <= 768) {
                root.style.fontSize = '15px';
            } else {
                root.style.fontSize = '16px';
            }
        };
        
        updateFontSizes();
        window.addEventListener('resize', updateFontSizes);
    }
    
    setupMobileAnimations() {
        // Disable heavy animations on mobile for performance
        if (window.innerWidth <= 768) {
            const animatedElements = document.querySelectorAll('.animated, .fade-in, .slide-up');
            animatedElements.forEach(element => {
                element.style.animation = 'none';
                element.style.transform = 'none';
                element.style.opacity = '1';
            });
        }
    }
    
    setupTouchEvents() {
        // Improve touch interaction
        const touchElements = document.querySelectorAll('.btn, .service-card, .work-item, .contact-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
    
    adjustForScreenSize() {
        const screenWidth = window.innerWidth;
        
        // Adjust floating elements for different screen sizes
        const floatingElements = document.querySelectorAll('.floating-social, .floating-contact');
        floatingElements.forEach(element => {
            if (screenWidth <= 480) {
                element.style.transform = 'scale(0.9)';
            } else {
                element.style.transform = '';
            }
        });
        
        // Adjust hero height for mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            if (screenWidth <= 480) {
                hero.style.minHeight = '60vh';
            } else if (screenWidth <= 768) {
                hero.style.minHeight = '70vh';
            } else {
                hero.style.minHeight = '80vh';
            }
        }
    }
    
    optimizeForMobile() {
        // Mobile-specific optimizations
        if ('serviceWorker' in navigator) {
            // Add service worker for better mobile performance (optional)
        }
        
        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (window.innerWidth <= 768) {
                    const viewport = document.querySelector('meta[name="viewport"]');
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
                }
            });
            
            input.addEventListener('blur', () => {
                if (window.innerWidth <= 768) {
                    const viewport = document.querySelector('meta[name="viewport"]');
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            });
        });
        
        // Optimize scrolling performance
        if (window.innerWidth <= 768) {
            document.body.style.webkitOverflowScrolling = 'touch';
        }
    }
}

// Mobile Utilities
const MobileUtils = {
    // Check if device is mobile
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Check if device is touch enabled
    isTouch: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },
    
    // Get screen orientation
    getOrientation: () => {
        return screen.orientation ? screen.orientation.angle : window.orientation;
    },
    
    // Handle orientation change
    onOrientationChange: (callback) => {
        window.addEventListener('orientationchange', callback);
    },
    
    // Smooth scroll for mobile
    smoothScrollTo: (element, duration = 800) => {
        const start = window.pageYOffset;
        const target = element.offsetTop - 80; // Account for fixed header
        const distance = target - start;
        const startTime = performance.now();
        
        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 0.5 - Math.cos(progress * Math.PI) / 2;
            
            window.scrollTo(0, start + distance * easing);
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };
        
        requestAnimationFrame(scroll);
    }
};

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Mobile Menu Script Loaded!');
    const mobileMenu = new MobileMenuController();
    console.log('📱 Mobile Menu Controller Initialized!');
    
    // Add mobile-specific classes
    if (MobileUtils.isMobile()) {
        document.body.classList.add('mobile-device');
    }
    
    if (MobileUtils.isTouch()) {
        document.body.classList.add('touch-device');
    }
    
    // Handle orientation changes
    MobileUtils.onOrientationChange(() => {
        setTimeout(() => {
            mobileMenu.adjustForScreenSize();
        }, 500);
    });
    
    // Optimize form inputs for mobile
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Remove focus from inputs to hide mobile keyboard
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                activeElement.blur();
            }
        });
    });
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MobileMenuController, MobileUtils };
}