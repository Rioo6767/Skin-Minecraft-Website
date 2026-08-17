(function(){
  const drawer=document.getElementById('mainMenu');
  const openBtn=document.getElementById('menuBtn');
  const closeBtn=document.getElementById('menuClose');
  const backdrop=document.getElementById('menuBackdrop');
  if(!drawer||!openBtn)return;

  const close=()=>{
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
    openBtn.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
  };
  const open=()=>{
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
    openBtn.setAttribute('aria-expanded','true');
    document.body.classList.add('menu-open');
  };

  openBtn.addEventListener('click',open);
  closeBtn&&closeBtn.addEventListener('click',close);
  backdrop&&backdrop.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});

  const groups=[...drawer.querySelectorAll('.menu-group')];

  // The accordion is CSS-driven (grid rows) instead of max-height/scrollHeight.
  // This avoids forced layout reads and makes opening/closing much smoother on mobile.
  const setGroup=(group,isOpen)=>{
    const btn=group.querySelector('.menu-group-toggle');
    group.classList.toggle('open',isOpen);
    if(btn) btn.setAttribute('aria-expanded',isOpen?'true':'false');
  };

  // Always start with every category closed.
  groups.forEach(group=>setGroup(group,false));

  groups.forEach(group=>{
    const btn=group.querySelector('.menu-group-toggle');
    if(!btn)return;
    btn.addEventListener('click',()=>{
      const shouldOpen=!group.classList.contains('open');
      // One open category at a time.
      groups.forEach(other=>{
        if(other!==group) setGroup(other,false);
      });
      setGroup(group,shouldOpen);
    });
  });

  drawer.querySelectorAll('[data-coming-soon]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    close();
  }));
})();
