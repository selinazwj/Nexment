import { useMemo, useState } from "react";

const STUDENT = {
  name: "Selina Zhang",
  school: "Boston University",
  program: "Data Science and Economics",
  year: "Class of 2027",
  location: "Boston, MA",
  interests: ["product analytics", "startup strategy", "AI tools", "consumer research"],
  languages: ["English", "Mandarin"],
  summary:
    "Undergraduate student building toward product, data, and startup roles. Looking for mentors who can give concrete recruiting advice, portfolio feedback, and industry context.",
  education: [
    "B.A. track: Data Science and Economics",
    "Relevant work: statistics, databases, machine learning, market research",
  ],
  experience: [
    "Campus research projects on survey data, product positioning, and user behavior",
    "Built prototypes for participant recruitment and student networking workflows",
    "Event and community work with international student groups",
  ],
  projects: [
    "SurveyBridge: research participant recruitment concept",
    "AlumniMatch: mentor recommendation and outreach prototype",
    "Predictive analysis notebooks for business and savings estimation",
  ],
  goals: [
    "Find an internship in product, data, or strategy",
    "Improve resume and LinkedIn positioning",
    "Understand early-career paths from alumni with similar backgrounds",
  ],
};

const MENTORS = [
  {
    id: 1,
    name: "Maya Chen",
    initials: "MC",
    title: "Product Manager",
    company: "Notion",
    school: "Boston University, CAS '18",
    location: "San Francisco, CA",
    ranking: 98,
    fit: "Best overall fit",
    focus: ["Product analytics", "Consumer apps", "Internship recruiting"],
    bio:
      "Maya moved from economics coursework into product analytics, then product management. She mentors students on turning class projects into interview-ready product stories.",
    why:
      "Matches your product analytics interest, startup curiosity, and need for practical recruiting guidance.",
    cv: [
      "Product Manager, Notion",
      "Former Growth Analyst, Spotify",
      "BU Alumni Career Panel speaker",
    ],
    availability: "2 openings this month",
  },
  {
    id: 2,
    name: "Daniel Okafor",
    initials: "DO",
    title: "Data Scientist",
    company: "Spotify",
    school: "Boston University, CDS '19",
    location: "New York, NY",
    ranking: 94,
    fit: "Strong data mentor",
    focus: ["Machine learning", "Portfolio review", "Research to industry"],
    bio:
      "Daniel helps students explain technical projects clearly and decide whether industry, research, or graduate school makes more sense.",
    why:
      "Strong overlap with your data science coursework and project-heavy profile.",
    cv: ["Data Scientist, Spotify", "Former Research Assistant, BU", "M.S. Applied Analytics"],
    availability: "1 opening this month",
  },
  {
    id: 3,
    name: "Priya Nair",
    initials: "PN",
    title: "Software Engineer",
    company: "Stripe",
    school: "Boston University, ENG '17",
    location: "Seattle, WA",
    ranking: 90,
    fit: "Technical interview help",
    focus: ["Backend systems", "Technical interviews", "First job search"],
    bio:
      "Priya is direct, practical, and useful for students who want to understand what technical hiring actually rewards.",
    why:
      "Useful if you decide to pursue more technical AI tooling or engineering-adjacent roles.",
    cv: ["Senior Engineer, Stripe", "Former Engineer, Dropbox", "Mentor for first-gen students"],
    availability: "3 openings this month",
  },
  {
    id: 4,
    name: "Sofia Reyes",
    initials: "SR",
    title: "Strategy Associate",
    company: "McKinsey",
    school: "Boston University, Questrom '16",
    location: "Boston, MA",
    ranking: 86,
    fit: "Business strategy path",
    focus: ["Consulting", "Case interviews", "Business storytelling"],
    bio:
      "Sofia works well with students who are choosing between consulting, startups, and product roles.",
    why:
      "Connects your economics background with strategy recruiting and structured interview prep.",
    cv: ["Associate, McKinsey", "Former Venture Fellow", "BU Questrom alumni mentor"],
    availability: "2 openings this month",
  },
  {
    id: 5,
    name: "Hannah Cho",
    initials: "HC",
    title: "Brand Strategy Lead",
    company: "A24",
    school: "Boston University, COM '15",
    location: "Los Angeles, CA",
    ranking: 81,
    fit: "Creative strategy mentor",
    focus: ["Brand strategy", "Media", "Communications"],
    bio:
      "Hannah helps students turn broad creative interests into a focused portfolio and outreach strategy.",
    why:
      "Good secondary match for communication, storytelling, and positioning work.",
    cv: ["Brand Strategy Lead, A24", "Former Strategist, Wieden+Kennedy", "Portfolio reviewer"],
    availability: "1 opening next month",
  },
];

