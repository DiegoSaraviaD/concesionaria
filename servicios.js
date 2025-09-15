// Servicios JavaScript

// Solicitar servicio via WhatsApp
function solicitarServicio(servicio) {
    const mensaje = `Hola, me gustaría solicitar una cita para el servicio de ${servicio}. ¿Cuándo tienen disponibilidad?`;
    const whatsappUrl = `https://wa.me/51123456789?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeImageLoading();
    initializeInteractiveElements();
    initializeSmoothScrolling();
});

// Animation system
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate service cards
    animateElements('.service-card', observer, 0.1);
    
    // Animate team members
    animateElements('.team-member', observer, 0.15);
    
    // Animate process steps
    animateElements('.process-step', observer, 0.1);
    
    // Animate feature items
    animateElements('.feature-item', observer, 0.1, 'scale');
}

function animateElements(selector, observer, delayIncrement, animationType = 'translateY') {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.style.opacity = '0';
        
        if (animationType === 'scale') {
            element.style.transform = 'scale(0.8)';
        } else {
            element.style.transform = 'translateY(30px)';
        }
        
        element.style.transition = `all 0.6s ease ${index * delayIncrement}s`;
        observer.observe(element);
    });
}

// Image loading system
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                console.warn(`Failed to load image: ${img.src}`);
                img.style.opacity = '0.5';
                img.alt = 'Error al cargar imagen';
            });
        }
    });
}

// Interactive elements
function initializeInteractiveElements() {
    // Service card interactions
    initializeServiceCards();
    
    // Workshop image interaction
    initializeWorkshopImage();
    
    // Team member interactions
    initializeTeamMembers();
    
    // Process step animations
    initializeProcessSteps();
    
    // Price highlighting
    initializePriceHighlighting();
}

function initializeServiceCards() {
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Add click ripple effect
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('service-button')) return;
            
            createRippleEffect(card, e);
        });
    });
}

function initializeWorkshopImage() {
    const workshopImage = document.querySelector('.workshop-image');
    if (workshopImage) {
        workshopImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        workshopImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

function initializeTeamMembers() {
    document.querySelectorAll('.member-photo').forEach(photo => {
        photo.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

function initializeProcessSteps() {
    document.querySelectorAll('.step-number').forEach(number => {
        number.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });

        number.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

function initializePriceHighlighting() {
    document.querySelectorAll('.service-price').forEach(price => {
        setInterval(() => {
            highlightPrice(price);
        }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds
    });
}

function highlightPrice(priceElement) {
    priceElement.style.color = '#22c55e';
    priceElement.style.transform = 'scale(1.05)';
    priceElement.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        priceElement.style.color = '#000';
        priceElement.style.transform = 'scale(1)';
    }, 1000);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Ripple effect for cards
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 1000;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Animate ripple
    requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
        ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    });

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(0,0,0,0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#000';
            header.style.backdropFilter = 'none';
        }

        // Keep header always visible
        header.style.transform = 'translateY(0)';

        lastScroll = currentScroll;
    });
}

// Initialize header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    initializeHeaderScroll();
});

// Service button interactions
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        });

        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Feature item hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Accessibility improvements
function initializeAccessibility() {
    // Add focus indicators for keyboard navigation
    document.querySelectorAll('button, a, [tabindex]').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #ffd700';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#servicios';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize all accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
    initializeLazyLoading();
});

// Error handling for failed API calls or missing elements
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // Could send error to analytics service here
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', function() {
    handleErrors();
});

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solicitarServicio,
        createRippleEffect,
        throttle
    };
}