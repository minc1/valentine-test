function respondYes() {
    document.getElementById('response').innerHTML = 
        "YAY! 💖 You've made me the happiest person! Let's make beautiful memories together!";
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function dodgeButton() {
    const noBtn = document.getElementById('noBtn');
    noBtn.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
}

// Simple confetti effect
const confetti = ({ particleCount, spread, origin }) => {
    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = '🎉';
        confetti.style.position = 'fixed';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${origin.y * 100}%`;
        confetti.style.fontSize = '20px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        document.body.appendChild(confetti);
    }
}