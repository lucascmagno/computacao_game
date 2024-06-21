// Seleciona o contêiner das estrelas
const starfieldContainer = document.getElementById('starfield');

// Número de estrelas que serão criadas
const numStars = 200;

// Loop para criar as estrelas
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    starfieldContainer.appendChild(star);
}

// Função para mover as estrelas baseado na posição do cursor
starfieldContainer.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Atualiza a posição das estrelas baseado na posição do cursor
    const stars = starfieldContainer.querySelectorAll('.star');
    stars.forEach(star => {
        const starX = star.getAttribute('data-x');
        const starY = star.getAttribute('data-y');
        const deltaX = (mouseX - starX) * 0.02;
        const deltaY = (mouseY - starY) * 0.02;
        star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
});

// Função para posicionar aleatoriamente as estrelas inicialmente
function positionStars() {
    const stars = starfieldContainer.querySelectorAll('.star');
    stars.forEach(star => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.setAttribute('data-x', x);
        star.setAttribute('data-y', y);
    });
}

// Posiciona as estrelas inicialmente
positionStars();

// Redimensiona as estrelas quando a janela é redimensionada
window.addEventListener('resize', positionStars);
