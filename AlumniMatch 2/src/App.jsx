import { useState, useRef, useEffect } from "react";

// ---------- Mock alumni data (front-end only, no backend) ----------
const ALUMNI = [
  {
    id: 1,
    name: "Priya Nair",
    grad: "'19",
    field: "Software Engineering",
    role: "Senior Engineer at Stripe",
    tags: ["software", "engineering", "tech", "backend", "computer science", "cs"],
    blurb:
      "First-gen grad. Bombed her first two interview loops, then landed big tech. Will tell you what actually matters before your first job, not after.",
    initials: "PN",
  },
  {
    id: 2,
    name: "Marcus Bell",
    grad: "'17",
    field: "Product & Design",
    role: "Product Lead at Figma",
    tags: ["product", "design", "ux", "pm", "product management", "ui"],
    blurb:
      "Switched from a non-design major into product. Knows the path when your degree doesn't match the job you want.",
    initials: "MB",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    grad: "'20",
    field: "Finance & Consulting",
    role: "Associate at McKinsey",
    tags: ["finance", "consulting", "business", "economics", "banking", "strategy"],
    blurb:
      "Recruited with zero connections in the industry. Built the network she now uses to pull people up.",
    initials: "SR",
  },
  {
    id: 4,
    name: "Daniel Okafor",
    grad: "'18",
    field: "Data & Research",
    role: "Data Scientist at Spotify",
    tags: ["data", "data science", "research", "ml", "machine learning", "analytics", "statistics"],
    blurb:
      "Went from a research lab to industry. Honest about which grad-school-vs-industry advice is noise and which is real.",
    initials: "DO",
  },
  {
    id: 5,
    name: "Hannah Cho",
    grad: "'16",
    field: "Marketing & Media",
    role: "Brand Director at A24",
    tags: ["marketing", "media", "communications", "comms", "advertising", "brand", "content"],
    blurb:
      "Built a career in a field with no clear ladder. Good at the questions that don't have a Google answer.",
    initials: "HC",
  },
];

function matchAlumnus(field, goal) {
  const text = (field + " " + goal).toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const a of ALUMNI) {
    let score = 0;
    for (const tag of a.tags) {
      if (text.includes(tag)) score += tag.length; // longer/more specific tag = stronger signal
    }
    if (score > bestScore) {
      bestScore = score;
      best = a;
    }
  }
  return best || ALUMNI[0]; // graceful fallback, never empty
}

// ---------- Small reusable bits ----------
function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

export default function App() {
  return (
    <div className="page">
      <Nav />
      <Hero />
      <Problem />
      <Demo />
      <HowItWorks />
      <Value />
      <CTA />
      <Footer />
      <Style />
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <a className="brand" href="#top">
        <span className="brand-mark" aria-hidden="true" />
        Throughline
      </a>
      <div className="nav-links">
        <a href="#demo">Try the match</a>
        <a href="#universities">For universities</a>
        <a href="#cta" className="nav-cta">
          Book a demo
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <Eyebrow>Alumni mentorship, matched to you</Eyebrow>
        <h1 className="hero-title">
          Your network shouldn't
          <br />
          end at <span className="hl">graduation</span>.
        </h1>
        <p className="hero-sub">
          We partner with universities to match every new graduate with an alumni
          mentor from their own field. Not a stranger from the internet. Someone
          from your own school who studied what you studied and has already walked
          the path you're starting.
        </p>
        <div className="hero-actions">
          <a href="#demo" className="btn btn-primary">
            Find your mentor
          </a>
          <a href="#universities" className="btn btn-ghost">
            For universities
          </a>
        </div>
      </div>
      <ThroughlineGraphic />
    </header>
  );
}

// The signature element: a single line that travels from "campus" to "career",
// with the student node and the alumni node connected across the graduation point.
function ThroughlineGraphic() {
  return (
    <div className="throughline" aria-hidden="true">
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--ink-soft)" />
            <stop offset="55%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
        <path
          className="tl-path"
          d="M0,150 C250,150 300,60 520,60 C620,60 600,150 760,150 C920,150 950,70 1200,70"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
        />
        <g className="tl-node tl-node-a">
          <circle cx="120" cy="150" r="6" />
          <text x="120" y="178">you, graduating</text>
        </g>
        <g className="tl-node tl-node-b">
          <circle cx="1080" cy="72" r="6" />
          <text x="1080" y="48">an alum, already there</text>
        </g>
        <line className="tl-grad" x1="520" y1="20" x2="520" y2="185" />
        <text className="tl-grad-label" x="528" y="32">
          graduation
        </text>
      </svg>
    </div>
  );
}

