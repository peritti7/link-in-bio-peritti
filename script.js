document.getElementById('current-year').textContent = new Date().getFullYear();

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let numberOfParticles = 50;

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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Łączenie bliskich cząsteczek delikatnymi liniami
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
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
        bio: "Tworzę nowoczesny kod, projektuję systemy i spędzam czas na optymalizacjach. Witaj w moim cyfrowym świecie.",
        skills_eng_title: "Inżynieria Elektryczna",
        skills_eng_desc: "Wykształcenie inżynierskie, projektowanie układów, automatyka i praktyczna wiedza sprzętowa.",
        skills_dev_title: "Programowanie & Web",
        skills_dev_desc: "Tworzenie aplikacji, nowoczesny webdev, dbałość o czystość kodu oraz szybki deployment przez Cloudflare.",
        mc_title: "Minecraft PvP",
        mc_subtitle: "Crystal PvP Experience",
        mc_desc: "Posiadam rangę HT3 na scenie Crystal PvP. Wysoki poziom refleksu, optymalizacja ustawień i setki stoczonych walk.",
        links_title: "Linki & Kontakt"
    },
    uk: {
        subtitle: "Electrical Engineer & Developer",
        bio: "Building modern code, designing systems, and focusing on optimizations. Welcome to my digital world.",
        skills_eng_title: "Electrical Engineering",
        skills_eng_desc: "Engineering background, circuit design, automation, and practical hardware knowledge.",
        skills_dev_title: "Programming & Web",
        skills_dev_desc: "Building applications, modern webdev, clean code standards, and fast deployment via Cloudflare.",
        mc_title: "Minecraft PvP",
        mc_subtitle: "Crystal PvP Experience",
        mc_desc: "Holding the HT3 rank in the Crystal PvP scene. High reflexes, settings optimization, and countless matches played.",
        links_title: "Links & Contact"
    }
};

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.documentElement.setAttribute('lang', lang);
}
