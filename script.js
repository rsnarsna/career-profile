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

    // --- Hero Section ---
    safelySetText('hero-name', data.profile.name);
    safelySetText('about-name', data.profile.name); // Also in About section
    safelySetText('hero-title', data.profile.title);

    // Calculate years of experience for hero/intro if possible, or just use location/summary snippet
    const locationEl = document.getElementById('hero-desc');
    if (locationEl && data.profile.location) {
        locationEl.textContent = `Based in ${data.profile.location}.`;
    }

    const heroImg = document.getElementById('hero-image');
    if (heroImg && data.profile.avatar_url) {
        heroImg.src = data.profile.avatar_url;
    }

    // --- Socials (Navbar) ---
    const navSocials = document.getElementById('nav-socials');
    if (navSocials && data.socials) {
        navSocials.innerHTML = data.socials.map(item => `
            <a href="${item.url}" target="_blank" title="${item.network}"><i class="${item.icon}"></i></a>
        `).join('');
    }

    // --- About Section ---
    safelySetText('summary-text', data.profile.summary);

    const contactInfoArray = [
        { label: 'Name:', value: data.profile.name },
        { label: 'Email:', value: `<a href="mailto:${data.profile.email}">${data.profile.email}</a>` },
        { label: 'From:', value: data.profile.location }
    ];

    const contactInfoEl = document.getElementById('contact-info');
    if (contactInfoEl) {
        contactInfoEl.innerHTML = contactInfoArray.map(item => `
            <div class="contact-item">
                <b>${item.label}</b>
                <span>${item.value}</span>
            </div>
        `).join('');
    }

    // --- Skills ---
    const skillsList = document.getElementById('skills-section');
    if (skillsList && data.skills) {
        skillsList.innerHTML = data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    }

    // --- Experience ---
    const expList = document.getElementById('experience-list');
    if (expList && data.experience) {
        expList.innerHTML = data.experience.map(job => `
            <div class="timeline-item">
                <span class="item-date">${job.duration}</span>
                <h3 class="item-title">${job.role}</h3>
                <h4 class="item-subtitle">${job.company}</h4>
                <p class="text-muted">${job.description[0]}...</p>
            </div>
        `).join(''); // Showing first bullet point as summary
    }

    // --- Education ---
    const eduList = document.getElementById('education-list');
    if (eduList && data.education) {
        eduList.innerHTML = data.education.map(edu => `
            <div class="education-item">
                 <span class="item-date">${edu.duration}</span>
                <h3 class="item-title">${edu.degree}</h3>
                <h4 class="item-subtitle">${edu.institution}</h4>
                <p class="text-muted">${edu.location}</p>
            </div>
        `).join('');
    }

    // --- Projects ---
    const projList = document.getElementById('projects-list');
    if (projList && data.projects) {
        projList.innerHTML = data.projects.map(proj => `
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-desc">${proj.description}</p>
                    <div class="project-tech">
                        ${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
                ${proj.link ? `<a href="${proj.link}" target="_blank" class="project-link">View Project <i class="fas fa-chevron-right"></i></a>` : ''}
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
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}
