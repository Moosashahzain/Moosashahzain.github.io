/* Moosa Shahzain Portfolio — interactions */
(function(){
"use strict";
var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var isTouch = window.matchMedia("(pointer: coarse)").matches;

/* ---------- Loader ---------- */
window.addEventListener("load", function(){
  setTimeout(function(){ document.getElementById("loader").classList.add("done"); }, 350);
});
setTimeout(function(){ document.getElementById("loader").classList.add("done"); }, 3500); // safety

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Mobile nav ---------- */
var navToggle = document.getElementById("navToggle");
var navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", function(){
  var open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navLinks.querySelectorAll("a").forEach(function(a){
  a.addEventListener("click", function(){
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded","false");
  });
});

/* ---------- Theme ---------- */
var themeBtn = document.getElementById("themeToggle");
function setTheme(t){
  document.documentElement.setAttribute("data-theme", t);
  try{ localStorage.setItem("ms-theme", t); }catch(e){}
  themeBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
  themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  blip(660);
}
var savedTheme = null;
try{ savedTheme = localStorage.getItem("ms-theme"); }catch(e){}
if(savedTheme){ document.documentElement.setAttribute("data-theme", savedTheme);
  themeBtn.setAttribute("aria-pressed", savedTheme === "dark" ? "true" : "false"); }
themeBtn.addEventListener("click", function(){
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

/* ---------- Interface sounds (OFF by default, WebAudio blips) ---------- */
var soundOn = false, audioCtx = null;
var soundBtn = document.getElementById("soundToggle");
function blip(freq){
  if(!soundOn) return;
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    var o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = "sine"; o.frequency.value = freq || 520;
    g.gain.setValueAtTime(0.06, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + 0.2);
  }catch(e){}
}
soundBtn.addEventListener("click", function(){
  soundOn = !soundOn;
  soundBtn.setAttribute("aria-pressed", soundOn ? "true" : "false");
  soundBtn.setAttribute("aria-label", soundOn ? "Toggle interface sounds (currently on)" : "Toggle interface sounds (currently off)");
  blip(720);
});
document.querySelectorAll(".btn, .nav-link").forEach(function(el){
  el.addEventListener("click", function(){ blip(520); });
});

/* ---------- Scroll reveal ---------- */
var revealEls = document.querySelectorAll(".reveal");
if("IntersectionObserver" in window && !prefersReduced){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, {threshold: 0.12});
  revealEls.forEach(function(el){ io.observe(el); });
}else{
  revealEls.forEach(function(el){ el.classList.add("in"); });
}

/* ---------- Active nav link ---------- */
var sections = document.querySelectorAll("section[id]");
var navAs = document.querySelectorAll(".nav-link");
function markActive(){
  var y = window.scrollY + 120, current = "home";
  sections.forEach(function(s){ if(s.offsetTop <= y) current = s.id; });
  navAs.forEach(function(a){
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  var backTop = document.getElementById("backTop");
  backTop.classList.toggle("show", window.scrollY > 600);
}
window.addEventListener("scroll", markActive, {passive:true});
markActive();
document.getElementById("backTop").addEventListener("click", function(){
  window.scrollTo({top:0, behavior: prefersReduced ? "auto" : "smooth"});
  blip(620);
});

/* ---------- 3D tilt (fine pointers only, no reduced motion) ---------- */
if(!isTouch && !prefersReduced){
  document.querySelectorAll(".tilt").forEach(function(card){
    var raf = null;
    card.addEventListener("pointermove", function(e){
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function(){
        card.style.transform = "perspective(900px) rotateY(" + (px*10).toFixed(2) + "deg) rotateX(" + (-py*10).toFixed(2) + "deg) translateY(-4px)";
      });
    });
    card.addEventListener("pointerleave", function(){
      if(raf) cancelAnimationFrame(raf);
      card.style.transform = "";
    });
  });
  // hero avatar follows the mouse a touch more
  var scene = document.getElementById("avatarScene"), tilt = document.getElementById("avatarTilt");
  if(scene && tilt){
    scene.addEventListener("pointermove", function(e){
      var r = scene.getBoundingClientRect();
      var px = (e.clientX - r.left)/r.width - .5, py = (e.clientY - r.top)/r.height - .5;
      tilt.style.transform = "perspective(1100px) rotateY(" + (px*14).toFixed(2) + "deg) rotateX(" + (-py*14).toFixed(2) + "deg)";
    });
    scene.addEventListener("pointerleave", function(){ tilt.style.transform = ""; });
  }
}

/* ---------- Canvas particle background (depth layers) ---------- */
(function(){
  if(prefersReduced) return;
  var cv = document.getElementById("bg-canvas"), ctx = cv.getContext("2d");
  var W, H, parts = [], mouse = {x:-9999, y:-9999};
  var COUNT = isTouch ? 40 : 70;
  function resize(){ W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); window.addEventListener("resize", resize);
  window.addEventListener("pointermove", function(e){ mouse.x = e.clientX; mouse.y = e.clientY; }, {passive:true});
  function dark(){ return document.documentElement.getAttribute("data-theme") === "dark"; }
  for(var i=0;i<COUNT;i++){
    parts.push({
      x: Math.random()*innerWidth, y: Math.random()*innerHeight,
      z: 0.3 + Math.random()*0.7,                       // depth
      vx: (Math.random()-.5)*0.35, vy: (Math.random()-.5)*0.35,
      r: 1.2 + Math.random()*2.2
    });
  }
  var hues = [174, 199, 262, 38]; // teal, sky, violet, amber
  function frame(){
    ctx.clearRect(0,0,W,H);
    var dk = dark();
    for(var i=0;i<parts.length;i++){
      var p = parts[i];
      p.x += p.vx * p.z; p.y += p.vy * p.z;
      // gentle mouse parallax by depth
      var dx = (mouse.x - W/2) * 0.02 * p.z, dy = (mouse.y - H/2) * 0.02 * p.z;
      if(p.x < -20) p.x = W+20; if(p.x > W+20) p.x = -20;
      if(p.y < -20) p.y = H+20; if(p.y > H+20) p.y = -20;
      var hue = hues[i % hues.length];
      ctx.beginPath();
      ctx.arc(p.x + dx, p.y + dy, p.r * p.z, 0, 6.283);
      ctx.fillStyle = "hsla(" + hue + ", 80%, " + (dk ? 60 : 45) + "%, " + (0.25 + p.z*0.4) + ")";
      ctx.fill();
    }
    // links
    for(var a=0;a<parts.length;a++){
      for(var b=a+1;b<parts.length;b++){
        var pa = parts[a], pb = parts[b];
        var ddx = pa.x-pb.x, ddy = pa.y-pb.y, d = Math.sqrt(ddx*ddx+ddy*ddy);
        if(d < 130){
          ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = dk ? "rgba(94,234,212," + (0.10*(1-d/130)) + ")" : "rgba(13,148,136," + (0.12*(1-d/130)) + ")";
          ctx.lineWidth = 1; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------- Project modal ---------- */
var modal = document.getElementById("projectModal");
var modalTitle = document.getElementById("modalTitle");
var modalBody = document.getElementById("modalBody");
var modalClose = document.getElementById("modalClose");
var projectInfo = {
  "Arduino Robotic Car": "A completed Arduino-based robotic car featuring obstacle avoidance, Bluetooth control and line following. Built as a hands-on electronics learning project. Real photos and a demo video will be added here soon.",
  "ESP32-Based Chatbot": "A completed experimental project combining an ESP32 microcontroller with chatbot functionality. Built to learn — exact features and components are being documented and will appear here soon.",
  "ESP8266 Mini Wi-Fi Experiment": "A wireless-networking learning experiment on the ESP8266 Mini, done on my own devices and networks only. This is about understanding how Wi-Fi works and responsible security research — only authorized, safe demonstrations."
};
document.querySelectorAll(".explore-btn").forEach(function(btn){
  btn.addEventListener("click", function(){
    var name = btn.getAttribute("data-project");
    modalTitle.textContent = name;
    modalBody.textContent = projectInfo[name] || "Details coming soon.";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
    blip(560);
  });
});
function closeModal(){ modal.hidden = true; document.body.style.overflow = ""; }
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", function(e){ if(e.target === modal) closeModal(); });
document.addEventListener("keydown", function(e){ if(e.key === "Escape" && !modal.hidden) closeModal(); });

/* ---------- Contact form (honest: no backend) ---------- */
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  var name = document.getElementById("cfName").value.trim();
  var email = document.getElementById("cfEmail").value.trim();
  var msg = document.getElementById("cfMsg").value.trim();
  var status = document.getElementById("formStatus");
  if(!name || !email || !msg){
    status.textContent = "Please fill in your name, email and message first.";
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    status.textContent = "That email address doesn't look quite right — please check it.";
    return;
  }
  status.innerHTML = "Thanks, " + name.split(" ")[0] + "! This form isn't wired to a backend yet, so nothing was sent. " +
    "The fastest way to reach Moosa is <a href=\"mailto:moosashahzain6@gmail.com\">email</a> or " +
    "<a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">WhatsApp</a>.";
  blip(700);
});
})();
