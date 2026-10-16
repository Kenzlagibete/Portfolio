// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll animations with IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Animate skill bars when visible
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
  skillObserver.observe(card);
});

// Set footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = '#d4f542';
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

/* ===== Translate (ID/EN), typewriter, running text, contact form ===== */
// Kunci = teks bahasa Inggris persis seperti di index.html. Tambah baris baru di sini kalau kamu nambah teks.
const ID_TEXT = {
  "About":"Tentang","Experience":"Pengalaman","Skills":"Keahlian","Certificate":"Sertifikat","Contact":"Kontak",
  "I AM":"SAYA","SMK RPL Student who loves Animation & Web Development.":"Siswa SMK RPL yang suka Animasi & Pengembangan Web.",
  "Download CV":"Unduh CV","scroll":"gulir",
  "01 — About":"01 — Tentang","My Biodata":"Biodata Saya","Name":"Nama","Born":"Lahir","School":"Sekolah","Major":"Jurusan",
  "Hobby":"Hobi","Languages":"Bahasa","Dream":"Cita-cita","18 May 2010":"18 Mei 2010",
  "Music · Video editing · Animation":"Musik · Editing video · Animasi","Indonesian · English · Javanese":"Indonesia · Inggris · Jawa",
  "Game & Web Developer":"Developer Game & Web",
  "02 — EXPERIENCE":"02 — PENGALAMAN","My Projects":"Proyek Saya","My Games":"Game Saya","View Project →":"Lihat Proyek →",
  "Form Website":"Website Formulir","A Testing Form":"Formulir untuk uji coba",
  "News Website":"Website Berita","A website where you can read breaking news and the latest updates.":"Website untuk membaca berita terkini dan pembaruan terbaru.",
  "Calculator":"Kalkulator","A Calculator where you can calculate math!":"Kalkulator untuk menghitung matematika!",
  "A website to verify your educational documents and diplomas.":"Website untuk memverifikasi dokumen pendidikan dan ijazah.",
  "Box-Jump Game":"Game Box-Jump","A Scratch game inspired by Geometry Dash.":"Game Scratch yang terinspirasi dari Geometry Dash.",
  "App":"Aplikasi",
  "03 — Skills":"03 — Keahlian","My Skills":"Keahlian Saya","Markup":"Markup","Programming":"Pemrograman",
  "04 — Certificates achievements":"04 — Sertifikat & pencapaian","My Certificate":"Sertifikat Saya",
  "Certificate Dicoding":"Sertifikat Dicoding","Certificate AI Class Asean":"Sertifikat AI Class Asean",
  "See full certificate →":"Lihat sertifikat lengkap →",
  "05 — Contact":"05 — Kontak","Full Name":"Nama Lengkap","Message":"Pesan","Send Message":"Kirim Pesan","My Location":"Lokasi Saya"
};
const ID_ATTR = { "Your full name":"Nama lengkap kamu", "Share your thoughts...":"Tulis pesanmu...", "Toggle menu":"Buka/tutup menu" };
const WORDS  = { en:["KENZIE","STUDENT","GAMEMAKER","HACKER"], id:["KENZIE","PELAJAR","GAMEMAKER","HACKER"] };
const TICKER = {
  en:["Web Developer","Animation","Game Maker","Video Editing","SMKN 1 Surabaya","HTML · CSS · JavaScript · PHP"],
  id:["Developer Web","Animasi","Pembuat Game","Editing Video","SMKN 1 Surabaya","HTML · CSS · JavaScript · PHP"]
};
const MSG = {
  en:{sending:"Sending...", ok:"Message sent. Thank you!", err:"Could not send the message. Please try again."},
  id:{sending:"Mengirim...", ok:"Pesan terkirim. Terima kasih!", err:"Pesan gagal dikirim. Coba lagi."}
};
const META = {
  en:{ title:"Kenzie Zubair — Portfolio", desc:"Portfolio Kenzie Zubair Al Fatih - Web Developer" },
  id:{ title:"Kenzie Zubair — Portofolio", desc:"Portofolio Kenzie Zubair Al Fatih - Web Developer" }
};

// Kumpulkan semua teks & atribut yang bisa diterjemahkan (sekali saja)
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const n = walker.currentNode, t = n.nodeValue.trim();
  if (ID_TEXT[t]) textNodes.push({ n, en: n.nodeValue, t });
}
const attrNodes = [];
document.querySelectorAll('[placeholder],[aria-label]').forEach(el => {
  ['placeholder','aria-label'].forEach(a => {
    const v = el.getAttribute(a);
    if (v && ID_ATTR[v]) attrNodes.push({ el, a, en: v });
  });
});

let lang = 'en';
try {
  const saved = localStorage.getItem('lang');
  lang = saved || ((navigator.language || '').toLowerCase().startsWith('id') ? 'id' : 'en');
} catch (e) {}

const tw = document.querySelector('.typewriter');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let twTimer;
function startTypewriter() {
  clearTimeout(twTimer);
  const words = WORDS[lang];
  if (reduceMotion) { tw.textContent = words[0]; return; }
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    tw.textContent = word.slice(0, i);
    let d = del ? 55 : 110;
    if (!del && i === word.length) { del = true; d = 1500; }
    else if (del && i === 0) { del = false; w = (w + 1) % words.length; d = 300; }
    else i += del ? -1 : 1;
    twTimer = setTimeout(tick, d);
  })();
}

function renderTicker() {
  const items = TICKER[lang].map(t => `<span>${t}</span>`).join('');
  document.querySelector('.ticker-track').innerHTML = items.repeat(4); // digandakan agar loop mulus
}

function applyLang(l) {
  lang = l;
  textNodes.forEach(({ n, en, t }) => { n.nodeValue = l === 'id' ? en.replace(t, ID_TEXT[t]) : en; });
  attrNodes.forEach(({ el, a, en }) => el.setAttribute(a, l === 'id' ? ID_ATTR[en] : en));
  document.documentElement.lang = l;
  document.title = META[l].title;
  document.querySelector('meta[name="description"]').setAttribute('content', META[l].desc);
  document.querySelectorAll('.lang-switch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  try { localStorage.setItem('lang', l); } catch (e) {}
  renderTicker();
  startTypewriter();
}

document.querySelectorAll('.lang-switch button').forEach(b =>
  b.addEventListener('click', () => applyLang(b.dataset.lang))
);
applyLang(lang);

// Kirim form tanpa pindah halaman
const form = document.querySelector('.contact-form');
const statusEl = form.querySelector('.form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.className = 'form-status';
  statusEl.textContent = MSG[lang].sending;
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    form.reset();
    statusEl.textContent = MSG[lang].ok;
  } catch (err) {
    statusEl.className = 'form-status error';
    statusEl.textContent = MSG[lang].err;
  }
});