/* Base styles */
:root {
  --bg: #0b1220;
  --surface: #111a2f;
  --card: #141f38;
  --muted: #9fb0d0;
  --text: #eaf0ff;
  --primary: #5cc48b;
  --primary-contrast: #06140e;
  --accent: #ef4444;
  --ring: #7dd3fc;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--text);
  background: radial-gradient(1000px 600px at 10% -10%, #162342 0%, transparent 60%),
              radial-gradient(800px 500px at 100% 0%, #1a2a50 0%, transparent 60%),
              var(--bg);
  line-height: 1.6;
}

.container { width: min(1100px, 92%); margin: 0 auto; }

/* Accessibility */
.skip-link {
  position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;
}
.skip-link:focus { left: 1rem; top: 1rem; width: auto; height: auto; padding: .5rem .75rem; background: #fff; color: #111; border-radius: .5rem; }

/* Header */
.site-header {
  position: sticky; top: 0; z-index: 40;
  backdrop-filter: blur(10px);
  background: linear-gradient(to bottom, rgba(11,18,32,.85), rgba(11,18,32,.65));
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.header-inner { display: flex; align-items: center; justify-content: space-between; padding: .9rem 0; }
.brand { display: flex; align-items: center; gap: .5rem; font-weight: 800; letter-spacing: .3px; }
.brand .logo { font-size: 1.5rem; }
.brand .brand-text { font-size: 1.1rem; }
.nav { display: flex; gap: 1rem; }
.nav a { color: var(--muted); text-decoration: none; font-weight: 600; }
.nav a:hover { color: var(--text); }

/* Hero */
.hero { padding: 2.5rem 0 1rem; }
.hero-inner { display: grid; grid-template-columns: 1.1fr .9fr; gap: 2rem; align-items: center; }
.hero-text h1 { font-size: clamp(2rem, 2.5vw + 1rem, 3rem); margin: 0 0 .5rem; line-height: 1.2; }
.hero-text p { color: var(--muted); margin: 0 0 1rem; }
.hero-actions { display: flex; gap: .75rem; margin: 1rem 0; }
.trust-points { display: flex; gap: 1rem; padding: 0; list-style: none; color: var(--muted); font-size: .95rem; }
.hero-card { background: linear-gradient(180deg, rgba(92,196,139,.1), rgba(92,196,139,.05)); border: 1px solid rgba(92,196,139,.25); border-radius: 1rem; padding: 1.5rem; box-shadow: var(--shadow); }
.hero-card .illustration { font-size: 2rem; text-align: center; }
.hero-card .caption { text-align: center; color: var(--muted); margin-top: .5rem; font-size: .9rem; }

/* Buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; padding: .7rem 1rem; border-radius: .75rem; border: 1px solid transparent; text-decoration: none; font-weight: 700; cursor: pointer; transition: transform .06s ease, filter .2s ease, background .2s ease, color .2s ease; }
.btn:active { transform: translateY(1px) scale(.99); }
.btn-primary { background: var(--primary); color: var(--primary-contrast); }
.btn-ghost { background: transparent; border-color: rgba(255,255,255,.15); color: var(--text); }
.btn-sm { padding: .4rem .6rem; font-size: .85rem; }

/* Cards & grids */
.card { background: var(--card); border: 1px solid rgba(255,255,255,.06); border-radius: 1rem; padding: 1.25rem; box-shadow: var(--shadow); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1rem; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }

/* Sections */
.feed, .forms, .how, .safety, .contact { padding: 1.25rem 0; }

/* Forms */
.form-row { display: grid; gap: .4rem; margin-bottom: .85rem; }
.form-row.two { grid-template-columns: repeat(2, 1fr); gap: .75rem; }
label { font-weight: 600; font-size: .95rem; }
input, textarea, select {
  width: 100%; padding: .7rem .8rem; border-radius: .6rem; border: 1px solid rgba(255,255,255,.18);
  background: #0e162a; color: var(--text); outline: none;
}
input:focus, textarea:focus, select:focus { border-color: var(--ring); box-shadow: 0 0 0 3px rgba(125, 211, 252, .18); }
.muted { color: var(--muted); }
.tiny { font-size: .85rem; }

/* Steps */
.step { text-align: center; }
.step-icon { font-size: 1.6rem; margin-bottom: .25rem; }

/* Bullets */
.bullets { margin: .5rem 0 0; }
.bullets li { margin: .4rem 0; }

/* Footer */
.site-footer { border-top: 1px solid rgba(255,255,255,.06); margin-top: 2rem; }
.footer-inner { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; color: var(--muted); }

/* Toast */
.toast { position: fixed; bottom: 1rem; right: 1rem; min-width: 220px; max-width: min(92%, 380px); padding: .8rem 1rem; border-radius: .8rem; border: 1px solid rgba(255,255,255,.1); background: #0f182d; color: var(--text); box-shadow: var(--shadow); opacity: 0; pointer-events: none; transform: translateY(10px); transition: opacity .2s ease, transform .2s ease; }
.toast.show { opacity: 1; transform: translateY(0); }

/* Responsive */
@media (max-width: 920px) {
  .hero-inner { grid-template-columns: 1fr; }
  .grid-2 { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .nav { display: none; }
  .grid-3 { grid-template-columns: 1fr; }
}