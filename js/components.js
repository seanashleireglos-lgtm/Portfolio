/* Shared components: navbar, footer, theme toggle, search, reveal animation. */
(()=>{const SK=['HTML','CSS','JavaScript','Java','React','Figma','Git and GitHub'];
const PG=[['Home','#home'],['About','#about'],['Skills','#skills'],['Contact','#contact']];
document.getElementById('nav-root').innerHTML=`<nav id="main-nav" class="navbar navbar-expand-md fixed-top"><div class="container-fluid px-3 px-lg-5">
<a class="navbar-brand" href="#home" aria-label="Home"><img class="logo" src="images/photo.jpg" alt="Sean's profile icon"></a>
<div class="d-flex align-items-center gap-2 order-md-last ms-auto">
<div class="sr"><input id="q" class="form-control form-control-sm rounded-pill" style="width:150px" type="search" placeholder="Search..." aria-label="Search the site" autocomplete="off"><ul class="dropdown-menu" id="res"></ul></div>
<button class="btn btn-icon" id="th" aria-label="Switch light or dark theme"><i class="bi"></i></button>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Open menu"><i class="bi bi-list fs-4"></i></button></div>
<div class="collapse navbar-collapse justify-content-end" id="menu"><ul class="navbar-nav gap-md-3">${PG.map((p,idx)=>`<li class="nav-item"><a class="nav-link${idx===0?' active':''}" href="${p[1]}">${p[0]}</a></li>`).join('')}</ul></div></div></nav>`;
document.getElementById('foot-root').innerHTML='<footer class="text-center text-mut mono small py-4 mt-5 border-top" style="border-color:var(--line)!important">&copy; 2026 Sean Ashlei Reglos &middot; BSIT, Polytechnic College of Botolan</footer>';

/* Collapse mobile navbar on link click */
const menuEl=document.getElementById('menu');
menuEl.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click',()=>{
    if(menuEl.classList.contains('show')){
      bootstrap.Collapse.getOrCreateInstance(menuEl).hide();
    }
  });
});

/* theme */
const R=document.documentElement,th=document.querySelector('#th i');
const setT=t=>{R.dataset.bsTheme=t;th.className='bi '+(t==='dark'?'bi-sun-fill':'bi-moon-stars-fill');try{localStorage.setItem('theme',t)}catch(e){}};
setT(R.dataset.bsTheme||'dark');document.getElementById('th').onclick=()=>setT(R.dataset.bsTheme==='dark'?'light':'dark');

/* search */
const items=[...PG,...SK.map(s=>[s+' (skill)','#skill:'+s])],q=document.getElementById('q'),res=document.getElementById('res');let m=[];
const go=u=>{
  res.classList.remove('show');q.value='';
  if(u.startsWith('#skill:')){
    const skillName=u.slice(7);
    document.getElementById('skills').scrollIntoView({behavior:'smooth'});
    window.dispatchEvent(new CustomEvent('selectSkill',{detail:skillName}));
  }else{
    const target=document.querySelector(u);
    if(target)target.scrollIntoView({behavior:'smooth'});
  }
};
q.oninput=()=>{const v=q.value.trim().toLowerCase();res.innerHTML='';if(!v){res.classList.remove('show');return}
m=items.filter(i=>i[0].toLowerCase().includes(v));res.classList.add('show');
if(!m.length)res.innerHTML='<li><span class="dropdown-item-text text-mut">No match found.</span></li>';
m.forEach(i=>{const l=document.createElement('li');l.innerHTML='<button class="dropdown-item"></button>';l.firstChild.textContent=i[0];l.firstChild.onclick=()=>go(i[1]);res.append(l)})};
q.onkeydown=e=>{if(e.key==='Enter'&&m[0]&&q.value)go(m[0][1]);if(e.key==='Escape')res.classList.remove('show')};
document.addEventListener('click',e=>{if(!e.target.closest('.sr'))res.classList.remove('show')});

/* reveal */
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.1});document.querySelectorAll('.rv').forEach(r=>io.observe(r));})();
