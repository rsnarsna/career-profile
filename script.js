document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setupNavigation();
});

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();
        renderCV(data);
    } catch (error) {
        console.error('Error fetching CV data:', error);
    }
}

function renderCV(data) {
    if (!data) return;

    // --- Hero ---
    safelySetText('hero-name', data.profile.name);
    safelySetText('about-name', data.profile.name);
    safelySetText('hero-title', data.profile.title);

    const locationEl = document.getElementById('hero-desc');
    if (locationEl && data.profile.location) {
        locationEl.textContent = `Based in ${data.profile.location}.`;
    }

    const heroImg = document.getElementById('hero-image');
    if (heroImg && data.profile.avatar_url) {
        heroImg.src = data.profile.avatar_url;
    }
    const aboutImg = document.querySelector('.about-img-secondary');
    if (aboutImg && data.profile.avatar_url) {
        aboutImg.src = data.profile.avatar_url;
    }

    // --- Socials ---
    const navSocials = document.getElementById('nav-socials');
    if (navSocials && data.socials) {
        navSocials.innerHTML = data.socials.map(item => `
            <a href="${item.url}" target="_blank" title="${item.network}"><i class="${item.icon}"></i></a>
        `).join('');
    }

    // --- About & Contact Info ---
    safelySetText('summary-text', data.profile.summary);

    const contactInfoArray = [
        { label: 'Name', value: data.profile.name },
        { label: 'Email', value: `<a href="mailto:${data.profile.email}">${data.profile.email}</a>` },
        { label: 'Location', value: data.profile.location }
    ];

    const contactInfoEl = document.getElementById('contact-info');
    if (contactInfoEl) {
        contactInfoEl.innerHTML = contactInfoArray.map(item => `
            <div class="contact-item">
                <b>${item.label}:</b>
                <span>${item.value}</span>
            </div>
        `).join('');
    }

    // --- Skills (Tags List) ---
    const skillsList = document.getElementById('skills-section');
    if (skillsList && data.skills) {
        skillsList.innerHTML = data.skills.map(skill => `
            <span class="skill-tag">${skill}</span>
        `).join('');
    }

    // --- Experience (Split Timeline) ---
    const expList = document.getElementById('experience-list');
    if (expList && data.experience) {
        expList.innerHTML = data.experience.map(job => `
            <div class="timeline-item">
                <div class="item-content">
                    <span class="item-date">${job.duration}</span>
                    <h3 class="item-title">${job.role}</h3>
                    <h4 class="item-subtitle">${job.company}</h4>
                    <p class="text-muted" style="font-size: 0.9rem;">${job.description[0]}...</p>
                </div>
            </div>
        `).join('');
    }

    // --- Projects ---
    const projList = document.getElementById('projects-list');
    if (projList && data.projects) {
        projList.innerHTML = data.projects.map(proj => `
            <div class="project-card">
                <h3 class="project-title">${proj.title}</h3>
                <p class="text-muted">${proj.description}</p>
                
                <div style="margin: 1rem 0;">
                    ${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>

                ${proj.link ? `<a href="${proj.link}" target="_blank" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>` : ''}
            </div>
        `).join('');
    }

    // --- Footer Contact ---
    renderFooterContact(data.profile);
}

function renderFooterContact(profile) {
    const footer = document.getElementById('footer-contact');
    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-item">
            <i class="fas fa-phone-alt"></i>
            <h3>Call Me</h3>
            <p>${profile.phone}</p>
        </div>
        <div class="footer-item">
             <i class="fas fa-envelope"></i>
            <h3>Email Me</h3>
            <p>${profile.email}</p>
        </div>
    `;
}

function safelySetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// --- Navigation & Scroll Logic ---
function setupNavigation() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle (Simplified)
    const btn = document.querySelector('.mobile-menu-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            // In a real app we'd toggle a class
        });
    }
}
