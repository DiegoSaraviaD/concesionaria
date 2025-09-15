// Sample vehicle data with real car images
const vehiclesData = [
    {
        brand: "Toyota",
        name: "Corolla 2024",
        type: "sedan",
        price: "S/. 89,500",
        year: 2024,
        status: "new",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática",
            mileage: "0 km",
            engine: "1.8L"
        },
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "Nissan",
        name: "Sentra 2023",
        type: "sedan",
        price: "S/. 78,900",
        year: 2023,
        status: "used",
        specs: {
            fuel: "Gasolina",
            transmission: "Manual",
            mileage: "15,000 km",
            engine: "1.6L"
        },
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "Hyundai",
        name: "Tucson 2024",
        type: "suv",
        price: "S/. 125,000",
        year: 2024,
        status: "new",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática",
            mileage: "0 km",
            engine: "2.0L"
        },
        image: "Tucson 2024.jpg"
    },
    {
        brand: "KIA",
        name: "Rio Hatchback 2023",
        type: "hatchback",
        price: "S/. 65,500",
        year: 2023,
        status: "new",
        specs: {
            fuel: "Gasolina",
            transmission: "Manual",
            mileage: "0 km",
            engine: "1.4L"
        },
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "Mazda",
        name: "CX-5 2024",
        type: "suv",
        price: "S/. 145,800",
        year: 2024,
        status: "new",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática",
            mileage: "0 km",
            engine: "2.5L"
        },
        image: "CX-5 2024.jpg"
    },
    {
        brand: "Honda",
        name: "Civic 2023",
        type: "sedan",
        price: "S/. 95,200",
        year: 2023,
        status: "used",
        specs: {
            fuel: "Gasolina",
            transmission: "CVT",
            mileage: "8,500 km",
            engine: "1.5L Turbo"
        },
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "Toyota",
        name: "RAV4 2024",
        type: "suv",
        price: "S/. 135,900",
        year: 2024,
        status: "new",
        specs: {
            fuel: "Híbrido",
            transmission: "CVT",
            mileage: "0 km",
            engine: "2.5L Híbrido"
        },
        image: "RAV4 2024.jpg"
    },
    {
        brand: "Nissan",
        name: "Frontier 2024",
        type: "pickup",
        price: "S/. 115,500",
        year: 2024,
        status: "new",
        specs: {
            fuel: "Diésel",
            transmission: "Manual",
            mileage: "0 km",
            engine: "2.3L Turbo"
        },
        image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "Honda",
        name: "City Hatchback 2023",
        type: "hatchback",
        price: "S/. 72,800",
        year: 2023,
        status: "new",
        specs: {
            fuel: "Gasolina",
            transmission: "CVT",
            mileage: "0 km",
            engine: "1.5L"
        },
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "Hyundai",
        name: "Elantra 2024",
        type: "sedan",
        price: "S/. 82,500",
        year: 2024,
        status: "new",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática",
            mileage: "0 km",
            engine: "2.0L"
        },
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "KIA",
        name: "Sportage 2024",
        type: "suv",
        price: "S/. 118,900",
        year: 2024,
        status: "new",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática",
            mileage: "0 km",
            engine: "2.0L"
        },
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        brand: "Mazda",
        name: "Mazda3 Sedan 2023",
        type: "sedan",
        price: "S/. 85,200",
        year: 2023,
        status: "used",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática",
            mileage: "12,000 km",
            engine: "2.0L"
        },
        image: "Mazda3 Sedan 2023.png"
    }
];

let currentVehicles = [...vehiclesData];

