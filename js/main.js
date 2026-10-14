/* Moosa Shahzain Portfolio — interactions (multi-page) */
(function(){
"use strict";
var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var isTouch = window.matchMedia("(pointer: coarse)").matches;
var $ = function(s, c){ return (c||document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); };

/* ---------- Page wipe transition ---------- */
var wipe = $("#page-wipe");
function wipeOut(cb){
  if(prefersReduced || !wipe){ cb(); return; }
  wipe.classList.add("wipe-in");
  setTimeout(cb, 480);
}
window.addEventListener("load", function(){
  setTimeout(function(){ $("#loader").classList.add("done"); }, 300);
  if(wipe && !prefersReduced){
    wipe.classList.add("wipe-out");
    setTimeout(function(){ wipe.classList.remove("wipe-out"); }, 900);
  }
});
setTimeout(function(){ $("#loader").classList.add("done"); }, 3500);
$$('a[href$=".html"]').forEach(function(a){
  var href = a.getAttribute("href");
  if(href.charAt(0) === "#") return;
  a.addEventListener("click", function(e){
    if(e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    sfx("whoosh");
    wipeOut(function(){ window.location.href = href; });
  });
});

/* ---------- Footer year ---------- */
$("#year").textContent = new Date().getFullYear();

/* ---------- Mobile nav ---------- */
var navToggle = $("#navToggle"), navLinks = $("#navLinks");
navToggle.addEventListener("click", function(){
  var open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  sfx("click");
});
$$("#navLinks a").forEach(function(a){
  a.addEventListener("click", function(){ navLinks.classList.remove("open"); navToggle.setAttribute("aria-expanded","false"); });
});

/* ---------- Theme ---------- */
var themeBtn = $("#themeToggle");
function applyTheme(t){
  document.documentElement.setAttribute("data-theme", t);
  try{ localStorage.setItem("ms-theme", t); }catch(e){}
  themeBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
  themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
}
var savedTheme = null;
try{ savedTheme = localStorage.getItem("ms-theme"); }catch(e){}
if(savedTheme) applyTheme(savedTheme);
themeBtn.addEventListener("click", function(){
  applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  sfx("toggle");
});

/* ---------- Sound kit (OFF by default) ---------- */
var soundOn = false, audioCtx = null;
var soundBtn = $("#soundToggle");
function tone(freq, dur, type, vol, when){
  var t = audioCtx.currentTime + (when || 0);
  var o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type || "sine"; o.frequency.value = freq;
  g.gain.setValueAtTime(vol || 0.05, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.15));
  o.connect(g); g.connect(audioCtx.destination);
  o.start(t); o.stop(t + (dur || 0.15) + 0.02);
}
function sfx(name){
  if(!soundOn) return;
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if(audioCtx.state === "suspended") audioCtx.resume();
    if(name === "click") tone(520, 0.12);
    else if(name === "toggle"){ tone(440, 0.1); tone(660, 0.12, "sine", 0.05, 0.09); }
    else if(name === "pop"){ tone(300, 0.1, "triangle", 0.06); tone(600, 0.14, "triangle", 0.05, 0.07); }
    else if(name === "chime"){ tone(523, 0.16); tone(659, 0.16, "sine", 0.05, 0.12); tone(784, 0.22, "sine", 0.05, 0.24); }
    else if(name === "whoosh"){
      var t = audioCtx.currentTime, o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(880, t + 0.28);
      g.gain.setValueAtTime(0.04, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g); g.connect(audioCtx.destination); o.start(t); o.stop(t + 0.32);
    }
  }catch(e){}
}
soundBtn.addEventListener("click", function(){
  soundOn = !soundOn;
  soundBtn.setAttribute("aria-pressed", soundOn ? "true" : "false");
  soundBtn.setAttribute("aria-label", soundOn ? "Toggle interface sounds (currently on)" : "Toggle interface sounds (currently off)");
  sfx("toggle");
});
$$(".btn").forEach(function(el){ el.addEventListener("click", function(){ sfx("click"); }); });

/* ---------- Typewriter ---------- */
var tw = $("#typewriter");
if(tw && !prefersReduced){
  var text = tw.getAttribute("data-text"), i = 0;
  setTimeout(function(){
    (function tick(){
      if(i <= text.length){ tw.textContent = text.slice(0, i++); setTimeout(tick, 45); }
    })();
  }, 700);
}else if(tw){ tw.textContent = tw.getAttribute("data-text"); }

/* ---------- Scroll reveal ---------- */
var revealEls = $$(".reveal");
if("IntersectionObserver" in window && !prefersReduced){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  }, {threshold: 0.1});
  revealEls.forEach(function(el){ io.observe(el); });
}else{ revealEls.forEach(function(el){ el.classList.add("in"); }); }

