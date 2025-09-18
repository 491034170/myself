// 粒子背景（轻量版）
(() => {
  const c = document.getElementById('fx');
  const ctx = c.getContext('2d');
  let w, h, particles;
  const R = () => Math.random();

  function resize(){
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    particles = Array.from({length: Math.min(140, Math.floor(w*h/12000))}, () => ({
      x: R()*w, y: R()*h,
      vx: (R()-.5)*.6, vy: (R()-.5)*.6,
      r: 1.2 + R()*1.6
    }));
  }
  addEventListener('resize', resize, {passive:true});
  resize();

  function loop(){
    ctx.clearRect(0,0,w,h);
    // 连接线
    for (let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = 'rgba(127,90,240,.9)';
      ctx.fill();

      for (let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x-q.x, dy = p.y-q.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < 120*120){
          ctx.strokeStyle = `rgba(65,209,255,${1 - d2/14400})`;
          ctx.lineWidth = .6;
          ctx.beginPath();
          ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

// 打字机效果（不依赖库）
(() => {
  const el = document.querySelector('.typing');
  if(!el) return;
  const words = JSON.parse(el.getAttribute('data-words')||'[]');
  let i=0, j=0, erase=false;

  function tick(){
    const word = words[i] || "";
    el.textContent = erase ? word.slice(0, j--) : word.slice(0, j++);
    if(!erase && j > word.length + 5){ erase = true; }
    if(erase && j <= 0){ erase = false; i = (i+1)%words.length; }
    setTimeout(tick, erase ? 45 : 85);
  }
  tick();
})();

// 年份
document.getElementById('y').textContent = new Date().getFullYear();

// 平滑滚动（锚点）
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id = a.getAttribute('href').slice(1);
    const t = document.getElementById(id) || document.querySelector(`[id="${id}"]`);
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});
// 微信名片弹窗逻辑（无依赖）
(function () {
  const modal = document.getElementById('wechatModal');
  const btn   = document.getElementById('wechatBtn');
  const close = document.getElementById('wechatClose');

  if (!modal || !btn || !close) return;

  const open  = () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); };
  const hide  = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); };

  btn.addEventListener('click', open);
  close.addEventListener('click', hide);
  modal.addEventListener('click', (e) => { if (e.target === modal) hide(); }); // 点背景关闭
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); }); // Esc 关闭
})();

