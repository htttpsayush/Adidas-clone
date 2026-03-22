const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('floating', window.scrollY > 60);
}, { passive: true });

gsap.registerPlugin(ScrollTrigger);

// ── CANVAS 1 ──
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const TOTAL1 = 240;

function getPath1(i) { return 'adidas-frames/ezgif-frame-' + String(i).padStart(3, '0') + '.jpg'; }
function resizeC1() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeC1();
window.addEventListener('resize', resizeC1);

const frames1 = [];
let loaded1 = 0, cur1 = 0;

function draw1(img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!img) return;
  const s = Math.max(canvas.width / img.width, canvas.height / img.height);
  ctx.drawImage(img, (canvas.width - img.width * s) / 2, (canvas.height - img.height * s) / 2, img.width * s, img.height * s);
}

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 1; i <= TOTAL1; i++) {
  const img = new Image();
  img.src = getPath1(i);
  img.onload = () => { loaded1++; if (loaded1 === 1) draw1(frames1[0]); };
  img.onerror = () => { loaded1++; };
  frames1.push(img);
}

const t1 = [
  { id: 'text-1', s: 0,    e: 0.35 },
  { id: 'text-2', s: 0.35, e: 0.65 },
  { id: 'text-3', s: 0.65, e: 0.80 },
];

ScrollTrigger.create({
  trigger: '#canvas-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 0.5,
  onLeave: () => {
    t1.forEach(s => { document.getElementById(s.id).classList.remove('active'); });
  },
  onUpdate: (self) => {
    const p = self.progress;
    const fi = Math.min(Math.floor(p * (TOTAL1 - 1)), TOTAL1 - 1);
    if (fi !== cur1) { cur1 = fi; if (frames1[cur1] && frames1[cur1].complete) draw1(frames1[cur1]); }
    document.getElementById('progress-bar').style.setProperty('--p', (p * 100) + '%');
    t1.forEach(s => { document.getElementById(s.id).classList.toggle('active', p >= s.s && p < s.e); });
  }
});

// ── CANVAS 2 ──
const canvas2 = document.getElementById('hero-canvas2');
const ctx2 = canvas2.getContext('2d');
const TOTAL2 = 284;

function getPath2(i) { return 'adidas-frames2/ezgif-frame-' + String(i).padStart(3, '0') + '.jpg'; }

let c2w = 0, c2h = 0;
const firstImg2 = new Image();
firstImg2.src = getPath2(1);
firstImg2.onload = () => {
  const aspect = firstImg2.width / firstImg2.height;
  c2h = window.innerHeight; c2w = c2h * aspect;
  canvas2.width = c2w; canvas2.height = c2h;
  ctx2.drawImage(firstImg2, 0, 0, c2w, c2h);
};

window.addEventListener('resize', () => {
  if (c2h > 0) {
    const asp = c2w / c2h; c2h = window.innerHeight; c2w = c2h * asp;
    canvas2.width = c2w; canvas2.height = c2h;
    if (frames2[cur2] && frames2[cur2].complete) draw2(frames2[cur2]);
  }
});

const frames2 = [];
let loaded2 = 0, cur2 = 0;

function draw2(img) {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  if (!img) return;
  ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
}

for (let i = 1; i <= TOTAL2; i++) {
  const img = new Image();
  img.src = getPath2(i);
  img.onload = () => { loaded2++; };
  img.onerror = () => { loaded2++; };
  frames2.push(img);
}

const t2 = [
  { id: 'text2-1', s: 0,    e: 0.35 },
  { id: 'text2-2', s: 0.35, e: 0.65 },
  { id: 'text2-3', s: 0.65, e: 0.98 },
];

ScrollTrigger.create({
  trigger: '#canvas2-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 0.5,
  onUpdate: (self) => {
    const p = self.progress;
    const fi = Math.min(Math.floor(p * (TOTAL2 - 1)), TOTAL2 - 1);
    if (fi !== cur2) { cur2 = fi; if (frames2[cur2] && frames2[cur2].complete) draw2(frames2[cur2]); }
    document.getElementById('progress-bar2').style.setProperty('--p2', (p * 100) + '%');
    t2.forEach(s => { document.getElementById(s.id).classList.toggle('active', p >= s.s && p < s.e); });
  }
});

const st = document.createElement('style');
st.textContent = '#progress-bar::after{width:var(--p,0%)!important;}#progress-bar2::after{width:var(--p2,0%)!important;}';
document.head.appendChild(st);

document.getElementById('text-1').classList.add('active');
document.getElementById('text2-1').classList.add('active');