/* ---------- Active nav + back-to-top ---------- */
var backTop = $("#backTop");
window.addEventListener("scroll", function(){
  backTop.classList.toggle("show", window.scrollY > 600);
}, {passive:true});
backTop.addEventListener("click", function(){
  window.scrollTo({top:0, behavior: prefersReduced ? "auto" : "smooth"});
  sfx("click");
});

/* ---------- 3D tilt ---------- */
if(!isTouch && !prefersReduced){
  $$(".tilt").forEach(function(card){
    var raf = null;
    card.addEventListener("pointermove", function(e){
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left)/r.width - .5, py = (e.clientY - r.top)/r.height - .5;
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function(){
        card.style.transform = "perspective(900px) rotateY("+(px*10).toFixed(2)+"deg) rotateX("+(-py*10).toFixed(2)+"deg) translateY(-4px)";
      });
    });
    card.addEventListener("pointerleave", function(){ if(raf) cancelAnimationFrame(raf); card.style.transform = ""; });
  });
  var scene = $("#avatarScene"), tilt = $("#avatarTilt");
  if(scene && tilt){
    scene.addEventListener("pointermove", function(e){
      var r = scene.getBoundingClientRect();
      var px = (e.clientX - r.left)/r.width - .5, py = (e.clientY - r.top)/r.height - .5;
      tilt.style.transform = "perspective(1100px) rotateY("+(px*14).toFixed(2)+"deg) rotateX("+(-py*14).toFixed(2)+"deg)";
    });
    scene.addEventListener("pointerleave", function(){ tilt.style.transform = ""; });
  }
  /* magnetic buttons */
  $$(".magnetic").forEach(function(btn){
    btn.addEventListener("pointermove", function(e){
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width/2) * 0.18, y = (e.clientY - r.top - r.height/2) * 0.28;
      btn.style.transform = "translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px)";
    });
    btn.addEventListener("pointerleave", function(){ btn.style.transform = ""; });
  });
  /* spotlight cards */
  $$(".spotlight").forEach(function(card){
    card.addEventListener("pointermove", function(e){
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
}

/* ---------- Canvas particle background ---------- */
(function(){
  if(prefersReduced) return;
  var cv = $("#bg-canvas"); if(!cv) return;
  var ctx = cv.getContext("2d"), W, H, parts = [], mouse = {x:-9999, y:-9999};
  var COUNT = isTouch ? 36 : 64;
  function resize(){ W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); window.addEventListener("resize", resize);
  window.addEventListener("pointermove", function(e){ mouse.x = e.clientX; mouse.y = e.clientY; }, {passive:true});
  function dark(){ return document.documentElement.getAttribute("data-theme") === "dark"; }
  for(var i=0;i<COUNT;i++) parts.push({x:Math.random()*innerWidth, y:Math.random()*innerHeight, z:0.3+Math.random()*0.7, vx:(Math.random()-.5)*0.35, vy:(Math.random()-.5)*0.35, r:1.2+Math.random()*2.2});
  var hues = [174, 199, 262, 38];
  (function frame(){
    ctx.clearRect(0,0,W,H);
    var dk = dark(), i, p;
    for(i=0;i<parts.length;i++){
      p = parts[i]; p.x += p.vx*p.z; p.y += p.vy*p.z;
      var dx = (mouse.x - W/2)*0.02*p.z, dy = (mouse.y - H/2)*0.02*p.z;
      if(p.x < -20) p.x = W+20; if(p.x > W+20) p.x = -20;
      if(p.y < -20) p.y = H+20; if(p.y > H+20) p.y = -20;
      ctx.beginPath(); ctx.arc(p.x+dx, p.y+dy, p.r*p.z, 0, 6.283);
      ctx.fillStyle = "hsla("+hues[i%hues.length]+",80%,"+(dk?60:45)+"%, "+(0.25+p.z*0.4)+")";
      ctx.fill();
    }
    for(var a=0;a<parts.length;a++) for(var b=a+1;b<parts.length;b++){
      var pa = parts[a], pb = parts[b], ddx = pa.x-pb.x, ddy = pa.y-pb.y, d = Math.sqrt(ddx*ddx+ddy*ddy);
      if(d < 130){ ctx.beginPath(); ctx.moveTo(pa.x,pa.y); ctx.lineTo(pb.x,pb.y);
        ctx.strokeStyle = dk ? "rgba(94,234,212,"+(0.10*(1-d/130))+")" : "rgba(13,148,136,"+(0.12*(1-d/130))+")";
        ctx.lineWidth = 1; ctx.stroke(); }
    }
    requestAnimationFrame(frame);
  })();
})();

/* ---------- Before / after slider ---------- */
(function(){
  var wrap = $("#compare"); if(!wrap) return;
  var before = $("#compareBefore"), range = $("#compareRange"), handle = $("#compareHandle");
  function setPos(v){
    v = Math.max(0, Math.min(100, v));
    wrap.style.setProperty("--pos", v + "%");
    handle.style.left = v + "%";
    if(range.value != v) range.value = v;
  }
  range.addEventListener("input", function(){ setPos(parseFloat(range.value)); });
  var dragging = false;
  function posFromEvent(e){
    var r = wrap.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    return (x / r.width) * 100;
  }
  wrap.addEventListener("pointerdown", function(e){ dragging = true; setPos(posFromEvent(e)); wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", function(e){ if(dragging) setPos(posFromEvent(e)); });
  wrap.addEventListener("pointerup", function(){ dragging = false; });
  // gentle intro animation
  if(!prefersReduced){
    var v = 50, dir = 1, t0 = null;
    setTimeout(function(){
      function anim(t){
        if(!t0) t0 = t;
        var el = (t - t0) / 1600;
        if(el < 1 && !dragging){ setPos(50 + Math.sin(el * Math.PI * 2) * 18 * (1 - el)); requestAnimationFrame(anim); }
        else setPos(50);
      }
      requestAnimationFrame(anim);
    }, 900);
  } else setPos(50);
})();

/* ---------- Shared image sources (data-copyfrom) ---------- */
$$("img[data-copyfrom]").forEach(function(img){
  var src = document.getElementById(img.getAttribute("data-copyfrom"));
  if(src && src.src) img.src = src.src;
});

/* ---------- Project modal ---------- */
var modal = $("#projectModal");
if(modal){
  var modalTitle = $("#modalTitle"), modalBody = $("#modalBody"), modalClose = $("#modalClose");
  var projectInfo = {
    "Arduino Robotic Car": "A completed Arduino-based robotic car featuring obstacle avoidance, Bluetooth control and line following. Built as a hands-on electronics learning project. Real photos and a demo video will be added here soon.",
    "ESP32-Based Chatbot": "A completed experimental project combining an ESP32 microcontroller with chatbot functionality. Built to learn — exact features and components are being documented and will appear here soon.",
    "ESP8266 Mini Wi-Fi Experiment": "A wireless-networking learning experiment on the ESP8266 Mini, done on my own devices and networks only. This is about understanding how Wi-Fi works and responsible security research — only authorized, safe demonstrations."
  };
  $$(".explore-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      var name = btn.getAttribute("data-project");
      modalTitle.textContent = name;
      modalBody.textContent = projectInfo[name] || "Details coming soon.";
      modal.hidden = false; document.body.style.overflow = "hidden";
      modalClose.focus(); sfx("pop");
    });
  });
  function closeModal(){ modal.hidden = true; document.body.style.overflow = ""; }
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function(e){ if(e.target === modal) closeModal(); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape" && !modal.hidden) closeModal(); });
}

/* ---------- Contact form (Web3Forms backend — free) ---------- */
var WEB3FORMS_KEY = "PASTE_YOUR_KEY_HERE"; // ← Moosa's free key from web3forms.com goes here
var form = $("#contactForm");
if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var name = $("#cfName").value.trim(), email = $("#cfEmail").value.trim(), msg = $("#cfMsg").value.trim();
    var status = $("#formStatus");
    if(!name || !email || !msg){ status.textContent = "Please fill in your name, email and message first."; return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ status.textContent = "That email address doesn't look quite right — please check it."; return; }
    if(WEB3FORMS_KEY === "PASTE_YOUR_KEY_HERE"){
      status.innerHTML = "Thanks, " + name.split(" ")[0] + "! This form isn't wired to a backend yet, so nothing was sent. " +
        "The fastest way to reach Moosa is <a href=\"mailto:moosashahzain6@gmail.com\">email</a> or " +
        "<a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">WhatsApp</a>.";
      return;
    }
    status.textContent = "Sending…";
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: name, email: email, message: msg,
        subject: "Portfolio message from " + name,
        from_name: "Moosa's Portfolio",
        botcheck: false
      })
    }).then(function(r){ return r.json(); }).then(function(data){
      btn.disabled = false;
      if(data.success){
        status.textContent = "Message sent! Moosa will get back to you soon. ✅";
        form.reset(); sfx("chime");
      }else{
        status.innerHTML = "Couldn't send just now — please use <a href=\"mailto:moosashahzain6@gmail.com\">email</a> or <a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">WhatsApp</a> instead.";
      }
    }).catch(function(){
      btn.disabled = false;
      status.innerHTML = "Couldn't send just now — please use <a href=\"mailto:moosashahzain6@gmail.com\">email</a> or <a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">WhatsApp</a> instead.";
    });
  });
}
})();
