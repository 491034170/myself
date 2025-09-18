// 打字机效果
(function(){
  const el = document.querySelector('.typing');
  if(!el) return;
  let words = [];
  try { words = JSON.parse(el.getAttribute('data-words') || '[]'); } catch(e){}
  let i = 0, j = 0, dir = 1; // dir: 1=打字, -1=回删
  function tick(){
    if(words.length === 0) return;
    const w = words[i] || '';
    j += dir;
    el.textContent = w.slice(0, j);
    if(dir === 1 && j === w.length){ // 到头停一会
      setTimeout(()=>{ dir = -1; }, 900);
    } else if(dir === -1 && j === 0){
      i = (i + 1) % words.length;
      dir = 1;
    }
    setTimeout(tick, dir === 1 ? 80 : 40);
  }
  tick();
})();

// 背景 Canvas（轻量，不抖动）
(function(){
  const c = document.getElementById('fx');
  if(!c) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const ctx = c.getContext('2d');
  let w, h, t = 0;
  function resize(){
    w = c.width = Math.floor(innerWidth * dpr);
    h = c.height = Math.floor(innerHeight * dpr);
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();

  function loop(){
    t += 0.003;
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<60;i++){
      const x = (Math.sin(t + i)*0.5 + 0.5) * w;
      const y = (Math.cos(t*1.3 + i)*0.5 + 0.5) * h;
      ctx.beginPath();
      ctx.arc(x, y, 1.5*dpr, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(127,90,240,0.35)';
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

// 微信弹窗开关 + 锁定背景滚动
(function(){
  const modal = document.getElementById('wechatModal');
  const btn   = document.getElementById('wechatBtn');
  const close = document.getElementById('wechatClose');
  const year  = document.getElementById('y');
  if(year) year.textContent = new Date().getFullYear();
  if(!modal || !btn || !close) return;

  const lock = () => { document.body.style.overflow='hidden'; document.body.style.touchAction='none'; };
  const unlock = () => { document.body.style.overflow=''; document.body.style.touchAction=''; };

  const open = () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); lock(); };
  const hide = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); unlock(); };

  btn.addEventListener('click', open);
  close.addEventListener('click', hide);
  modal.addEventListener('click', (e) => { if (e.target === modal) hide(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
})();
