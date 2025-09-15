// script.js

// Simple calculator function that works
function calcularFinanciamiento() {
    const precio = parseFloat(document.getElementById('precio').value) || 85000;
    const inicial = parseFloat(document.getElementById('inicial').value) || 0;
    const plazo = parseInt(document.getElementById('plazo').value) || 60;
    const tasaAnual = parseFloat(document.getElementById('tasa').value) || 7.5;

    // Calculate loan amount
    const montoCredito = precio - inicial;
    
    // Monthly interest rate
    const tasaMensual = tasaAnual / 100 / 12;
    
    // Monthly payment calculation using PMT formula
    let cuotaMensual;
    if (tasaMensual === 0) {
        cuotaMensual = montoCredito / plazo;
    } else {
        cuotaMensual = montoCredito * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / 
                       (Math.pow(1 + tasaMensual, plazo) - 1);
    }
    
    // Total to pay
    const totalPagar = cuotaMensual * plazo + inicial;
    
    // Total interests
    const totalIntereses = totalPagar - precio;

    // Display results
    const resultCard = document.getElementById('resultCard');
    const resultGrid = document.getElementById('resultGrid');
    
    resultGrid.innerHTML = `
        <div class="result-item">
            <span class="result-value">S/. ${cuotaMensual.toLocaleString('es-PE', {minimumFractionDigits: 2})}</span>
            <div class="result-label">Cuota Mensual</div>
        </div>
        <div class="result-item">
            <span class="result-value">S/. ${montoCredito.toLocaleString('es-PE', {minimumFractionDigits: 2})}</span>
            <div class="result-label">Monto del Crédito</div>
        </div>
        <div class="result-item">
            <span class="result-value">S/. ${totalPagar.toLocaleString('es-PE', {minimumFractionDigits: 2})}</span>
            <div class="result-label">Total a Pagar</div>
        </div>
        <div class="result-item">
            <span class="result-value">S/. ${totalIntereses.toLocaleString('es-PE', {minimumFractionDigits: 2})}</span>
            <div class="result-label">Total Intereses</div>
        </div>
    `;
    
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Request credit function
function solicitarCredito(tipoCredito) {
    const mensaje = `Hola, me interesa solicitar información sobre ${tipoCredito}. ¿Podrían contactarme para brindarme más detalles?`;
    const whatsappUrl = `https://wa.me/51123456789?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
}

// FAQ toggle function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Auto-calculate when inputs change
function initializeCalculator() {
    const inputs = ['precio', 'inicial', 'plazo', 'tasa'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', calcularFinanciamiento);
            element.addEventListener('input', calcularFinanciamiento);
        }
    });

    // Initial calculation
    calcularFinanciamiento();
}

// Initialize page animations
function initializeAnimations() {
    // Animate elements on scroll
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

    // Observe option cards
    document.querySelectorAll('.option-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe bank cards
    document.querySelectorAll('.bank-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.05}s`;
        observer.observe(card);
    });

    // Observe timeline steps
    document.querySelectorAll('.timeline-step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(50px)';
        step.style.transition = `all 0.8s ease ${index * 0.2}s`;
        observer.observe(step);
    });

    // Observe FAQ items
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Interactive calculator inputs
function initializeInteractiveInputs() {
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.parentElement.style.boxShadow = 'none';
        });
    });
}

