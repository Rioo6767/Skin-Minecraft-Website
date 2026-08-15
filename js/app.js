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
})();

