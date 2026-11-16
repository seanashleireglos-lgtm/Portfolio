/* 3D ID lace: the badge swings like a pendulum from the clip. Drag it, let go, and it swings back. */
(()=>{const st=document.getElementById('stage');if(!st)return;
const fr=document.getElementById('frame'),svg=document.getElementById('lan'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let th=0,om=0,tg=0,dr=false,cx=0,cy=0;const $=id=>document.getElementById(id),cl=(v,a)=>Math.max(-a,Math.min(a,v));
function layout(){const w=st.clientWidth,y=innerWidth<992?0:-110;cx=fr.offsetLeft+fr.offsetWidth/2;cy=fr.offsetTop-14;
svg.setAttribute('viewBox',`0 0 ${w} ${st.clientHeight}`);
$('p1').setAttribute('d',`M${w*.1} ${y}L${cx-4} ${cy}`);$('p2').setAttribute('d',`M${cx+4} ${cy}L${w*.9} ${y}`);
[[w*.1,y,cx-4,cy,'s1'],[cx+4,cy,w*.9,y,'s2']].forEach(([a,b,c,d,id])=>$(id).setAttribute('transform',`translate(${a+(c-a)*.75} ${b+(d-b)*.75}) rotate(${Math.atan2(d-b,c-a)*180/Math.PI})`));
$('clip').setAttribute('transform',`translate(${cx} ${cy})`)}
fr.addEventListener('pointerdown',e=>{if(e.target.closest('#rs'))return;dr=true;fr.setPointerCapture(e.pointerId);fr.classList.add('g')});
fr.addEventListener('pointermove',e=>{if(!dr)return;const r=st.getBoundingClientRect();tg=cl(Math.atan2(e.clientX-r.left-cx,Math.max(e.clientY-r.top-cy,60)),.75)});
['pointerup','pointercancel'].forEach(t=>fr.addEventListener(t,()=>{dr=false;fr.classList.remove('g')}));
fr.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')om-=.03;if(e.key==='ArrowRight')om+=.03});
$('rs').onclick=()=>{th=om=tg=0};
function tick(t){if(dr){om=(tg-th)*.35;th+=om}else{om=(om-.012*th)*.985;th+=om}
const s=RM?0:Math.sin(t/1400),ry=cl(-om*900,35)+s*9,rx=RM?0:Math.cos(t/2300)*3;
fr.style.setProperty('--sh',50+ry*1.8+'%');fr.style.transform=`rotateZ(${th*57.3+s*2}deg) rotateY(${ry}deg) rotateX(${rx}deg)`;requestAnimationFrame(tick)}
addEventListener('resize',layout);addEventListener('load',layout);layout();requestAnimationFrame(tick)})();
