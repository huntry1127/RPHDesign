
const menu=document.querySelector('.menu');
const splash=document.getElementById('splash-menu');
const closeButton=splash.querySelector('.splash-close');
let closing=false;let closeTimer;let previousOverflow='';let frameOne;let frameTwo;
function openMenu(){
 if(splash.open)return;
 previousOverflow=document.body.style.overflow;
 document.body.style.overflow='hidden';
 menu.setAttribute('aria-expanded','true');
 splash.showModal();
 closeButton.focus({preventScroll:true});
 frameOne=requestAnimationFrame(()=>{frameTwo=requestAnimationFrame(()=>{if(splash.open&&!closing)splash.classList.add('visible')})});
}
function closeMenu(target){
 if(!splash.open||closing)return;
 closing=true;
 cancelAnimationFrame(frameOne);cancelAnimationFrame(frameTwo);
 splash.classList.remove('visible');
 const finish=()=>{
  clearTimeout(closeTimer);splash.removeEventListener('transitionend',onEnd);
  splash.close();document.body.style.overflow=previousOverflow;
  menu.setAttribute('aria-expanded','false');closing=false;
  menu.focus({preventScroll:true});
  if(target){
   const destination=new URL(target,window.location.href);
   if(destination.pathname===window.location.pathname&&destination.search===window.location.search&&destination.hash){
    const section=document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    if(section){history.pushState(null,'',destination.href);section.setAttribute('tabindex','-1');section.focus({preventScroll:true});section.scrollIntoView({behavior:'instant'});section.addEventListener('blur',()=>section.removeAttribute('tabindex'),{once:true})}
   }else{window.location.assign(destination.href)}
  }
 };
 const onEnd=event=>{if(event.target===splash&&event.propertyName==='transform')finish()};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return}
 splash.addEventListener('transitionend',onEnd);closeTimer=setTimeout(finish,600);
}
menu.addEventListener('click',openMenu);
closeButton.addEventListener('click',()=>closeMenu());
splash.addEventListener('cancel',event=>{event.preventDefault();closeMenu()});
splash.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();closeMenu(link.getAttribute('href'))}));
document.querySelectorAll('.package').forEach(button=>button.addEventListener('click',()=>{
 const selection=document.getElementById('package');
 if(!selection){window.location.assign('/?package='+encodeURIComponent(button.dataset.package)+'#contact');return}
 selection.value=button.dataset.package;document.getElementById('contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.getElementById('form-status').textContent=button.dataset.package+' selected. Add your details to prepare a project brief.';
}));
const requestedPackage=new URLSearchParams(window.location.search).get('package');
const packageSelect=document.getElementById('package');
if(requestedPackage&&packageSelect&&Array.from(packageSelect.options).some(option=>option.value===requestedPackage)){packageSelect.value=requestedPackage;document.getElementById('form-status').textContent=requestedPackage+' selected. Add your details to prepare a project brief.'}
document.getElementById('brief-form')?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.target);const content=['RP HUNT DESIGN — PROJECT BRIEF','',...Array.from(data.entries()).map(([key,value])=>key.toUpperCase()+': '+String(value).trim()),'','Prepared locally. This brief has not been sent to RP Hunt Design.'].join('\n');const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='RP-Hunt-Design-Project-Brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);document.getElementById('form-status').textContent='Your project brief has been downloaded. Nothing has been sent. Keep it ready for when the studio contact email is available.'});

// Mark the current destination without adding navigation to the page header.
splash.querySelectorAll('a').forEach(link=>{const url=new URL(link.href,window.location.href);if(url.pathname===window.location.pathname&&!url.hash)link.setAttribute('aria-current','page')});
