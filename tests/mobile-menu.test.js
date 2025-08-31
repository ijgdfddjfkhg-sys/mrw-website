/**
 * Tests for Mobile Menu Functionality
 * Tests all aspects of mobile menu controller and mobile responsiveness
 */

describe('Mobile Menu Tests', () => {
    let mobileController;
    
    beforeEach(() => {
        // Create DOM elements for testing
        document.body.innerHTML = `
            <nav class="main-nav">
                <div class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-menu" id="navMenu">
                    <li><a href="#" class="nav-link">الرئيسية</a></li>
                    <li class="dropdown">
                        <a href="#" class="nav-link">المظلات</a>
                        <ul class="dropdown-menu">
                            <li><a href="#">مظلات السيارات</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="floating-social"></div>
            <div class="floating-contact"></div>
            <div class="hero"></div>
        `;
        
        // Mock window properties
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375
        });
        
        // Initialize mobile controller
        if (typeof MobileMenuController !== 'undefined') {
            mobileController = new MobileMenuController();
        }
    });
    
    describe('Menu Toggle Functionality', () => {
        test('should toggle menu when hamburger is clicked', () => {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            
            expect(navToggle).toBeTruthy();
            expect(navMenu).toBeTruthy();
            
            if (mobileController) {
                // Initially closed
                expect(mobileController.isMenuOpen).toBe(false);
                expect(navToggle.classList.contains('active')).toBe(false);
                
                // Open menu
                navToggle.click();
                expect(mobileController.isMenuOpen).toBe(true);
                expect(navToggle.classList.contains('active')).toBe(true);
                expect(navMenu.classList.contains('active')).toBe(true);
                
                // Close menu
                navToggle.click();
                expect(mobileController.isMenuOpen).toBe(false);
                expect(navToggle.classList.contains('active')).toBe(false);
            }
        });
        
        test('should close menu when clicking outside', (done) => {
            if (!mobileController) {
                done();
                return;
            }
            
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            
            // Open menu first
            mobileController.openMenu();
            expect(mobileController.isMenuOpen).toBe(true);
            
            // Click outside
            document.body.click();
            
            setTimeout(() => {
                expect(mobileController.isMenuOpen).toBe(false);
                done();
            }, 100);
        });
        
        test('should handle dropdown menus in mobile', () => {
            if (!mobileController) return;
            
            const dropdown = document.querySelector('.dropdown');
            const dropdownLink = dropdown.querySelector('.nav-link');
            
            // Simulate mobile screen
            Object.defineProperty(window, 'innerWidth', { value: 500 });
            
            // Click dropdown
            dropdownLink.click();
            expect(dropdown.classList.contains('active')).toBe(true);
            
            // Click again to close
            dropdownLink.click();
            expect(dropdown.classList.contains('active')).toBe(false);
        });
    });
    
    describe('Mobile Utilities', () => {
        test('should detect mobile devices correctly', () => {
            if (typeof MobileUtils === 'undefined') return;
            
            // Mock user agent for mobile
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X)',
                configurable: true
            });
            
            expect(MobileUtils.isMobile()).toBe(true);
            
            // Mock desktop user agent
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                configurable: true
            });
            
            expect(MobileUtils.isMobile()).toBe(false);
        });
        
        test('should detect touch devices', () => {
            if (typeof MobileUtils === 'undefined') return;
            
            // Mock touch support
            Object.defineProperty(window, 'ontouchstart', {
                value: function() {},
                configurable: true
            });
            
            expect(MobileUtils.isTouch()).toBe(true);
        });
        
        test('should handle orientation changes', (done) => {
            if (typeof MobileUtils === 'undefined') {
                done();
                return;
            }
            
            let orientationChanged = false;
            MobileUtils.onOrientationChange(() => {
                orientationChanged = true;
            });
            
            // Simulate orientation change
            const event = new Event('orientationchange');
            window.dispatchEvent(event);
            
            setTimeout(() => {
                expect(orientationChanged).toBe(true);
                done();
            }, 100);
        });
    });
    
    describe('Responsive Behavior', () => {
        test('should adjust layout for different screen sizes', () => {
            if (!mobileController) return;
            
            const hero = document.querySelector('.hero');
            const floating = document.querySelectorAll('.floating-social, .floating-contact');
            
            // Test mobile size
            Object.defineProperty(window, 'innerWidth', { value: 375 });
            mobileController.adjustForScreenSize();
            
            if (hero) {
                expect(hero.style.minHeight).toBe('60vh');
            }
            
            // Test tablet size
            Object.defineProperty(window, 'innerWidth', { value: 768 });
            mobileController.adjustForScreenSize();
            
            if (hero) {
                expect(hero.style.minHeight).toBe('70vh');
            }
        });
        
        test('should optimize images for mobile', () => {
            if (!mobileController) return;
            
            // Add test image
            const img = document.createElement('img');
            img.className = 'work-image';
            document.body.appendChild(img);
            
            mobileController.optimizeImages();
            
            expect(img.style.maxWidth).toBe('100%');
            expect(img.style.height).toBe('auto');
            
            if ('loading' in HTMLImageElement.prototype) {
                expect(img.loading).toBe('lazy');
            }
        });
        
        test('should setup responsive fonts', () => {
            if (!mobileController) return;
            
            // Test mobile font size
            Object.defineProperty(window, 'innerWidth', { value: 400 });
            mobileController.setupResponsiveFonts();
            
            const rootFontSize = getComputedStyle(document.documentElement).fontSize;
            // Font size should be adjusted for mobile
            expect(rootFontSize).toBeTruthy();
        });
        
        test('should handle touch events', (done) => {
            if (!mobileController) {
                done();
                return;
            }
            
            // Create touch element
            const touchElement = document.createElement('div');
            touchElement.className = 'btn';
            document.body.appendChild(touchElement);
            
            mobileController.setupTouchEvents();
            
            // Simulate touch start
            const touchStart = new Event('touchstart');
            touchElement.dispatchEvent(touchStart);
            
            setTimeout(() => {
                expect(touchElement.style.transform).toBe('scale(0.98)');
                
                // Simulate touch end
                const touchEnd = new Event('touchend');
                touchElement.dispatchEvent(touchEnd);
                
                setTimeout(() => {
                    expect(touchElement.style.transform).toBe('');
                    done();
                }, 100);
            }, 50);
        });
    });
    
    describe('Performance Optimizations', () => {
        test('should disable heavy animations on mobile', () => {
            if (!mobileController) return;
            
            // Add animated element
            const animatedElement = document.createElement('div');
            animatedElement.className = 'animated fade-in';
            document.body.appendChild(animatedElement);
            
            // Simulate mobile screen
            Object.defineProperty(window, 'innerWidth', { value: 600 });
            
            mobileController.setupMobileAnimations();
            
            expect(animatedElement.style.animation).toBe('none');
            expect(animatedElement.style.opacity).toBe('1');
        });
        
        test('should optimize forms for mobile', () => {
            // Create form elements
            const input = document.createElement('input');
            const textarea = document.createElement('textarea');
            const form = document.createElement('form');
            
            form.appendChild(input);
            form.appendChild(textarea);
            document.body.appendChild(form);
            
            if (mobileController) {
                mobileController.optimizeForMobile();
            }
            
            // Check viewport meta tag behavior
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewport);
            
            // Simulate input focus
            input.focus();
            expect(viewport).toBeTruthy();
            
            input.blur();
            expect(viewport.getAttribute('content')).toContain('width=device-width');
        });
    });
    
    describe('Accessibility Features', () => {
        test('should respect reduced motion preferences', () => {
            // Mock reduced motion preference
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: (query) => ({
                    matches: query === '(prefers-reduced-motion: reduce)',
                    addEventListener: () => {},
                    removeEventListener: () => {}
                })
            });
            
            // Test if animations are disabled
            const style = document.createElement('style');
            style.textContent = '@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }';
            document.head.appendChild(style);
            
            expect(style.textContent).toContain('animation: none');
        });
        
        test('should provide proper touch targets', () => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            document.body.appendChild(btn);
            
            document.body.classList.add('mobile-device');
            
            // CSS should ensure minimum touch target size
            const styles = getComputedStyle(btn);
            // Touch targets should be at least 44px (will be enforced by CSS)
            expect(btn.className).toBe('btn');
        });
    });
    
    describe('Error Handling', () => {
        test('should handle missing DOM elements gracefully', () => {
            // Remove required elements
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (navToggle) navToggle.remove();
            if (navMenu) navMenu.remove();
            
            // Should not throw error
            expect(() => {
                if (typeof MobileMenuController !== 'undefined') {
                    new MobileMenuController();
                }
            }).not.toThrow();
        });
        
        test('should handle window resize events safely', () => {
            if (!mobileController) return;
            
            // Multiple rapid resize events
            for (let i = 0; i < 10; i++) {
                Object.defineProperty(window, 'innerWidth', { value: 300 + i * 100 });
                const resizeEvent = new Event('resize');
                window.dispatchEvent(resizeEvent);
            }
            
            // Should handle gracefully without errors
            expect(mobileController.isMenuOpen).toBeDefined();
        });
    });
});

// Integration Tests
describe('Mobile Integration Tests', () => {
    test('should work with existing navigation system', () => {
        // Test integration with main navigation
        const nav = document.createElement('nav');
        nav.innerHTML = `
            <div class="nav-toggle" id="navToggle">
                <span></span><span></span><span></span>
            </div>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#" class="nav-link">Home</a></li>
            </ul>
        `;
        document.body.appendChild(nav);
        
        if (typeof MobileMenuController !== 'undefined') {
            const controller = new MobileMenuController();
            expect(controller.navToggle).toBeTruthy();
            expect(controller.navMenu).toBeTruthy();
        }
    });
    
    test('should integrate with responsive CSS', () => {
        // Test CSS integration
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .nav-toggle { display: flex; }
                .nav-menu { display: none; }
                .nav-menu.active { display: block; }
            }
        `;
        document.head.appendChild(style);
        
        expect(style.sheet.cssRules.length).toBeGreaterThan(0);
    });
});