// Generate vehicle cards
function generateVehicleCards(vehicles) {
    const grid = document.getElementById('vehiclesGrid');
    grid.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Crear imagen con fallback
        const imageElement = document.createElement('div');
        imageElement.className = 'vehicle-image';
        
        // Intentar cargar la imagen
        const img = new Image();
        img.onload = function() {
            imageElement.style.backgroundImage = `url('${vehicle.image}')`;
            imageElement.style.backgroundColor = 'transparent';
        };
        img.onerror = function() {
            // Si falla, usar un gradiente con el nombre del vehículo
            const brandColors = {
                'Toyota': '#e53e3e',
                'Nissan': '#3182ce',
                'Hyundai': '#38a169',
                'KIA': '#d69e2e',
                'Mazda': '#9f7aea',
                'Honda': '#dd6b20'
            };
            const color = brandColors[vehicle.brand] || '#718096';
            imageElement.style.background = `linear-gradient(135deg, ${color}, #2d3748)`;
            imageElement.innerHTML = `
                <div style="color: white; text-align: center; padding: 1rem; z-index: 2; position: relative;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🚗</div>
                    <div style="font-weight: bold; font-size: 1rem;">${vehicle.brand}</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">${vehicle.name.split(' ')[0]}</div>
                </div>
            `;
        };
        img.src = vehicle.image;
        
        card.innerHTML = `
            <div class="vehicle-badge ${vehicle.status}">${vehicle.status === 'new' ? 'Nuevo' : 'Usado'}</div>
            <div class="vehicle-info">
                <div class="vehicle-brand">${vehicle.brand}</div>
                <div class="vehicle-name">${vehicle.name}</div>
                <div class="vehicle-specs">
                    <div class="spec-item">⛽ ${vehicle.specs.fuel}</div>
                    <div class="spec-item">⚙️ ${vehicle.specs.transmission}</div>
                    <div class="spec-item">📊 ${vehicle.specs.mileage}</div>
                    <div class="spec-item">🔧 ${vehicle.specs.engine}</div>
                </div>
                <div class="vehicle-price">${vehicle.price}</div>
                <div class="vehicle-actions">
                    <button class="btn btn-primary btn-sm" onclick="verDetalle('${vehicle.name}')">Ver Detalle</button>
                    <button class="btn btn-secondary btn-sm" onclick="contactarVendedor('${vehicle.name}')">Contactar</button>
                </div>
            </div>
        `;
        
        // Insertar la imagen al principio de la tarjeta
        card.insertBefore(imageElement, card.firstChild);
        card.classList.add('fade-in');
        grid.appendChild(card);
    });
}

// Filter functions
function aplicarFiltros() {
    const marca = document.getElementById('marca').value.toLowerCase();
    const tipo = document.getElementById('tipo').value.toLowerCase();
    const precioMin = parseFloat(document.getElementById('precio-min').value) || 0;
    const precioMax = parseFloat(document.getElementById('precio-max').value) || Infinity;

    currentVehicles = vehiclesData.filter(vehicle => {
        const vehiclePrice = parseFloat(vehicle.price.replace(/[S\/\.\,]/g, ''));
        
        return (!marca || vehicle.brand.toLowerCase().includes(marca)) &&
               (!tipo || vehicle.type === tipo) &&
               vehiclePrice >= precioMin &&
               vehiclePrice <= precioMax;
    });

    generateVehicleCards(currentVehicles);
    
    // Smooth scroll to results
    document.querySelector('.vehicles-section').scrollIntoView({
        behavior: 'smooth'
    });
}

function limpiarFiltros() {
    document.getElementById('marca').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('precio-min').value = '';
    document.getElementById('precio-max').value = '';
    
    currentVehicles = [...vehiclesData];
    generateVehicleCards(currentVehicles);
}

function filtrarPorCategoria(categoria) {
    document.getElementById('tipo').value = categoria;
    aplicarFiltros();
}