// Option cards hover effect
function initializeOptionCards() {
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.option-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.option-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Bank cards interactive effect
function initializeBankCards() {
    document.querySelectorAll('.bank-card').forEach(card => {
        card.addEventListener('click', function() {
            const bankName = this.querySelector('.bank-name').textContent;
            const mensaje = `Hola, me interesa conocer las condiciones de financiamiento con ${bankName}. ¿Podrían brindarme más información?`;
            const whatsappUrl = `https://wa.me/51123456789?text=${encodeURIComponent(mensaje)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Timeline animation enhancement
function initializeTimeline() {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.querySelector('.step-number');
                if (stepNumber) {
                    stepNumber.style.animation = 'bounce 1s ease';
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.timeline-step').forEach(step => {
        timelineObserver.observe(step);
    });
}

// Calculator input validation
function initializeInputValidation() {
    const precioInput = document.getElementById('precio');
    const inicialInput = document.getElementById('inicial');
    
    if (precioInput && inicialInput) {
        precioInput.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (value > 0) {
                const suggestedInitial = Math.round(value * 0.2 / 1000) * 1000;
                inicialInput.placeholder = suggestedInitial.toLocaleString();
            }
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add floating effect to calculator
function initializeFloatingEffect() {
    setInterval(() => {
        const calculator = document.querySelector('.calculator-section');
        if (calculator) {
            calculator.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                calculator.style.transform = 'translateY(0px)';
            }, 2000);
        }
    }, 4000);
}

// Hero stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numValue = parseFloat(finalValue.replace('%', ''));
        let currentValue = 0;
        const increment = numValue / 50;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '');
            }
        }, 30);
    });
}

// Initialize hero stats animation
function initializeHeroStats() {
    // Trigger stats animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const hero = document.querySelector('.hero');
    if (hero) {
        heroObserver.observe(hero);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    initializeAnimations();
    initializeInteractiveInputs();
    initializeOptionCards();
    initializeBankCards();
    initializeTimeline();
    initializeInputValidation();
    initializeSmoothScrolling();
    initializeFloatingEffect();
    initializeHeroStats();
});

// Add error handling for calculator
function formatNumber(number) {
    return new Intl.NumberFormat('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

// Enhanced calculator with error handling
function calcularFinanciamientoEnhanced() {
    try {
        const precio = parseFloat(document.getElementById('precio').value) || 85000;
        const inicial = parseFloat(document.getElementById('inicial').value) || 0;
        const plazo = parseInt(document.getElementById('plazo').value) || 60;
        const tasaAnual = parseFloat(document.getElementById('tasa').value) || 7.5;

        // Validation
        if (inicial >= precio) {
            alert('La cuota inicial no puede ser mayor o igual al precio del vehículo');
            return;
        }

        if (precio <= 0) {
            alert('El precio del vehículo debe ser mayor a cero');
            return;
        }

        // Calculate loan amount
        const montoCredito = precio - inicial;
        
        // Monthly interest rate
        const tasaMensual = tasaAnual / 100 / 12;
        
        // Monthly payment calculation using PMT formula
        let cuotaMensual;
        if (tasaMensual === 0) {
            cuotaMensual = montoCredito / plazo;
        } else {
            cuotaMensual = montoCredito * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / 
                           (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        // Total to pay
        const totalPagar = cuotaMensual * plazo + inicial;
        
        // Total interests
        const totalIntereses = totalPagar - precio;

        // Display results
        const resultCard = document.getElementById('resultCard');
        const resultGrid = document.getElementById('resultGrid');
        
        resultGrid.innerHTML = `
            <div class="result-item">
                <span class="result-value">S/. ${formatNumber(cuotaMensual)}</span>
                <div class="result-label">Cuota Mensual</div>
            </div>
            <div class="result-item">
                <span class="result-value">S/. ${formatNumber(montoCredito)}</span>
                <div class="result-label">Monto del Crédito</div>
            </div>
            <div class="result-item">
                <span class="result-value">S/. ${formatNumber(totalPagar)}</span>
                <div class="result-label">Total a Pagar</div>
            </div>
            <div class="result-item">
                <span class="result-value">S/. ${formatNumber(totalIntereses)}</span>
                <div class="result-label">Total Intereses</div>
            </div>
        `;
        
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        console.error('Error en el cálculo:', error);
        alert('Ocurrió un error en el cálculo. Por favor, verifica los datos ingresados.');
    }
}

// Replace the original calculator function
window.calcularFinanciamiento = calcularFinanciamientoEnhanced;