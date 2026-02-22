// ============================================
// JS READY TRIGGER
// ============================================
document.documentElement.classList.add('js-ready');

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// CURSOR FOLLOWER
// ============================================
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    if (follower) {
        follower.style.left = `${e.clientX}px`;
        follower.style.top = `${e.clientY}px`;
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerH = header.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER — REVEAL ANIMATIONS
// ============================================
function revealElement(el) {
    if (el.classList.contains('visible')) return;
    const siblings = el.parentElement?.querySelectorAll('.reveal, .reveal-right');
    let delay = 0;
    if (siblings) {
        const arr = Array.from(siblings);
        delay = arr.indexOf(el) * 100;
    }
    setTimeout(() => {
        el.classList.add('visible');
    }, delay);
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            revealElement(entry.target);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '50px 0px -30px 0px'
});

const revealElements = document.querySelectorAll('.reveal, .reveal-right');
revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Fallback: immediately reveal elements that are already in viewport
// (IntersectionObserver may not fire for elements visible before observe())
requestAnimationFrame(() => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            revealElement(el);
            revealObserver.unobserve(el);
        }
    });
});

// Safety net: if hero elements are still hidden after 1.5s, force-show them
setTimeout(() => {
    document.querySelectorAll('#hero .reveal, #hero .reveal-right').forEach(el => {
        el.classList.add('visible');
    });
}, 1500);

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================
function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = el.dataset.decimal !== undefined;
    const decimals = parseInt(el.dataset.decimal || '0');
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out expo
        const eased = 1 - Math.pow(2, -10 * progress);
        const current = target * eased;

        el.textContent = isDecimal
            ? current.toFixed(decimals)
            : Math.floor(current).toString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = isDecimal ? target.toFixed(decimals) : target.toString();
        }
    }

    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-value[data-count]').forEach(el => {
                animateCount(el);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item.active').forEach(open => {
            open.classList.remove('active');
        });

        // Open clicked (unless it was already open)
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// STICKY CTA VISIBILITY
// ============================================
const stickyCta = document.getElementById('sticky-cta');

window.addEventListener('scroll', () => {
    if (stickyCta) {
        if (window.scrollY > window.innerHeight * 0.7) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    }
}, { passive: true });

// ============================================
// FORM SUBMISSION
// ============================================
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('#form-submit-btn');
        const span = btn.querySelector('span');
        const originalText = span.textContent;

        btn.disabled = true;
        span.textContent = 'Отправка...';

        setTimeout(() => {
            span.textContent = '✓ Заявка принята!';
            btn.classList.add('btn-success');
            form.reset();

            setTimeout(() => {
                btn.disabled = false;
                span.textContent = originalText;
                btn.classList.remove('btn-success');
            }, 4000);
        }, 1500);
    });
}

// ============================================
// PHONE MASK
// ============================================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        let val = this.value.replace(/\D/g, '');
        if (val.startsWith('8')) val = '7' + val.slice(1);
        if (!val.startsWith('7')) val = '7' + val;
        val = val.slice(0, 11);

        let masked = '+7';
        if (val.length > 1) masked += ' (' + val.slice(1, 4);
        if (val.length >= 4) masked += ') ' + val.slice(4, 7);
        if (val.length >= 7) masked += '-' + val.slice(7, 9);
        if (val.length >= 9) masked += '-' + val.slice(9, 11);

        this.value = masked;
    });
}

// ============================================
// DYNAMIC CONFIGURATION (ADMIN PANEL)
// ============================================
async function loadConfig() {
    try {
        const res = await fetch('/api/config');
        if (!res.ok) return;
        const config = await res.json();

        // Apply theme variables
        if (config.theme) {
            for (const [key, value] of Object.entries(config.theme)) {
                if (value) {
                    document.documentElement.style.setProperty(key, value);
                }
            }
        }

        // Apply content
        if (config.content) {
            document.querySelectorAll('[data-config]').forEach(el => {
                const key = el.getAttribute('data-config');
                const val = config.content[key];
                if (val !== undefined && val !== null) {
                    if (key === 'phone') {
                        el.textContent = val;
                        if (el.tagName === 'A') {
                            el.href = 'tel:' + val.replace(/[^\\d+]/g, '');
                        }
                    } else if (key === 'email') {
                        el.textContent = val;
                        if (el.tagName === 'A') {
                            el.href = 'mailto:' + val;
                        }
                    } else if (key === 'hero-img' && el.tagName === 'IMG') {
                        el.src = val;
                    } else {
                        el.innerHTML = val;
                    }
                }
            });
        }
    } catch (err) {
        console.error('Failed to load dynamic config:', err);
    }
}

loadConfig();
