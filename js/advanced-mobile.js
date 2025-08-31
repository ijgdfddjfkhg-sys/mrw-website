/**
 * Advanced Mobile Navigation & UI Controller
 * نظام متقدم للتنقل والواجهة على الجوال
 */

class AdvancedMobileController {
    constructor() {
        this.isMenuOpen = false;
        this.isSocialOpen = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        this.setupMenuToggle();
        this.setupSocialToggle();
        this.setupOutsideClick();
        this.setupKeyboardNavigation();
        this.setupSwipeGestures();
        this.setupAccessibility();
        
        console.log('🚀 Advanced Mobile Controller Initialized');
    }
    
    /**
     * Setup mobile menu toggle functionality
     */
    setupMenuToggle() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (!toggle || !menu) {
            console.warn('⚠️ Menu elements not found');
            return;
        }
        
        // Add mobile overlay for outside clicks
        this.createMobileOverlay();
        
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Handle dropdown menus in mobile
        const dropdownLinks = menu.querySelectorAll('.dropdown > .nav-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.toggleDropdown(link.parentElement);
                }
            });
        });
        
        console.log('✅ Menu toggle setup complete');
    }
    
    /**
     * Setup social media toggle functionality
     */
    setupSocialToggle() {
        const socialToggle = document.querySelector('.social-toggle');
        const socialIcons = document.querySelector('.social-icons');
        
        if (!socialToggle || !socialIcons) {
            console.warn('⚠️ Social elements not found');
            return;
        }
        
        socialToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleSocial();
        });
        
        console.log('✅ Social toggle setup complete');
    }
    
    /**
     * Create mobile overlay for outside clicks
     */
    createMobileOverlay() {
        if (document.querySelector('.mobile-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        overlay.addEventListener('click', () => {
            this.closeMenu();
        });
        document.body.appendChild(overlay);
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.mobile-overlay');
        
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    /**
     * Open mobile menu
     */
    openMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.mobile-overlay');
        
        if (!toggle || !menu) return;
        
        this.isMenuOpen = true;
        toggle.classList.add('active');
        menu.classList.add('active');
        if (overlay) overlay.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item for accessibility
        setTimeout(() => {
            const firstLink = menu.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
        }, 100);
        
        // Add escape key listener
        document.addEventListener('keydown', this.handleEscapeKey);
        
        console.log('📱 Menu opened');
    }
    
    /**
     * Close mobile menu
     */
    closeMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.mobile-overlay');
        
        if (!toggle || !menu) return;
        
        this.isMenuOpen = false;
        toggle.classList.remove('active');
        menu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        
        // Close any open dropdowns
        const openDropdowns = menu.querySelectorAll('.dropdown.active');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', this.handleEscapeKey);
        
        console.log('📱 Menu closed');
    }
    
    /**
     * Toggle dropdown in mobile menu
     */
    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // Close all other dropdowns
        const allDropdowns = document.querySelectorAll('.dropdown.active');
        allDropdowns.forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });
        
        // Toggle current dropdown
        if (isActive) {
            dropdown.classList.remove('active');
        } else {
            dropdown.classList.add('active');
        }
    }
    
    /**
     * Toggle social media icons
     */
    toggleSocial() {
        const socialToggle = document.querySelector('.social-toggle');
        const socialIcons = document.querySelector('.social-icons');
        
        if (!socialToggle || !socialIcons) return;
        
        if (this.isSocialOpen) {
            this.closeSocial();
        } else {
            this.openSocial();
        }
    }
    
    /**
     * Open social media icons
     */
    openSocial() {
        const socialToggle = document.querySelector('.social-toggle');
        const socialIcons = document.querySelector('.social-icons');
        
        this.isSocialOpen = true;
        socialToggle.classList.add('active');
        socialIcons.classList.add('active');
        
        console.log('📱 Social icons opened');
    }
    
    /**
     * Close social media icons
     */
    closeSocial() {
        const socialToggle = document.querySelector('.social-toggle');
        const socialIcons = document.querySelector('.social-icons');
        
        this.isSocialOpen = false;
        socialToggle.classList.remove('active');
        socialIcons.classList.remove('active');
        
        console.log('📱 Social icons closed');
    }
    
    /**
     * Setup outside click handlers
     */
    setupOutsideClick() {
        document.addEventListener('click', (e) => {
            // Close menu if clicking outside
            const menu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.nav-toggle');
            
            if (this.isMenuOpen && menu && toggle) {
                if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                    this.closeMenu();
                }
            }
            
            // Close social if clicking outside
            const socialContainer = document.querySelector('.floating-social');
            if (this.isSocialOpen && socialContainer) {
                if (!socialContainer.contains(e.target)) {
                    this.closeSocial();
                }
            }
        });
    }
    
    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        this.handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
                if (this.isSocialOpen) {
                    this.closeSocial();
                }
            }
        };
        
        // Handle tab navigation in mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isMenuOpen) {
                const menu = document.querySelector('.nav-menu.active');
                if (!menu) return;
                
                const focusableElements = menu.querySelectorAll(
                    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    /**
     * Setup swipe gestures for mobile
     */
    setupSwipeGestures() {
        const menu = document.querySelector('.nav-menu');
        if (!menu) return;
        
        menu.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        menu.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }, { passive: true });
    }
    
    /**
     * Handle swipe gestures
     */
    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        // Swipe up to close menu
        if (swipeDistance > swipeThreshold && this.isMenuOpen) {
            this.closeMenu();
        }
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA attributes
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.setAttribute('aria-label', 'فتح قائمة التنقل');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', 'mobile-menu');
            
            menu.setAttribute('id', 'mobile-menu');
            menu.setAttribute('aria-hidden', 'true');
        }
        
        // Update ARIA attributes when menu state changes
        const originalToggleMenu = this.toggleMenu.bind(this);
        this.toggleMenu = () => {
            originalToggleMenu();
            
            if (toggle && menu) {
                const isOpen = menu.classList.contains('active');
                toggle.setAttribute('aria-expanded', isOpen.toString());
                toggle.setAttribute('aria-label', isOpen ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل');
                menu.setAttribute('aria-hidden', (!isOpen).toString());
            }
        };
        
        // Add social toggle accessibility
        const socialToggle = document.querySelector('.social-toggle');
        if (socialToggle) {
            socialToggle.setAttribute('aria-label', 'فتح أيقونات التواصل الاجتماعي');
            socialToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    /**
     * Handle orientation changes
     */
    handleOrientationChange() {
        // Close menu on orientation change to prevent layout issues
        if (this.isMenuOpen) {
            this.closeMenu();
        }
        
        // Recalculate menu position
        setTimeout(() => {
            this.adjustMenuPosition();
        }, 300);
    }
    
    /**
     * Adjust menu position based on screen size
     */
    adjustMenuPosition() {
        const menu = document.querySelector('.nav-menu.active');
        if (!menu) return;
        
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Adjust menu height for small screens
        if (viewport.height < 500) {
            menu.style.maxHeight = `${viewport.height - 120}px`;
        } else {
            menu.style.maxHeight = `calc(100vh - 150px)`;
        }
    }
    
    /**
     * Get device info
     */
    getDeviceInfo() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1,
            orientation: window.orientation || 0,
            isTouch: 'ontouchstart' in window,
            isMobile: /Mobile|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent)
        };
    }
    
    /**
     * Destroy controller and cleanup
     */
    destroy() {
        this.closeMenu();
        this.closeSocial();
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handleEscapeKey);
        
        // Remove mobile overlay
        const overlay = document.querySelector('.mobile-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        console.log('🗑️ Advanced Mobile Controller destroyed');
    }
}

