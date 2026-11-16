/* Cascading skills carousel: the center card is sharp and big; the others shrink, fade and blur. */
(()=>{const car=document.getElementById('car');if(!car)return;const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const SK=[['bi-filetype-html','HTML','Building structured and accessible foundations for modern web experiences.'],['bi-filetype-css','CSS','Designing responsive layouts, animations, and visually appealing interfaces.'],['bi-filetype-js','JavaScript','Adding interactive features and dynamic behavior to websites.'],['bi-filetype-java','Java','Developing simple programs and learning programming fundamentals.'],['bi-filetype-jsx','React','Building reusable components and interactive user interfaces.'],['bi-figma','Figma','Creating interfaces, prototypes, and visual designs.'],['bi-git','Git and GitHub','Managing code and organizing development projects.']];
const dots=document.getElementById('dots'),N=SK.length;let cur=0,paused=false;
SK.forEach((s,i)=>{car.insertAdjacentHTML('beforeend',`<article class="sk" data-i="${i}"><div class="n"><span>${String(i+1).padStart(2,'0')}</span><span>SKILL MODULE</span></div><i class="bi ${s[0]} ic" aria-hidden="true"></i><h3>${s[1]}</h3><p>${s[2]}</p><a href="https://github.com/seanashleireglos-lgtm" target="_blank" rel="noopener">View my work <i class="bi bi-arrow-up-right"></i></a></article>`);
dots.insertAdjacentHTML('beforeend',`<button aria-label="Show ${s[1]}" data-i="${i}"></button>`)});
const cs=[...car.children],ds=[...dots.children];
function show(){const W=cs[0].offsetWidth,S=[1,.85,.7],O=[1,.7,.4],B=[0,1,2.5],h=Math.floor(N/2);
cs.forEach((c,i)=>{const d=((i-cur+N+h)%N)-h,k=Math.abs(d),v=k<=2;
c.style.transform=`translateX(calc(-50% + ${d*W*.7}px)) scale(${v?S[k]:.6}) translateY(${k?0:-8}px)`;c.style.opacity=v?O[k]:0;c.style.filter=`blur(${v?B[k]:3}px)`;c.style.zIndex=10-k;c.style.pointerEvents=v?'auto':'none';c.classList.toggle('on',!k);c.setAttribute('aria-hidden',k?'true':'false')});
ds.forEach((b,i)=>b.classList.toggle('on',i===cur))}
const go=i=>{cur=(i+N)%N;show()},fromHash=()=>{const n=decodeURIComponent(location.hash.slice(1)).toLowerCase(),i=SK.findIndex(s=>s[1].toLowerCase()===n);if(i>-1)go(i)};
document.getElementById('nx').onclick=()=>go(cur+1);document.getElementById('pv').onclick=()=>go(cur-1);ds.forEach(b=>b.onclick=()=>go(+b.dataset.i));
let px=0;car.addEventListener('pointerdown',e=>{px=e.clientX;paused=true});
car.addEventListener('pointerup',e=>{const dx=e.clientX-px;if(Math.abs(dx)>50)go(cur+(dx<0?1:-1));else{const c=e.target.closest('.sk');if(c&&!e.target.closest('a'))go(+c.dataset.i)}});
const sec=document.getElementById('skills');['mouseenter','focusin'].forEach(t=>sec.addEventListener(t,()=>paused=true));['mouseleave','focusout'].forEach(t=>sec.addEventListener(t,()=>paused=false));
if(!RM)setInterval(()=>{if(!paused&&!document.hidden)go(cur+1)},5000);
car.tabIndex=0;car.onkeydown=e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)};
addEventListener('resize',show);addEventListener('hashchange',fromHash);addEventListener('selectSkill',e=>{const i=SK.findIndex(s=>s[1].toLowerCase()===e.detail.toLowerCase());if(i>-1)go(i)});show();fromHash()})();
