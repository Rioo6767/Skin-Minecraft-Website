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
  const setGroup=(group,isOpen)=>{
    const btn=group.querySelector('.menu-group-toggle');
    const items=group.querySelector('.menu-items');
    group.classList.toggle('open',isOpen);
    btn&&btn.setAttribute('aria-expanded',isOpen?'true':'false');
    if(items){
      if(isOpen){
        items.style.maxHeight=items.scrollHeight+'px';
      }else{
        items.style.maxHeight='0px';
      }
    }
  };

  groups.forEach(group=>{
    const btn=group.querySelector('.menu-group-toggle');
    if(!btn)return;
    setGroup(group,group.classList.contains('open'));
    btn.addEventListener('click',()=>{
      const shouldOpen=!group.classList.contains('open');
      // Only one category may stay open at a time.
      groups.forEach(other=>{if(other!==group)setGroup(other,false);});
      setGroup(group,shouldOpen);
    });
  });

  window.addEventListener('resize',()=>{
    const openGroup=drawer.querySelector('.menu-group.open');
    const items=openGroup&&openGroup.querySelector('.menu-items');
    if(items)items.style.maxHeight=items.scrollHeight+'px';
  },{passive:true});

  drawer.querySelectorAll('[data-coming-soon]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();close();}));
})();
