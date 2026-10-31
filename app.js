/**
 * Kiru's Portfolio - Core Application Script
 * Clean Visitor Presentation matching original Canva design
 */

window.portfolioState = {
    data: null,
    activeTab: 'about'
};

const CANVA_CDN_BASE = 'https://kiru.my.canva.site/itiskiruhere/';

// Official, Crisp, Pixel-Perfect Compound SVGs (Pure Fill, Never Distorted or Boxed)
const REAL_ICONS = {
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>`,

    linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>`,

    itchio: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5 5.5A1.5 1.5 0 0 1 4 4h16a1.5 1.5 0 0 1 1.5 1.5v2.8a6.5 6.5 0 0 1-3.6 5.8l-1.3 5.4A1.5 1.5 0 0 1 15.1 21H8.9a1.5 1.5 0 0 1-1.5-1.5l-1.3-5.4A6.5 6.5 0 0 1 2.5 8.3V5.5zm4.8 7.3a1.5 1.5 0 0 0 1.7 1.2 1.5 1.5 0 0 0 1.2-1.7l-.3-1.8H7l.3 2.3zm6.4 0a1.5 1.5 0 0 0 1.2 1.7 1.5 1.5 0 0 0 1.7-1.2l.3-2.3h-2.9l-.3 1.8zM9 8h2V6H9v2zm4 0h2V6h-2v2z"/>
    </svg>`,

    github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>`,

    artstation: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.05 13.97l-2.07 3.59h6.13l-1.99-3.59h-2.07zm9.83 3.59l-5.61-9.72-2.28 3.94 4.32 7.48c.49-.12.9-.44 1.14-.89l2.43-4.81zm-14.86-9.72l-4.58 7.94c-.46.79-.46 1.77 0 2.56.23.4.6.71 1.03.87l10.46-18.12c-.43.16-1.03.87-1.03.87l-5.88 5.88z"/>
    </svg>`,

    email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>`,

    phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
    </svg>`,

    download: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>`
};

// Cache-buster timestamp per page load to ensure newly modified images reload immediately
window.__ASSET_CACHE_TIME__ = Date.now();

function resolveAssetUrl(assetPath) {
    if (!assetPath) return '';
    if (assetPath.startsWith('http://') || assetPath.startsWith('https://') || assetPath.startsWith('data:')) {
        return assetPath;
    }
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
    return `${cleanPath}?v=${window.__ASSET_CACHE_TIME__}`;
}

function handleAssetError(imgEl, originalPath) {
    if (!imgEl || !originalPath) return;
    if (originalPath.startsWith('_assets/')) {
        const fallbackUrl = CANVA_CDN_BASE + originalPath;
        if (imgEl.src !== fallbackUrl) {
            imgEl.src = fallbackUrl;
        }
    }
}

function refreshBrandLogo() {
    const ts = Date.now();
    const logoImgs = document.querySelectorAll('.logo-icon, #brand-logo-img');
    logoImgs.forEach(img => {
        img.src = `assets/logo.png?v=${ts}`;
    });
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = `assets/logo.png?v=${ts}`;
    }
}

async function initApp() {
    refreshBrandLogo();
    await loadPortfolioData();
    setupNavigation();
    setupLightbox();
    renderAll();
}

async function loadPortfolioData() {
    let loadedData = null;

    try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
            loadedData = await res.json();
        }
    } catch (e) {
        // Fallback to static data/portfolio.json
    }

    if (!loadedData) {
        try {
            const res = await fetch('data/portfolio.json');
            if (res.ok) {
                loadedData = await res.json();
            }
        } catch (e) {
            console.error('Failed to load portfolio data', e);
        }
    }

    window.portfolioState.data = loadedData;
}

function renderAll() {
    if (!window.portfolioState.data) return;
    const { about, projects, artworks, caseStudies, showcase } = window.portfolioState.data;

    renderAbout(about);
    renderProjects(projects);
    renderArtworks(artworks);
    renderCaseStudies(caseStudies);
    renderShowcase(showcase);
}

/**
 * Render About Me section
 * (Removed @It'sKiruHere under name, added real SVG icons)
 */
