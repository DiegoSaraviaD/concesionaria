// Configuración global mejorada
const CONFIG = {
    animationDuration: 600,
    scrollOffset: 80,
    debounceDelay: 100,
    intersectionThreshold: 0.1
};

// Utilidades mejoradas
const utils = {
    // Debounce para optimizar eventos
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Verificar si un elemento está en viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Obtener distancia desde el top
    getDistanceFromTop(element) {
        return element.getBoundingClientRect().top + window.pageYOffset;
    }
};

// Smooth scrolling mejorado con offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const targetPosition = utils.getDistanceFromTop(target) - CONFIG.scrollOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const navMenu = document.querySelector('.nav-menu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileBtn) mobileBtn.textContent = '☰';
            }
        }
    });
});

// Sistema de animaciones mejorado
class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        // Animaciones simplificadas para evitar bugs
        this.setupSimpleAnimations();
    }

    setupSimpleAnimations() {
        // Solo mostrar elementos sin animaciones complejas
        const elements = document.querySelectorAll('.section-card, .stat-item, .testimonial-card, .about-image');
        
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }

    createScrollObserver() {
const observerOptions = {
            threshold: CONFIG.intersectionThreshold,
    rootMargin: '0px 0px -50px 0px'
};

        this.scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

        // Observar elementos animables
        document.querySelectorAll('.section-card, .stat-item, .testimonial-card, .about-image').forEach(el => {
            this.prepareElement(el);
            this.scrollObserver.observe(el);
        });
    }

    createCounterObserver() {
        const counterOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        this.counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.counterObserver.unobserve(entry.target);
                }
            });
        }, counterOptions);

        document.querySelectorAll('.stat-number').forEach(stat => {
            this.counterObserver.observe(stat);
        });
    }

    prepareElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(2rem)';
        element.style.transition = `all ${CONFIG.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Agregar clase para efectos adicionales
        element.classList.add('animate-fadeInUp');
    }

    setupStaggeredAnimations() {
        // Animación escalonada para grids
        document.querySelectorAll('.section-grid, .testimonials-grid, .stats-grid').forEach(grid => {
            const items = grid.children;
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * 100}ms`;
            });
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const target = parseInt(text.replace(/[^\d]/g, ''));
        
        if (isNaN(target)) return;

        let current = 0;
        const increment = target / 50;
        const isPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const isTime = text.includes('/');
        
        // Contador simplificado sin animación
        if (isTime) {
            element.textContent = '24/7';
        } else {
            element.textContent = target + (hasPlus ? '+' : '') + (isPercent ? '%' : '');
        }
    }
}

// Inicializar el gestor de animaciones
const animationManager = new AnimationManager();

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-bg-image');
    
    if (hero && scrolled < hero.offsetHeight) {
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Gestor de menú móvil mejorado
class MobileMenuManager {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.mobileMenuBtn && this.navMenu) {
            this.setupEventListeners();
            this.setupResponsiveBehavior();
        }
    }

    setupEventListeners() {
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
        
        // Cerrar menú al hacer click en enlaces
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navMenu.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Cerrar menú con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
        }
    });
}

    setupResponsiveBehavior() {
        const handleResize = utils.debounce(() => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        }, CONFIG.debounceDelay);

        window.addEventListener('resize', handleResize);
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.navMenu.classList.add('active');
        this.mobileMenuBtn.textContent = '✕';
        this.isOpen = true;
        
        // Agregar animación de entrada
        this.navMenu.style.animation = 'slideInDown 0.3s ease-out';
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.mobileMenuBtn.textContent = '☰';
        this.isOpen = false;
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
}

// Inicializar el gestor de menú móvil
const mobileMenuManager = new MobileMenuManager();

// Contador animado para las estadísticas
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const isPercent = element.textContent.includes('%');
    const hasPlus = element.textContent.includes('+');
    const isTime = element.textContent.includes('/');
    
    // Contador simplificado sin animación
            if (isTime) {
                element.textContent = '24/7';
            } else {
                element.textContent = target + (hasPlus ? '+' : '') + (isPercent ? '%' : '');
            }
}

