document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // 2. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .fade-in, .fade-up').forEach(el => {
        if (!el.closest('.hero-content')) {
            observer.observe(el);
        }
    });

    // 3. Smooth Scrolling for Anchor Links
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

    // 4. Gold Particles Effect in Hero Section
    const particlesContainer = document.getElementById('particles');
    
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10; // 10s to 20s
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
        
        // Remove particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    };

    // Create particles periodically
    setInterval(createParticle, 300);

    // Initial particles
    for(let i=0; i<30; i++) {
        setTimeout(createParticle, Math.random() * 3000);
    }

    // 5. Lightbox for Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const galleryItems = document.querySelectorAll('.grid-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

    // 6. RSVP Form Submission
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = rsvpForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> RSVP Sent Successfully';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.color = 'white';
                
                setTimeout(() => {
                    rsvpForm.reset();
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
