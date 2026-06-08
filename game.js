const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let angle = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const planet = {
  x: centerX,
  y: centerY,
  radius: 60
};

const orbit = {
  inner: 120,
  outer: 180
};

let currentOrbit = "outer";

const ship = {
  radius: 10,
  orbitRadius: orbit.outer
};

function drawPlanet() {
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0af";
  ctx.fill();
}

function drawOrbit() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, orbit.inner, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, orbit.outer, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.stroke();
}

function drawShip() {
  const x = centerX + ship.orbitRadius * Math.cos(angle);
  const y = centerY + ship.orbitRadius * Math.sin(angle);

  ctx.beginPath();
  ctx.arc(x, y, ship.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlanet();
  drawOrbit();

  angle += 0.02;
  drawShip();

  requestAnimationFrame(animate);
}

animate();