// Activar contadores cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target;
            const text = number.textContent;
            
            // Manejar el caso especial de 24/7
            if (text.includes('/')) {
                number.textContent = '24/7';
                statsObserver.unobserve(entry.target);
                return;
            }
            
            const target = parseInt(text.replace(/[^\d]/g, ''));
            if (target && target > 0) {
                animateCounter(number, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Efecto de typing para el título del hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efecto de typing cuando la página carga
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Animación de las tarjetas de testimonios
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Efecto hover para las imágenes de las tarjetas (SIN afectar la opacidad)
document.querySelectorAll('.section-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.card-image img');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.card-image img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Header mantiene color consistente - sin cambios al hacer scroll

// Preloader simple (SIN afectar imágenes)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ELIMINADO: Lazy loading que causaba que las imágenes desaparezcan
// Las imágenes ahora cargan normalmente sin efectos de desaparición

// Validación simple para formularios (si se agregan más adelante)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar notificaciones (toast)
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.padding = '1rem 1.5rem';
    toast.style.borderRadius = '0.5rem';
    toast.style.color = 'white';
    toast.style.zIndex = '9999';
    toast.style.transition = 'all 0.3s ease';
    toast.style.transform = 'translateX(100%)';
    
    if (type === 'success') {
        toast.style.background = '#10b981';
    } else if (type === 'error') {
        toast.style.background = '#ef4444';
    } else {
        toast.style.background = '#3b82f6';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Función para smooth scroll personalizado
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - 80; // 80px para el header fijo
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Gestor de imágenes optimizado
class ImageManager {
    constructor() {
        this.loadedImages = new Set();
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupErrorHandling();
        this.preloadCriticalImages();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupErrorHandling() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', (e) => {
                this.handleImageError(e.target);
            });

            img.addEventListener('load', (e) => {
                this.handleImageLoad(e.target);
            });
        });
    }

    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    }

    handleImageError(img) {
        console.warn('Error loading image:', img.src);
        
        // Crear fallback con emoji según el contexto
        const parent = img.parentElement;
        const alt = img.alt.toLowerCase();
        
        let emoji = '🚗'; // Default
        if (alt.includes('servicio') || alt.includes('taller') || alt.includes('mecánico')) {
            emoji = '🔧';
        } else if (alt.includes('financiamiento') || alt.includes('dinero') || alt.includes('crédito')) {
            emoji = '💰';
        } else if (alt.includes('contacto') || alt.includes('cliente') || alt.includes('atención')) {
            emoji = '📞';
        } else if (alt.includes('banco') || alt.includes('financiero')) {
            emoji = '🏦';
        }
        
        // Reemplazar con fallback visual
        parent.innerHTML = `
            <div style="
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                font-size: 3rem;
                border-radius: var(--border-radius);
            ">${emoji}</div>
        `;
    }

    handleImageLoad(img) {
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';
        this.loadedImages.add(img.src);
    }

    preloadCriticalImages() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1562141961-ca7e4ac6a3c9',
            'https://images.unsplash.com/photo-1549924231-f129b911e442'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Gestor de rendimiento
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollOptimization();
        this.setupResizeOptimization();
        this.monitorPerformance();
    }

    setupScrollOptimization() {
        const handleScroll = utils.throttle(() => {
            this.updateHeaderOnScroll();
            this.updateParallax();
        }, 16); // 60fps

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupResizeOptimization() {
        const handleResize = utils.debounce(() => {
            this.handleResize();
        }, CONFIG.debounceDelay);

        window.addEventListener('resize', handleResize);
    }

    updateHeaderOnScroll() {
        // Función removida para mantener el header con color consistente
        // El header ahora mantiene su color original sin cambios
    }

    updateParallax() {
        // Efecto parallax removido para evitar bugs
        // El hero mantiene su posición fija
    }

    handleResize() {
        // Recalcular animaciones si es necesario
        animationManager.setupStaggeredAnimations();
    }

    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }
}

// Gestor de notificaciones mejorado
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.init();
    }

    init() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 1.25rem;
            right: 1.25rem;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 0.625rem;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 3000) {
        const notification = this.createNotification(message, type);
        const container = document.getElementById('notification-container');
        
        container.appendChild(notification);
        this.notifications.push(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        // Auto-remove
        setTimeout(() => {
            this.remove(notification);
        }, duration);
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        notification.style.cssText = `
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 20rem;
            word-wrap: break-word;
            position: relative;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span>${this.getIcon(type)}</span>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: white; cursor: pointer; margin-left: auto; font-size: 1.2rem;">×</button>
            </div>
        `;

        return notification;
    }

    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    remove(notification) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }
}

// Inicializar todos los gestores
document.addEventListener('DOMContentLoaded', function() {
    new ImageManager();
    new PerformanceManager();
    window.notificationManager = new NotificationManager();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        window.notificationManager.show('¡Bienvenido a Wheesly! 🚗', 'success', 2000);
    }, 1000);
});