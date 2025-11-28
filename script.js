document.addEventListener('DOMContentLoaded', () => {
    initEmailJS();
    initHamburgerMenu();
    initProfileFallback();
    initCertificateModal();
    initResumeDownload();
    initContactForm();
    enableSmoothScroll();
    initScrollAnimations();
    initActiveNavHighlight();
});

function initEmailJS() {
    if (!window.emailjs) return;
    try {
        emailjs.init('LX90Nb7ZnkHzHWiDt');
    } catch (error) {
        console.warn('EmailJS init failed or not configured', error);
    }
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function initProfileFallback() {
    const profileImg = document.getElementById('profileImg');
    if (!profileImg) return;

    profileImg.addEventListener('error', function () {
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent) {
            parent.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;height:100%;color:var(--accent);font-size:4rem;font-weight:bold;'>AV</div>";
        }
    });
}

function initCertificateModal() {
    const certCards = document.querySelectorAll('.cert-card');
    const certModal = document.getElementById('certModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalIssuer = document.getElementById('modalIssuer');
    const modalDate = document.getElementById('modalDate');
    const closeModal = document.getElementById('closeModal');
    const prevCert = document.getElementById('prevCert');
    const nextCert = document.getElementById('nextCert');

    if (!certCards.length || !certModal) return;

    let currentCertIndex = 0;

    const certificates = [
        {
            image: 'https://i.ibb.co/yFM4sn3j/Akshit-blackbucks-certificate.jpg',
            title: 'Full Stack Development with MERN',
            issuer: 'MERN Stack Certification',
            date: '2024'
        },
        {
            image: 'https://i.ibb.co/SDRsjXNH/oracle-ecert.jpg',
            title: 'Oracle Cloud Infrastructure GENAI',
            issuer: 'Oracle Cloud',
            date: '2024'
        },
        {
            image: 'https://i.ibb.co/VcLbrZff/Problem-Solvers-certification.jpg',
            title: 'Problem Solvers for DSA',
            issuer: 'Data Structures & Algorithms',
            date: '2024'
        },
        {
            image: 'https://i.ibb.co/rKshkt8L/Neo-4j-certification.jpg',
            title: 'Neo4j Graph Database',
            issuer: 'Neo4j',
            date: '2024'
        }
    ];

    const openModal = (index) => {
        currentCertIndex = index;
        const cert = certificates[index];
        modalImage.src = cert.image;
        modalTitle.textContent = cert.title;
        modalIssuer.textContent = cert.issuer;
        modalDate.textContent = cert.date;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModalFunc = () => {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showNextCert = () => {
        currentCertIndex = (currentCertIndex + 1) % certificates.length;
        openModal(currentCertIndex);
    };

    const showPrevCert = () => {
        currentCertIndex = (currentCertIndex - 1 + certificates.length) % certificates.length;
        openModal(currentCertIndex);
    };

    certCards.forEach((card, index) => {
        card.addEventListener('click', () => openModal(index));
    });

    closeModal?.addEventListener('click', closeModalFunc);
    nextCert?.addEventListener('click', showNextCert);
    prevCert?.addEventListener('click', showPrevCert);

    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) closeModalFunc();
    });

    document.addEventListener('keydown', (e) => {
        if (!certModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModalFunc();
        if (e.key === 'ArrowRight') showNextCert();
        if (e.key === 'ArrowLeft') showPrevCert();
    });
}

function initResumeDownload() {
    const downloadBtn = document.getElementById('downloadResume');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'AkshitVerma.pdf';
        link.download = 'AkshitVerma.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    if (window.emailjs) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';

            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }

            emailjs.sendForm('service_1mm69g7', 'template_qvuwlew', this)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    if (submitBtn) {
                        submitBtn.textContent = '✓ Message Sent!';
                        submitBtn.style.background = 'var(--accent)';
                    }
                    contactForm.reset();
                    setTimeout(() => resetSubmitButton(submitBtn, originalText), 3000);
                }, (error) => {
                    console.log('FAILED...', error);
                    if (submitBtn) {
                        submitBtn.textContent = '✗ Failed to send';
                        submitBtn.style.background = '#ff4444';
                    }
                    setTimeout(() => resetSubmitButton(submitBtn, originalText), 3000);
                });
        });
    } else {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value || '';
            const email = document.getElementById('email').value || '';
            const message = document.getElementById('message').value || '';
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:vermaakshit@outlook.com?subject=${subject}&body=${body}`;
        });
    }
}

function resetSubmitButton(button, text) {
    if (!button) return;
    button.textContent = text;
    button.disabled = false;
    button.style.background = '';
}

function enableSmoothScroll() {
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

function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

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

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

function initActiveNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--accent)';
            } else {
                link.style.color = 'var(--text-secondary)';
            }
        });
    });
}