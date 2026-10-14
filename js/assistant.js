/* Moosa's website assistant — trilingual scripted FAQ bot (answers from his real profile info) */
(function(){
"use strict";
var $ = function(s, c){ return (c||document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); };
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Language: explicit choice, else auto-detect ---------- */
var userLang = null; // 'en' | 'ru' (Roman Urdu) | 'ur' (Urdu script)

var RU_WORDS = ("kaise kese kesy kya kia kon kis kisne kab kahan kaha kidhar tum tumhara tumhari tumhare " +
"aap apka apki apke aapka aapki aapke hai hain ho tha thi the hoga hogi batao btao btaye btaen bataiye " +
"bataein chahiye chahye mujhe mujhy meri mere mera apna apni apne karta karti karte krta krti krty " +
"rehta rehti rehtay wala wali walay wale bare baray mein mai se ka ki ko ke ne par aur nahi nahin nhi " +
"kyun kyu kyon kitna kitne kitni kaun koun poochna pooch sawal jawab acha acha theek zabardast bohat bahut " +
"bhi bhe ye wo woh uska uski uske iska iski iske karke kar liye sath tarah jaise abhi jald wahan yahan " +
"shuru khatam kaam paisa paisay waqt din raat ghar dost bhai behan ami abu walid").split(" ");

function detectLang(text){
  if(userLang) return userLang;
  if(/[\u0600-\u06FF]/.test(text)) return "ur";
  var toks = text.toLowerCase().split(/[^a-z0-9]+/);
  for(var i = 0; i < toks.length; i++){
    if(RU_WORDS.indexOf(toks[i]) !== -1) return "ru";
  }
  return "en";
}

/* ---------- Knowledge base: detailed answers in 3 languages ---------- */
var WA = '<a href="https://wa.me/923033837777" target="_blank" rel="noopener">WhatsApp</a>';

var KB = [
{ k: ["who is moosa","about moosa","moosa kon","introduce","yourself","biography","profile","who's moosa","moosa shahzain kon","\u0645\u0648\u0633\u06cc"],
  r: {
  en: 'Moosa Shahzain is a first-year <b>ICS student at HITEC College</b> (Wah Cantt / Taxila, Pakistan) who loves programming, electronics and digital business. His motto: <i>Learn. Experiment. Build. Innovate.</i> He is learning in public — this whole website documents his journey. More on the <a href="about.html">About page</a>.',
  ru: 'Moosa Shahzain <b>HITEC College</b> (Wah Cantt / Taxila) me <b>ICS first year</b> ka student hai. Use programming, electronics aur digital business ka shoq hai. Uska motto: <i>Learn. Experiment. Build. Innovate.</i> Ye poori website uske safar ki kahani hai — <a href="about.html">About page</a> dekho.',
  ur: '\u0645\u0648\u0633\u06cc\u0670 \u0634\u0627\u06c1\u0632\u06cc\u0646 <b>\u06c1\u0627\u0626\u06cc \u0679\u06cc\u06a9 \u06a9\u0627\u0644\u062c</b> (\u0648\u0627\u06c1 \u06a9\u06cc\u0646\u0679 / \u0679\u06cc\u06a9\u0633\u0644\u0627) \u0645\u06cc\u06ba <b>ICS \u0641\u0631\u0633\u0679 \u0627\u06cc\u0626\u0631</b> \u06a9\u0627 \u0637\u0627\u0644\u0628 \u0639\u0644\u0645 \u06c1\u06d2\u06d4 \u0627\u0633\u06d2 \u067e\u0631\u0648\u06af\u0631\u0627\u0645\u0646\u06af\u060c \u0627\u0644\u06cc\u06a9\u0679\u0631\u0627\u0646\u06a9\u0633 \u0627\u0648\u0631 \u0688\u06cc\u062c\u06cc\u0679\u0644 \u0628\u0632\u0646\u0633 \u06a9\u0627 \u0634\u0648\u0642 \u06c1\u06d2\u06d4 \u0627\u0633 \u06a9\u0627 \u0627\u0635\u0648\u0644: <i>Learn. Experiment. Build. Innovate.</i> \u06cc\u06c1 \u067e\u0648\u0631\u06cc \u0648\u06cc\u0628 \u0633\u0627\u0626\u0679 \u0627\u0633 \u06a9\u06d2 \u0633\u0641\u0631 \u06a9\u06cc \u06a9\u06c1\u0627\u0646\u06cc \u06c1\u06d2 — <a href="about.html">About page</a> \u062f\u06cc\u06a9\u06be\u06cc\u06ba\u06d4' } },

{ k: ["your name","tumhara naam","tum kon","who are you","assistant","robot","bot","\u0622\u067e \u06a9\u0627 \u0646\u0627\u0645"],
  r: {
  en: 'I\'m <b>Moosa\'s assistant</b> — a little helper living on his website. I answer from his real profile info, in <b>English</b>, <b>\u0627\u0631\u062f\u0648</b> or <b>Roman Urdu</b>. I can\'t chat like a human, but ask me anything about Moosa! \u{1F4AC}',
  ru: 'Me <b>Moosa ka assistant</b> hoon — uski website par rehne wala chhota helper. Me uski real profile info se jawab deta hoon — <b>English</b>, <b>\u0627\u0631\u062f\u0648</b> ya <b>Roman Urdu</b> me. Insano jaisi gap shap nahi kar sakta, lekin Moosa ke baare me kuch bhi poocho! \u{1F4AC}',
  ur: '\u0645\u06cc\u06ba <b>\u0645\u0648\u0633\u06cc\u0670 \u06a9\u0627 \u0627\u0633\u0633\u0679\u0646\u0679</b> \u06c1\u0648\u06ba — \u0627\u0633 \u06a9\u06cc \u0648\u06cc\u0628 \u0633\u0627\u0626\u0679 \u067e\u0631 \u0631\u06c1\u0646\u06d2 \u0648\u0627\u0644\u0627 \u0686\u06be\u0648\u0679\u0627 \u0645\u062f\u062f\u06af\u0627\u0631\u06d4 \u0645\u06cc\u06ba \u0627\u0633 \u06a9\u06cc \u0627\u0635\u0644 \u067e\u0631\u0648\u0641\u0627\u0626\u0644 \u0633\u06d2 \u062c\u0648\u0627\u0628 \u062f\u06cc\u062a\u0627 \u06c1\u0648\u06ba — <b>English</b>\u060c <b>\u0627\u0631\u062f\u0648</b> \u06cc\u0627 <b>Roman Urdu</b> \u0645\u06cc\u06ba\u06d4 \u0645\u0648\u0633\u06cc\u0670 \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba \u06a9\u0686\u06be \u0628\u06be\u06cc \u067e\u0648\u0686\u06be\u06cc\u06ba! \u{1F4AC}' } },

{ k: ["education","college","study","school","matric","degree","qualification","parhai","taleem","student","\u062a\u0639\u0644\u06cc\u0645","\u06a9\u0627\u0644\u062c","\u0645\u06cc\u0679\u0631\u06a9"],
  r: {
  en: '\u{1F393} <b>ICS (1st year)</b> at HITEC College, Wah Cantt / Taxila, Pakistan.<br>\u{1F4DC} <b>Matric (FBISE):</b> 833/1100 \u2014 75.73%.<br>Alongside studies he is building practical skills: programming, electronics, AI tools and digital business.',
  ru: '\u{1F393} <b>HITEC College</b> Wah Cantt / Taxila me <b>ICS first year</b>.<br>\u{1F4DC} <b>Matric (FBISE):</b> 833/1100 \u2014 75.73%.<br>Parhai ke sath practical skills bhi: programming, electronics, AI tools aur digital business.',
  ur: '\u{1F393} <b>\u06c1\u0627\u0626\u06cc \u0679\u06cc\u06a9 \u06a9\u0627\u0644\u062c</b> \u0648\u0627\u06c1 \u06a9\u06cc\u0646\u0679 / \u0679\u06cc\u06a9\u0633\u0644\u0627 \u0645\u06cc\u06ba <b>ICS \u0641\u0631\u0633\u0679 \u0627\u06cc\u0626\u0631</b>\u06d4<br>\u{1F4DC} <b>\u0645\u06cc\u0679\u0631\u06a9 (FBISE):</b> 833/1100 \u2014 75.73%\u06d4<br>\u067e\u0691\u06be\u0627\u0626\u06cc \u06a9\u06d2 \u0633\u0627\u062a\u06be \u0639\u0645\u0644\u06cc \u0645\u06c1\u0627\u0631\u062a\u06cc\u06ba \u0628\u06be\u06cc: \u067e\u0631\u0648\u06af\u0631\u0627\u0645\u0646\u06af\u060c \u0627\u0644\u06cc\u06a9\u0679\u0631\u0627\u0646\u06a9\u0633\u060c AI \u0679\u0648\u0644\u0632 \u0627\u0648\u0631 \u0688\u06cc\u062c\u06cc\u0679\u0644 \u0628\u0632\u0646\u0633\u06d4' } },

{ k: ["skill","maharat","hunar","\u0645\u06c1\u0627\u0631\u062a","talent","expertise"],
  r: {
  en: '\u{1F4BB} <b>Practicing now:</b> HTML, CSS, AI tools, Canva & graphic design, video editing, content writing, social media marketing, Arduino & electronics.<br>\u{1F4DA} <b>Learning:</b> JavaScript, Python, 2D/3D animation, ESP32/ESP8266.<br>Full journey on the <a href="skills.html">Skills page</a>.',
  ru: '\u{1F4BB} <b>Abhi practice me:</b> HTML, CSS, AI tools, Canva & graphic designing, video editing, content writing, social media marketing, Arduino & electronics.<br>\u{1F4DA} <b>Seekh raha hai:</b> JavaScript, Python, 2D/3D animation, ESP32/ESP8266.<br>Poori detail <a href="skills.html">Skills page</a> par.',
  ur: '\u{1F4BB} <b>\u0645\u0648\u062c\u0648\u062f\u06c1 \u0645\u06c1\u0627\u0631\u062a\u06cc\u06ba:</b> HTML\u060c CSS\u060c AI \u0679\u0648\u0644\u0632\u060c Canva \u0627\u0648\u0631 \u06af\u0631\u0627\u0641\u06a9 \u0688\u06cc\u0632\u0627\u0626\u0646\u0646\u06af\u060c \u0648\u06cc\u0688\u06cc\u0648 \u0627\u06cc\u0688\u06cc\u0679\u0646\u06af\u060c \u06a9\u0627\u0646\u0679\u06cc\u0646\u0679 \u0631\u0627\u0626\u0679\u0646\u06af\u060c \u0633\u0648\u0634\u0644 \u0645\u06cc\u0688\u06cc\u0627 \u0645\u0627\u0631\u06a9\u06cc\u0679\u0646\u06af\u060c Arduino \u0627\u0648\u0631 \u0627\u0644\u06cc\u06a9\u0679\u0631\u0627\u0646\u06a9\u0633\u06d4<br>\u{1F4DA} <b>\u0633\u06cc\u06a9\u06be \u0631\u06c1\u0627 \u06c1\u06d2:</b> JavaScript\u060c Python\u060c 2D/3D \u0627\u06cc\u0646\u06cc\u0645\u06cc\u0634\u0646\u060c ESP32/ESP8266\u06d4<br>\u0645\u06a9\u0645\u0644 \u062a\u0641\u0635\u06cc\u0644 <a href="skills.html">Skills page</a> \u067e\u0631\u06d4' } },

{ k: ["programming","coding","code","html","css","javascript","python","programmer","developer","\u067e\u0631\u0648\u06af\u0631\u0627\u0645\u0646\u06af","coding seekhna"],
  r: {
  en: '\u2328\uFE0F Moosa is <b>practicing HTML & CSS</b> (this very website is hand-built with them!) and <b>learning JavaScript and Python</b>. He learns by building real things, not just watching tutorials.',
  ru: '\u2328\uFE0F Moosa <b>HTML & CSS ki practice</b> kar raha hai (ye website bhi usi se bani hai!) aur <b>JavaScript aur Python seekh raha hai</b>. Wo sirf videos nahi dekhta \u2014 real cheezen bana kar seekhta hai.',
  ur: '\u2328\uFE0F \u0645\u0648\u0633\u06cc\u0670 <b>HTML \u0627\u0648\u0631 CSS \u06a9\u06cc \u067e\u0631\u06cc\u06a9\u0679\u0633</b> \u06a9\u0631 \u0631\u06c1\u0627 \u06c1\u06d2 (\u06cc\u06c1 \u0648\u06cc\u0628 \u0633\u0627\u0626\u0679 \u0628\u06be\u06cc \u0627\u0633\u06cc \u0633\u06d2 \u0628\u0646\u06cc \u06c1\u06d2!) \u0627\u0648\u0631 <b>JavaScript \u0627\u0648\u0631 Python \u0633\u06cc\u06a9\u06be \u0631\u06c1\u0627 \u06c1\u06d2</b>\u06d4 \u0648\u06c1 \u0635\u0631\u0641 \u0648\u06cc\u0688\u06cc\u0648\u0632 \u0646\u06c1\u06cc\u06ba \u062f\u06cc\u06a9\u06be\u062a\u0627 \u2014 \u0639\u0645\u0644\u06cc \u0686\u06cc\u0632\u06cc\u06ba \u0628\u0646\u0627 \u06a9\u0631 \u0633\u06cc\u06a9\u06be\u062a\u0627 \u06c1\u06d2\u06d4' } },

{ k: ["ai","artificial intelligence","chatgpt","ai tools","\u0630\u06c1\u0627\u0646\u062a"],
  r: {
  en: '\u{1F916} Moosa actively uses <b>AI tools</b> for learning, content creation and productivity \u2014 and he has completed an <b>AI course</b> (see Certificates). He experiments with AI the same way he experiments with hardware: hands-on.',
  ru: '\u{1F916} Moosa <b>AI tools</b> ko learning, content aur productivity ke liye use karta hai \u2014 aur <b>AI ka course</b> bhi complete kiya hai. Hardware ki tarah AI ke sath bhi hands-on experiments karta hai.',
  ur: '\u{1F916} \u0645\u0648\u0633\u06cc\u0670 <b>AI \u0679\u0648\u0644\u0632</b> \u06a9\u0648 \u0633\u06cc\u06a9\u06be\u0646\u06d2\u060c \u06a9\u0627\u0646\u0679\u06cc\u0646\u0679 \u0627\u0648\u0631 \u067e\u06cc\u062f\u0627\u0648\u0627\u0631\u06cc \u06a9\u0627\u0645\u0648\u06ba \u06a9\u06d2 \u0644\u06cc\u06d2 \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u0631\u062a\u0627 \u06c1\u06d2 \u2014 \u0627\u0648\u0631 <b>AI \u06a9\u0627 \u06a9\u0648\u0631\u0633</b> \u0628\u06be\u06cc \u0645\u06a9\u0645\u0644 \u06a9\u06cc\u0627 \u06c1\u06d2\u06d4 \u06c1\u0627\u0631\u0688\u0648\u06cc\u0626\u0631 \u06a9\u06cc \u0637\u0631\u062d AI \u06a9\u06d2 \u0633\u0627\u062a\u06be \u0628\u06be\u06cc \u0639\u0645\u0644\u06cc \u062a\u062c\u0631\u0628\u0627\u062a \u06a9\u0631\u062a\u0627 \u06c1\u06d2\u06d4' } },

{ k: ["video edit","editing","premiere","capcut","\u0648\u06cc\u0688\u06cc\u0648"],
  r: {
  en: '\u{1F3AC} Moosa does <b>video editing</b> and runs a YouTube channel (<a href="https://youtube.com/@islami_vedios_1" target="_blank" rel="noopener">@islami_vedios_1</a>). He has also completed a video editing course.',
  ru: '\u{1F3AC} Moosa <b>video editing</b> karta hai aur uska YouTube channel hai (<a href="https://youtube.com/@islami_vedios_1" target="_blank" rel="noopener">@islami_vedios_1</a>). Video editing ka course bhi complete kiya hai.',
  ur: '\u{1F3AC} \u0645\u0648\u0633\u06cc\u0670 <b>\u0648\u06cc\u0688\u06cc\u0648 \u0627\u06cc\u0688\u06cc\u0679\u0646\u06af</b> \u06a9\u0631\u062a\u0627 \u06c1\u06d2 \u0627\u0648\u0631 \u0627\u0633 \u06a9\u0627 \u06cc\u0648\u0679\u06cc\u0648\u0628 \u0686\u06cc\u0646\u0644 \u06c1\u06d2 (<a href="https://youtube.com/@islami_vedios_1" target="_blank" rel="noopener">@islami_vedios_1</a>)\u06d4 \u0648\u06cc\u0688\u06cc\u0648 \u0627\u06cc\u0688\u06cc\u0679\u0646\u06af \u06a9\u0627 \u06a9\u0648\u0631\u0633 \u0628\u06be\u06cc \u0645\u06a9\u0645\u0644 \u06a9\u06cc\u0627 \u06c1\u06d2\u06d4' } },

{ k: ["design","graphic","canva","photoshop","logo","thumbnail","\u0688\u06cc\u0632\u0627\u0626\u0646"],
  r: {
  en: '\u{1F3A8} Moosa does <b>graphic designing</b> and <b>Canva</b> \u2014 thumbnails, posts and visuals. He has completed Canva training plus a graphic designing course.',
  ru: '\u{1F3A8} Moosa <b>graphic designing</b> aur <b>Canva</b> me kaam karta hai \u2014 thumbnails, posts aur visuals. Canva training aur graphic designing ka course complete hai.',
  ur: '\u{1F3A8} \u0645\u0648\u0633\u06cc\u0670 <b>\u06af\u0631\u0627\u0641\u06a9 \u0688\u06cc\u0632\u0627\u0626\u0646\u0646\u06af</b> \u0627\u0648\u0631 <b>Canva</b> \u0645\u06cc\u06ba \u06a9\u0627\u0645 \u06a9\u0631\u062a\u0627 \u06c1\u06d2 \u2014 \u062a\u06be\u0645\u0628 \u0646\u06cc\u0644\u0632\u060c \u067e\u0648\u0633\u0679\u0633 \u0627\u0648\u0631 \u0648\u06cc\u0698\u0648\u0644\u0632\u06d4 Canva \u06a9\u06cc \u0679\u0631\u06cc\u0646\u0646\u06af \u0627\u0648\u0631 \u06af\u0631\u0627\u0641\u06a9 \u0688\u06cc\u0632\u0627\u0626\u0646\u0646\u06af \u06a9\u0627 \u06a9\u0648\u0631\u0633 \u0645\u06a9\u0645\u0644 \u06c1\u06d2\u06d4' } },

{ k: ["content writ","writing","blog","article","\u0644\u06a9\u06be\u0646\u0627"],
  r: {
  en: '\u270D\uFE0F Moosa has completed a <b>Content Writing</b> course and writes content for digital projects and social media.',
  ru: '\u270D\uFE0F Moosa ne <b>Content Writing</b> ka course complete kiya hai aur digital projects aur social media ke liye likhta hai.',
  ur: '\u270D\uFE0F \u0645\u0648\u0633\u06cc\u0670 \u0646\u06d2 <b>\u06a9\u0627\u0646\u0679\u06cc\u0646\u0679 \u0631\u0627\u0626\u0679\u0646\u06af</b> \u06a9\u0627 \u06a9\u0648\u0631\u0633 \u0645\u06a9\u0645\u0644 \u06a9\u06cc\u0627 \u06c1\u06d2 \u0627\u0648\u0631 \u0688\u06cc\u062c\u06cc\u0679\u0644 \u067e\u0631\u0627\u062c\u06cc\u06a9\u0679\u0633 \u0627\u0648\u0631 \u0633\u0648\u0634\u0644 \u0645\u06cc\u0688\u06cc\u0627 \u06a9\u06d2 \u0644\u06cc\u06d2 \u0644\u06a9\u06be\u062a\u0627 \u06c1\u06d2\u06d4' } },

{ k: ["animation","2d","3d","animate","cartoon","\u0627\u06cc\u0646\u06cc\u0645\u06cc\u0634\u0646"],
  r: {
  en: '\u{1F39E}\uFE0F Moosa has completed courses in both <b>2D Animation</b> and <b>3D Animation</b> \u2014 another creative skill in his toolbox.',
  ru: '\u{1F39E}\uFE0F Moosa ne <b>2D Animation</b> aur <b>3D Animation</b> dono ke courses kiye hain \u2014 ek aur creative skill!',
  ur: '\u{1F39E}\uFE0F \u0645\u0648\u0633\u06cc\u0670 \u0646\u06d2 <b>2D \u0627\u06cc\u0646\u06cc\u0645\u06cc\u0634\u0646</b> \u0627\u0648\u0631 <b>3D \u0627\u06cc\u0646\u06cc\u0645\u06cc\u0634\u0646</b> \u062f\u0648\u0646\u0648\u06ba \u06a9\u06d2 \u06a9\u0648\u0631\u0633\u0632 \u06a9\u06cc\u06d2 \u06c1\u06cc\u06ba\u06d4' } },

{ k: ["smm","marketing","\u0645\u0627\u0631\u06a9\u06cc\u0679\u0646\u06af"],
  r: {
  en: '\u{1F4E3} Moosa has completed a <b>Social Media Marketing</b> course and works hands-on with SMM platforms \u2014 managing services and learning digital growth. Details on the <a href="business.html">Business page</a>.',
  ru: '\u{1F4E3} Moosa ne <b>Social Media Marketing</b> ka course kiya hai aur SMM platforms ke sath practically kaam karta hai. Detail <a href="business.html">Business page</a> par.',
  ur: '\u{1F4E3} \u0645\u0648\u0633\u06cc\u0670 \u0646\u06d2 <b>\u0633\u0648\u0634\u0644 \u0645\u06cc\u0688\u06cc\u0627 \u0645\u0627\u0631\u06a9\u06cc\u0679\u0646\u06af</b> \u06a9\u0627 \u06a9\u0648\u0631\u0633 \u06a9\u06cc\u0627 \u06c1\u06d2 \u0627\u0648\u0631 SMM \u067e\u0644\u06cc\u0679 \u0641\u0627\u0631\u0645\u0632 \u06a9\u06d2 \u0633\u0627\u062a\u06be \u0639\u0645\u0644\u06cc \u06a9\u0627\u0645 \u06a9\u0631\u062a\u0627 \u06c1\u06d2\u06d4 \u062a\u0641\u0635\u06cc\u0644 <a href="business.html">Business page</a> \u067e\u0631\u06d4' } },

{ k: ["project","arduino","robotic car","robot","sensor","bluetooth car","line follow","obstacle","\u0627\u0644\u06cc\u06a9\u0679\u0631\u0627\u0646\u06a9\u0633","hardware"],
  r: {
  en: '\u{1F50C} <b>Arduino Robotic Car</b> \u2014 his flagship hardware build:<br>\u2022 \u{1F9F1} Obstacle avoidance (ultrasonic sensor)<br>\u2022 \u{1F4F1} Bluetooth control (phone app)<br>\u2022 \u2796 Line following (IR sensors)<br>It taught him circuits, sensors and real problem-solving. Also experimenting with <b>ESP32</b> and <b>ESP8266</b>. More on the <a href="projects.html">Projects page</a>.',
  ru: '\u{1F50C} <b>Arduino Robotic Car</b> \u2014 uska sab se bara hardware project:<br>\u2022 \u{1F9F1} Rukawat se bachna (ultrasonic sensor)<br>\u2022 \u{1F4F1} Bluetooth control (mobile app se)<br>\u2022 \u2796 Line following (IR sensors)<br>Is se circuits, sensors aur problem-solving seekhi. <b>ESP32</b> aur <b>ESP8266</b> par bhi experiments. <a href="projects.html">Projects page</a> dekho.',
  ur: '\u{1F50C} <b>Arduino \u0631\u0648\u0628\u0648\u0679\u06a9 \u06a9\u0627\u0631</b> \u2014 \u0627\u0633 \u06a9\u0627 \u0633\u0628 \u0633\u06d2 \u0628\u0691\u0627 \u06c1\u0627\u0631\u0688\u0648\u06cc\u0626\u0631 \u067e\u0631\u0627\u062c\u06cc\u06a9\u0679:<br>\u2022 \u{1F9F1} \u0631\u06a9\u0627\u0648\u0679 \u0633\u06d2 \u0628\u0686\u0627\u0624 (\u0627\u0644\u0679\u0631\u0627\u0633\u0648\u0646\u06a9 \u0633\u06cc\u0646\u0633\u0631)<br>\u2022 \u{1F4F1} \u0628\u0644\u06cc\u0648\u0679\u0648\u062a\u06be \u06a9\u0646\u0679\u0631\u0648\u0644 (\u0645\u0648\u0628\u0627\u0626\u0644 \u0627\u06cc\u067e \u0633\u06d2)<br>\u2022 \u2796 \u0644\u0627\u0626\u0646 \u0641\u0627\u0644\u0648\u0648\u0646\u06af (IR \u0633\u06cc\u0646\u0633\u0631\u0632)<br>اس \u0633\u06d2 \u0633\u0631\u06a9\u0679\u0633\u060c \u0633\u06cc\u0646\u0633\u0631\u0632 \u0627\u0648\u0631 \u0645\u0633\u0626\u0644\u06c1 \u062d\u0644 \u06a9\u0631\u0646\u0627 \u0633\u06cc\u06a9\u06be\u0627\u06d4 <b>ESP32</b> \u0627\u0648\u0631 <b>ESP8266</b> \u067e\u0631 \u0628\u06be\u06cc \u062a\u062c\u0631\u0628\u0627\u062a\u06d4 <a href="projects.html">Projects page</a> \u062f\u06cc\u06a9\u06be\u06cc\u06ba\u06d4' } },

{ k: ["esp32","chatbot","\u0686\u06cc\u0679 \u0628\u0648\u0679"],
  r: {
  en: '\u{1F4AC} <b>ESP32 Chatbot experiment</b> \u2014 Moosa combined a Wi-Fi microcontroller (ESP32) with chatbot ideas, mixing hardware and software. An early experiment \u2014 details are still being documented on the <a href="projects.html">Projects page</a>.',
  ru: '\u{1F4AC} <b>ESP32 Chatbot experiment</b> \u2014 Moosa ne Wi-Fi microcontroller (ESP32) ko chatbot idea ke sath jora \u2014 hardware + software ka mix. Abhi early experiment hai.',
  ur: '\u{1F4AC} <b>ESP32 \u0686\u06cc\u0679 \u0628\u0648\u0679 \u062a\u062c\u0631\u0628\u06c1</b> \u2014 \u0645\u0648\u0633\u06cc\u0670 \u0646\u06d2 \u0648\u0627\u0626\u06cc \u0641\u0627\u0626\u06cc \u0645\u0627\u0626\u06cc\u06a9\u0631\u0648\u06a9\u0646\u0679\u0631\u0648\u0644\u0631 (ESP32) \u06a9\u0648 \u0686\u06cc\u0679 \u0628\u0648\u0679 \u0622\u0626\u06cc\u0688\u06cc\u0627 \u06a9\u06d2 \u0633\u0627\u062a\u06be \u062c\u0648\u0691\u0627 \u2014 \u06c1\u0627\u0631\u0688\u0648\u06cc\u0626\u0631 \u0627\u0648\u0631 \u0633\u0627\u0641\u0679 \u0648\u06cc\u0626\u0631 \u06a9\u0627 \u0627\u0645\u062a\u0632\u0627\u062c\u06d4 \u0627\u0628\u06be\u06cc \u0627\u0628\u062a\u062f\u0627\u0626\u06cc \u062a\u062c\u0631\u0628\u06c1 \u06c1\u06d2\u06d4' } },

{ k: ["esp8266","wifi","nodemcu","\u0648\u0627\u0626\u06cc \u0641\u0627\u0626\u06cc"],
  r: {
  en: '\u{1F4F6} <b>ESP8266 Mini Wi-Fi experiment</b> \u2014 learning the basics of wireless/IoT with this tiny low-cost Wi-Fi chip, with a responsible-use note on the <a href="projects.html">Projects page</a>.',
  ru: '\u{1F4F6} <b>ESP8266 Mini Wi-Fi experiment</b> \u2014 is chhote Wi-Fi chip se wireless/IoT ki basics seekh raha hai.',
  ur: '\u{1F4F6} <b>ESP8266 \u0645\u0646\u06cc \u0648\u0627\u0626\u06cc \u0641\u0627\u0626\u06cc \u062a\u062c\u0631\u0628\u06c1</b> \u2014 \u0627\u0633 \u0686\u06be\u0648\u0679\u06d2 \u0648\u0627\u0626\u06cc \u0641\u0627\u0626\u06cc \u0686\u067e \u0633\u06d2 \u0648\u0627\u0626\u0631\u0644\u06cc\u0633/IoT \u06a9\u06cc \u0628\u0646\u06cc\u0627\u062f\u06cc \u0628\u0627\u062a\u06cc\u06ba \u0633\u06cc\u06a9\u06be \u0631\u06c1\u0627 \u06c1\u06d2\u06d4' } },

{ k: ["certificate","course","certification","training","diploma","\u0633\u0631\u0679\u06cc\u0641\u06cc\u06a9\u06cc\u0679","\u06a9\u0648\u0631\u0633","autocad","data entry","amazon"],
  r: {
  en: '\u{1F3C5} <b>13 courses completed:</b> Content Writing, 2D Animation, 3D Animation, Canva Training, English Speaking (\u00D72), Social Media Marketing, AI Course, AutoCAD Civil, Data Entry Operator, Graphic Designing, Video Editing, Amazon 3-in-1. Scanned certificates will be added soon \u2014 see the <a href="certificates.html">Certificates page</a>.',
  ru: '\u{1F3C5} <b>13 courses complete:</b> Content Writing, 2D & 3D Animation, Canva, English Speaking (\u00D72), Social Media Marketing, AI Course, AutoCAD Civil, Data Entry, Graphic Designing, Video Editing, Amazon 3-in-1. Scans jald add honge \u2014 <a href="certificates.html">Certificates page</a> dekho.',
  ur: '\u{1F3C5} <b>13 \u06a9\u0648\u0631\u0633\u0632 \u0645\u06a9\u0645\u0644:</b> \u06a9\u0627\u0646\u0679\u06cc\u0646\u0679 \u0631\u0627\u0626\u0679\u0646\u06af\u060c 2D \u0627\u0648\u0631 3D \u0627\u06cc\u0646\u06cc\u0645\u06cc\u0634\u0646\u060c Canva\u060c \u0627\u0646\u06af\u0644\u0634 \u0627\u0633\u067e\u06cc\u06a9\u0646\u06af (\u00D72)\u060c \u0633\u0648\u0634\u0644 \u0645\u06cc\u0688\u06cc\u0627 \u0645\u0627\u0631\u06a9\u06cc\u0679\u0646\u06af\u060c AI \u06a9\u0648\u0631\u0633\u060c AutoCAD \u0633\u0648\u0644\u060c \u0688\u06cc\u0679\u0627 \u0627\u0646\u0679\u0631\u06cc\u060c \u06af\u0631\u0627\u0641\u06a9 \u0688\u06cc\u0632\u0627\u0626\u0646\u0646\u06af\u060c \u0648\u06cc\u0688\u06cc\u0648 \u0627\u06cc\u0688\u06cc\u0679\u0646\u06af\u060c Amazon 3-in-1\u06d4 \u0627\u0633\u06a9\u06cc\u0646 \u0634\u062f\u06c1 \u0633\u0631\u0679\u06cc\u0641\u06cc\u06a9\u06cc\u0679 \u062c\u0644\u062f \u0634\u0627\u0645\u0644 \u06c1\u0648\u06ba \u06af\u06d2 — <a href="certificates.html">Certificates page</a> \u062f\u06cc\u06a9\u06be\u06cc\u06ba\u06d4' } },

{ k: ["business","panel","platform","digital","\u06a9\u0627\u0631\u0648\u0628\u0627\u0631","\u0628\u0632\u0646\u0633","\u067e\u06cc\u0646\u0644","earn","earning","online kamai"],
  r: {
  en: '\u{1F4C8} Moosa works in <b>digital business & SMM</b> \u2014 hands-on with platforms like <b>PakFollowers</b> and <b>SastaSMM Pak</b> (plus 5+ more), handling social media marketing services and learning online business & digital growth. Full story on the <a href="business.html">Business page</a>.',
  ru: '\u{1F4C8} Moosa <b>digital business & SMM</b> me kaam karta hai \u2014 <b>PakFollowers</b> aur <b>SastaSMM Pak</b> jaise platforms (aur 5+ mazeed) ke sath social media marketing services, online business aur digital growth seekh raha hai. <a href="business.html">Business page</a> par poori detail.',
  ur: '\u{1F4C8} \u0645\u0648\u0633\u06cc\u0670 <b>\u0688\u06cc\u062c\u06cc\u0679\u0644 \u0628\u0632\u0646\u0633 \u0627\u0648\u0631 SMM</b> \u0645\u06cc\u06ba \u06a9\u0627\u0645 \u06a9\u0631\u062a\u0627 \u06c1\u06d2 \u2014 <b>PakFollowers</b> \u0627\u0648\u0631 <b>SastaSMM Pak</b> \u062c\u06cc\u0633\u06d2 \u067e\u0644\u06cc\u0679 \u0641\u0627\u0631\u0645\u0632 (\u0627\u0648\u0631 5+ \u0645\u0632\u06cc\u062f) \u06a9\u06d2 \u0633\u0627\u062a\u06be \u0633\u0648\u0634\u0644 \u0645\u06cc\u0688\u06cc\u0627 \u0645\u0627\u0631\u06a9\u06cc\u0679\u0646\u06af \u0633\u0631\u0648\u0633\u0632 \u0627\u0648\u0631 \u0622\u0646 \u0644\u0627\u0626\u0646 \u0628\u0632\u0646\u0633 \u0633\u06cc\u06a9\u06be \u0631\u06c1\u0627 \u06c1\u06d2\u06d4 <a href="business.html">Business page</a> \u067e\u0631 \u0645\u06a9\u0645\u0644 \u062a\u0641\u0635\u06cc\u0644\u06d4' } },

{ k: ["service","offer","provide","what can you do","\u06a9\u0627\u0645","\u0633\u0631\u0648\u0633"],
  r: {
  en: '\u{1F6E0}\uFE0F Moosa can help with: <b>social media marketing services</b>, <b>video editing</b>, <b>graphic design (Canva)</b>, <b>content writing</b> and <b>data entry</b>. Message him on ' + WA + ' to discuss your project!',
  ru: '\u{1F6E0}\uFE0F Moosa ye kaam kar sakta hai: <b>social media marketing services</b>, <b>video editing</b>, <b>graphic designing (Canva)</b>, <b>content writing</b> aur <b>data entry</b>. Project discuss karne ke liye ' + WA + ' par message karo!',
  ur: '\u{1F6E0}\uFE0F \u0645\u0648\u0633\u06cc\u0670 \u06cc\u06c1 \u06a9\u0627\u0645 \u06a9\u0631 \u0633\u06a9\u062a\u0627 \u06c1\u06d2: <b>\u0633\u0648\u0634\u0644 \u0645\u06cc\u0688\u06cc\u0627 \u0645\u0627\u0631\u06a9\u06cc\u0679\u0646\u06af \u0633\u0631\u0648\u0633\u0632</b>\u060c <b>\u0648\u06cc\u0688\u06cc\u0648 \u0627\u06cc\u0688\u06cc\u0679\u0646\u06af</b>\u060c <b>\u06af\u0631\u0627\u0641\u06a9 \u0688\u06cc\u0632\u0627\u0626\u0646\u0646\u06af (Canva)</b>\u060c <b>\u06a9\u0627\u0646\u0679\u06cc\u0646\u0679 \u0631\u0627\u0626\u0679\u0646\u06af</b> \u0627\u0648\u0631 <b>\u0688\u06cc\u0679\u0627 \u0627\u0646\u0679\u0631\u06cc</b>\u06d4 \u067e\u0631\u0627\u062c\u06cc\u06a9\u0679 \u067e\u0631 \u0628\u0627\u062a \u06a9\u06d2 \u0644\u06cc\u06d2 ' + WA + ' \u067e\u0631 \u0631\u0627\u0628\u0637\u06c1 \u06a9\u0631\u06cc\u06ba!' } },

{ k: ["price","cost","charge","fee","rate","keemat","qeemat","\u0642\u06cc\u0645\u062a","charges","paisa"],
  r: {
  en: '\u{1F4B0} Pricing depends on the project. Message Moosa on ' + WA + ' with details and he\'ll give you a fair quote personally.',
  ru: '\u{1F4B0} Price project par depend karti hai. Detail ke sath ' + WA + ' par message karo \u2014 Moosa khud munasib quote dega.',
  ur: '\u{1F4B0} \u0642\u06cc\u0645\u062a \u067e\u0631\u0627\u062c\u06cc\u06a9\u0679 \u067e\u0631 \u0645\u0646\u062d\u0635\u0631 \u06c1\u06d2\u06d4 \u062a\u0641\u0635\u06cc\u0644 \u06a9\u06d2 \u0633\u0627\u062a\u06be ' + WA + ' \u067e\u0631 \u0631\u0627\u0628\u0637\u06c1 \u06a9\u0631\u06cc\u06ba \u2014 \u0645\u0648\u0633\u06cc\u0670 \u062e\u0648\u062f \u0645\u0646\u0627\u0633\u0628 \u0642\u06cc\u0645\u062a \u0628\u062a\u0627\u0626\u06d2 \u06af\u0627\u06d4' } },

{ k: ["hire","freelance","job","collaborat","work with","nokri","\u0646\u0648\u06a9\u0631\u06cc"],
  r: {
  en: '\u{1F91D} Moosa is a student building skills step by step \u2014 open to small projects, collaborations and learning opportunities. Reach him on ' + WA + ' \u2014 he replies personally! \u{1F4AC}',
  ru: '\u{1F91D} Moosa student hai aur step by step skills bana raha hai \u2014 chhote projects aur collaborations ke liye open hai. ' + WA + ' par rabta karo \u2014 khud reply karega! \u{1F4AC}',
  ur: '\u{1F91D} \u0645\u0648\u0633\u06cc\u0670 \u0637\u0627\u0644\u0628 \u0639\u0644\u0645 \u06c1\u06d2 \u0627\u0648\u0631 \u0642\u062f\u0645 \u0628\u06c1 \u0642\u062f\u0645 \u0645\u06c1\u0627\u0631\u062a\u06cc\u06ba \u0628\u0646\u0627 \u0631\u06c1\u0627 \u06c1\u06d2 \u2014 \u0686\u06be\u0648\u0679\u06d2 \u067e\u0631\u0627\u062c\u06cc\u06a9\u0679\u0633 \u0627\u0648\u0631 \u062a\u0639\u0627\u0648\u0646 \u06a9\u06d2 \u0644\u06cc\u06d2 \u062a\u06cc\u0627\u0631 \u06c1\u06d2\u06d4 ' + WA + ' \u067e\u0631 \u0631\u0627\u0628\u0637\u06c1 \u06a9\u0631\u06cc\u06ba \u2014 \u062e\u0648\u062f \u062c\u0648\u0627\u0628 \u062f\u06d2 \u06af\u0627! \u{1F4AC}' } },

{ k: ["contact","email","phone","number","whatsapp","reach","talk","message","rabta","\u0631\u0627\u0628\u0637\u06c1","\u0646\u0645\u0628\u0631"],
  r: {
  en: '\u{1F4DE} <b>WhatsApp:</b> <a href="https://wa.me/923033837777" target="_blank" rel="noopener">+92 303 3837777</a><br>\u2709\uFE0F <b>Email:</b> <a href="mailto:moosashahzain6@gmail.com">moosashahzain6@gmail.com</a><br>Or use the <a href="contact.html">contact form</a> \u2014 it delivers straight to his inbox! \u2705',
  ru: '\u{1F4DE} <b>WhatsApp:</b> <a href="https://wa.me/923033837777" target="_blank" rel="noopener">+92 303 3837777</a><br>\u2709\uFE0F <b>Email:</b> <a href="mailto:moosashahzain6@gmail.com">moosashahzain6@gmail.com</a><br>Ya <a href="contact.html">contact form</a> use karo \u2014 seedha inbox me jayega! \u2705',
  ur: '\u{1F4DE} <b>\u0648\u0627\u0679\u0633 \u0627\u06cc\u067e:</b> <a href="https://wa.me/923033837777" target="_blank" rel="noopener">+92 303 3837777</a><br>\u2709\uFE0F <b>\u0627\u06cc \u0645\u06cc\u0644:</b> <a href="mailto:moosashahzain6@gmail.com">moosashahzain6@gmail.com</a><br>\u06cc\u0627 <a href="contact.html">\u0631\u0627\u0628\u0637\u06c1 \u0641\u0627\u0631\u0645</a> \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u0631\u06cc\u06ba \u2014 \u0633\u06cc\u062f\u06be\u0627 \u0627\u0646 \u0628\u0627\u06a9\u0633 \u0645\u06cc\u06ba \u062c\u0627\u0626\u06d2 \u06af\u0627! \u2705' } },

{ k: ["instagram","facebook","youtube","github","social","insta","fb","yt","\u0633\u0648\u0634\u0644"],
  r: {
  en: '\u{1F310} Find Moosa here:<br>\u{1F4F8} Instagram: <a href="https://instagram.com/throughmoosa" target="_blank" rel="noopener">@throughmoosa</a><br>\u{1F4D8} Facebook: <a href="https://www.facebook.com/share/19rod9Sw9b/" target="_blank" rel="noopener">Moosa\'s page</a><br>\u25B6\uFE0F YouTube: <a href="https://youtube.com/@islami_vedios_1" target="_blank" rel="noopener">@islami_vedios_1</a><br>\u{1F419} GitHub: <a href="https://github.com/Moosashahzain" target="_blank" rel="noopener">Moosashahzain</a>',
  ru: '\u{1F310} Moosa ko yahan follow karo:<br>\u{1F4F8} Instagram: <a href="https://instagram.com/throughmoosa" target="_blank" rel="noopener">@throughmoosa</a><br>\u{1F4D8} Facebook: <a href="https://www.facebook.com/share/19rod9Sw9b/" target="_blank" rel="noopener">Moosa\'s page</a><br>\u25B6\uFE0F YouTube: <a href="https://youtube.com/@islami_vedios_1" target="_blank" rel="noopener">@islami_vedios_1</a><br>\u{1F419} GitHub: <a href="https://github.com/Moosashahzain" target="_blank" rel="noopener">Moosashahzain</a>',
  ur: '\u{1F310} \u0645\u0648\u0633\u06cc\u0670 \u06a9\u0648 \u06cc\u06c1\u0627\u06ba \u0641\u0627\u0644\u0648 \u06a9\u0631\u06cc\u06ba:<br>\u{1F4F8} \u0627\u0646\u0633\u0679\u0627\u06af\u0631\u0627\u0645: <a href="https://instagram.com/throughmoosa" target="_blank" rel="noopener">@throughmoosa</a><br>\u{1F4D8} \u0641\u06cc\u0633 \u0628\u06a9: <a href="https://www.facebook.com/share/19rod9Sw9b/" target="_blank" rel="noopener">Moosa\'s page</a><br>\u25B6\uFE0F \u06cc\u0648\u0679\u06cc\u0648\u0628: <a href="https://youtube.com/@islami_vedios_1" target="_blank" rel="noopener">@islami_vedios_1</a><br>\u{1F419} \u06af\u0679 \u06c1\u0628: <a href="https://github.com/Moosashahzain" target="_blank" rel="noopener">Moosashahzain</a>' } },

{ k: ["where","location","live","from","city","country","pakistan","rehta","\u06a9\u06c1\u0627\u06ba","\u0631\u06c1\u062a\u0627"],
  r: {
  en: '\u{1F4CD} Wah Cantt / Taxila, Pakistan.',
  ru: '\u{1F4CD} Wah Cantt / Taxila, Pakistan me rehta hai.',
  ur: '\u{1F4CD} \u0648\u0627\u06c1 \u06a9\u06cc\u0646\u0679 / \u0679\u06cc\u06a9\u0633\u0644\u0627\u060c \u067e\u0627\u06a9\u0633\u062a\u0627\u0646 \u0645\u06cc\u06ba \u0631\u06c1\u062a\u0627 \u06c1\u06d2\u06d4' } },

{ k: ["age","old","umar","\u0639\u0645\u0631"],
  r: {
  en: '\u{1F331} He\'s a first-year ICS (intermediate) student \u2014 young and early in his journey, which is exactly why this portfolio is about learning in public!',
  ru: '\u{1F331} Wo ICS first year ka student hai \u2014 young hai aur safar ke shuru me, isi liye ye portfolio \u2018learning in public\u2019 ke baare me hai!',
  ur: '\u{1F331} \u0648\u06c1 ICS \u0641\u0631\u0633\u0679 \u0627\u06cc\u0626\u0631 \u06a9\u0627 \u0637\u0627\u0644\u0628 \u0639\u0644\u0645 \u06c1\u06d2 \u2014 \u0646\u0648\u062c\u0648\u0627\u0646 \u06c1\u06d2 \u0627\u0648\u0631 \u0633\u0641\u0631 \u06a9\u06d2 \u0622\u063a\u0627\u0632 \u0645\u06cc\u06ba\u060c \u0627\u0633\u06cc \u0644\u06cc\u06d2 \u06cc\u06c1 \u067e\u0648\u0631\u0679 \u0641\u0648\u0644\u06cc\u0648 \u06a9\u06be\u0644\u06d2 \u0639\u0627\u0645 \u0633\u06cc\u06a9\u06be\u0646\u06d2 \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba \u06c1\u06d2!' } },

{ k: ["goal","future","vision","dream","aim","plan","mustaqbil","\u0645\u0633\u062a\u0642\u0628\u0644","\u062e\u0648\u0627\u0628","irada"],
  r: {
  en: '\u{1F52D} Moosa\'s goals: grow as a <b>programmer</b>, build bigger <b>electronics projects</b>, expand his <b>digital business</b>, and keep mastering AI tools. Long-term: a career in technology. See the <a href="vision.html">Vision page</a>.',
  ru: '\u{1F52D} Moosa ke goals: <b>programmer</b> banna, bare <b>electronics projects</b> banana, <b>digital business</b> barhana, aur AI tools me mahir hona. <a href="vision.html">Vision page</a> dekho.',
  ur: '\u{1F52D} \u0645\u0648\u0633\u06cc\u0670 \u06a9\u06d2 \u0627\u06c1\u062f\u0627\u0641: <b>\u067e\u0631\u0648\u06af\u0631\u0627\u0645\u0631</b> \u0628\u0646\u0646\u0627\u060c \u0628\u0691\u06d2 <b>\u0627\u0644\u06cc\u06a9\u0679\u0631\u0627\u0646\u06a9\u0633 \u067e\u0631\u0627\u062c\u06cc\u06a9\u0679\u0633</b>\u060c <b>\u0688\u06cc\u062c\u06cc\u0679\u0644 \u0628\u0632\u0646\u0633</b> \u0628\u0691\u06be\u0627\u0646\u0627\u060c \u0627\u0648\u0631 AI \u0679\u0648\u0644\u0632 \u0645\u06cc\u06ba \u0645\u0627\u06c1\u0631 \u06c1\u0648\u0646\u0627\u06d4 <a href="vision.html">Vision page</a> \u062f\u06cc\u06a9\u06be\u06cc\u06ba\u06d4' } },

{ k: ["journey","how learn","start","how did","shuru","kaise seekha","\u0633\u0641\u0631"],
  r: {
  en: '\u{1F680} Moosa learns by <b>doing</b> \u2014 online courses (13 completed!), YouTube, and hands-on experiments with Arduino/ESP boards. His motto says it all: <i>Learn. Experiment. Build. Innovate.</i>',
  ru: '\u{1F680} Moosa <b>kar ke seekhta hai</b> \u2014 online courses (13 complete!), YouTube, aur Arduino/ESP boards ke sath experiments. Motto: <i>Learn. Experiment. Build. Innovate.</i>',
  ur: '\u{1F680} \u0645\u0648\u0633\u06cc\u0670 <b>\u06a9\u0631 \u06a9\u06d2 \u0633\u06cc\u06a9\u06be\u062a\u0627 \u06c1\u06d2</b> \u2014 \u0622\u0646 \u0644\u0627\u0626\u0646 \u06a9\u0648\u0631\u0633\u0632 (13 \u0645\u06a9\u0645\u0644!)\u060c \u06cc\u0648\u0679\u06cc\u0648\u0628\u060c \u0627\u0648\u0631 Arduino/ESP \u0628\u0648\u0631\u0688\u0632 \u06a9\u06d2 \u0633\u0627\u062a\u06be \u062a\u062c\u0631\u0628\u0627\u062a\u06d4 \u0627\u0635\u0648\u0644: <i>Learn. Experiment. Build. Innovate.</i>' } },

{ k: ["language speak","urdu","english","bolta","zuban","\u0632\u0628\u0627\u0646"],
  r: {
  en: '\u{1F5E3}\uFE0F Moosa speaks <b>Urdu</b> and <b>English</b> \u2014 and so do I! \u0627\u0631\u062f\u0648 \u0645\u06cc\u06ba \u0628\u06be\u06cc \u067e\u0648\u0686\u06be \u0633\u06a9\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4',
  ru: '\u{1F5E3}\uFE0F Moosa <b>Urdu</b> aur <b>English</b> bolta hai \u2014 aur me bhi! \u0627\u0631\u062f\u0648 \u0645\u06cc\u06ba \u0628\u06be\u06cc \u067e\u0648\u0686\u06be \u0633\u06a9\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4',
  ur: '\u{1F5E3}\uFE0F \u0645\u0648\u0633\u06cc\u0670 <b>\u0627\u0631\u062f\u0648</b> \u0627\u0648\u0631 <b>\u0627\u0646\u06af\u0631\u06cc\u0632\u06cc</b> \u0628\u0648\u0644\u062a\u0627 \u06c1\u06d2 \u2014 \u0627\u0648\u0631 \u0645\u06cc\u06ba \u0628\u06be\u06cc!' } },

{ k: ["website","site","portfolio","kis ne banai","who made","banaya","\u0648\u06cc\u0628 \u0633\u0627\u0626\u0679"],
  r: {
  en: '\u{1F4BB} This website is <b>hand-built by Moosa</b> with HTML, CSS & JavaScript and hosted free on <b>GitHub Pages</b> \u2014 no templates, all his own code and design.',
  ru: '\u{1F4BB} Ye website <b>Moosa ne khud banai hai</b> \u2014 HTML, CSS & JavaScript se, aur GitHub Pages par hosted hai. Koi template nahi, sab uska apna code aur design.',
  ur: '\u{1F4BB} \u06cc\u06c1 \u0648\u06cc\u0628 \u0633\u0627\u0626\u0679 <b>\u0645\u0648\u0633\u06cc\u0670 \u0646\u06d2 \u062e\u0648\u062f \u0628\u0646\u0627\u0626\u06cc \u06c1\u06d2</b> \u2014 HTML\u060c CSS \u0627\u0648\u0631 JavaScript \u0633\u06d2\u060c \u0627\u0648\u0631 GitHub Pages \u067e\u0631 \u06c1\u0648\u0633\u0679\u0688 \u06c1\u06d2\u06d4 \u06a9\u0648\u0626\u06cc \u0679\u06cc\u0645\u067e\u0644\u06cc\u0679 \u0646\u06c1\u06cc\u06ba\u060c \u0633\u0628 \u0627\u0633 \u06a9\u0627 \u0627\u067e\u0646\u0627 \u06a9\u0648\u0688 \u0627\u0648\u0631 \u0688\u06cc\u0632\u0627\u0626\u0646\u06d4' } },

{ k: ["transformation","childhood","bachpan","before after","\u0628\u0686\u067e\u0646"],
  r: {
  en: '\u{1F5BC}\uFE0F The <a href="transformation.html">Transformation page</a> shows Moosa\'s journey from childhood to today \u2014 with a draggable before/after photo slider. A personal favorite! \u{1F49B}',
  ru: '\u{1F5BC}\uFE0F <a href="transformation.html">Transformation page</a> par Moosa ke bachpan se ab tak ka safar hai \u2014 draggable before/after slider ke sath! \u{1F49B}',
  ur: '\u{1F5BC}\uFE0F <a href="transformation.html">Transformation page</a> \u067e\u0631 \u0645\u0648\u0633\u06cc\u0670 \u06a9\u06d2 \u0628\u0686\u067e\u0646 \u0633\u06d2 \u0627\u0628 \u062a\u06a9 \u06a9\u0627 \u0633\u0641\u0631 \u06c1\u06d2 \u2014 \u0688\u0631\u06cc\u06af \u0627\u06cc\u0628\u0644 before/after \u0633\u0644\u0627\u0626\u0688\u0631 \u06a9\u06d2 \u0633\u0627\u062a\u06be! \u{1F49B}' } },

{ k: ["hello","hi","salam","assalam","hey","aoa","adreab","\u0627\u0644\u0633\u0644\u0627\u0645"],
  r: {
  en: 'Assalam o Alaikum! \u{1F44B} <b>Moosa\'s assistant</b> hazir hai. I can chat in <b>English</b>, <b>\u0627\u0631\u062f\u0648</b> or <b>Roman Urdu</b> \u2014 ask me anything about Moosa\'s skills, projects, education ya contact info!',
  ru: 'Walaikum Assalam! \u{1F44B} <b>Moosa\'s assistant</b> hazir hai. Me <b>English</b>, <b>\u0627\u0631\u062f\u0648</b> ya <b>Roman Urdu</b> me baat kar sakta hoon \u2014 Moosa ki skills, projects, education ya contact ke baare me kuch bhi poocho!',
  ur: '\u0648\u0639\u0644\u06cc\u06a9\u0645 \u0627\u0644\u0633\u0644\u0627\u0645! \u{1F44B} <b>\u0645\u0648\u0633\u06cc\u0670 \u06a9\u0627 \u0627\u0633\u0633\u0679\u0646\u0679</b> \u062d\u0627\u0636\u0631 \u06c1\u06d2\u06d4 \u0645\u06cc\u06ba <b>English</b>\u060c <b>\u0627\u0631\u062f\u0648</b> \u06cc\u0627 <b>Roman Urdu</b> \u0645\u06cc\u06ba \u0628\u0627\u062a \u06a9\u0631 \u0633\u06a9\u062a\u0627 \u06c1\u0648\u06ba \u2014 \u0645\u0648\u0633\u06cc\u0670 \u06a9\u06cc \u0645\u06c1\u0627\u0631\u062a\u0648\u06ba\u060c \u067e\u0631\u0627\u062c\u06cc\u06a9\u0679\u0633\u060c \u062a\u0639\u0644\u06cc\u0645 \u06cc\u0627 \u0631\u0627\u0628\u0637\u06d2 \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba \u06a9\u0686\u06be \u0628\u06be\u06cc \u067e\u0648\u0686\u06be\u06cc\u06ba!' } },

{ k: ["thank","shukriya","\u0634\u06a9\u0631\u06cc\u06c1","great","nice","awesome","zabardast","good","best"],
  r: {
  en: 'You\'re welcome! \u{1F60A} Anything else you\'d like to know about Moosa?',
  ru: 'Khush aamdeed! \u{1F60A} Moosa ke baare me kuch aur poochna ho to batao?',
  ur: '\u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f! \u{1F60A} \u0645\u0648\u0633\u06cc\u0670 \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba \u06a9\u0686\u06be \u0627\u0648\u0631 \u067e\u0648\u0686\u06be\u0646\u0627 \u06c1\u0648 \u062a\u0648 \u0628\u062a\u0627\u0626\u06cc\u06ba\u061f' } },

{ k: ["help","what can you do","madad","\u0645\u062f\u062f","options","topics","guide"],
  r: {
  en: '\u{1F9ED} I can tell you about: <b>bio</b>, <b>education</b>, <b>skills</b> (coding, AI, design, editing\u2026), <b>projects</b> (Arduino, ESP32\u2026), <b>certificates</b>, <b>business/SMM</b>, <b>services & pricing</b>, <b>goals</b>, <b>social accounts</b> and <b>contact</b>. Just ask \u2014 in English, \u0627\u0631\u062f\u0648, or Roman Urdu!',
  ru: '\u{1F9ED} Me bata sakta hoon: <b>bio</b>, <b>education</b>, <b>skills</b> (coding, AI, designing, editing\u2026), <b>projects</b> (Arduino, ESP32\u2026), <b>certificates</b>, <b>business/SMM</b>, <b>services & price</b>, <b>goals</b>, <b>social accounts</b> aur <b>contact</b>. Bas poocho \u2014 English, \u0627\u0631\u062f\u0648 ya Roman Urdu me!',
  ur: '\u{1F9ED} \u0645\u06cc\u06ba \u0628\u062a\u0627 \u0633\u06a9\u062a\u0627 \u06c1\u0648\u06ba: <b>\u062a\u0639\u0627\u0631\u0641</b>\u060c <b>\u062a\u0639\u0644\u06cc\u0645</b>\u060c <b>\u0645\u06c1\u0627\u0631\u062a\u06cc\u06ba</b> (\u06a9\u0648\u0688\u0646\u06af\u060c AI\u060c \u0688\u06cc\u0632\u0627\u0626\u0646\u0646\u06af\u060c \u0627\u06cc\u0688\u06cc\u0679\u0646\u06af\u2026)\u060c <b>\u067e\u0631\u0627\u062c\u06cc\u06a9\u0679\u0633</b> (Arduino\u060c ESP32\u2026)\u060c <b>\u0633\u0631\u0679\u06cc\u0641\u06cc\u06a9\u06cc\u0679</b>\u060c <b>\u0628\u0632\u0646\u0633/SMM</b>\u060c <b>\u0633\u0631\u0648\u0633\u0632 \u0627\u0648\u0631 \u0642\u06cc\u0645\u062a</b>\u060c <b>\u0627\u06c1\u062f\u0627\u0641</b>\u060c <b>\u0633\u0648\u0634\u0644 \u0627\u06a9\u0627\u0624\u0646\u0679\u0633</b> \u0627\u0648\u0631 <b>\u0631\u0627\u0628\u0637\u06c1</b>\u06d4 \u0628\u0633 \u067e\u0648\u0686\u06be\u06cc\u06ba \u2014 English\u060c \u0627\u0631\u062f\u0648 \u06cc\u0627 Roman Urdu \u0645\u06cc\u06ba!' } },
];

var DEFAULTS = {
en: [
  'Hmm, that\'s outside what I know! \u{1F9E0} I answer from Moosa\'s profile \u2014 try asking about his <b>skills</b>, <b>projects</b>, <b>business</b> or <b>contact</b>. Or ' + WA + ' him directly \u2014 he replies personally! \u{1F4AC}',
  'I don\'t have that detail yet! \u{1F4AD} I know Moosa\'s <b>bio</b>, <b>education</b>, <b>skills</b>, <b>projects</b>, <b>certificates</b>, <b>business</b> and <b>contact</b> \u2014 ask me about any of those, or message him on ' + WA + '.'
],
ru: [
  'Hmm, ye mere knowledge se bahar hai! \u{1F9E0} Me Moosa ki profile se jawab deta hoon \u2014 <b>skills</b>, <b>projects</b>, <b>business</b> ya <b>contact</b> ke baare me poocho. Ya ' + WA + ' par direct rabta karo \u2014 wo khud reply karega! \u{1F4AC}',
  'Ye detail mere paas abhi nahi hai! \u{1F4AD} Me Moosa ki <b>bio</b>, <b>education</b>, <b>skills</b>, <b>projects</b>, <b>certificates</b>, <b>business</b> aur <b>contact</b> janta hoon \u2014 in me se kuch poocho, ya ' + WA + ' par message karo.'
],
ur: [
  '\u06c1\u0645\u0645\u060c \u06cc\u06c1 \u0645\u06cc\u0631\u06d2 \u0639\u0644\u0645 \u0633\u06d2 \u0628\u0627\u06c1\u0631 \u06c1\u06d2! \u{1F9E0} \u0645\u06cc\u06ba \u0645\u0648\u0633\u06cc\u0670 \u06a9\u06cc \u067e\u0631\u0648\u0641\u0627\u0626\u0644 \u0633\u06d2 \u062c\u0648\u0627\u0628 \u062f\u06cc\u062a\u0627 \u06c1\u0648\u06ba \u2014 <b>\u0645\u06c1\u0627\u0631\u062a\u0648\u06ba</b>\u060c <b>\u067e\u0631\u0627\u062c\u06cc\u06a9\u0679\u0633</b>\u060c <b>\u0628\u0632\u0646\u0633</b> \u06cc\u0627 <b>\u0631\u0627\u0628\u0637\u06d2</b> \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba \u067e\u0648\u0686\u06be\u06cc\u06ba\u06d4 \u06cc\u0627 ' + WA + ' \u067e\u0631 \u0628\u0631\u0627\u06c1 \u0631\u0627\u0633\u062a \u0631\u0627\u0628\u0637\u06c1 \u06a9\u0631\u06cc\u06ba \u2014 \u0648\u06c1 \u062e\u0648\u062f \u062c\u0648\u0627\u0628 \u062f\u06d2 \u06af\u0627! \u{1F4AC}',
  '\u06cc\u06c1 \u062a\u0641\u0635\u06cc\u0644 \u0645\u06cc\u0631\u06d2 \u067e\u0627\u0633 \u0627\u0628\u06be\u06cc \u0646\u06c1\u06cc\u06ba \u06c1\u06d2! \u{1F4AD} \u0645\u06cc\u06ba \u0645\u0648\u0633\u06cc\u0670 \u06a9\u0627 <b>\u062a\u0639\u0627\u0631\u0641</b>\u060c <b>\u062a\u0639\u0644\u06cc\u0645</b>\u060c <b>\u0645\u06c1\u0627\u0631\u062a\u06cc\u06ba</b>\u060c <b>\u067e\u0631\u0627\u062c\u06cc\u06a9\u0679\u0633</b>\u060c <b>\u0633\u0631\u0679\u06cc\u0641\u06cc\u06a9\u06cc\u0679</b>\u060c <b>\u0628\u0632\u0646\u0633</b> \u0627\u0648\u0631 <b>\u0631\u0627\u0628\u0637\u06c1</b> \u062c\u0627\u0646\u062a\u0627 \u06c1\u0648\u06ba \u2014 \u0627\u0646 \u0645\u06cc\u06ba \u0633\u06d2 \u06a9\u0686\u06be \u067e\u0648\u0686\u06be\u06cc\u06ba\u060c \u06cc\u0627 ' + WA + ' \u067e\u0631 \u067e\u06cc\u063a\u0627\u0645 \u0628\u06be\u06cc\u062c\u06cc\u06ba\u06d4'
]};

function findReply(text){
  var t = " " + text.toLowerCase() + " ";
  var best = null, bestScore = 0;
  KB.forEach(function(entry){
    var score = 0;
    entry.k.forEach(function(k){ if(t.indexOf(k) !== -1) score += k.length; });
    if(score > bestScore){ bestScore = score; best = entry; }
  });
  var lang = detectLang(text);
  if(best) return best.r[lang] || best.r.en;
  var d = DEFAULTS[lang] || DEFAULTS.en;
  return d[Math.floor(Math.random() * d.length)];
}

/* ---------- UI ---------- */
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
    setTimeout(function(){ botSay(findReply("hello")); }, 400);
  }
}, { once: false });

