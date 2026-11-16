/* Contact form: validation + pop-up message.
   To really deliver emails, paste a form service URL below (for example from Formspree or Web3Forms). */
(()=>{const f=document.getElementById('f');if(!f)return;
const FORM_ENDPOINT='',MY_EMAIL='seanashlei.reglos0430@gmail.com';
const modal=new bootstrap.Modal('#msgModal'),$=id=>document.getElementById(id);let busy=false;
function bad(id,msg){const el=$(id);el.classList.toggle('is-invalid',!!msg);el.nextElementSibling.textContent=msg;return !!msg}
function pop(ok,title,text,mail){$('mi').className='bi fs-1 '+(ok?'bi-check-circle-fill':'bi-info-circle-fill');$('mt').textContent=title;$('mb').textContent=text;$('mm').classList.toggle('d-none',!mail);if(mail)$('mm').href=mail;modal.show()}
f.addEventListener('submit',async e=>{e.preventDefault();if(busy)return;
const n=$('cn').value.trim(),em=$('ce').value.trim(),m=$('cm').value.trim();
const e1=bad('cn',n?'':'Please enter your name.'),e2=bad('ce',!em?'Please enter your email.':/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)?'':'Enter a valid email, like you@example.com.'),e3=bad('cm',m.length>=10?'':'Please write at least 10 characters.');
if(e1||e2||e3)return;
busy=true;const b=$('sb');b.disabled=true;b.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
try{if(FORM_ENDPOINT){const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:n,email:em,message:m})});if(!r.ok)throw 0;pop(true,'Message sent!',`Thank you, ${n}! I received your message and will reply to ${em} within 24-48 hours.`)}
else{await new Promise(r=>setTimeout(r,1200));pop(false,'Message checked (demo mode)',`Thanks, ${n}! Your message looks good, but this site has no email service connected yet, so it was not delivered. Tap the button to send it from your own email app.`,`mailto:${MY_EMAIL}?subject=${encodeURIComponent('Portfolio message from '+n)}&body=${encodeURIComponent(m+'\n\nFrom: '+n+' ('+em+')')}`)}
f.reset()}catch(x){pop(false,'Something went wrong','Your message could not be sent. Please try again or email me directly.')}
busy=false;b.disabled=false;b.innerHTML='Send Message <i class="bi bi-send ms-1"></i>'});
f.addEventListener('input',e=>e.target.classList.remove('is-invalid'))})();
