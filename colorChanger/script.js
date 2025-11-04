// script.js - Background Color Changer
// Helper functions
const clamp = (n, a, b) => Math.min(b, Math.max(a, Number(n)));
const toHex = n => n.toString(16).padStart(2, '0');
const rgbToHex = (r,g,b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;
const hexToRgb = hex => {
  const h = hex.replace('#','').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
};
const randomInt = max => Math.floor(Math.random()* (max+1));

// DOM elements
const hexInput = document.getElementById('hexInput');
const applyHexBtn = document.getElementById('applyHex');
const randomBtn = document.getElementById('randomBtn');
const copyBtn = document.getElementById('copyBtn');
const swatch = document.getElementById('swatch');
const hexText = document.getElementById('hexText');
const rgbText = document.getElementById('rgbText');

const rSlider = document.getElementById('r');
const gSlider = document.getElementById('g');
const bSlider = document.getElementById('b');
const rOut = document.getElementById('rOut');
const gOut = document.getElementById('gOut');
const bOut = document.getElementById('bOut');

const presetButtons = Array.from(document.querySelectorAll('.preset'));

// Apply color to body + UI
function applyColor(rgbArr, save=true) {
  const [r,g,b] = rgbArr.map(v => clamp(v, 0, 255));
  const hex = rgbToHex(r,g,b);
  document.body.style.setProperty('--bg', hex);
  // Animate swatch and update text
  swatch.style.background = hex;
  hexText.textContent = hex;
  rgbText.textContent = `rgb(${r}, ${g}, ${b})`;
  // update sliders and outputs without triggering extra events
  if (rSlider.value !== String(r)) rSlider.value = r, rOut.value = r;
  if (gSlider.value !== String(g)) gSlider.value = g, gOut.value = g;
  if (bSlider.value !== String(b)) bSlider.value = b, bOut.value = b;
  // Save to localStorage
  if (save) localStorage.setItem('bgColor', hex);
}

// Try parsing hex input and apply
function handleApplyHex() {
  let v = hexInput.value.trim();
  if (!v) return;
  if (v[0] !== '#') v = '#'+v;
  const rgb = hexToRgb(v);
  if (!rgb) {
    alert('Enter a valid 6-digit hex like #1a2b3c or 1a2b3c');
    return;
  }
  applyColor(rgb);
}

// Random color generator
function applyRandom() {
  const r = randomInt(255), g = randomInt(255), b = randomInt(255);
  applyColor([r,g,b]);
  hexInput.value = rgbToHex(r,g,b);
}

// Copy current hex to clipboard
async function copyHex() {
  try {
    await navigator.clipboard.writeText(hexText.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(()=> copyBtn.textContent = 'Copy Hex', 1200);
  } catch (e) {
    alert('Copy failed. Use Ctrl+C on the hex text: ' + hexText.textContent);
  }
}

// Sliders change handler
function sliderChanged() {
  const r = clamp(rSlider.value,0,255);
  const g = clamp(gSlider.value,0,255);
  const b = clamp(bSlider.value,0,255);
  rOut.value = r; gOut.value = g; bOut.value = b;
  applyColor([r,g,b]);
  hexInput.value = rgbToHex(r,g,b);
}

// Preset click
function presetClicked(e) {
  const color = e.currentTarget.dataset.color;
  const rgb = hexToRgb(color);
  if (rgb) {
    hexInput.value = color;
    applyColor(rgb);
  }
}

// Initialize
function init() {
  // Wire events
  applyHexBtn.addEventListener('click', handleApplyHex);
  randomBtn.addEventListener('click', applyRandom);
  copyBtn.addEventListener('click', copyHex);

  [rSlider, gSlider, bSlider].forEach(s => s.addEventListener('input', sliderChanged));
  presetButtons.forEach(btn => btn.addEventListener('click', presetClicked));

  // Enter key on hex input applies
  hexInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleApplyHex(); });

  // Load saved color or default
  const saved = localStorage.getItem('bgColor');
  if (saved && hexToRgb(saved)) {
    hexInput.value = saved;
    applyColor(hexToRgb(saved), false);
  } else {
    // set to white by default
    applyColor([255,255,255], false);
    hexInput.value = '#ffffff';
  }

  // Make preset buttons visually reflect their color
  presetButtons.forEach(btn => {
    const c = btn.dataset.color;
    if (c) btn.style.background = c;
    // set readable foreground color (black or white)
    const rgb = hexToRgb(c);
    if (rgb) {
      const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114) / 1000;
      btn.style.color = (brightness > 150) ? '#111' : '#fff';
    }
  });
}

// Run
init();