/* Language chips set an explicit language; topic chips ask a question */
$$(".chat-chip").forEach(function(chip){
  chip.addEventListener("click", function(){
    var lang = chip.getAttribute("data-lang");
    addMsg(chip.textContent, "user");
    if(lang){
      userLang = lang;
      var confirm = {
        en: 'Got it \u2014 I\'ll reply in <b>English</b>. \u{1F1EC}\u{1F1E7} What would you like to know about Moosa?',
        ru: 'Samajh gaya \u2014 ab me <b>Roman Urdu</b> me jawab dunga. Moosa ke baare me kya poochna hai?',
        ur: '\u0633\u0645\u062c\u06be \u06af\u06cc\u0627 \u2014 \u0627\u0628 \u0645\u06cc\u06ba <b>\u0627\u0631\u062f\u0648</b> \u0645\u06cc\u06ba \u062c\u0648\u0627\u0628 \u062f\u0648\u06ba \u06af\u0627\u06d4 \u0645\u0648\u0633\u06cc\u0670 \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba \u06a9\u06cc\u0627 \u067e\u0648\u0686\u06be\u0646\u0627 \u06c1\u06d2\u061f'
      };
      botSay(confirm[lang] || confirm.en);
    } else {
      botSay(findReply(chip.textContent));
    }
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
