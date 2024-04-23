export function randomUpTo(max) {
  return Math.floor(Math.random() * max);
}

function randomColor() {
  const r = randomUpTo(255);
  const g = randomUpTo(255);
  const b = randomUpTo(255);
  return `rgb(${r}, ${g}, ${b})`;
}

export function generateColors(n) {
  return Array.from(new Array(n), randomColor);
}
