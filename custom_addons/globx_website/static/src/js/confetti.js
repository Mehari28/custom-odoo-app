/** @odoo-module **/

/**
 * Lightweight canvas confetti burst. No external library needed -
 * spawns a temporary full-screen canvas, animates a burst of
 * colored rectangles falling/rotating with gravity, then removes
 * itself once particles are off-screen.
 */
export function fireConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const canvas = document.createElement("canvas");
    canvas.className = "globx-confetti-canvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const colors = ["#3fae29", "#2f8b1f", "#ffffff", "#7fd66b", "#eaf6e9"];
    const particleCount = 140;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height * 0.35,
            vx: (Math.random() - 0.5) * 12,
            vy: Math.random() * -12 - 4,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 12,
            gravity: 0.35,
        });
    }

    let frame = 0;
    const maxFrames = 150;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let anyVisible = false;

        particles.forEach((p) => {
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;

            if (p.y < canvas.height + 20) {
                anyVisible = true;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            ctx.restore();
        });

        frame++;
        if (anyVisible && frame < maxFrames) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }

    requestAnimationFrame(animate);
}