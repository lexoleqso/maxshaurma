gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- split hero title into chars ---- */
const title = document.getElementById('hero-title');
(function split(){
  const frag = document.createDocumentFragment();
  title.childNodes.forEach(node=>{
    const isAccent = node.nodeType===1 && node.classList.contains('accent');
    const text = node.textContent;
    for(const ch of text){
      const s = document.createElement('span');
      s.className = 'char' + (isAccent?' accent':'');
      s.textContent = ch;
      frag.appendChild(s);
    }
  });
  title.innerHTML=''; title.appendChild(frag);
})();

/* ---- marquee content ---- */
const words = ['ცხელი 🔥','სწრაფი ⚡','გემრიელი 🌯','ახალი 🥬','მაქსშაურმა 💪'];
const track = document.getElementById('marquee-track');
let html='';
for(let i=0;i<4;i++) words.forEach(w=> html+=`<span>${w}</span><span>·</span>`);
track.innerHTML = html;

/* ---- preloader + hero intro ---- */
window.addEventListener('load', ()=>{
  /* .reveal keeps these hidden pre-load; drop it so .from() tweens land on opacity 1 */
  ['eyebrow','hero-sub','hero-p','hero-ctas'].forEach(id=>
    document.getElementById(id).classList.remove('reveal'));
  const tl = gsap.timeline();
  tl.to('#loadbar',{width:'100%',duration:reduced?0:.7,ease:'power2.inOut'})
    .to('#loader',{yPercent:-100,duration:reduced?0:.6,ease:'power3.inOut'})
    .set('#loader',{display:'none'})
    .fromTo('.hero-food',
      {scale:.4,opacity:0},
      {scale:1,opacity:1,duration:1.15,ease:'back.out(1.5)',stagger:.16},'-=.3')
    .from('#eyebrow',{y:24,opacity:0,duration:.6,ease:'power3.out'},'-=.9')
    .from('#hero-title .char',{
      y:110,opacity:0,rotateX:-70,
      duration:.85,ease:'back.out(1.6)',stagger:.045
    },'-=.5')
    .from('#hero-sub',{opacity:0,scaleX:1.6,duration:.8,ease:'power2.out'},'-=.5')
    .from('#hero-p',{y:26,opacity:0,duration:.6},'-=.4')
    .from('#hero-ctas .btn',{y:26,opacity:0,scale:.9,duration:.5,stagger:.12,ease:'back.out(2)'},'-=.3');
  if(reduced) tl.progress(1);
});

