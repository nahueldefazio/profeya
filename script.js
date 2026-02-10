// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll para enlaces de ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // Para "Contacto", centramos específicamente el botón de WhatsApp
        if (href === '#contacto') {
            const whatsappBtn = document.querySelector('.btn-whatsapp');
            if (whatsappBtn) {
                const rect = whatsappBtn.getBoundingClientRect();
                const absoluteElTop = rect.top + window.pageYOffset;
                const offset = absoluteElTop - (window.innerHeight / 2) + (rect.height / 2);

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
                return;
            }
        }

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect + mostrar botón "arriba"
let lastScroll = 0;
const header = document.querySelector('.header');
const scrollTopBtn = document.querySelector('.float-btn-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    if (scrollTopBtn) {
        scrollTopBtn.style.display = currentScroll > 350 ? 'flex' : 'none';
    }
    
    lastScroll = currentScroll;
});


// Intersection Observer para animaciones de aparición
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar secciones y tarjetas para animación
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll(
        '.materia-card, .clase-card, .feature-item, ' +
        '.section-title, .section-subtitle, .metodologia-content, ' +
        '.whatsapp-content, .footer-content'
    );

    elementsToReveal.forEach(el => {
        observer.observe(el);
    });

    // Acción del botón "volver arriba"
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