function verDetalle(vehicleName) {
    const vehicle = vehiclesData.find(v => v.name === vehicleName);
    if (!vehicle) return;
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Crear contenido del modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 1rem;
        max-width: 50rem;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 1rem 3rem rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease-out;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div style="position: relative;">
            <button onclick="this.closest('.modal-overlay').remove()" 
                    style="position: absolute; top: 1rem; right: 1rem; 
                           background: rgba(255,255,255,0.9); border: none; 
                           border-radius: 50%; width: 2.5rem; height: 2.5rem; 
                           font-size: 1.2rem; cursor: pointer; z-index: 1;
                           box-shadow: 0 0.25rem 0.5rem rgba(0,0,0,0.1);
                           transition: all 0.3s ease;">❌</button>
            
            <div style="background-image: url('${vehicle.image}'); 
                        background-size: cover; background-position: center;
                        height: 20rem; border-radius: 1rem 1rem 0 0; 
                        position: relative; overflow: hidden;">
                <div style="position: absolute; bottom: 1rem; left: 1rem;">
                    <span style="background: ${vehicle.status === 'new' ? 'linear-gradient(45deg, #10b981, #059669)' : 'linear-gradient(45deg, #f59e0b, #d97706)'};
                                 color: white; padding: 0.5rem 1rem; 
                                 border-radius: 1rem; font-weight: 600; font-size: 0.875rem;">
                        ${vehicle.status === 'new' ? '🆕 Nuevo' : '🚗 Usado'}
                    </span>
                </div>
            </div>
            
            <div style="padding: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                    <div>
                        <div style="color: #64748b; font-size: 0.875rem; font-weight: 600; 
                                    text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">
                            ${vehicle.brand}
                        </div>
                        <h2 style="font-size: 2rem; color: #1e3c72; font-weight: 700; margin: 0;">
                            ${vehicle.name}
                        </h2>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 2rem; color: #1e3c72; font-weight: 700;">
                            ${vehicle.price}
                        </div>
                        <div style="color: #64748b; font-size: 0.875rem;">
                            Año ${vehicle.year}
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); 
                            border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 2rem;">
                    <h3 style="color: #1e3c72; font-size: 1.25rem; font-weight: 600; 
                               margin: 0 0 1rem 0; display: flex; align-items: center;">
                        ⚙️ Especificaciones Técnicas
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="background: #1e3c72; color: white; border-radius: 0.5rem; 
                                         width: 2rem; height: 2rem; display: flex; align-items: center; 
                                         justify-content: center; font-size: 0.875rem;">⛽</span>
                            <div>
                                <div style="font-weight: 600; color: #1e3c72;">Combustible</div>
                                <div style="color: #64748b; font-size: 0.875rem;">${vehicle.specs.fuel}</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="background: #1e3c72; color: white; border-radius: 0.5rem; 
                                         width: 2rem; height: 2rem; display: flex; align-items: center; 
                                         justify-content: center; font-size: 0.875rem;">⚙️</span>
                            <div>
                                <div style="font-weight: 600; color: #1e3c72;">Transmisión</div>
                                <div style="color: #64748b; font-size: 0.875rem;">${vehicle.specs.transmission}</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="background: #1e3c72; color: white; border-radius: 0.5rem; 
                                         width: 2rem; height: 2rem; display: flex; align-items: center; 
                                         justify-content: center; font-size: 0.875rem;">🔧</span>
                            <div>
                                <div style="font-weight: 600; color: #1e3c72;">Motor</div>
                                <div style="color: #64748b; font-size: 0.875rem;">${vehicle.specs.engine}</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="background: #1e3c72; color: white; border-radius: 0.5rem; 
                                         width: 2rem; height: 2rem; display: flex; align-items: center; 
                                         justify-content: center; font-size: 0.875rem;">📊</span>
                            <div>
                                <div style="font-weight: 600; color: #1e3c72;">Kilometraje</div>
                                <div style="color: #64748b; font-size: 0.875rem;">${vehicle.specs.mileage}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); 
                            border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 2rem;">
                    <h3 style="color: #92400e; font-size: 1.25rem; font-weight: 600; 
                               margin: 0 0 1rem 0; display: flex; align-items: center;">
                        ✨ Características Destacadas
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>🛡️</span> <span>Sistema de seguridad avanzado</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>📱</span> <span>Conectividad Bluetooth</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>❄️</span> <span>Aire acondicionado automático</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>🎵</span> <span>Sistema de audio premium</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>🔋</span> <span>Cargador USB múltiple</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>🚗</span> <span>Control de crucero</span>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button onclick="contactarVendedor('${vehicle.name}'); this.closest('.modal-overlay').remove();" 
                            style="flex: 1; min-width: 12rem; background: linear-gradient(45deg, #1e3c72, #2a5298); 
                                   color: white; border: none; padding: 1rem 2rem; border-radius: 0.5rem; 
                                   font-weight: 600; font-size: 1rem; cursor: pointer; 
                                   transition: all 0.3s ease; display: flex; align-items: center; 
                                   justify-content: center; gap: 0.5rem;">
                        📞 Contactar Vendedor
                    </button>
                    <button onclick="window.print()" 
                            style="background: #f1f5f9; color: #64748b; border: 2px solid #e2e8f0; 
                                   padding: 1rem 2rem; border-radius: 0.5rem; font-weight: 600; 
                                   cursor: pointer; transition: all 0.3s ease; display: flex; 
                                   align-items: center; gap: 0.5rem;">
                        🖨️ Imprimir
                    </button>
                    <button onclick="alert('Agregado a favoritos ❤️')" 
                            style="background: #fef2f2; color: #dc2626; border: 2px solid #fecaca; 
                                   padding: 1rem 2rem; border-radius: 0.5rem; font-weight: 600; 
                                   cursor: pointer; transition: all 0.3s ease; display: flex; 
                                   align-items: center; gap: 0.5rem;">
                        ❤️ Favorito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Agregar estilos de animación
    const styles = document.createElement('style');
    styles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(2rem); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .modal-overlay button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(styles);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });
}

function contactarVendedor(vehicleName) {
    const mensaje = `Hola, estoy interesado en el ${vehicleName}. ¿Podrían brindarme más información?`;
    const whatsappUrl = `https://wa.me/51123456789?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    generateVehicleCards(vehiclesData);
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.vehicle-card, .category-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add loading effect for filters
document.querySelectorAll('.filter-group select, .filter-group input').forEach(element => {
    element.addEventListener('change', function() {
        this.style.borderColor = '#22c55e';
        setTimeout(() => {
            this.style.borderColor = '#e2e8f0';
        }, 500);
    });
});

// Smooth scrolling for anchor links
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
