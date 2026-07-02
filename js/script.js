// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', false);
        });
    });
}

// Cursor spotlight (drafting lamp effect)
const spotlight = document.getElementById('spotlight');

if (spotlight && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', (e) => {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
        spotlight.classList.add('active');
    });

    window.addEventListener('pointerleave', () => {
        spotlight.classList.remove('active');
    });
}

// Scroll reveal
const revealTargets = document.querySelectorAll(
    '.about-container, .skills-container .skill-card, .education-container, .project-card, .certificate-card, .contact-container'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// Initialize EmailJS
emailjs.init("c8sw3FFjGOMUMwQI_");

// Get the contact form
const form = document.getElementById("contact-form");

// Send email
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const status = document.getElementById("form-status");

    emailjs.sendForm(
        "service_59yk2ve",
        "template_i41j60y",
        this
    )
    .then(() => {

        status.textContent = "✅ Message sent successfully! I'll get back to you soon.";
        status.className = "success";

        setTimeout(() => {
            status.textContent = "";
            status.className = "";
        }, 5000);

        form.reset();

    })
    .catch((error) => {

        console.error(error);

        status.textContent = "❌ Failed to send message. Please try again.";
        status.className = "error";

    });

});