function copyDiscord(element) {
    const discordTag = "peritti28";
    navigator.clipboard.writeText(discordTag).then(() => {
        showToast();
        const actionSpan = element.querySelector('.link-action');
        const originalText = actionSpan.textContent;
        actionSpan.textContent = "OK!";
        setTimeout(() => {
            actionSpan.textContent = originalText;
        }, 2000);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function switchLanguage(lang) {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (lang === 'pl') {
        buttons[0].classList.add('active');
    } else {
        buttons[1].classList.add('active');
    }

    const elements = document.querySelectorAll('[data-pl]');
    elements.forEach(el => {
        if (lang === 'uk' && el.getAttribute('data-uk')) {
            el.textContent = el.getAttribute('data-uk');
        } else if (lang === 'pl' && el.getAttribute('data-pl')) {
            el.textContent = el.getAttribute('data-pl');
        }
    });
}

document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const orbs = document.querySelectorAll('.glow-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});