function renderAbout(about) {
    if (!about) return;
    const roleEl = document.getElementById('about-role');
    const nameEl = document.getElementById('about-name');
    const bioEl = document.getElementById('about-bio');
    const avatarEl = document.getElementById('about-avatar-img');
    const characterEl = document.getElementById('about-character-img');
    const skillsList = document.getElementById('about-skills-list');
    const socialList = document.getElementById('about-social-list');

    if (roleEl) roleEl.textContent = about.role || 'Gameplay Programmer';
    if (nameEl) nameEl.textContent = about.name || 'Kiranmouli';
    if (bioEl) bioEl.textContent = about.bio || '';
    if (avatarEl && about.avatar) {
        avatarEl.src = resolveAssetUrl(about.avatar);
        avatarEl.onerror = () => handleAssetError(avatarEl, about.avatar);
    }
    if (characterEl && about.characterArt) {
        characterEl.src = resolveAssetUrl(about.characterArt);
        characterEl.onerror = () => handleAssetError(characterEl, about.characterArt);
    }

    // Skills with Button/Bar Pill styling
    if (skillsList && about.skills) {
        skillsList.innerHTML = about.skills.map(skill => `
            <div class="skill-pill skill-tag">
                <span>${escapeHtml(skill.name)}</span>
            </div>
        `).join('');
    }

    // Social Links with Pixel-Perfect Real SVGs matching Image 1
    if (socialList && about.socialLinks) {
        socialList.innerHTML = about.socialLinks.map(link => {
            const iconKey = (link.icon || link.name || '').toLowerCase().replace(/[^a-z]/g, '');
            let svgIcon = REAL_ICONS[iconKey];

            if (!svgIcon) {
                if (iconKey.includes('insta')) svgIcon = REAL_ICONS.instagram;
                else if (iconKey.includes('linkedin')) svgIcon = REAL_ICONS.linkedin;
                else if (iconKey.includes('itch')) svgIcon = REAL_ICONS.itchio;
                else if (iconKey.includes('git')) svgIcon = REAL_ICONS.github;
                else if (iconKey.includes('art')) svgIcon = REAL_ICONS.artstation;
                else if (iconKey.includes('mail') || iconKey.includes('email')) svgIcon = REAL_ICONS.email;
                else if (iconKey.includes('phone') || iconKey.includes('tel')) svgIcon = REAL_ICONS.phone;
            }

            return `
                <a href="${escapeHtml(link.url)}" ${link.download ? 'download="Kiran_Mouli_Resume.pdf"' : 'target="_blank"'} rel="noopener noreferrer" class="social-link-item social-pill">
                    <span class="social-icon-box">${svgIcon || '🔗'}</span>
                    <span class="social-name">${escapeHtml(link.name)}</span>
                </a>
            `;
        }).join('');
    }
}

/**
 * Render Projects
 * (No category filter bar; clicking card/thumb opens project link directly)
 */