/* ---- big hero food: idle float + mouse parallax + scroll drift ---- */
const foodEls = gsap.utils.toArray('.hero-food');
if(!reduced){
  /* idle bob on the inner images (outer div is reserved for parallax/scroll) */
  foodEls.forEach((el,i)=>{
    gsap.to(el.querySelector('img'),{
      y:i%2 ? 26 : -26, rotation:i%2 ? -5 : 5,
      duration:3.6+i*.9, ease:'sine.inOut', yoyo:true, repeat:-1
    });
  });
  /* mouse parallax — food leans toward the cursor at different depths */
  const depths = [34,-24];
  const quick = foodEls.map(el=>({
    x:gsap.quickTo(el,'x',{duration:.9,ease:'power3.out'}),
    y:gsap.quickTo(el,'y',{duration:.9,ease:'power3.out'})
  }));
  window.addEventListener('mousemove',e=>{
    const nx = e.clientX/innerWidth-.5, ny = e.clientY/innerHeight-.5;
    quick.forEach((q,i)=>{ q.x(nx*depths[i]*2); q.y(ny*depths[i]); });
  });
  /* scroll away: they drift apart and spin slightly */
  gsap.to('#food-shaurma',{yPercent:-16,rotation:8,ease:'none',
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('#food-burger',{yPercent:18,rotation:-8,ease:'none',
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
}

/* ---- marquee infinite scroll ---- */
if(!reduced){
  const half = track.scrollWidth/2;
  gsap.to(track,{x:-half,duration:26,ease:'none',repeat:-1,
    modifiers:{x:x=>`${parseFloat(x)%half}px`}});
}

/* ---- nav state ---- */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start:'top -70',
  onUpdate:self=> nav.classList.toggle('scrolled', self.scroll()>70)
});

/* ---- mobile burger menu ---- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
function setMenu(open){
  navLinks.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open);
}
burger.addEventListener('click', ()=> setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> setMenu(false)));

/* ---- generic reveals ---- */
gsap.utils.toArray('section .reveal:not(.why-card):not(.dish)').forEach(el=>{
  gsap.fromTo(el,{y:46,opacity:0},{
    y:0,opacity:1,duration:.85,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 86%',once:true}
  });
});
/* stagger groups: why cards + dishes */
[['.why-grid','.why-card'],['.menu-grid','.dish']].forEach(([wrap,item])=>{
  const items = gsap.utils.toArray(`${wrap} ${item}`);
  gsap.fromTo(items,{y:56,opacity:0},{
    y:0,opacity:1,duration:.8,ease:'power3.out',stagger:.1,
    scrollTrigger:{trigger:wrap,start:'top 82%',once:true},
    onStart:()=>items.forEach(i=>i.classList.remove('reveal'))
  });
});

/* ---- section titles slide in ---- */
gsap.utils.toArray('.section-head').forEach(h=>{
  gsap.fromTo(h,{x:-40,opacity:0},{
    x:0,opacity:1,duration:.9,ease:'power3.out',
    scrollTrigger:{trigger:h,start:'top 85%',once:true}
  });
});

/* ---- counters ---- */
gsap.utils.toArray('[data-count]').forEach(el=>{
  const target = parseFloat(el.dataset.count);
  const isFloat = String(el.dataset.count).includes('.');
  ScrollTrigger.create({
    trigger:el,start:'top 88%',once:true,
    onEnter:()=> gsap.fromTo(el,{innerText:0},{
      innerText:target,duration:1.6,ease:'power2.out',
      snap:{innerText:isFloat?0.1:1},
      onUpdate:function(){ el.innerText = isFloat ? parseFloat(el.innerText).toFixed(1) : Math.round(el.innerText); }
    })
  });
});

/* ---- spice picker ---- */
const labels = {
  1:'მსუბუქი — <b>ბავშვებისთვისაც კარგია</b> 😊',
  2:'საშუალო — <b>ოქროს შუალედი</b> 👌',
  3:'ცხარე — <b>უკვე იგრძნობა!</b> 🌶️',
  4:'ძალიან ცხარე — <b>წყალი მოიმარაგე</b> 💦',
  5:'მაქს ცეცხლი — <b>შენი არჩევანია, ჩვენ გაგაფრთხილეთ!</b> 🔥🔥🔥'
};
const flameBtns = document.querySelectorAll('.flame-btn');
const spiceLabel = document.getElementById('spice-label');
flameBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const lvl = +btn.dataset.level;
    flameBtns.forEach(b=> b.classList.toggle('lit', +b.dataset.level<=lvl));
    spiceLabel.innerHTML = labels[lvl];
    if(!reduced){
      gsap.fromTo(spiceLabel,{scale:.85,opacity:0},{scale:1,opacity:1,duration:.4,ease:'back.out(2.5)'});
      gsap.fromTo('.flame-btn.lit',{scale:1},{scale:1.22,duration:.18,yoyo:true,repeat:1,stagger:.05,ease:'power2.inOut'});
      if(lvl===5){
        gsap.fromTo('#spice',{x:-6},{x:6,duration:.06,repeat:7,yoyo:true,clearProps:'x'});
      }
    }
  });
});

/* ---- highlight today's hours ---- */
const today = new Date().getDay();
document.querySelectorAll('.hours-row').forEach(r=>{
  if(r.dataset.days.split(',').map(Number).includes(today)) r.classList.add('today');
});

/* ---- big CTA phone pulse ---- */
if(!reduced){
  gsap.to('#bigcta .phone',{
    scale:1.03,duration:.9,yoyo:true,repeat:-1,ease:'sine.inOut',
    scrollTrigger:{trigger:'#bigcta',start:'top 70%',toggleActions:'play pause resume pause'}
  });
}
