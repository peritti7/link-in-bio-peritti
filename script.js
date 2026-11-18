const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 45;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

const translations = {
    pl: {
        subtitle: "Inżynier Elektryk & Programista",
        bio: "Połączenie precyzji systemów elektrycznych z nowoczesnym kodem. Tworzę wydajne rozwiązania i dominuję w świecie Minecraft PvP.",
        contactBtn: "Kontakt",
        card1Title: "Inżynieria Elektryczna",
        card1Desc: "Profesjonalne podejście do układów, systemów zasilania oraz projektowania sprzętowego. Łączę teorię inżynieryjną z praktyką.",
        card2Title: "Programowanie",
        card2Desc: "Czysty kod, automatyzacja, tworzenie nowoczesnych stron i aplikacji webowych opartych o najnowsze technologie.",
        mcDesc: "Posiadam rangę <span class='text-white font-bold bg-accent/20 border border-accent/30 px-2 py-0.5 rounded'>HT3 (High-Tier 3)</span> w mechanice Crystal PvP w Minecrafcie. Refleks, pozycjonowanie i zaawansowane comba nie mają dla mnie tajemnic.",
        contactTitle: "Połącz się ze mną",
        contactSubtitle: "Szukasz kogoś do projektu, chcesz pogadać o technologii albo sprawdzić się w potyczce PvP? Pisz śmiało!"
    },
    en: {
        subtitle: "Electrical Engineer & Programmer",
        bio: "Combining the precision of electrical systems with modern code. I build efficient solutions and dominate the Minecraft PvP world.",
        contactBtn: "Contact",
        card1Title: "Electrical Engineering",
        card1Desc: "Professional approach to circuits, power systems, and hardware design. I blend engineering theory with hands-on practice.",
        card2Title: "Programming",
        card2Desc: "Clean code, automation, and building modern websites and web apps based on cutting-edge technologies.",
        mcDesc: "I hold an <span class='text-white font-bold bg-accent/20 border border-accent/30 px-2 py-0.5 rounded'>HT3 (High-Tier 3)</span> rank in Minecraft Crystal PvP mechanics. Reflexes, positioning, and advanced combos hold no secrets from me.",
        contactTitle: "Get in Touch",
        contactSubtitle: "Looking for someone for a project, want to chat about tech, or test your skills in PvP? Feel free to reach out!"
    }
};

function setLanguage(lang) {
    const btnPl = document.getElementById('btn-pl');
    const btnEn = document.getElementById('btn-en');

    if (lang === 'pl') {
        btnPl.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-accent text-white shadow-md";
        btnEn.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all text-zinc-400 hover:text-white";
    } else {
        btnEn.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-accent text-white shadow-md";
        btnPl.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all text-zinc-400 hover:text-white";
    }

    document.getElementById('txt-subtitle').innerText = translations[lang].subtitle;
    document.getElementById('txt-bio').innerText = translations[lang].bio;
    document.getElementById('txt-contact-btn').innerText = translations[lang].contactBtn;
    document.getElementById('txt-card1-title').innerText = translations[lang].card1Title;
    document.getElementById('txt-card1-desc').innerText = translations[lang].card1Desc;
    document.getElementById('txt-card2-title').innerText = translations[lang].card2Title;
    document.getElementById('txt-card2-desc').innerText = translations[lang].card2Desc;
    document.getElementById('js-mc-desc'] // dynamic injection handled safely below
    document.getElementById('txt-contact-title').innerText = translations[lang].contactTitle;
    document.getElementById('txt-contact-subtitle').innerText = translations[lang].contactSubtitle;
    
    // Minecraft description update safety
    document.querySelector('#txt-mc-desc').innerHTML = translations[lang].mcDesc;
}
