const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const mouse = { x: null, y: null };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

class Star {
    constructor(x, y, radius, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        const forceX = force * (dx / distance);
        const forceY = force * (dy / distance);

        if (distance < maxDistance) {
            this.x -= forceX * this.velocityX;
            this.y -= forceY * this.velocityY;
        } else {
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        this.draw();
    }
}

function createStars() {
    stars = [];
    const numberOfStars = (canvas.width * canvas.height) / 8000;
    for (let i = 0; i < numberOfStars; i++) {
        const radius = Math.random() * 1.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const velocityX = (Math.random() * 0.5) - 0.25;
        const velocityY = (Math.random() * 0.5) - 0.25;
        stars.push(new Star(x, y, radius, velocityX, velocityY));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
    });
}

createStars();
animate();