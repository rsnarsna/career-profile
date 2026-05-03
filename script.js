document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setupNavigation();
});

async function fetchData() {
    try {
        const res = await fetch(`data.json?t=${Date.now()}`);
        if (!res.ok) throw new Error('Failed to load data');
        renderCV(await res.json());
    } catch (err) {
        console.error('Error loading portfolio data:', err);
    }
}

function renderCV(data) {
    if (!data) return;

    // --- Hero ---
    setText('hero-name', data.profile.name);
    setText('hero-title', data.profile.title);
    setText('about-name', data.profile.name);
    setText('summary-text', data.profile.summary);

    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc) heroDesc.textContent = `Based in ${data.profile.location}`;

    setImage('hero-image', data.profile.avatar_url, `${data.profile.name} - ${data.profile.title}`);
    setImage('.about-img-secondary', data.profile.about_avatar_url || data.profile.avatar_url, `About ${data.profile.name}`);

    // --- Skills ---
    const skillsEl = document.getElementById('skills-section');
    if (skillsEl && data.skills) {
        skillsEl.innerHTML = data.skills
            .map(s => `<span class="skill-badge">${s}</span>`)
            .join('');
    }

    // --- Experience ---
    const expEl = document.getElementById('experience-list');
    if (expEl && data.experience) {
        expEl.innerHTML = data.experience.map(job => `
            <div class="timeline-item">
                <div class="timeline-card">
                    <span class="timeline-date">${job.duration}</span>
                    <h3 class="h6 fw-semibold text-white mb-1">${job.role}</h3>
                    <p class="small mb-2" style="color:var(--accent)">${job.company}</p>
                    <p class="small text-secondary mb-0">${job.description[0]}</p>
                </div>
            </div>
        `).join('');
    }

    // --- Education (appended to same timeline) ---
    if (expEl && data.education) {
        expEl.innerHTML += data.education.map(edu => `
            <div class="timeline-item">
                <div class="timeline-card">
                    <span class="timeline-date">${edu.duration}</span>
                    <h3 class="h6 fw-semibold text-white mb-1">${edu.degree}</h3>
                    <p class="small mb-0" style="color:var(--accent)">${edu.institution}</p>
                </div>
            </div>
        `).join('');
    }

    // --- Projects ---
    const projEl = document.getElementById('projects-list');
    if (projEl && data.projects) {
        projEl.innerHTML = data.projects.map(proj => `
            <div class="col-md-6 col-lg-4">
                <div class="project-card">
                    <h3 class="h6 fw-semibold text-white mb-2">${proj.title}</h3>
                    <p class="small text-secondary flex-grow-1 mb-3">${proj.description}</p>
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${proj.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    ${proj.link && proj.link !== '#'
                        ? `<a href="${proj.link}" target="_blank" rel="noopener" class="project-link">View Details <i class="fas fa-arrow-right ms-1"></i></a>`
                        : ''}
                </div>
            </div>
        `).join('');
    }

    // --- Footer Contact ---
    const footerContact = document.getElementById('footer-contact');
    if (footerContact) {
        const items = [
            { icon: 'fas fa-phone-alt', label: 'Call Me',     value: data.profile.phone },
            { icon: 'fas fa-envelope',  label: 'Email Me',    value: data.profile.email },
            { icon: 'fas fa-map-marker-alt', label: 'Location', value: data.profile.location },
        ];
        footerContact.innerHTML = items.map(item => `
            <div class="col-md-4 text-center">
                <i class="${item.icon} contact-item-icon"></i>
                <h3 class="h6 fw-semibold text-white mb-1">${item.label}</h3>
                <p class="small text-secondary mb-0">${item.value}</p>
            </div>
        `).join('');
    }

    // --- Footer Socials ---
    const socialsEl = document.getElementById('footer-socials');
    if (socialsEl && data.socials) {
        socialsEl.innerHTML = data.socials.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener" class="social-btn" title="${s.network}" aria-label="${s.network}">
                <i class="${s.icon}"></i>
            </a>
        `).join('');
    }
}

// --- Helpers ---
function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
}

function setImage(selector, src, alt) {
    if (!src) return;
    const el = selector.startsWith('#')
        ? document.getElementById(selector.slice(1))
        : document.querySelector(selector);
    if (el) { el.src = src; if (alt) el.alt = alt; }
}

// --- Navbar scroll + mobile auto-close ---
function setupNavigation() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    const navCollapse = document.getElementById('navMenu');
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });
}