function Problem() {
  return (
    <section className="section problem">
      <div className="section-head">
        <Eyebrow>The drop-off</Eyebrow>
        <h2>
          Graduation is supposed to be a beginning. For most graduates, it's the
          moment they lose the people who knew how to help them.
        </h2>
      </div>
      <p className="problem-body">
        Professors, academic advisors, the campus network you spent four years
        building: gone almost overnight. Right when the questions get harder, like
        which offer to take or whether you're even on the right path, the support
        is gone. The hardest part of early career isn't a lack of information.
        It's not knowing who to trust.
      </p>
    </section>
  );
}

// ---------- The interactive demo (the part judges remember) ----------
function Demo() {
  const fields = [
    "Software Engineering",
    "Product & Design",
    "Finance & Consulting",
    "Data & Research",
    "Marketing & Media",
  ];
  const [field, setField] = useState("");
  const [goal, setGoal] = useState("");
  const [stage, setStage] = useState("form"); // form | matching | result
  const [result, setResult] = useState(null);

  function runMatch() {
    if (!field) return;
    setStage("matching");
    const picked = matchAlumnus(field, goal);
    setTimeout(() => {
      setResult(picked);
      setStage("result");
    }, 1800);
  }

  function reset() {
    setStage("form");
    setResult(null);
  }

  return (
    <section className="section demo" id="demo">
      <div className="section-head">
        <Eyebrow>Try it</Eyebrow>
        <h2>Tell us your field. Meet your match.</h2>
        <p className="section-lede">
          This is a live preview of how matching works inside a partner
          university. Pick a field, add a goal, and we'll surface an alumni mentor
          from your school.
        </p>
      </div>

      <div className="demo-card">
        {stage === "form" && (
          <div className="demo-form">
            <label className="field-label">Your field</label>
            <div className="chips">
              {fields.map((f) => (
                <button
                  key={f}
                  className={"chip" + (field === f ? " chip-on" : "")}
                  onClick={() => setField(f)}
                  type="button"
                >
                  {f}
                </button>
              ))}
            </div>

            <label className="field-label" htmlFor="goal">
              What are you trying to figure out? <span className="opt">optional</span>
            </label>
            <input
              id="goal"
              className="text-input"
              placeholder="e.g. should I take the offer, or hold out for something better?"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <button
              className="btn btn-primary btn-block"
              onClick={runMatch}
              disabled={!field}
              type="button"
            >
              {field ? "Find my mentor" : "Pick a field to start"}
            </button>
          </div>
        )}

        {stage === "matching" && (
          <div className="matching">
            <div className="matching-line" />
            <p className="matching-text">
              Matching you with an alum in <strong>{field}</strong>…
            </p>
            <div className="matching-steps">
              <span>Reading your profile</span>
              <span>Searching alumni in your field</span>
              <span>Finding someone who's been there</span>
            </div>
          </div>
        )}

        {stage === "result" && result && (
          <div className="result">
            <div className="result-top">
              <div className="avatar">{result.initials}</div>
              <div className="result-id">
                <div className="result-name">
                  {result.name} <span className="result-grad">Class of {result.grad}</span>
                </div>
                <div className="result-role">{result.role}</div>
                <div className="result-field">{result.field}</div>
              </div>
              <div className="match-badge">
                <span className="match-dot" /> Matched
              </div>
            </div>
            <p className="result-blurb">{result.blurb}</p>
            <div className="result-why">
              <span className="why-label">Why this match</span>
              Same school. Same field. A real person invested in your success, not a
              random stranger.
            </div>
            <div className="result-actions">
              <button className="btn btn-primary" type="button">
                Request intro
              </button>
              <button className="btn btn-ghost" onClick={reset} type="button">
                Try another field
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "The university brings its people in",
      d: "Alumni and working professionals opt in to mentor. Because they share an alma mater with the students, they're glad to help. No cold strangers.",
    },
    {
      n: "02",
      t: "Graduates get matched by field and profile",
      d: "Every new graduate is paired with an alum whose field, path, and background actually fit theirs, not whoever happens to be free.",
    },
    {
      n: "03",
      t: "The relationship picks up where campus left off",
      d: "The advice means something different coming from someone who sat in the same lecture halls and has already walked the path.",
    },
  ];
  return (
    <section className="section how">
      <div className="section-head">
        <Eyebrow>How it works</Eyebrow>
        <h2>A real connection, not a directory.</h2>
      </div>
      <ol className="steps">
        {steps.map((s) => (
          <li className="step" key={s.n}>
            <span className="step-n">{s.n}</span>
            <div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Value() {
  return (
    <section className="section value" id="universities">
      <div className="value-grid">
        <div className="value-col">
          <Eyebrow>For graduates</Eyebrow>
          <h3>Someone in your corner from day one.</h3>
          <p>
            Every match is grounded in a real, verifiable connection: a shared
            alma mater, a shared field, and a real person who has been exactly
            where you are. That's the difference between figuring it out alone and
            having someone who can tell you what actually matters.
          </p>
        </div>
        <div className="value-col">
          <Eyebrow>For universities</Eyebrow>
          <h3>Graduate outcomes you can measure.</h3>
          <p>
            Graduate outcomes and alumni engagement sit at the core of every
            institution's mission, and both are notoriously hard to move. We give
            universities a scalable way to support graduates after they leave,
            while turning engaged alumni into an active community that gives back.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section cta" id="cta">
      <div className="cta-inner">
        <h2>
          Your network shouldn't end at graduation.
          <br />
          We make sure it doesn't.
        </h2>
        <div className="cta-actions">
          <a href="#demo" className="btn btn-primary">
            Find your mentor
          </a>
          <a href="#top" className="btn btn-ghost">
            Book a university demo
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="brand">
        <span className="brand-mark" aria-hidden="true" /> Throughline
      </span>
      <span className="footer-note">
        Alumni mentorship, matched to you. Built at [Hackathon].
      </span>
    </footer>
  );
}

// ---------- Styles ----------
function Style() {
  return (
    <style>{`
      :root{
        --ink:#14213d;          /* deep indigo, academic + trust */
        --ink-soft:#3b4a72;
        --ink-2:#5a6788;
        --gold:#c79a3b;         /* warm alumni gold */
        --gold-soft:#e8d6a8;
        --paper:#f7f6f2;        /* warm off-white, not the cream cliche */
        --paper-2:#eeede6;
        --card:#ffffff;
        --line:#e2e0d6;
        --white:#ffffff;
        --maxw:1080px;
        font-synthesis:none;
      }
      *{box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{margin:0;}
      .page{
        background:var(--paper);
        color:var(--ink);
        font-family:"Inter","Helvetica Neue",Arial,sans-serif;
        font-size:17px;
        line-height:1.6;
        -webkit-font-smoothing:antialiased;
        overflow-x:hidden;
      }
      .eyebrow{
        display:inline-block;
        font-size:12px;
        letter-spacing:.18em;
        text-transform:uppercase;
        color:var(--gold);
        font-weight:600;
        margin-bottom:18px;
      }
      h1,h2,h3{
        font-family:"Spectral","Georgia",serif;
        font-weight:600;
        line-height:1.12;
        letter-spacing:-.01em;
      }
      .section{
        max-width:var(--maxw);
        margin:0 auto;
        padding:96px 28px;
      }
      .section-head{max-width:760px;margin-bottom:40px;}
      .section-head h2{font-size:clamp(28px,4vw,42px);margin:0;}
      .section-lede{color:var(--ink-2);margin-top:18px;font-size:18px;}

      /* NAV */
      .nav{
        position:sticky;top:0;z-index:50;
        display:flex;align-items:center;justify-content:space-between;
        padding:18px 28px;
        background:rgba(247,246,242,.85);
        backdrop-filter:blur(10px);
        border-bottom:1px solid var(--line);
      }
      .brand{
        display:inline-flex;align-items:center;gap:10px;
        font-family:"Spectral",serif;font-weight:600;font-size:19px;
        color:var(--ink);text-decoration:none;letter-spacing:-.01em;
      }
      .brand-mark{
        width:14px;height:14px;border-radius:50%;
        background:radial-gradient(circle at 30% 30%,var(--gold),var(--ink));
        display:inline-block;
      }
      .nav-links{display:flex;align-items:center;gap:26px;}
      .nav-links a{color:var(--ink-soft);text-decoration:none;font-size:15px;font-weight:500;}
      .nav-links a:hover{color:var(--ink);}
      .nav-cta{
        background:var(--ink);color:var(--white)!important;
        padding:9px 16px;border-radius:999px;
      }
      .nav-cta:hover{background:var(--ink-soft);}

      /* HERO */
      .hero{
        position:relative;
        max-width:var(--maxw);margin:0 auto;
        padding:90px 28px 0;
      }
      .hero-inner{max-width:760px;}
      .hero-title{
        font-size:clamp(40px,7vw,76px);
        margin:0 0 26px;
      }
      .hero-title .hl{
        color:var(--gold);
        font-style:italic;
      }
      .hero-sub{
        font-size:clamp(17px,2.2vw,20px);
        color:var(--ink-2);
        max-width:620px;margin:0 0 34px;
      }
      .hero-actions{display:flex;gap:14px;flex-wrap:wrap;}

      /* signature throughline graphic */
      .throughline{
        margin-top:64px;
        height:200px;
        width:100%;
      }
      .throughline svg{width:100%;height:100%;overflow:visible;}
      .tl-path{
        stroke-dasharray:2200;
        stroke-dashoffset:2200;
        animation:draw 2.6s ease forwards .2s;
      }
      @keyframes draw{to{stroke-dashoffset:0;}}
      .tl-node circle{fill:var(--ink);}
      .tl-node-b circle{fill:var(--gold);}
      .tl-node text{
        font-family:"Inter",sans-serif;font-size:13px;fill:var(--ink-2);
        text-anchor:middle;font-weight:500;
        opacity:0;animation:fadeUp .6s ease forwards 2.2s;
      }
      .tl-grad{stroke:var(--line);stroke-width:1.5;stroke-dasharray:4 5;}
      .tl-grad-label{
        font-family:"Inter",sans-serif;font-size:11px;fill:var(--ink-2);
        letter-spacing:.12em;text-transform:uppercase;
      }
      @keyframes fadeUp{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}

      /* BUTTONS */
      .btn{
        display:inline-flex;align-items:center;justify-content:center;
        font-family:"Inter",sans-serif;font-weight:600;font-size:15px;
        padding:13px 24px;border-radius:999px;border:1.5px solid transparent;
        cursor:pointer;text-decoration:none;transition:transform .15s ease,background .2s ease,border-color .2s ease;
      }
      .btn:active{transform:translateY(1px);}
      .btn-primary{background:var(--ink);color:var(--white);}
      .btn-primary:hover{background:var(--ink-soft);}
      .btn-primary:disabled{background:var(--paper-2);color:var(--ink-2);cursor:not-allowed;}
      .btn-ghost{background:transparent;color:var(--ink);border-color:var(--ink);}
      .btn-ghost:hover{background:var(--ink);color:var(--white);}
      .btn-block{width:100%;margin-top:10px;}

      /* PROBLEM */
      .problem-body{
        max-width:740px;font-size:clamp(18px,2.4vw,22px);
        line-height:1.55;color:var(--ink);
      }
      .problem .section-head h2{color:var(--ink);}

      /* DEMO */
      .demo-card{
        background:var(--card);
        border:1px solid var(--line);
        border-radius:20px;
        padding:34px;
        max-width:680px;
        box-shadow:0 20px 50px -30px rgba(20,33,61,.4);
      }
      .field-label{
        display:block;font-size:13px;font-weight:600;
        letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);
        margin:0 0 12px;
      }
      .field-label .opt{
        text-transform:none;letter-spacing:0;color:var(--ink-2);
        font-weight:400;font-size:12px;
      }
      .chips{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;}
      .chip{
        font-family:"Inter",sans-serif;font-size:14px;font-weight:500;
        padding:10px 16px;border-radius:999px;
        border:1.5px solid var(--line);background:var(--paper);color:var(--ink-soft);
        cursor:pointer;transition:all .15s ease;
      }
      .chip:hover{border-color:var(--gold);color:var(--ink);}
      .chip-on{background:var(--ink);color:var(--white);border-color:var(--ink);}
      .text-input{
        width:100%;font-family:"Inter",sans-serif;font-size:16px;
        padding:14px 16px;border-radius:12px;
        border:1.5px solid var(--line);background:var(--paper);color:var(--ink);
        margin-bottom:8px;
      }
      .text-input:focus{outline:none;border-color:var(--gold);background:var(--white);}
      .text-input::placeholder{color:var(--ink-2);}

      /* matching animation */
      .matching{padding:30px 6px;text-align:center;}
      .matching-line{
        height:3px;width:100%;border-radius:3px;margin-bottom:26px;
        background:linear-gradient(90deg,var(--paper-2) 0%,var(--gold) 50%,var(--paper-2) 100%);
        background-size:200% 100%;
        animation:slide 1.2s linear infinite;
      }
      @keyframes slide{from{background-position:200% 0;}to{background-position:-200% 0;}}
      .matching-text{font-size:18px;margin:0 0 22px;color:var(--ink);}
      .matching-steps{display:flex;flex-direction:column;gap:10px;align-items:center;}
      .matching-steps span{
        font-size:14px;color:var(--ink-2);opacity:0;
        animation:fadeUp .5s ease forwards;
      }
      .matching-steps span:nth-child(1){animation-delay:.1s;}
      .matching-steps span:nth-child(2){animation-delay:.6s;}
      .matching-steps span:nth-child(3){animation-delay:1.1s;}

      /* result */
      .result{animation:fadeUp .5s ease;}
      .result-top{display:flex;align-items:flex-start;gap:18px;margin-bottom:20px;}
      .avatar{
        width:58px;height:58px;border-radius:16px;flex-shrink:0;
        display:flex;align-items:center;justify-content:center;
        background:linear-gradient(135deg,var(--ink),var(--ink-soft));
        color:var(--gold-soft);font-family:"Spectral",serif;font-weight:600;font-size:20px;
      }
      .result-id{flex:1;}
      .result-name{font-family:"Spectral",serif;font-size:21px;font-weight:600;}
      .result-grad{font-family:"Inter",sans-serif;font-size:13px;color:var(--gold);font-weight:600;margin-left:8px;}
      .result-role{color:var(--ink);font-size:15px;font-weight:500;margin-top:2px;}
      .result-field{color:var(--ink-2);font-size:13px;margin-top:2px;}
      .match-badge{
        display:inline-flex;align-items:center;gap:7px;
        font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;
        color:var(--ink-soft);background:var(--paper);
        padding:7px 12px;border-radius:999px;border:1px solid var(--line);
        height:fit-content;
      }
      .match-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);}
      .result-blurb{
        font-size:17px;color:var(--ink);line-height:1.55;
        padding:18px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);
        margin:0 0 18px;
      }
      .result-why{font-size:14px;color:var(--ink-2);margin-bottom:24px;}
      .why-label{
        display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
        color:var(--gold);font-weight:600;margin-bottom:5px;
      }
      .result-actions{display:flex;gap:12px;flex-wrap:wrap;}

      /* HOW */
      .steps{list-style:none;margin:0;padding:0;display:grid;gap:8px;}
      .step{
        display:flex;gap:24px;padding:28px 0;border-top:1px solid var(--line);
      }
      .step:last-child{border-bottom:1px solid var(--line);}
      .step-n{
        font-family:"Spectral",serif;font-size:15px;color:var(--gold);
        font-weight:600;padding-top:4px;min-width:34px;
      }
      .step h3{font-size:21px;margin:0 0 8px;}
      .step p{margin:0;color:var(--ink-2);max-width:620px;}

      /* VALUE */
      .value{padding-top:40px;}
      .value-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
      .value-col{
        background:var(--card);border:1px solid var(--line);border-radius:18px;padding:34px;
      }
      .value-col h3{font-size:23px;margin:0 0 14px;}
      .value-col p{margin:0;color:var(--ink-2);}

      /* CTA */
      .cta{max-width:none;background:var(--ink);margin-top:40px;}
      .cta-inner{max-width:var(--maxw);margin:0 auto;padding:0 28px;text-align:center;}
      .cta h2{color:var(--paper);font-size:clamp(28px,4.4vw,46px);margin:0 0 32px;}
      .cta .btn-ghost{color:var(--paper);border-color:var(--gold-soft);}
      .cta .btn-ghost:hover{background:var(--gold);color:var(--ink);border-color:var(--gold);}
      .cta .btn-primary{background:var(--gold);color:var(--ink);}
      .cta .btn-primary:hover{background:var(--gold-soft);}

      /* FOOTER */
      .footer{
        max-width:var(--maxw);margin:0 auto;
        padding:40px 28px 60px;
        display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;
        color:var(--ink-2);font-size:14px;
      }
      .footer .brand{font-size:17px;}

      @media (max-width:720px){
        .nav-links a:not(.nav-cta){display:none;}
        .value-grid{grid-template-columns:1fr;}
        .section{padding:64px 22px;}
        .hero{padding-top:54px;}
        .demo-card{padding:24px;}
        .throughline{height:150px;margin-top:40px;}
      }
      @media (prefers-reduced-motion:reduce){
        *{animation:none!important;}
        .tl-path{stroke-dashoffset:0;}
        .tl-node text{opacity:1;}
      }
    `}</style>
  );
}
