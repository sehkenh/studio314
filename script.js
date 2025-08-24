// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Pricing button interactions
document.querySelectorAll('.pricing-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        
        if (this.classList.contains('contact-btn')) {
            // Scroll to contact form for enterprise plan
            document.querySelector('#contacto').scrollIntoView({
                behavior: 'smooth'
            });
            // Pre-select enterprise option
            const select = document.querySelector('select');
            select.value = 'empresarial';
        } else {
            // Scroll to contact form and pre-select plan
            document.querySelector('#contacto').scrollIntoView({
                behavior: 'smooth'
            });
            
            const select = document.querySelector('select');
            const planValue = planName.toLowerCase().replace('á', 'a');
            select.value = planValue;
        }
    });
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const plan = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !plan || !message) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Simulate form submission
    alert(`¡Gracias ${name}! Hemos recibido tu consulta sobre el plan ${plan}. Te contactaremos pronto.`);
    this.reset();
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(94, 0, 255, 0.98)';
    } else {
        nav.style.background = 'rgba(94, 0, 255, 0.95)';
    }
});

// Animation on scroll for pricing cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe pricing cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});