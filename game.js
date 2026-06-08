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
  inner: 120,
  outer: 180
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
  // inner orbit
  ctx.beginPath();
  ctx.arc(centerX, centerY, orbit.inner, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.stroke();

  // outer orbit
  ctx.beginPath();
  ctx.arc(centerX, centerY, orbit.outer, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.stroke();
}

// Game loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlanet();
  drawOrbit();

  angle += 0.02; // speed control

drawShip();

  requestAnimationFrame(animate);
}

animate();
let angle = 0;

let currentOrbit = "outer";

const ship = {
  radius: 10,
  orbitRadius: orbit.outer
};


function drawShip() {
  const x = centerX + ship.orbitRadius * Math.cos(angle);
  const y = centerY + ship.orbitRadius * Math.sin(angle);

  ctx.beginPath();
  ctx.arc(x, y, ship.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";

  ctx.shadowBlur = 20;
  ctx.shadowColor = "#fff";

  ctx.fill();
  ctx.shadowBlur = 0;
}

window.addEventListener("click", () => {
  if (currentOrbit === "outer") {
    currentOrbit = "inner";
    ship.orbitRadius = orbit.inner;
  } else {
    currentOrbit = "outer";
    ship.orbitRadius = orbit.outer;
  }
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (currentOrbit === "outer") {
      currentOrbit = "inner";
      ship.orbitRadius = orbit.inner;
    } else {
      currentOrbit = "outer";
      ship.orbitRadius = orbit.outer;
    }
  }
});
