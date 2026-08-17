(function(){
  const drawer=document.getElementById('mainMenu');
  const openBtn=document.getElementById('menuBtn');
  const closeBtn=document.getElementById('menuClose');
  const backdrop=document.getElementById('menuBackdrop');
  if(!drawer||!openBtn)return;
  const close=()=>{drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');openBtn.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');};
  const open=()=>{drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');openBtn.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');};
  openBtn.addEventListener('click',open);closeBtn&&closeBtn.addEventListener('click',close);backdrop&&backdrop.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  drawer.querySelectorAll('.menu-group-toggle').forEach(btn=>btn.addEventListener('click',()=>{
    const group=btn.closest('.menu-group');const expanded=group.classList.toggle('open');btn.setAttribute('aria-expanded',expanded?'true':'false');
  }));
  drawer.querySelectorAll('[data-coming-soon]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();close();}));
})();
