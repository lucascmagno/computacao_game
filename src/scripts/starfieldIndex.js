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
    constructor(x, y, radius, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 150;

        let force = (maxDistance - distance) / maxDistance;

        if (force < 0) force = 0;
        if (force > 1) force = 1;

        const maxForce = 0.08;
        const forceX = Math.sign(dx) * Math.min(force * Math.abs(dx) * maxForce, maxForce);
        const forceY = Math.sign(dy) * Math.min(force * Math.abs(dy) * maxForce, maxForce);

        this.x += this.velocityX + forceX;
        this.y += this.velocityY + forceY;

        if (this.x > canvas.width + this.radius) {
            this.x = -this.radius;
        } else if (this.x < -this.radius) {
            this.x = canvas.width + this.radius;
        }
        if (this.y > canvas.height + this.radius) {
            this.y = -this.radius;
        } else if (this.y < -this.radius) {
            this.y = canvas.height + this.radius;
        }

        this.draw();
    }
}

function createStars() {
    stars = [];
    const numberOfStars = Math.floor((canvas.width * canvas.height) / 6000);
    for (let i = 0; i < numberOfStars; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = 'white';
        const velocityX = (Math.random() - 0.5) * 0.6;
        const velocityY = (Math.random() - 0.5) * 0.6;
        stars.push(new Star(x, y, radius, color, velocityX, velocityY));
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
