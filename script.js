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
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
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
            date: 'May 2025'
        },
        {
            image: 'https://i.ibb.co/SDRsjXNH/oracle-ecert.jpg',
            title: 'Oracle Cloud Infrastructure GENAI',
            issuer: 'Oracle Cloud',
            date: 'July 2025'
        },
        {
            image: 'https://i.ibb.co/VcLbrZff/Problem-Solvers-certification.jpg',
            title: 'Problem Solvers for DSA',
            issuer: 'Data Structures & Algorithms',
            date: 'June 2025'
        },
        {
            image: 'https://i.ibb.co/rKshkt8L/Neo-4j-certification.jpg',
            title: 'Neo4j Graph Database',
            issuer: 'Neo4j',
            date: 'July 2025'
        },
        {
            image: 'https://i.ibb.co/r2QzC713/Screenshot-2026-01-08-091826.png',
            title: 'Future of Work Hackathon',
            issuer: 'Hackathon',
            date: 'July 2025'
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
        if (!window.jspdf || !window.jspdf.jsPDF) {
            console.warn('jsPDF not loaded');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Set colors
        const accentColor = [0, 255, 136];
        const textColor = [0, 0, 0];

        // Header
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text('AKSHIT VERMA', 105, 20, { align: 'center' });

        // Contact Info
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('Bengaluru, Karnataka | 9036909457 | vermaakshit@outlook.com', 105, 27, { align: 'center' });
        doc.text('github.com/Akshit9150 | linkedin.com/in/akshitverma9150', 105, 32, { align: 'center' });

        // Line
        doc.setDrawColor(...accentColor);
        doc.setLineWidth(0.5);
        doc.line(20, 36, 190, 36);

        let yPos = 44;

        // SUMMARY
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...accentColor);
        doc.text('SUMMARY', 20, yPos);
        yPos += 6;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...textColor);
        const summary = '4th-year Computer Science student at VIT-AP University (Graduation: 2026) with experience designing and building scalable software applications and backend systems. Skilled in Java, Python, Django, React, and database management, with a focus on clean code and performance.';
        const summaryLines = doc.splitTextToSize(summary, 170);
        doc.text(summaryLines, 20, yPos);
        yPos += summaryLines.length * 5 + 6;

        // EDUCATION
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...accentColor);
        doc.text('EDUCATION', 20, yPos);
        yPos += 6;

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...textColor);
        doc.text('Bachelor of Technology in Computer Science', 20, yPos);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('June 2022 - June 2026', 190, yPos, { align: 'right' });
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text('Vellore Institute of Technology - Andhra Pradesh', 20, yPos);
        yPos += 5;

        doc.setFont(undefined, 'normal');
        doc.text('• Coursework in DBMS, OOP, Operating Systems, Data Structures', 20, yPos);
        yPos += 5;
        doc.text('• Solved 200+ DSA problems on LeetCode, CodeChef, and GeeksforGeeks', 20, yPos);
        yPos += 5;
        doc.text('• Active participant in hackathons and technical workshops', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('Senior Secondary Education (CBSE)', 20, yPos);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('May 2020 - May 2022', 190, yPos, { align: 'right' });
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text('Delhi Public School - Bengaluru', 20, yPos);
        yPos += 5;

        doc.setFont(undefined, 'normal');
        doc.text('• Completed coursework in Physics, Chemistry, Mathematics and Computer Science', 20, yPos);
        yPos += 10;

        // PROJECTS
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...accentColor);
        doc.text('PROJECTS', 20, yPos);
        yPos += 6;

        // Project 1
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...textColor);
        doc.text('AI Timetable Generator', 20, yPos);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('July 2025', 190, yPos, { align: 'right' });
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text('React • Node.js • Gemini API', 20, yPos);
        yPos += 5;

        doc.setFont(undefined, 'normal');
        doc.text('• Developed AI-driven timetable generator with seamless Gemini API integration', 20, yPos);
        yPos += 5;
        doc.text('• Implemented AI chatbot for dynamic schedule adjustments considering constraints', 20, yPos);
        yPos += 5;
        doc.text('• Delivered conflict-free scheduling solution boosting institutional efficiency', 20, yPos);
        yPos += 8;

        // Project 2
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('Sudoku Solver', 20, yPos);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('June 2025', 190, yPos, { align: 'right' });
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text('Java • JavaFX', 20, yPos);
        yPos += 5;

        doc.setFont(undefined, 'normal');
        doc.text('• Created interactive Sudoku solver with engaging graphical interface', 20, yPos);
        yPos += 5;

        // Project 3
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('To-Do App', 20, yPos);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('May 2025', 190, yPos, { align: 'right' });
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text('Django • HTML • CSS', 20, yPos);
        yPos += 5;

        doc.setFont(undefined, 'normal');
        doc.text('• Built full-stack web application with user authentication and session management', 20, yPos);
        yPos += 5;
        doc.text('• Implemented CRUD functionality with clean, responsive interface', 20, yPos);
        yPos += 5;
        doc.text('• Enabled secure, personalized task tracking with database integration', 20, yPos);
        yPos += 10;

        // ADDITIONAL INFORMATION
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...accentColor);
        doc.text('ADDITIONAL INFORMATION', 20, yPos);
        yPos += 6;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...textColor);
        doc.text('Languages: Java, Python, JavaScript, HTML, CSS', 20, yPos);
        yPos += 5;
        doc.text('Frameworks: React, Node.js, Django, TensorFlow, Scikit-learn', 20, yPos);
        yPos += 5;
        doc.text('Tools: Git, MongoDB, Supabase, VS Code, Figma, Vercel', 20, yPos);
        yPos += 5;
        doc.text('Certifications: AWS Cloud, MERN Stack, Oracle Cloud GENAI', 20, yPos);

        // Save the PDF
        doc.save('AkshitVerma_Resume.pdf');
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