const QUICK_MESSAGES = [
  "Hi Maya, I matched with you because I am exploring product analytics and startup roles.",
  "I would love feedback on how to position my projects for internships.",
  "Are you available for a 20-minute call sometime next week?",
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("matches");
  const [selectedMentor, setSelectedMentor] = useState(MENTORS[0]);
  const [matchedMentorId, setMatchedMentorId] = useState(null);
  const [messages, setMessages] = useState([
    {
      from: "mentor",
      text: "Thanks for matching. Send over what you are working on and I can point you in the right direction.",
    },
  ]);
  const [draft, setDraft] = useState("");

  const rankedMentors = useMemo(
    () => [...MENTORS].sort((a, b) => b.ranking - a.ranking),
    []
  );

  function handleLogin(event) {
    event.preventDefault();
    setIsLoggedIn(true);
  }

  function handleMatch(mentor) {
    setSelectedMentor(mentor);
    setMatchedMentorId(mentor.id);
    setActiveView("messages");
    setMessages([
      {
        from: "mentor",
        text: `Hi Selina, glad we matched. I can help with ${mentor.focus[0].toLowerCase()} and career planning.`,
      },
    ]);
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { from: "student", text }]);
    setDraft("");
  }

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Style />
      </>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">A</div>
          <div>
            <strong>AlumniMatch</strong>
            <span>Student portal</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Primary">
          <button
            className={activeView === "profile" ? "active" : ""}
            onClick={() => setActiveView("profile")}
            type="button"
          >
            Profile
          </button>
          <button
            className={activeView === "matches" ? "active" : ""}
            onClick={() => setActiveView("matches")}
            type="button"
          >
            Mentor list
          </button>
          <button
            className={activeView === "messages" ? "active" : ""}
            onClick={() => setActiveView("messages")}
            type="button"
          >
            Messages
          </button>
        </nav>

        <div className="student-card">
          <div className="student-avatar">SZ</div>
          <div>
            <strong>{STUDENT.name}</strong>
            <span>{STUDENT.program}</span>
          </div>
        </div>
      </aside>

      <main className="workspace">
        <TopBar />
        {activeView === "profile" && <ProfilePage />}
        {activeView === "matches" && (
          <MentorPage
            mentors={rankedMentors}
            selectedMentor={selectedMentor}
            matchedMentorId={matchedMentorId}
            onSelect={setSelectedMentor}
            onMatch={handleMatch}
          />
        )}
        {activeView === "messages" && (
          <MessagesPage
            mentor={selectedMentor}
            matchedMentorId={matchedMentorId}
            messages={messages}
            draft={draft}
            onDraft={setDraft}
            onSend={sendMessage}
            onQuickMessage={(text) => setDraft(text)}
          />
        )}
      </main>
      <Style />
    </div>
  );
}

function LoginPage({ onLogin }) {
  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-copy">
          <div className="brand-row">
            <div className="brand-mark">A</div>
            <span>AlumniMatch</span>
          </div>
          <h1>Sign in as a student and find the alumni mentor who fits your path.</h1>
          <p>
            A calmer career platform for students: build a serious profile, review
            ranked mentor recommendations, match, and start the conversation.
          </p>
        </div>

        <form className="login-card" onSubmit={onLogin}>
          <div>
            <p className="section-kicker">Student login</p>
            <h2>Welcome back</h2>
          </div>
          <label>
            School email
            <input defaultValue="selina@bu.edu" type="email" />
          </label>
          <label>
            Password
            <input defaultValue="alumnimatch" type="password" />
          </label>
          <button className="primary-button" type="submit">
            Log in as student
          </button>
          <p className="login-note">Prototype login. No account setup required.</p>
        </form>
      </section>
    </main>
  );
}

