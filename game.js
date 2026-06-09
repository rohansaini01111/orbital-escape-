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
let asteroids = [];

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

let shipImg = new Image();
shipImg.src = "ship.png";

function drawShip() {
  ctx.save();

  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle + Math.PI / 2);

  ctx.drawImage(shipImg, -20, -20, 40, 40);

  ctx.restore();
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
  drawAsteroids();

  requestAnimationFrame(animate);
}

setInterval(spawnAsteroid, 1000); // har 1 sec me spawn
animate();
function spawnAsteroid() {
  const angle = Math.random() * Math.PI * 2;

  const distance = canvas.width; // bahar se start
  const x = centerX + distance * Math.cos(angle);
  const y = centerY + distance * Math.sin(angle);

  asteroids.push({
    x: x,
    y: y,
    radius: 8 + Math.random() * 5,
    speed: 1 + Math.random() * 1.5,
    angle: angle
  });
}

function drawAsteroids() {
  asteroids.forEach((a, index) => {
    // move towards center
    a.x -= Math.cos(a.angle) * a.speed;
    a.y -= Math.sin(a.angle) * a.speed;

    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#aaa";
    ctx.fill();

    // remove if center cross
    const dx = a.x - centerX;
    const dy = a.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 20) {
      asteroids.splice(index, 1);
    }
  });
}
