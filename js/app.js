/* menu */
$('#menu').innerHTML=[['home','خانه'],['projects','پروژه‌ها'],['services','خدمات'],['about','درباره من'],['contact','تماس']].map(l=>`<a href="#${l[0]}">${l[1]}</a>`).join('');
$('#mb').onclick=()=>$('#menu').classList.toggle('on');$('#menu').onclick=()=>$('#menu').classList.remove('on');

/* manifesto */
const mp=$('#mp');mp.innerHTML=mp.textContent.trim().split(/\s+/).map(w=>`<span>${w}</span>`).join(' ');const ws=[...mp.children];
function reveal(){const r=mp.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.2)));ws.forEach((w,i)=>w.classList.toggle('on',i/ws.length<p))}
addEventListener('scroll',reveal,{passive:true});

/* router with shared-element transition */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
const TT={home:'ثمین | طراح رابط و تجربه کاربری',projects:'پروژه‌ها',services:'خدمات',about:'درباره من',contact:'تماس با من'};
let pend=null;
function show(r){
  if(!$('#v-'+r))r='home';
  $$('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+r));
  const p=P.find(p=>'case-'+p.id===r);document.title=(p?p.n+' | کیس‌استادی':TT[r])+' | ثمین';
  $('#menu').classList.remove('on');
  window.lenis?lenis.scrollTo(0,{immediate:true}):scrollTo(0,0);
  reveal();$$('.view.on .rv').forEach(e=>{e.classList.remove('in');io.observe(e)});
  return r;
}
function go(){
  const r=location.hash.slice(1)||'home',el=pend;pend=null;
  if(!document.startViewTransition||RM){show(r);return}
  if(el)el.style.viewTransitionName='pj';
  const t=document.startViewTransition(()=>{if(el)el.style.viewTransitionName='';$('#pv').classList.remove('on');const x=show(r);const m=$('#v-'+x+' .ch~.pad .mk');if(el&&m)m.style.viewTransitionName='pj'});
  t.finished.finally(()=>$$('.mk').forEach(m=>m.style.viewTransitionName=''));
}
addEventListener('hashchange',go);
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#case-"]');
  if(a)pend=a.querySelector('.mk')||($('#pv').classList.contains('on')?$('#pv .mk'):null);
  const b=e.target.closest('.seg button');
  if(b){const s=b.parentNode;[...s.children].forEach(x=>x.classList.toggle('on',x===b));s.parentNode.querySelector('.mk').dataset.s=b.dataset.k}
});
/* hover preview on the project list */
const pv=document.createElement('div');pv.id='pv';document.body.appendChild(pv);
let px=0,py=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});
$$('#pl .row').forEach(r=>{r.onmouseenter=()=>{pv.innerHTML=pm(P[r.dataset.i]);pv.classList.add('on');if(!pl){pl=true;requestAnimationFrame(l)}};r.onmouseleave=()=>pv.classList.remove('on')});
let pl=false;function l(){px+=(tx-px)*.15;py+=(ty-py)*.15;pv.style.transform=`translate(${px-170}px,${py-120}px) rotate(-3deg)`;if(pv.classList.contains('on'))requestAnimationFrame(l);else pl=false}
/* contact: opens a ready-to-send email */
document.addEventListener('submit',e=>{if(e.target.id!=='fm')return;e.preventDefault();
  const b=`نام: ${fn.value}\nراه ارتباطی: ${fc.value}\nنوع پروژه: ${ft.value}\n\n${fd.value}`;
  $('#ok').style.display='block';location.href='mailto:samoa.bgs@gmail.com?subject='+encodeURIComponent('درخواست همکاری: '+ft.value)+'&body='+encodeURIComponent(b)});
/* circular cursor: dot + trailing ring; the ring grows on links and turns into a "view case" disc on projects */
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.body.classList.add('cx');
  const cz=document.createElement('div');cz.id='cz';cz.setAttribute('aria-hidden','true');
  cz.innerHTML='<div class="rg"><span>دیدن کیس</span></div><div class="dt"></div>';
  document.body.appendChild(cz);
  const rg=cz.querySelector('.rg');
  let cx=0,cy=0,lx=0,ly=0,seen=false;
  let run=false;function f(){const k=RM?1:.2;lx+=(cx-lx)*k;ly+=(cy-ly)*k;rg.style.translate=`${lx-cx}px ${ly-cy}px`;if(Math.abs(cx-lx)>.3||Math.abs(cy-ly)>.3)requestAnimationFrame(f);else run=false}
  addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;if(!seen){seen=true;lx=cx;ly=cy;cz.classList.add('on')}cz.style.transform=`translate(${cx}px,${cy}px)`;if(!run){run=true;requestAnimationFrame(f)}},{passive:true});
  document.addEventListener('mouseleave',()=>cz.classList.remove('on'));
  document.addEventListener('mouseenter',()=>seen&&cz.classList.add('on'));
  document.addEventListener('mouseover',e=>{const t=e.target;let c='';
    if(t.closest('input,textarea,select'))c='off';
    else if(t.closest('.pc,#pl .row,a[href^="#case-"]'))c='big';
    else if(t.closest('a,button,summary,label'))c='lk';
    cz.classList.remove('lk','big','off');if(c)cz.classList.add(c)});
  
}
show(location.hash.slice(1)||'home');