function TopBar() {
  return (
    <header className="top-bar">
      <div>
        <p className="section-kicker">Boston University network</p>
        <h1>Student mentorship dashboard</h1>
      </div>
      <div className="top-actions">
        <span>Profile strength: 88%</span>
        <button type="button">Export CV</button>
      </div>
    </header>
  );
}

function ProfilePage() {
  return (
    <section className="profile-layout">
      <div className="profile-main">
        <div className="panel intro-panel">
          <div className="large-avatar">SZ</div>
          <div>
            <p className="section-kicker">Student profile</p>
            <h2>{STUDENT.name}</h2>
            <p>{STUDENT.summary}</p>
            <div className="profile-meta">
              <span>{STUDENT.school}</span>
              <span>{STUDENT.year}</span>
              <span>{STUDENT.location}</span>
            </div>
          </div>
        </div>

        <CvSection title="Education" items={STUDENT.education} />
        <CvSection title="Experience" items={STUDENT.experience} />
        <CvSection title="Selected projects" items={STUDENT.projects} />
        <CvSection title="Mentorship goals" items={STUDENT.goals} />
      </div>

      <aside className="profile-aside">
        <div className="panel">
          <h3>Target roles</h3>
          <div className="tag-list">
            {STUDENT.interests.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="panel">
          <h3>Languages</h3>
          <div className="tag-list">
            {STUDENT.languages.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="panel score-panel">
          <h3>Recommendation inputs</h3>
          <dl>
            <div>
              <dt>Field fit</dt>
              <dd>High</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>Medium</dd>
            </div>
            <div>
              <dt>Alumni proximity</dt>
              <dd>BU verified</dd>
            </div>
          </dl>
        </div>
      </aside>
    </section>
  );
}

function CvSection({ title, items }) {
  return (
    <section className="panel cv-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function MentorPage({ mentors, selectedMentor, matchedMentorId, onSelect, onMatch }) {
  return (
    <section className="mentor-layout">
      <div className="mentor-list panel">
        <div className="list-header">
          <div>
            <p className="section-kicker">Ranked recommendations</p>
            <h2>List of mentors</h2>
          </div>
          <span>{mentors.length} alumni</span>
        </div>

        {mentors.map((mentor, index) => (
          <button
            className={"mentor-row" + (selectedMentor.id === mentor.id ? " selected" : "")}
            key={mentor.id}
            onClick={() => onSelect(mentor)}
            type="button"
          >
            <span className="rank">{index + 1}</span>
            <span className="mini-avatar">{mentor.initials}</span>
            <span className="mentor-row-body">
              <strong>{mentor.name}</strong>
              <small>
                {mentor.title}, {mentor.company}
              </small>
              <em>{mentor.fit}</em>
            </span>
            <span className="rank-score">{mentor.ranking}</span>
          </button>
        ))}
      </div>

      <MentorDetail
        mentor={selectedMentor}
        isMatched={matchedMentorId === selectedMentor.id}
        onMatch={() => onMatch(selectedMentor)}
      />
    </section>
  );
}

function MentorDetail({ mentor, isMatched, onMatch }) {
  return (
    <aside className="mentor-detail panel">
      <div className="detail-head">
        <div className="large-avatar mentor-avatar">{mentor.initials}</div>
        <div>
          <p className="section-kicker">Mentor profile</p>
          <h2>{mentor.name}</h2>
          <p>
            {mentor.title} at {mentor.company}
          </p>
        </div>
      </div>

      <div className="match-score">
        <strong>{mentor.ranking}%</strong>
        <span>ranking match</span>
      </div>

      <div className="detail-block">
        <h3>Why recommended</h3>
        <p>{mentor.why}</p>
      </div>

      <div className="detail-block">
        <h3>Background</h3>
        <p>{mentor.bio}</p>
        <ul>
          {mentor.cv.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="tag-list">
        {mentor.focus.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="availability">{mentor.availability}</div>
      <button className="primary-button" onClick={onMatch} type="button">
        {isMatched ? "Matched - open messages" : "Match with this mentor"}
      </button>
    </aside>
  );
}

function MessagesPage({
  mentor,
  matchedMentorId,
  messages,
  draft,
  onDraft,
  onSend,
  onQuickMessage,
}) {
  const hasMatch = matchedMentorId === mentor.id;

  return (
    <section className="messages-layout">
      <div className="panel conversation-panel">
        <div className="conversation-head">
          <div className="mini-avatar">{mentor.initials}</div>
          <div>
            <h2>{mentor.name}</h2>
            <p>
              {mentor.title}, {mentor.company}
            </p>
          </div>
          <span className={hasMatch ? "status online" : "status"}>{hasMatch ? "Matched" : "Not matched"}</span>
        </div>

        <div className="message-thread">
          {!hasMatch && (
            <div className="empty-message">
              Match with {mentor.name} first to start a conversation.
            </div>
          )}
          {hasMatch &&
            messages.map((message, index) => (
              <div className={"message " + message.from} key={`${message.from}-${index}`}>
                {message.text}
              </div>
            ))}
        </div>

        <form className="message-box" onSubmit={onSend}>
          <input
            disabled={!hasMatch}
            onChange={(event) => onDraft(event.target.value)}
            placeholder={hasMatch ? "Write a message..." : "Match first to unlock messaging"}
            value={draft}
          />
          <button className="primary-button" disabled={!hasMatch} type="submit">
            Send
          </button>
        </form>
      </div>

      <aside className="panel quick-panel">
        <h3>Suggested opener</h3>
        <div className="quick-list">
          {QUICK_MESSAGES.map((text) => (
            <button
              disabled={!hasMatch}
              key={text}
              onClick={() => onQuickMessage(text)}
              type="button"
            >
              {text}
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}

function Style() {
  return (
    <style>{`
      :root {
        --bg: #f4f6f8;
        --surface: #ffffff;
        --surface-2: #eef2f5;
        --ink: #1f2933;
        --muted: #607080;
        --quiet: #8a98a8;
        --line: #dce3ea;
        --accent: #1f6f78;
        --accent-dark: #164f56;
        --accent-soft: #dceff1;
        --blue: #355d9c;
        --shadow: 0 18px 45px rgba(31, 41, 51, 0.08);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        background: var(--bg);
        font-family: "Source Sans 3", "Helvetica Neue", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      button,
      input {
        font: inherit;
      }

      button {
        cursor: pointer;
      }

      h1,
      h2,
      h3,
      p {
        margin-top: 0;
      }

      .login-page {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 32px;
        background:
          linear-gradient(90deg, rgba(31,111,120,0.08), transparent 38%),
          var(--bg);
      }

      .login-panel {
        width: min(1040px, 100%);
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 28px;
        align-items: stretch;
      }

      .login-copy,
      .login-card,
      .panel {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 8px;
        box-shadow: var(--shadow);
      }

      .login-copy {
        padding: 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 520px;
      }

      .brand-row,
      .brand-block {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .brand-row span,
      .brand-block strong {
        font-weight: 700;
        letter-spacing: 0;
      }

      .brand-mark {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: grid;
        place-items: center;
        background: var(--accent);
        color: white;
        font-weight: 800;
      }

      .login-copy h1 {
        max-width: 650px;
        font-size: clamp(34px, 5vw, 58px);
        line-height: 1.02;
        letter-spacing: 0;
        margin: 80px 0 24px;
      }

      .login-copy p {
        max-width: 620px;
        color: var(--muted);
        font-size: 19px;
        line-height: 1.55;
      }

      .login-card {
        padding: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 18px;
      }

      .login-card h2,
      .top-bar h1,
      .mentor-list h2,
      .mentor-detail h2,
      .conversation-head h2 {
        margin-bottom: 0;
      }

      .section-kicker {
        margin: 0 0 6px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      label {
        display: grid;
        gap: 8px;
        color: var(--muted);
        font-weight: 700;
      }

      input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 6px;
        padding: 12px 13px;
        color: var(--ink);
        background: white;
      }

      input:focus {
        outline: 3px solid var(--accent-soft);
        border-color: var(--accent);
      }

      .primary-button,
      .top-actions button {
        border: 0;
        border-radius: 6px;
        background: var(--accent);
        color: white;
        padding: 12px 16px;
        font-weight: 800;
      }

      .primary-button:hover,
      .top-actions button:hover {
        background: var(--accent-dark);
      }

      .primary-button:disabled {
        background: var(--quiet);
        cursor: not-allowed;
      }

      .login-note {
        color: var(--quiet);
        font-size: 14px;
        margin-bottom: 0;
      }

      .app-shell {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 264px minmax(0, 1fr);
      }

      .sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        border-right: 1px solid var(--line);
        background: #fbfcfd;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .brand-block span,
      .student-card span {
        display: block;
        color: var(--muted);
        font-size: 13px;
      }

      .side-nav {
        display: grid;
        gap: 6px;
      }

      .side-nav button {
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--muted);
        padding: 11px 12px;
        text-align: left;
        font-weight: 800;
      }

      .side-nav button.active,
      .side-nav button:hover {
        background: var(--accent-soft);
        color: var(--accent-dark);
      }

      .student-card {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: white;
      }

      .student-avatar,
      .mini-avatar,
      .large-avatar {
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        background: var(--surface-2);
        color: var(--accent-dark);
        font-weight: 900;
      }

      .student-avatar,
      .mini-avatar {
        width: 42px;
        height: 42px;
        border-radius: 8px;
      }

      .large-avatar {
        width: 88px;
        height: 88px;
        border-radius: 10px;
        font-size: 25px;
      }

      .mentor-avatar {
        background: var(--accent-soft);
      }

      .workspace {
        padding: 28px;
        min-width: 0;
      }

      .top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 24px;
      }

      .top-bar h1 {
        font-size: 28px;
        letter-spacing: 0;
      }

      .top-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--muted);
        font-weight: 700;
      }

      .profile-layout,
      .mentor-layout,
      .messages-layout {
        display: grid;
        gap: 20px;
      }

      .profile-layout {
        grid-template-columns: minmax(0, 1fr) 320px;
      }

      .profile-main,
      .profile-aside {
        display: grid;
        gap: 20px;
        align-content: start;
      }

      .panel {
        padding: 24px;
      }

      .intro-panel {
        display: flex;
        gap: 20px;
        align-items: flex-start;
      }

      .intro-panel h2,
      .cv-section h3,
      .profile-aside h3,
      .detail-block h3,
      .quick-panel h3 {
        margin-bottom: 10px;
      }

      .intro-panel p,
      .detail-block p,
      .conversation-head p {
        color: var(--muted);
        line-height: 1.55;
        margin-bottom: 0;
      }

      .profile-meta,
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
      }

      .profile-meta span,
      .tag-list span,
      .availability,
      .status {
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--muted);
        padding: 6px 10px;
        font-size: 13px;
        font-weight: 800;
      }

      .tag-list span {
        color: var(--accent-dark);
        background: var(--accent-soft);
      }

      .cv-section ul,
      .detail-block ul {
        margin: 0;
        padding-left: 18px;
        color: var(--muted);
        line-height: 1.7;
      }

      .score-panel dl {
        display: grid;
        gap: 12px;
        margin: 0;
      }

      .score-panel div {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid var(--line);
        padding-bottom: 12px;
      }

      .score-panel div:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }

      .score-panel dt {
        color: var(--muted);
      }

      .score-panel dd {
        margin: 0;
        font-weight: 900;
      }

      .mentor-layout {
        grid-template-columns: minmax(440px, 0.95fr) minmax(360px, 0.7fr);
        align-items: start;
      }

      .list-header,
      .detail-head,
      .conversation-head {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .list-header {
        justify-content: space-between;
        margin-bottom: 18px;
      }

      .list-header > span {
        color: var(--muted);
        font-weight: 800;
      }

      .mentor-row {
        width: 100%;
        display: grid;
        grid-template-columns: 32px 42px minmax(0, 1fr) 54px;
        align-items: center;
        gap: 12px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: white;
        padding: 13px;
        margin-top: 10px;
        text-align: left;
      }

      .mentor-row.selected,
      .mentor-row:hover {
        border-color: var(--accent);
        background: #f8fbfc;
      }

      .rank {
        color: var(--quiet);
        font-weight: 900;
      }

      .mentor-row-body {
        min-width: 0;
      }

      .mentor-row-body strong,
      .mentor-row-body small,
      .mentor-row-body em {
        display: block;
      }

      .mentor-row-body small {
        color: var(--muted);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .mentor-row-body em {
        color: var(--accent);
        font-style: normal;
        font-size: 13px;
        font-weight: 800;
      }

      .rank-score {
        justify-self: end;
        color: var(--blue);
        font-weight: 900;
      }

      .mentor-detail {
        position: sticky;
        top: 28px;
        display: grid;
        gap: 20px;
      }

      .match-score {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 16px;
        background: #f9fbfc;
      }

      .match-score strong {
        color: var(--accent-dark);
        font-size: 30px;
      }

      .match-score span,
      .availability {
        color: var(--muted);
      }

      .detail-block {
        border-top: 1px solid var(--line);
        padding-top: 18px;
      }

      .availability {
        width: fit-content;
        border-radius: 6px;
      }

      .messages-layout {
        grid-template-columns: minmax(0, 1fr) 330px;
        align-items: start;
      }

      .conversation-panel {
        min-height: 640px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 18px;
      }

      .conversation-head {
        border-bottom: 1px solid var(--line);
        padding-bottom: 16px;
      }

      .conversation-head .status {
        margin-left: auto;
      }

      .status.online {
        background: #e4f5e9;
        color: #25633a;
      }

      .message-thread {
        display: flex;
        flex-direction: column;
        gap: 12px;
        justify-content: flex-end;
      }

      .message,
      .empty-message {
        max-width: 68%;
        border-radius: 8px;
        padding: 12px 14px;
        line-height: 1.45;
      }

      .message.mentor {
        background: var(--surface-2);
        color: var(--ink);
      }

      .message.student {
        align-self: flex-end;
        background: var(--accent);
        color: white;
      }

      .empty-message {
        max-width: 100%;
        background: var(--surface-2);
        color: var(--muted);
      }

      .message-box {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 10px;
        border-top: 1px solid var(--line);
        padding-top: 16px;
      }

      .quick-list {
        display: grid;
        gap: 10px;
      }

      .quick-list button {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: white;
        color: var(--muted);
        padding: 12px;
        text-align: left;
        line-height: 1.35;
      }

      .quick-list button:hover:not(:disabled) {
        border-color: var(--accent);
        color: var(--ink);
      }

      .quick-list button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      @media (max-width: 980px) {
        .app-shell,
        .login-panel,
        .profile-layout,
        .mentor-layout,
        .messages-layout {
          grid-template-columns: 1fr;
        }

        .sidebar {
          position: static;
          height: auto;
        }

        .side-nav {
          grid-template-columns: repeat(3, 1fr);
        }

        .student-card {
          margin-top: 0;
        }

        .mentor-detail {
          position: static;
        }
      }

      @media (max-width: 640px) {
        .login-page,
        .workspace,
        .sidebar {
          padding: 18px;
        }

        .login-copy,
        .login-card,
        .panel {
          padding: 20px;
        }

        .login-copy {
          min-height: 0;
        }

        .login-copy h1 {
          margin: 48px 0 18px;
        }

        .top-bar,
        .intro-panel,
        .detail-head,
        .conversation-head {
          align-items: flex-start;
          flex-direction: column;
        }

        .top-actions {
          width: 100%;
          justify-content: space-between;
        }

        .mentor-row {
          grid-template-columns: 26px 42px minmax(0, 1fr);
        }

        .rank-score {
          grid-column: 3;
          justify-self: start;
        }

        .message,
        .empty-message {
          max-width: 100%;
        }

        .message-box {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  );
}
