// Initialize EmailJS (if using EmailJS)
(function(){
    if (window.emailjs) {
        try {
            emailjs.init("LX90Nb7ZnkHzHWiDt"); // Replace with your EmailJS public key (find in Dashboard > Account > API Key)
        } catch (e) {
            // ignore if not configured
            console.warn('EmailJS init failed or not configured');
        }
    }
})();

// Profile image fallback (moved from inline onerror)
const profileImg = document.getElementById('profileImg');
if (profileImg) {
    profileImg.addEventListener('error', function() {
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent) {
            parent.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;height:100%;color:var(--accent);font-size:4rem;font-weight:bold;'>AV</div>";
        }
    });
}

// Download Resume Handler - direct file download
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = 'AkshitVerma.pdf'; // Path to your resume file
        link.download = 'Akshit_Verma_Resume.pdf'; // Name for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Contact Form Handler with EmailJS (if configured)
const contactForm = document.getElementById('contactForm');
if (contactForm && window.emailjs) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';

        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        emailjs.sendForm('service_1mm69g7', 'template_qvuwlew', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                if (submitBtn) {
                    submitBtn.textContent = '✓ Message Sent!';
                    submitBtn.style.background = 'var(--accent)';
                }
                contactForm.reset();
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                if (submitBtn) {
                    submitBtn.textContent = '✗ Failed to send';
                    submitBtn.style.background = '#ff4444';
                }
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }
                }, 3000);
            });
    });
} else if (contactForm) {
    // Fallback: basic mailto for environments without EmailJS
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value || '';
        const email = document.getElementById('email').value || '';
        const message = document.getElementById('message').value || '';
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:vermaakshit@outlook.com?subject=${subject}&body=${body}`;
    });
}

// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
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

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});