function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid || !projects) return;

    grid.innerHTML = projects.map(p => {
        const resolvedImg = resolveAssetUrl(p.image);
        const link = p.link || '#';
        const target = p.link ? '_blank' : '_self';

        return `
            <article class="project-card">
                <a href="${escapeHtml(link)}" target="${target}" rel="noopener noreferrer" class="project-thumb-wrapper" title="Open ${escapeHtml(p.title)}">
                    <img src="${resolvedImg}" alt="${escapeHtml(p.title)}" class="project-thumb" loading="lazy" onerror="handleAssetError(this, '${p.image}')">
                </a>
                <div class="project-body">
                    <h3 class="project-title">
                        <a href="${escapeHtml(link)}" target="${target}" rel="noopener noreferrer" class="project-title-link">
                            ${escapeHtml(p.title)}
                        </a>
                    </h3>
                    <div class="project-tags">
                        ${(p.tags || []).map(t => `<span class="project-tag">${escapeHtml(t)}</span>`).join('')}
                    </div>
                    <p class="project-desc">${escapeHtml(p.description || '')}</p>
                    <div class="project-footer">
                        ${p.link ? `
                            <a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                                <span>View Project</span>
                                <span>→</span>
                            </a>
                        ` : `<span></span>`}
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Render 3D Art Gallery
 * (No categories, clean gallery, click opens high-res Lightbox)
 */
function renderArtworks(artworks) {
    const grid = document.getElementById('art-grid');
    if (!grid || !artworks) return;

    grid.innerHTML = artworks.map(a => {
        const resolvedImg = resolveAssetUrl(a.image);
        return `
            <div class="art-card" onclick="openMediaLightbox('${a.image}', '${escapeHtml(a.title || '3D Artwork')}')" title="Click to view full size">
                <img src="${resolvedImg}" alt="${escapeHtml(a.title)}" class="art-img" loading="lazy" onerror="handleAssetError(this, '${a.image}')">
            </div>
        `;
    }).join('');
}

/**
 * Render Projects Overview (Unified single tab with all 13 case studies)
 * (Clicking banner image opens project link directly)
 */
function renderCaseStudies(caseStudies) {
    const container = document.getElementById('overview-container');
    if (!container || !caseStudies) return;

    container.innerHTML = caseStudies.map(c => {
        const resolvedImg = resolveAssetUrl(c.image);
        const hasLink = Boolean(c.link);

        return `
            <article class="case-study-card">
                <div class="case-study-header-banner">
                    <div class="case-study-banner-img-box ${hasLink ? 'has-link' : ''}" 
                         ${hasLink ? `onclick="window.open('${escapeHtml(c.link)}', '_blank')"` : ''} 
                         title="${hasLink ? 'Click to visit project' : ''}">
                        <img src="${resolvedImg}" alt="${escapeHtml(c.title)}" class="case-study-banner-img" loading="lazy" onerror="handleAssetError(this, '${c.image}')">
                    </div>
                    <div class="case-study-banner-info">
                        <h3 class="case-study-title">
                            ${hasLink ? `<a href="${escapeHtml(c.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.title)}</a>` : escapeHtml(c.title)}
                        </h3>
                        <p class="case-study-overview">${escapeHtml(c.overview || '')}</p>
                        <div class="case-meta-grid">
                            <div class="meta-item">
                                <span class="meta-label">Role</span>
                                <span class="meta-val">${escapeHtml(c.role || 'Programmer')}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Engine</span>
                                <span class="meta-val">${escapeHtml(c.engine || 'Unity')}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Team Size</span>
                                <span class="meta-val">${escapeHtml(c.teamSize || '1')}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Tools</span>
                                <span class="meta-val">${escapeHtml(c.tools || 'Blender, Canva')}</span>
                            </div>
                        </div>
                        ${c.link ? `
                            <div style="margin-top: 18px;">
                                <a href="${escapeHtml(c.link)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" style="display:inline-flex;">
                                    <span>Visit Project</span> <span>↗</span>
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="case-study-body">
                    <div class="case-sections-list">
                        ${(c.sections || []).map(s => `
                            <div class="case-section-box">
                                <h4 class="case-section-title">${escapeHtml(s.title)}</h4>
                                <p class="case-section-desc">${escapeHtml(s.content)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Render Project Showcase
 * (Same as Art: all videos play directly in loop, clicking any opens in large view)
 */
function renderShowcase(showcase) {
    const grid = document.getElementById('showcase-grid');
    if (!grid || !showcase) return;

    grid.innerHTML = showcase.map(s => {
        const resolvedPoster = resolveAssetUrl(s.poster);
        const resolvedVideo = resolveAssetUrl(s.videoUrl);

        return `
            <div class="showcase-live-card" onclick="openVideoLightbox('${resolvedVideo}', '${resolvedPoster}')" title="Click to view larger">
                <video src="${resolvedVideo}" 
                       poster="${resolvedPoster}" 
                       autoplay 
                       loop 
                       muted 
                       playsinline 
                       class="showcase-live-video" 
                       preload="metadata">
                </video>
            </div>
        `;
    }).join('');
}

function setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const panes = document.querySelectorAll('.tab-pane');
    const mobileMenu = document.getElementById('mobile-menu-toggle');
    const header = document.querySelector('.site-header');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
            if (header) header.classList.remove('menu-open');
        });
    });

    if (mobileMenu && header) {
        mobileMenu.addEventListener('click', () => {
            header.classList.toggle('menu-open');
        });
    }

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) switchTab(hash);
    });

    if (window.location.hash) {
        const initialHash = window.location.hash.replace('#', '');
        switchTab(initialHash);
    }
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.nav-tab');
    const panes = document.querySelectorAll('.tab-pane');
    let valid = false;

    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            valid = true;
        } else {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        }
    });

    panes.forEach(pane => {
        if (pane.id === `tab-${tabId}`) {
            pane.classList.add('active');
        } else {
            pane.classList.remove('active');
        }
    });

    if (valid) {
        window.portfolioState.activeTab = tabId;
        history.replaceState(null, null, `#${tabId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function setupLightbox() {
    const backdrop = document.getElementById('modal-lightbox');
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            closeModal('modal-lightbox');
        }
    });
}

function openMediaLightbox(imgUrl, caption = '') {
    const container = document.getElementById('lightbox-container');
    const capEl = document.getElementById('lightbox-caption');
    if (!container) return;

    const resolved = resolveAssetUrl(imgUrl);
    container.innerHTML = `
        <img src="${resolved}" alt="3D Artwork" style="max-width:90vw; max-height:82vh; object-fit:contain;" onerror="handleAssetError(this, '${imgUrl}')">
    `;
    if (capEl) capEl.textContent = caption || '';
    openModal('modal-lightbox');
}

function openVideoLightbox(videoUrl, posterUrl) {
    const container = document.getElementById('lightbox-container');
    const capEl = document.getElementById('lightbox-caption');
    if (!container) return;

    const resolvedVid = resolveAssetUrl(videoUrl);
    const resolvedPoster = resolveAssetUrl(posterUrl);

    container.innerHTML = `
        <video controls autoplay loop playsinline poster="${resolvedPoster}" style="max-width:90vw; max-height:82vh; border-radius:8px; background:#000;">
            <source src="${resolvedVid}" type="video/mp4">
            <source src="${CANVA_CDN_BASE + videoUrl}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
    `;
    if (capEl) capEl.textContent = '';
    openModal('modal-lightbox');
}

function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('open');
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) {
        m.classList.remove('open');
        const v = m.querySelector('video');
        if (v) { v.pause(); v.src = ''; }
    }
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', initApp);
