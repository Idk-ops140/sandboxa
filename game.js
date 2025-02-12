const canvas = document.getElementById("sandboxCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.7;

let selectedElement = "sand";
let particles = [];

function selectElement(element) {
    selectedElement = element;
}

canvas.addEventListener("click", function (event) {
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;
    particles.push({ x, y, type: selectedElement });
});

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        if (particle.type === "sand" || particle.type === "water") {
            particle.y += 2; // Gravity effect
        }
        ctx.fillStyle = particle.type === "water" ? "blue" : 
                        particle.type === "fire" ? "red" : 
                        particle.type === "sand" ? "yellow" : 
                        "white";
        ctx.fillRect(particle.x, particle.y, 5, 5);
    });
    requestAnimationFrame(updateGame);
}

updateGame();
