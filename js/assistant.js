/* Moosa's website assistant — scripted FAQ bot (answers from his real profile info) */
(function(){
"use strict";
var $ = function(s, c){ return (c||document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); };
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

var KB = [
  { k: ["who is moosa", "about moosa", "about you", "yourself", "introduce"],
    r: "Moosa Shahzain is a first-year <b>ICS student at HITEC College</b> (Wah Cantt / Taxila, Pakistan) who loves programming, electronics and building digital projects. His motto: <i>Learn. Experiment. Build. Innovate.</i> 🚀" },
  { k: ["education", "college", "study", "school", "matric", "degree", "qualification"],
    r: "🎓 <b>ICS</b> (1st year) at HITEC College, Wah Cantt / Taxila.<br>📜 <b>Matric — FBISE:</b> 833/1100 (75.73%)." },
  { k: ["skill", "learn", "know", "expert", "language", "programming"],
    r: "💻 <b>Practicing:</b> HTML, CSS, AI tools, Canva, video editing, content writing, SMM, Arduino & electronics.<br>📚 <b>Learning:</b> JavaScript, Python, 2D/3D animation, ESP32/ESP8266.<br>Full list on the <a href=\"skills.html\">Skills page</a>." },
  { k: ["project", "build", "arduino", "esp32", "esp8266", "robot", "car", "chatbot", "made"],
    r: "🔌 <b>Arduino Robotic Car</b> — obstacle avoidance, Bluetooth control, line following.<br>💬 <b>ESP32 Chatbot</b> — hardware + chatbot experiment.<br>📶 <b>ESP8266 Wi-Fi experiment</b> — responsible wireless learning.<br>Details on the <a href=\"projects.html\">Projects page</a>." },
  { k: ["certificate", "course", "certification", "training", "diploma"],
    r: "🏅 13 courses: Content Writing, 2D & 3D Animation, Canva, English Speaking (×2), Social Media Marketing, AI Course, AutoCAD Civil, Data Entry, Graphic Designing, Video Editing, Amazon 3-in-1.<br>See the <a href=\"certificates.html\">Certificates page</a>." },
  { k: ["business", "smm", "panel", "platform", "service", "digital"],
    r: "📈 Moosa works with SMM platforms like <b>PakFollowers</b> and <b>SastaSMM Pak</b> (plus 5+ more) — social media marketing & digital services.<br>More on the <a href=\"business.html\">Business page</a>." },
  { k: ["hire", "work with", "freelance", "job", "collaborat", "offer"],
    r: "Moosa is a student building his skills step by step. For collaboration or digital services, message him on <a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">WhatsApp</a> — he replies personally! 💬" },
  { k: ["contact", "email", "phone", "number", "whatsapp", "reach", "talk", "message"],
    r: "📞 <b>WhatsApp:</b> <a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">+92 303 3837777</a><br>✉️ <b>Email:</b> <a href=\"mailto:moosashahzain6@gmail.com\">moosashahzain6@gmail.com</a><br>Or use the <a href=\"contact.html\">contact form</a> — it delivers straight to his inbox! ✅" },
  { k: ["where", "location", "live", "from", "city", "country", "pakistan"],
    r: "📍 Wah Cantt / Taxila, Pakistan." },
  { k: ["age", "old"],
    r: "He's a first-year ICS (intermediate) student — young and early in his journey, which is exactly why this portfolio is about learning in public! 🌱" },
  { k: ["hello", "hi", "salam", "assalam", "hey", "aoa"],
    r: "Assalam o Alaikum! 👋 Great to see you here. Ask me about Moosa's <b>skills</b>, <b>projects</b>, <b>education</b> or <b>contact</b> info!" },
  { k: ["thank", "shukriya", "great", "nice", "awesome", "good"],
    r: "You're welcome! 😊 Anything else you'd like to know about Moosa?" },
  { k: ["price", "cost", "charge", "fee", "rate"],
    r: "For pricing on digital services, please message Moosa directly on <a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">WhatsApp</a> — he'll discuss it personally." },
];

var DEFAULTS = [
  "I can answer questions about Moosa's <b>background</b>, <b>skills</b>, <b>projects</b>, <b>certificates</b> and <b>contact</b> info. For anything else, <a href=\"https://wa.me/923033837777\" target=\"_blank\" rel=\"noopener\">WhatsApp him directly</a> — he replies personally! 💬",
  "Hmm, that's outside my little brain! 🧠 Try asking about his <b>skills</b>, <b>projects</b> or <b>education</b> — or contact him on <a href=\"contact.html\">this page</a>."
];

function findReply(text){
  var t = " " + text.toLowerCase() + " ";
  var best = null, bestScore = 0;
  KB.forEach(function(entry){
    var score = 0;
    entry.k.forEach(function(k){ if(t.indexOf(k) !== -1) score += k.length; });
    if(score > bestScore){ bestScore = score; best = entry; }
  });
  return best ? best.r : DEFAULTS[Math.floor(Math.random() * DEFAULTS.length)];
}

var launcher = $("#chatLauncher"), panel = $("#chatPanel"), closeBtn = $("#chatClose"),
    msgs = $("#chatMsgs"), form = $("#chatForm"), input = $("#chatInput");

function togglePanel(open){
  var willOpen = (typeof open === "boolean") ? open : panel.hidden;
  panel.hidden = !willOpen;
  launcher.setAttribute("aria-expanded", willOpen ? "true" : "false");
  if(willOpen){ setTimeout(function(){ input.focus(); }, 350); if(window.sfx) sfx("pop"); }
}
launcher.addEventListener("click", function(){ togglePanel(); });
closeBtn.addEventListener("click", function(){ togglePanel(false); });

function scrollDown(){ msgs.scrollTop = msgs.scrollHeight; }
function addMsg(html, who){
  var d = document.createElement("div");
  d.className = "msg msg-" + who;
  d.innerHTML = html;
  msgs.appendChild(d);
  scrollDown();
  return d;
}
function botSay(html){
  var typing = addMsg('<span class="tdot"></span><span class="tdot"></span><span class="tdot"></span>', "bot typing");
  setTimeout(function(){
    typing.classList.remove("typing");
    typing.innerHTML = html;
    scrollDown();
    if(window.sfx) sfx("click");
  }, reduced ? 60 : 500 + Math.random() * 500);
}

var greeted = false;
launcher.addEventListener("click", function(){
  if(!greeted && !panel.hidden){
    greeted = true;
    setTimeout(function(){ botSay("Assalam o Alaikum! 👋 I'm <b>Moosa's assistant</b> — I answer from his profile info. Ask me about his <b>skills</b>, <b>projects</b>, or how to <b>contact</b> him!"); }, 400);
  }
}, { once: false });

$$(".chat-chip").forEach(function(chip){
  chip.addEventListener("click", function(){
    addMsg(chip.textContent, "user");
    botSay(findReply(chip.textContent));
  });
});

form.addEventListener("submit", function(e){
  e.preventDefault();
  var v = input.value.trim();
  if(!v) return;
  input.value = "";
  addMsg(v.replace(/</g, "&lt;"), "user");
  botSay(findReply(v));
});
})();
