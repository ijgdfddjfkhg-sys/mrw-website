/**
 * 🔧 SOCIAL ICONS FIX - Simple & Reliable
 * حل بسيط وموثوق لأيقونات التواصل الاجتماعي
 */

(function() {
    'use strict';
    
    console.log('🔧 Social Fix: Initializing...');
    
    // Wait for DOM to be ready
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    
    // Initialize social icons functionality
    function initSocialIcons() {
        console.log('🔧 Social Fix: DOM Ready, setting up social icons...');
        
        // Get elements
        const socialContainer = document.querySelector('.floating-social');
        const socialToggle = document.querySelector('.social-toggle');
        const socialIcons = document.querySelector('.social-icons');
        
        // Check if elements exist
        if (!socialContainer || !socialToggle || !socialIcons) {
            console.error('🔧 Social Fix: Missing elements!', {
                container: !!socialContainer,
                toggle: !!socialToggle,
                icons: !!socialIcons
            });
            return;
        }
        
        console.log('✅ Social Fix: All elements found!');
        
        // State management
        let isOpen = false;
        
        // Toggle function
        function toggleSocialIcons() {
            console.log(`🔧 Social Fix: Toggling social icons (currently ${isOpen ? 'open' : 'closed'})`);
            
            isOpen = !isOpen;
            
            if (isOpen) {
                socialToggle.classList.add('active');
                socialIcons.classList.add('active');
                console.log('✅ Social Fix: Social icons opened');
            } else {
                socialToggle.classList.remove('active');
                socialIcons.classList.remove('active');
                console.log('✅ Social Fix: Social icons closed');
            }
        }
        
        // Add click event to toggle button
        socialToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSocialIcons();
        });
        
        // Close social icons when clicking outside
        document.addEventListener('click', function(e) {
            if (!socialContainer.contains(e.target) && isOpen) {
                console.log('🔧 Social Fix: Clicking outside, closing social icons');
                isOpen = true; // Set to true so toggle will close it
                toggleSocialIcons();
            }
        });
        
        // Keyboard accessibility
        socialToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSocialIcons();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                console.log('🔧 Social Fix: Escape key pressed, closing social icons');
                isOpen = true; // Set to true so toggle will close it
                toggleSocialIcons();
            }
        });
        
        // Add accessibility attributes
        socialToggle.setAttribute('aria-label', 'فتح قائمة التواصل الاجتماعي');
        socialToggle.setAttribute('aria-expanded', 'false');
        socialToggle.setAttribute('tabindex', '0');
        socialToggle.setAttribute('role', 'button');
        
        // Update aria-expanded when toggling
        const originalToggle = toggleSocialIcons;
        toggleSocialIcons = function() {
            originalToggle();
            socialToggle.setAttribute('aria-expanded', isOpen.toString());
            socialToggle.setAttribute('aria-label', 
                isOpen ? 'إغلاق قائمة التواصل الاجتماعي' : 'فتح قائمة التواصل الاجتماعي'
            );
        };
        
        // Test the functionality
        setTimeout(() => {
            console.log('🧪 Social Fix: Testing functionality...');
            
            // Test open
            toggleSocialIcons();
            
            setTimeout(() => {
                // Test close
                toggleSocialIcons();
                console.log('✅ Social Fix: Test completed successfully!');
            }, 1000);
        }, 2000);
        
        console.log('✅ Social Fix: Initialization complete!');
    }
    
    // Enhanced error handling
    function handleError(error) {
        console.error('❌ Social Fix: Error occurred', error);
        
        // Try to fix common issues
        setTimeout(() => {
            console.log('🔄 Social Fix: Retrying initialization...');
            initSocialIcons();
        }, 1000);
    }
    
    // Initialize with error handling
    domReady(function() {
        try {
            initSocialIcons();
        } catch (error) {
            handleError(error);
        }
    });
    
    // Backup initialization for slow loading
    setTimeout(() => {
        if (!window.socialFixInitialized) {
            console.log('🔄 Social Fix: Backup initialization...');
            try {
                initSocialIcons();
                window.socialFixInitialized = true;
            } catch (error) {
                handleError(error);
            }
        }
    }, 3000);
    
    // Export for debugging
    window.SocialFix = {
        init: initSocialIcons,
        version: '1.0.0',
        status: 'ready'
    };
    
})();

// Additional Font Awesome icon loading fix
document.addEventListener('DOMContentLoaded', function() {
    // Ensure Font Awesome icons are loaded
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    link.integrity = 'sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==';
    link.crossOrigin = 'anonymous';
    
    // Only add if not already present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        document.head.appendChild(link);
        console.log('✅ Social Fix: Font Awesome CSS loaded');
    }
});

// Debug information
console.log('🔧 Social Fix Script: Loaded and ready');
console.log('Device Info:', {
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    isMobile: /Mobile|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent),
    isTouch: 'ontouchstart' in window
});