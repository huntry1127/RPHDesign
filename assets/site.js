
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
 selection.value=button.dataset.package;document.getElementById('contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.getElementById('form-status').textContent=button.dataset.package+' selected. Add your details and send your inquiry.';
}));
const requestedPackage=new URLSearchParams(window.location.search).get('package');
const packageSelect=document.getElementById('package');
if(requestedPackage&&packageSelect&&Array.from(packageSelect.options).some(option=>option.value===requestedPackage)){packageSelect.value=requestedPackage;document.getElementById('form-status').textContent=requestedPackage+' selected. Add your details and send your inquiry.'}
document.getElementById('brief-form')?.addEventListener('submit',async event=>{
 event.preventDefault();
 const form=event.currentTarget;
 if(form.dataset.submitting==='true')return;
 if(!form.checkValidity()){form.reportValidity();return}
 const status=document.getElementById('form-status');
 const data=new FormData(form);
 if(String(data.get('_honey')||'').trim())return;
 const payload=Object.fromEntries(Array.from(data.entries(),([key,value])=>[key,String(value).trim()]));
 const button=form.querySelector('button[type="submit"]');
 form.dataset.submitting='true';
 form.setAttribute('aria-busy','true');
 button.disabled=true;
 status.textContent='Sending your message…';
 const controller=new AbortController();
 const timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch('https://formsubmit.co/ajax/huntry1127@gmail.com',{
   method:'POST',
   headers:{'Content-Type':'application/json','Accept':'application/json'},
   body:JSON.stringify(payload),
   signal:controller.signal
  });
  const result=await response.json();
  if(!response.ok||(result.success!==true&&result.success!=='true')){
   if(/activat|verif/i.test(String(result.message||''))){
    status.textContent='The contact inbox is awaiting verification. Your details are still here; please try again once it is ready, or contact huntry1127@gmail.com directly.';
   }else{
    status.textContent='Your message could not be sent. Your details are still here—please try again, or contact huntry1127@gmail.com directly.';
   }
   return;
  }
  form.reset();
  status.textContent='Thanks! Your message has been submitted. I’ll be in touch soon.';
 }catch(error){
  status.textContent=error.name==='AbortError'
   ?'The request timed out, so we could not confirm your submission. Your details are still here. Please wait a moment before trying again.'
   :'We could not confirm your submission. Check your connection and try again. Your details are still here, or you can contact huntry1127@gmail.com directly.';
 }finally{
  clearTimeout(timeout);
  form.dataset.submitting='false';
  form.removeAttribute('aria-busy');
  button.disabled=false;
 }
});

// Mark the current destination without adding navigation to the page header.
splash.querySelectorAll('a').forEach(link=>{const url=new URL(link.href,window.location.href);if(url.pathname===window.location.pathname&&!url.hash)link.setAttribute('aria-current','page')});
