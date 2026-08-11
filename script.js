// 背景方块雨动画
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#7cb342', '#8B6914', '#808080', '#558b2f', '#aed581'];
const blocks = [];

for (let i = 0; i < 40; i++) {
  blocks.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 30 + 15,
    speed: Math.random() * 1 + 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI
  });
}

function animateBG() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(b => {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rot);
    ctx.fillStyle = b.color;
    ctx.fillRect(-b.size/2, -b.size/2, b.size, b.size);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.strokeRect(-b.size/2, -b.size/2, b.size, b.size);
    ctx.restore();
    b.y += b.speed;
    b.rot += 0.005;
    if (b.y > canvas.height + 50) {
      b.y = -50;
      b.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateBG);
}
animateBG();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 跳转提示
let currentUrl = '';
function showTip(name, url) {
  currentUrl = url;
  document.getElementById('tipTitle').textContent = '即将跳转到 ' + name;
  document.getElementById('tipText').textContent = '将在新标签页打开 ' + url + '，是否继续？';
  document.getElementById('tipModal').style.display = 'flex';
}
function closeTip() {
  document.getElementById('tipModal').style.display = 'none';
}
function confirmJump() {
  window.open(currentUrl, '_blank');
  closeTip();
}
