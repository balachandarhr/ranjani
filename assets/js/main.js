(function(){
  var header=document.querySelector('.header');
  var onScroll=function(){header&&header.classList.toggle('scrolled',window.scrollY>10)};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var toggle=document.querySelector('.menu-toggle');
  if(toggle){
    toggle.addEventListener('click',function(){
      var open=document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded',open);
    });
    document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false')})});
  }

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}

  // Active nav link on the home page
  var links=document.querySelectorAll('.nav a[href^="#"], .nav a[href^="index.html#"]');
  var sections=[];links.forEach(function(l){var id=l.getAttribute('href').split('#')[1];var s=document.getElementById(id);if(s)sections.push([l,s])});
  if(sections.length){
    window.addEventListener('scroll',function(){
      var y=window.scrollY+140,cur=null;
      sections.forEach(function(p){if(p[1].offsetTop<=y)cur=p[0]});
      links.forEach(function(l){l.classList.toggle('active',l===cur)});
    },{passive:true});
  }

  // Pre-select product from ?product= on the enquiry form
  var sel=document.getElementById('f-product');
  var m=location.search.match(/product=([^&]+)/);
  if(sel&&m){var v=decodeURIComponent(m[1].replace(/\+/g,' '));for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===v){sel.selectedIndex=i}}}

  // Enquiry form -> opens the visitor's mail app with a pre-filled email
  var form=document.getElementById('enquiry-form');
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      if(!form.reportValidity())return;
      var f=new FormData(form);
      var subject='Website enquiry: '+(f.get('product')||'Packaging')+' ('+f.get('name')+')';
      var body=['Name: '+f.get('name'),'Company: '+(f.get('company')||'-'),'Phone: '+f.get('phone'),'Email: '+f.get('email'),'Product of interest: '+(f.get('product')||'-'),'Approx. quantity: '+(f.get('qty')||'-'),'','Requirement:',f.get('message')||'-'].join('\n');
      window.location.href='mailto:ranjanipack@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      document.querySelector('.form-note').classList.add('show');
    });
  }
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
(function(){
  var t=document.querySelector('.fab-top');if(!t)return;
  window.addEventListener('scroll',function(){t.classList.toggle('show',window.scrollY>700)},{passive:true});
  t.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
})();
