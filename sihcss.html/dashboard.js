// Basic live simulation + small chart renderer (no external libraries)

// Helper: draw a simple bar-chart on a canvas to show approx timing
function drawBarChart(canvas, labels, data) {
  const ctx = canvas.getContext('2d');//2d drawing surface
  ctx.clearRect(0,0,canvas.width,canvas.height);//clear prev charts so redraw works

  // padding
  const padding = 20;//leaves spacing for labels /grids
  const w = canvas.width - padding*2;
  const h = canvas.height - padding*2;
  const barGap = 12;
  const num = data.length;
  const barWidth = (w - (num-1)*barGap) / num;

  // find max
  const max = Math.max(...data, 1);//largest data value-ensures bar prportionality ,no % by 0 if all value r 0
  
  //ss=faint white subtle grid

  // Draw background grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';//horizontal grid line bg 
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i=0;i<=4;i++){//looop runs 5 times
    const y = padding + (h/4)*i;
    ctx.moveTo(padding, y);//move to line to draw grid line across the chrt
    ctx.lineTo(padding + w, y);
  }
  ctx.stroke();//renders them

  // Bars
  for (let i=0;i<num;i++){
    const value = data[i];//bar height
    const x = padding + i*(barWidth + barGap);//x -left posn of bar
    const barH = (value / max) * (h - 8);//(barh-pixel <>)
    const y = padding + (h - barH);//top coordn.

    // gradient fill - blue to cyan
    const grad = ctx.createLinearGradient(x, y, x, y + barH);
    grad.addColorStop(0, 'rgba(0,183,255,0.95)');
    grad.addColorStop(1, 'rgba(0,120,255,0.8)');

    roundRect(ctx, x, y, barWidth, barH, 6, true, false, grad);//rR to draw rounded bars

    // Label
    ctx.fillStyle = 'rgba(230,247,255,0.9)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barWidth/2, padding + h + 14);
    // value text above bar
    ctx.fillText(String(value), x + barWidth/2, y - 6);
  }
}

// helper: draw rounded rect
function roundRect(ctx,x,y,w,h,r,fill,stroke,fillStyle){
  if (typeof r === 'undefined') r = 5;
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fillStyle || 'rgba(255,255,255,0.08)';
    ctx.fill();
  }
  if (stroke) ctx.stroke();
}

// ---- Live behavior ----
const queueNumberEl = document.getElementById('queueNumber');
const liveTimeEl = document.getElementById('liveTime');
const bookingIdEl = document.getElementById('bookingId');
const slotEl = document.getElementById('slot');
const patientNameLiveEl = document.getElementById('patientNameLive');
const refreshBtn = document.getElementById('refreshLive');
const canvas = document.getElementById('liveChart');

// initial sample data (approx minutes for upcoming 6 slots)
let sampleLabels = ['Now','+15','+30','+45','+60','+75'];
let sampleData = [6, 12, 9, 15, 10, 8];

// render initial chart (size adapt)
function setupCanvas() {
  // set actual canvas pixel size for crispness
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  canvas.getContext('2d').scale(dpr, dpr);
}
function renderChart() {
  setupCanvas();
  drawBarChart(canvas, sampleLabels, sampleData);
}
renderChart();

// simulate live updates when clicking "Refresh Live"
refreshBtn.addEventListener('click', () => {
  // randomize queue number between 5 and 10 (for demo)
  const q = Math.floor(Math.random() * 6) + 5; // 5..10
  const max = 10;
  queueNumberEl.innerHTML = `${q}<span class="slash">/</span><span class="max">${max}</span>`;

  // update a booking slot/time randomly for demonstration
  const hour = 10 + Math.floor(Math.random()*5); // 10..14
  const min = [0,15,30,45][Math.floor(Math.random()*4)];
  slotEl.value = `${pad(hour)}:${pad(min)} ${hour < 12 ? 'AM' : 'PM'} - ${pad(hour)}:${pad((min+15)%60)} ${hour < 12 ? 'AM' : 'PM'}`;

  // randomize sampleData a bit to show change
  sampleData = sampleData.map(v => Math.max(2, Math.round(v + (Math.random()*8 - 4))));
  // ensure chart updates
  renderChart();

  // update 'updated' time
  const now = new Date();
  liveTimeEl.textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
});

// small helper formatting
function pad(n){ return String(n).padStart(2,'0'); }

// on resize, re-render chart (responsive)
window.addEventListener('resize', () => {
  renderChart();
});
