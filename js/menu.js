(function(){
  const ICONS = {
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>',
    minecraft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
    skin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8l2 3-2 3v8H8v-8L6 7l2-3Z"/><path d="M9 13h6M10 16h4"/></svg>',
    fire: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3c1 4-3 5-1 8 1.2 1.7 3.8.8 3.8-2.1 2.7 2.1 4.2 4.7 4.2 7.1a8 8 0 1 1-15.7-2.2C5 10.7 9 9.2 9 5.5 11.2 6.5 12.2 5.2 13 3Z"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9" r="1.5"/><path d="m5 17 4.5-4 3 2.5 2.5-2 4 3.5"/></svg>',
    tools: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 7 3-3 3 3-3 3M4 20l7-7"/><path d="M14 10 4 20M8 4l3 3M17 14l3 3-3 3"/></svg>',
    roblox: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 4 13 4-4 13-13-4L7 4Z"/><path d="m10 9 5 2-2 5-5-2 2-5Z"/></svg>'
  };

  const groups = [
    { id:'minecraft', title:'Minecraft', icon:ICONS.minecraft, items:[
      {title:'Skin Minecraft', icon:ICONS.skin, href:()=>window.NEXOMC_CONFIG?.skinsUrl || './skins/', external:false}
    ]},
    { id:'freefire', title:'Free Fire', icon:ICONS.fire, items:[
      {title:'Fake Free Fire', icon:ICONS.image, href:'#', soon:true}
    ]},
    { id:'roblox', title:'Roblox', icon:ICONS.roblox, items:[
      {title:'Roblox Tools', icon:ICONS.tools, href:'#', soon:true}
    ]},
    { id:'tools', title:'Tools', icon:ICONS.tools, items:[
      {title:'NexoMC Tools', icon:ICONS.tools, href:'#', soon:true}
    ]}
  ];

  function inject(){
    if(document.getElementById('nexoMenu')) return;
    const host=document.createElement('div');
    host.innerHTML=`
      <div class="nexo-menu-overlay" id="nexoMenuOverlay"></div>
      <aside class="nexo-menu" id="nexoMenu" aria-hidden="true" aria-label="Main Menu">
        <div class="nexo-menu-head">
          <h2>Main<span>Menu</span></h2>
          <button class="nexo-menu-close" id="nexoMenuClose" aria-label="Tutup Main Menu">${ICONS.close}</button>
        </div>
        <div class="nexo-menu-scroll" id="nexoMenuScroll"></div>
      </aside>`;
    document.body.appendChild(host);

    const scroll=document.getElementById('nexoMenuScroll');
    scroll.innerHTML=groups.map(g=>`<section class="nexo-menu-group" data-group="${g.id}">
      <button class="nexo-menu-group-btn" type="button" aria-expanded="false">
        <span class="nexo-menu-icon">${g.icon}</span><span class="nexo-menu-group-title">${g.title}</span><span class="nexo-menu-chevron">${ICONS.chevron}</span>
      </button>
      <div class="nexo-menu-items" aria-hidden="true">${g.items.map(item=>`<a class="nexo-menu-item ${item.soon?'is-soon':''}" href="${item.href}" ${item.external?'target="_blank" rel="noopener"':''}>
        <span class="nexo-menu-icon small">${item.icon}</span><span class="nexo-menu-item-title">${item.title}</span>${item.soon?'<span class="nexo-menu-soon">SOON</span>':'<span class="nexo-menu-arrow">↗</span>'}
      </a>`).join('')}</div>
    </section>`).join('');

    const menu=document.getElementById('nexoMenu');
    const overlay=document.getElementById('nexoMenuOverlay');
    const close=document.getElementById('nexoMenuClose');
    function open(){document.body.classList.add('menu-open');menu.setAttribute('aria-hidden','false');}
    function shut(){document.body.classList.remove('menu-open');menu.setAttribute('aria-hidden','true');}
    document.querySelectorAll('[data-open-nexo-menu]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();open();}));
    close.addEventListener('click',shut); overlay.addEventListener('click',shut);
    document.addEventListener('keydown',e=>{if(e.key==='Escape') shut();});
    scroll.querySelectorAll('.nexo-menu-item.is-soon').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
    scroll.querySelectorAll('.nexo-menu-group-btn').forEach(btn=>btn.addEventListener('click',()=>{
      const group=btn.closest('.nexo-menu-group');
      const active=group.classList.contains('active');
      group.classList.toggle('active',!active); btn.setAttribute('aria-expanded',String(!active));
      group.querySelector('.nexo-menu-items').setAttribute('aria-hidden',String(active));
    }));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',inject); else inject();
})();
