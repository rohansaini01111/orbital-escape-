const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center point
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Planet
const planet = {
  x: centerX,
  y: centerY,
  radius: 60
};

// Orbit
const orbit = {
  radius: 150
};

// Draw planet
function drawPlanet() {
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0af"; // blue glow feel
  ctx.fill();

  // glow effect
  ctx.shadowBlur = 30;
  ctx.shadowColor = "#0af";
}

// Draw orbit
function drawOrbit() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Game loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlanet();
  drawOrbit();

  requestAnimationFrame(animate);
}

animate();