/**
 * Mobile Utils - Additional helper functions
 */
class MobileUtils {
    static isMobile() {
        return window.innerWidth <= 768 || /Mobile|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent);
    }
    
    static isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static isLandscape() {
        return window.innerWidth > window.innerHeight;
    }
    
    static getScreenSize() {
        if (window.innerWidth <= 320) return 'xs';
        if (window.innerWidth <= 480) return 'sm';
        if (window.innerWidth <= 768) return 'md';
        return 'lg';
    }
    
    static onOrientationChange(callback) {
        window.addEventListener('orientationchange', () => {
            setTimeout(callback, 100);
        });
        
        window.addEventListener('resize', () => {
            setTimeout(callback, 100);
        });
    }
    
    static smoothScrollTo(element, offset = 0) {
        if (!element) return;
        
        const targetPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.ease(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    static ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.advancedMobileController = new AdvancedMobileController();
        
        // Handle orientation changes
        MobileUtils.onOrientationChange(() => {
            if (window.advancedMobileController) {
                window.advancedMobileController.handleOrientationChange();
            }
        });
        
        // Add device-specific classes
        const deviceInfo = window.advancedMobileController.getDeviceInfo();
        
        if (deviceInfo.isMobile) {
            document.body.classList.add('mobile-device');
        }
        
        if (deviceInfo.isTouch) {
            document.body.classList.add('touch-device');
        }
        
        document.body.classList.add(`screen-${MobileUtils.getScreenSize()}`);
        
        console.log('📱 Device Info:', deviceInfo);
        
    }, 100);
});

// Export for testing and external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdvancedMobileController, MobileUtils };
}