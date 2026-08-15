(() => {
  const C = window.NEXOMC_CONFIG || {};
  const skins = window.NEXOMC_SKINS || [];
  const faqs = window.NEXOMC_FAQ || [];

  document.title = `${C.siteName || "NexoMC"} — Minecraft Skin Collection`;
  document.querySelectorAll("#deployBtn,#footerHub").forEach(a => a.href = C.hubUrl || "#");

  // Theme: dark is always the initial state unless config says otherwise.
  const savedTheme = localStorage.getItem("nexomc-theme");
  const initialTheme = savedTheme || C.defaultTheme || "dark";
  document.body.classList.toggle("light", initialTheme === "light");

  document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("nexomc-theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // Typing hero.
  const phrases = ["Your next Minecraft Skin.", "Level up your Minecraft.", "Find your perfect skin."];
  const target = document.getElementById("typedTitle");
  let phrase = 0, char = 0, deleting = false;
  function typeLoop() {
    const text = phrases[phrase];
    target.textContent = text.slice(0, char);
    if (!deleting && char < text.length) {
      char++;
      setTimeout(typeLoop, C.typingSpeed || 85);
    } else if (!deleting) {
      deleting = true;
      setTimeout(typeLoop, C.typingPause || 1500);
    } else if (char > 0) {
      char--;
      setTimeout(typeLoop, C.deletingSpeed || 45);
    } else {
      deleting = false;
      phrase = (phrase + 1) % phrases.length;
      setTimeout(typeLoop, 350);
    }
  }
  typeLoop();

  // View counter.
  let views = Number(localStorage.getItem("nexomc-views") || 0) + 1;
  localStorage.setItem("nexomc-views", views);
  document.getElementById("totalViews").textContent = views.toLocaleString("id-ID");
  document.getElementById("skinCount").textContent = skins.length;

  const downloadState = JSON.parse(localStorage.getItem("nexomc-downloads") || "{}");
  skins.forEach(s => downloadState[s.id] = Number(downloadState[s.id] || 0));

  function totalDownloads() {
    return Object.values(downloadState).reduce((a,b) => a + b, 0);
  }
  function updateStats() {
    document.getElementById("totalDownloads").textContent = totalDownloads().toLocaleString("id-ID");
    skins.forEach(s => {
      const el = document.querySelector(`[data-count="${s.id}"]`);
      if (el) el.textContent = downloadState[s.id].toLocaleString("id-ID");
    });
  }

  const row = document.getElementById("skinRow");
  skins.forEach((skin, index) => {
    const card = document.createElement("article");
    card.className = "skin-card";
    card.innerHTML = `
      <div class="skin-image">
        <span class="skin-badge">${escapeHtml(skin.category)}</span>
        <img src="${escapeAttr(skin.image)}" alt="${escapeAttr(skin.name)}"
             onerror="this.style.opacity='.25'">
      </div>
      <div class="skin-info">
        <h3>${escapeHtml(skin.name)}</h3>
        <p>Premium Minecraft skin · NexoMC</p>
        <button class="download-btn" data-download="${escapeAttr(skin.id)}">Download Skin ↓</button>
        <div class="mini-count">DOWNLOADS: <span data-count="${escapeAttr(skin.id)}">0</span></div>
      </div>`;
    row.appendChild(card);

    if (index === 0) document.getElementById("heroSkin").src = skin.image;
  });

  function downloadSkin(skin) {
    downloadState[skin.id]++;
    localStorage.setItem("nexomc-downloads", JSON.stringify(downloadState));
    updateStats();

    // Model download seperti Redfinger: buka link MediaFire di tab baru.
    const link = document.createElement("a");
    link.href = skin.download;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  row.addEventListener("click", e => {
    const btn = e.target.closest("[data-download]");
    if (!btn) return;
    const skin = skins.find(s => s.id === btn.dataset.download);
    if (skin) downloadSkin(skin);
  });

  updateStats();

  document.getElementById("prevBtn").onclick = () => row.scrollBy({left: -310, behavior: "smooth"});
  document.getElementById("nextBtn").onclick = () => row.scrollBy({left: 310, behavior: "smooth"});

  const faqList = document.getElementById("faqList");
  faqs.forEach(item => {
    const el = document.createElement("div");
    el.className = "faq-item";
    el.innerHTML = `<button class="faq-q">${escapeHtml(item.q)} <span>＋</span></button>
      <div class="faq-a"><p>${escapeHtml(item.a)}</p></div>`;
    el.querySelector(".faq-q").onclick = () => el.classList.toggle("active");
    faqList.appendChild(el);
  });

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function escapeAttr(v){return escapeHtml(v)}
  // Animated network background: moving nodes + connecting lines.
  const canvas = document.getElementById("networkCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let nodes = [];
    let width = 0, height = 0, dpr = 1;
    const mouse = {x:-9999,y:-9999};

    function resizeNetwork(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr,0,0,dpr,0,0);

      const count = Math.min(95, Math.max(38, Math.floor((width*height)/18000)));
      nodes = Array.from({length:count},()=>({
        x:Math.random()*width,
        y:Math.random()*height,
        vx:(Math.random()-.5)*.34,
        vy:(Math.random()-.5)*.34,
        r:Math.random()*1.7+.7
      }));
    }
    function drawNetwork(){
      ctx.clearRect(0,0,width,height);
      const dark = !document.body.classList.contains("light");
      const lineBase = dark ? "139,92,246" : "99,102,241";
      const dotBase = dark ? "167,139,250" : "79,70,229";
      for(const n of nodes){
        n.x += n.vx; n.y += n.vy;
        if(n.x < -20 || n.x > width+20) n.vx *= -1;
        if(n.y < -20 || n.y > height+20) n.vy *= -1;
        const dx=n.x-mouse.x, dy=n.y-mouse.y;
        const dist=Math.hypot(dx,dy);
        if(dist<120 && dist>0){
          n.x += dx/dist*.12;
          n.y += dy/dist*.12;
        }
      }
      const maxDist = Math.min(155, Math.max(105,width/8));
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a=nodes[i], b=nodes[j];
          const d=Math.hypot(a.x-b.x,a.y-b.y);
          if(d<maxDist){
            const alpha=(1-d/maxDist)*.24;
            ctx.strokeStyle=`rgba(${lineBase},${alpha})`;
            ctx.lineWidth=.65;
            ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
          }
        }
      }
      for(const n of nodes){
        ctx.fillStyle=`rgba(${dotBase},.72)`;
        ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fill();
      }
      requestAnimationFrame(drawNetwork);
    }
    window.addEventListener("resize",resizeNetwork,{passive:true});
    window.addEventListener("pointermove",e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});
    window.addEventListener("pointerleave",()=>{mouse.x=-9999;mouse.y=-9999},{passive:true});
    resizeNetwork();
    drawNetwork();
  }

})();
