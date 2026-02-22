import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

const newHeader = `    <!-- HEADER -->
    <header id="header" class="cyber-header">
        <nav class="container">
            <div class="logo cyber-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5">
                    <path d="M12 2L12 22M2 12L22 12" />
                    <circle cx="12" cy="12" r="3" fill="#ffffff" />
                </svg>
                <span>ICONIFY</span>
            </div>
            <ul class="nav-links pill-nav" id="nav-links">
                <li><a href="#about" class="active">ABOUT</a></li>
                <li><a href="#cases">GALLERY</a></li>
                <li><a href="#services">DROP</a></li>
                <li><a href="#faq">CONNECT</a></li>
            </ul>
            <div class="header-right">
                <div class="social-icons">
                    <a href="#" class="social-icon">D</a>
                    <a href="#" class="social-icon">Y</a>
                    <a href="#" class="social-icon">I</a>
                </div>
                <a href="#contact" class="btn btn-pill white-btn">Learn more <span class="arrow">↗</span></a>
            </div>
            <div class="menu-toggle" id="menu-toggle">
                <span></span><span></span>
            </div>
        </nav>
    </header>`;

const newHero = `        <!-- HERO -->
        <section id="hero" class="cyber-hero" style="background-image: url('assets/images/hero_cyberpunk.png');">
            <div class="hero-overlay"></div>
            <div class="container hero-grid-cyber">
                <div class="hero-content reveal">
                    <h1 class="cyber-h1">The Next Era<br>of <span class="text-pink">Digital</span> <span class="sparkle">✦</span><br>Collectibles</h1>
                    <p class="subtitle cyber-subtitle">A curated <strong>NFT collection</strong> blending<br>high-end digital art, cutting-edge<br>technology, and real cultural value.</p>
                    <div class="hero-actions">
                        <a href="#cases" class="btn btn-primary cyber-btn-main">
                            <span class="arrow-down">↘</span> <span>Explore the Collection</span>
                        </a>
                    </div>
                </div>
                <div class="hero-right reveal-right">
                    <div class="cyber-card">
                        <div class="card-point">↘</div>
                        <div class="card-tag">SOME FACTS</div>
                        <h3>ABOUT THE<br>COLLECTION</h3>
                        <p>Each piece in the collection represents a fusion<br>of art, technology, and contemporary culture.<br>Designed to stand on its own — today and<br>years from now.</p>
                        <a href="#" class="card-link">LEARN MORE NOW <span>→</span></a>
                    </div>
                </div>
            </div>
        </section>`;

html = html.replace(/<!-- HEADER -->[\s\S]*?<\/header>/, newHeader);
html = html.replace(/<!-- HERO -->[\s\S]*?<\/section>/, newHero);

fs.writeFileSync('index.html', html);

let css = fs.readFileSync('style.css', 'utf-8');
const newCSS = `

/* CYBERPUNK HERO & HEADER STYLES */
.cyber-header {
    background: transparent !important;
    backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
    padding: 2rem 0 !important;
}

.cyber-header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cyber-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    letter-spacing: 2px;
    font-weight: 500;
}

.pill-nav {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    padding: 0.5rem 2rem;
    gap: 2rem !important;
}

.pill-nav a {
    font-size: 0.8rem !important;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.7) !important;
}

.pill-nav a.active, .pill-nav a:hover {
    color: #ffffff !important;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.social-icons {
    display: flex;
    gap: 0.8rem;
}

.social-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    transition: 0.3s;
}

.social-icon:hover {
    background: #ffffff;
    color: #000000;
}

.btn-pill {
    border-radius: 50px;
    padding: 0.7rem 1.6rem;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.white-btn {
    background: #ffffff !important;
    color: #000000 !important;
    box-shadow: none !important;
}

.cyber-hero {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    padding-top: 12rem !important;
    padding-bottom: 5rem !important;
    display: flex;
    align-items: center;
    margin-top: -100px;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%);
    z-index: 0;
}

.hero-grid-cyber {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;
}

.cyber-h1 {
    font-size: 5rem !important;
    line-height: 1 !important;
    letter-spacing: -2px !important;
    font-weight: 700 !important;
    margin-bottom: 2rem !important;
}

.text-pink {
    color: #ff0066;
}

.sparkle {
    color: #ff0066;
    font-size: 3rem;
    vertical-align: top;
}

.cyber-subtitle {
    font-size: 1.1rem !important;
    max-width: 450px !important;
    line-height: 1.6 !important;
    color: #cccccc !important;
    margin-bottom: 3rem !important;
}

.cyber-subtitle strong {
    color: #ffffff;
}

.cyber-btn-main {
    background: linear-gradient(90deg, #ff0066 0%, #ff3399 100%) !important;
    border-radius: 50px !important;
    padding: 1.2rem 2.5rem !important;
    font-size: 1rem !important;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 10px 30px rgba(255, 0, 102, 0.4) !important;
}

.arrow-down {
    font-size: 1.2rem;
}

.hero-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: 3rem;
}

.cyber-card {
    background: rgba(10, 10, 10, 0.4);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 2.5rem;
    max-width: 380px;
    position: relative;
}

.cyber-card::before {
    content: '';
    position: absolute;
    top: -40px;
    left: 20px;
    width: 1px;
    height: 40px;
    background: rgba(255,255,255,0.3);
}

.card-point {
    position: absolute;
    top: -55px;
    left: 5px;
    width: 30px;
    height: 30px;
    background: #ffffff;
    color: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
}

.card-tag {
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 1rem;
}

.cyber-card h3 {
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
}

.cyber-card p {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
    margin-bottom: 2rem;
}

.card-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.8);
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 1.5rem;
}

.card-link span {
    font-size: 1.2rem;
}

`;

fs.writeFileSync('style.css', css + newCSS);
console.log('Done redesigning.');
