import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  User, Bot, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Scale, CalendarClock,
  ClipboardCheck, Repeat, Handshake, Receipt, Landmark, Sparkles, Fish,
} from "lucide-react";

export const JURY_URL = "https://sparkathon-hazel.vercel.app/s/judge-demo?label=judge";

const d = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Placeholder value – dashed box so it's easy to spot and replace. */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="ph">{children}</span>;
}

function CountUp({ to, decimals = 0, duration = 1400 }: { to: number; decimals?: number; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{v.toFixed(decimals)}</>;
}

function Frame({ kicker, children }: { kicker?: string; children: ReactNode }) {
  return (
    <div className="slide-content px-[140px] py-[110px] flex flex-col">
      {kicker && <div className="slide-kicker text-helped rise mb-8">{kicker}</div>}
      {children}
    </div>
  );
}

/* 1 HOOK */
function Hook() {
  return (
    <Frame>
      <div className="flex h-full items-center gap-24">
        <div className="flex-1">
          <h1 className="slide-title-lg rise" style={{ ...d(150), fontSize: "152px", lineHeight: 0.96 }}>
            The AI said <span className="serif text-hurt">approve.</span>
            <br />
            She did.
          </h1>
          <p className="slide-subtitle text-ink/70 mt-10 rise" style={{ ...d(400), fontSize: "54px" }}>The policy said no.</p>
        </div>
        <div className="rise" style={d(400)}><div className="floaty">
          <div className="w-[400px] h-[560px] rounded-[64px] border-[10px] border-ink/15 bg-navy-2 p-8 flex flex-col gap-6 shadow-2xl">
            <div className="mx-auto h-3 w-28 rounded-full bg-ink/20" />
            <div className="self-end glass px-6 py-4 slide-caption max-w-[80%]">Is this refund allowed?</div>
            <div className="glass p-6 relative">
              <div className="flex items-center gap-3 slide-caption text-ink/80"><Bot className="size-7" /> Assistant</div>
              <p className="slide-caption mt-3">Yes, definitely. Approve it. ✨</p>
              <div className="absolute -top-6 -right-6 size-16 rounded-full bg-hurt grid place-items-center pulse">
                <AlertTriangle className="size-9" />
              </div>
            </div>
            <div className="mt-auto rounded-full bg-helped/90 text-navy text-center py-4 slide-caption font-semibold">Approve</div>
          </div>
        </div></div>
      </div>
    </Frame>
  );
}

/* 2 PROBLEM */
function Problem() {
  const node = "glass rounded-[32px] px-16 py-12 flex flex-col items-center gap-4";
  return (
    <Frame kicker="The problem statement">
      <h2 className="slide-title rise" style={d(100)}>
        AI <span className="serif text-helped">helps.</span> AI <span className="serif text-hurt">hurts.</span>
      </h2>
      <p className="slide-subtitle text-ink/70 mt-6 rise" style={d(350)}>Most tools can't tell the difference.</p>

      <div className="flex-1 flex items-center justify-center gap-24">
        <div className="relative w-[640px] h-[640px] rise" style={d(500)}>
          <svg viewBox="0 0 640 640" className="absolute inset-0">
            <defs>
              <marker id="ah" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
                <path d="M0,0 L12,6 L0,12 z" fill="currentColor" className="text-ink/40" />
              </marker>
            </defs>
            <circle cx="320" cy="320" r="230" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="14 14" className="text-ink/30 spin-slow" />
          </svg>
          {[
            { x: 320, y: 90, icon: Bot, l: "AI suggests" },
            { x: 519, y: 435, icon: User, l: "Human checks", q: true },
            { x: 121, y: 435, icon: CheckCircle2, l: "Decision" },
          ].map((n, i) => (
            <div key={n.l} className="absolute -translate-x-1/2 -translate-y-1/2 rise" style={{ left: n.x, top: n.y, ...d(700 + i * 250) }}>
              <div className="relative glass rounded-full size-[180px] flex flex-col items-center justify-center gap-2">
                <n.icon className="size-16 text-ink/80" />
                <div className="slide-caption text-ink/75">{n.l}</div>
                {n.q && (
                  <div className="absolute -top-4 -right-4 size-16 rounded-full bg-hurt grid place-items-center pulse">
                    <span className="text-[42px] font-semibold text-navy leading-none">?</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="slide-subtitle text-ink/85 max-w-[560px] rise" style={d(1500)}>
          Checking — <br /><span className="serif text-hurt">or just approving?</span>
        </p>
      </div>
    </Frame>
  );
}

/* 3 MEASURE */
function Measure() {
  const cell = "rounded-[32px] p-10 flex items-center gap-6 slide-subtitle font-medium rise";
  return (
    <Frame kicker="What we measure">
      <div className="flex-1 grid grid-cols-[240px_1fr_1fr] grid-rows-[60px_1fr_1fr] gap-6 mt-4">
        <div />
        <div className="slide-body text-ink/80 text-center rise">AI right</div>
        <div className="slide-body text-ink/80 text-center rise">AI wrong</div>
        <div className="slide-body text-ink/80 self-center rise">Followed</div>
        <div className={`${cell} bg-helped/15 text-helped`} style={d(200)}><Sparkles className="size-12" />Helped</div>
        <div className="rise" style={d(400)}><div className={`${cell.replace(" rise","")} h-full bg-hurt text-paper font-semibold pulse`}><AlertTriangle className="size-12" />Followed blindly</div></div>
        <div className="slide-body text-ink/80 self-center rise">Ignored</div>
        <div className={`${cell} bg-amber/15 text-amber`} style={d(600)}>Missed advice</div>
        <div className={`${cell} bg-helped/15 text-helped`} style={d(800)}><ShieldCheck className="size-12" />Caught it</div>
      </div>
      <p className="slide-subtitle mt-10 text-center rise" style={d(1100)}>
        Accuracy hides this. <span className="serif text-helped">Reliance shows it.</span>
      </p>
    </Frame>
  );
}

/* 4 CENTAUR TEST */
function Centaur() {
  const steps = [
    { n: 1, icon: User, t: "Answer alone" },
    { n: 2, icon: Bot, t: "See AI advice", s: "some secretly wrong 🤫" },
    { n: 3, icon: CheckCircle2, t: "Final answer" },
  ];
  return (
    <Frame kicker="The Centaur Test">
      <h2 className="slide-title rise flex items-center gap-6" style={d(100)}>
        A <span className="serif text-helped">phishing simulation</span> for AI advice. <Fish className="size-20 text-helped" />
      </h2>
      <div className="flex-1 flex items-center justify-between gap-6">
        {steps.map((s, i) => (
          <div key={s.n} className="contents">
            <div className="glass flex-1 p-12 h-[380px] flex flex-col rise" style={d(400 + i * 300)}>
              <div className="flex items-center justify-between">
                <s.icon className="size-20 text-helped" />
                <span className="text-[96px] font-semibold text-ink/20 leading-none">{s.n}</span>
              </div>
              <div className="slide-subtitle mt-auto font-medium">{s.t}</div>
              {s.s && <div className="slide-body mt-2 text-hurt">{s.s}</div>}
            </div>
            {i < 2 && <ArrowRight className="size-16 text-ink/45 rise shrink-0" style={d(550 + i * 300)} />}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 rise" style={d(1400)}>
        {["People alone", "AI alone", "People + AI"].map((c) => (
          <span key={c} className="slide-chrome glass font-medium text-ink px-8 py-3 !rounded-full">{c}</span>
        ))}
      </div>
    </Frame>
  );
}

/* 6 RESULTS */
function Results() {
  const rows = [
    { l: "In some cases", w: "AI alone did best", icon: Bot, c: "text-ink" },
    { l: "In others", w: "people + AI did best", icon: Handshake, c: "text-helped" },
    { l: "And sometimes", w: "people alone did best", icon: User, c: "text-ink/70" },
  ];
  return (
    <Frame kicker="What our pilot showed">
      <h2 className="slide-title rise">It depends on <span className="serif text-helped">the scenario.</span></h2>
      <div className="flex-1 flex flex-col justify-center gap-8">
        {rows.map((r, i) => (
          <div key={r.l} className="glass flex items-center gap-10 px-12 py-8 rise" style={d(300 + i * 250)}>
            <r.icon className={`size-14 ${r.c}`} />
            <span className="slide-subtitle text-ink/60 w-[320px] whitespace-nowrap">{r.l}</span>
            <ArrowRight className={`size-10 ${r.c}`} />
            <span className={`slide-subtitle font-medium ${r.c}`}>{r.w}</span>
          </div>
        ))}
      </div>
      <p className="slide-subtitle rise" style={d(1200)}>
        We can't assume. <span className="serif text-hurt">We have to measure.</span>
      </p>
    </Frame>
  );
}

/* 8 ANY COMPANY */
function AnyCompany() {
  const cards = [
    { icon: Receipt, t: "Refund policy", s: "today" },
    { icon: Landmark, t: "Bank KYC alerts", s: "today" },
    { icon: Sparkles, t: "Your workflow", s: "next", dashed: true },
  ];
  return (
    <Frame kicker="Any company's cases">
      <h2 className="slide-title rise">Same engine. <span className="serif text-helped">Your cases.</span></h2>
      <div className="flex-1 flex items-center gap-8">
        {cards.map((c, i) => (
          <div key={c.t} className="contents">
            <div className={`flex-1 h-[360px] p-12 flex flex-col rise rounded-[32px] ${c.dashed ? "border-4 border-dashed border-helped/60" : "glass"}`} style={d(300 + i * 250)}>
              <c.icon className={`size-20 ${c.dashed ? "text-helped" : "text-ink/80"}`} />
              <div className="slide-subtitle font-medium mt-auto">{c.t}</div>
              <div className={`slide-chrome mt-3 ${c.dashed ? "text-helped" : "text-ink/85"}`}>{c.s}</div>
            </div>
            {i < 2 && <ArrowRight className="size-14 text-ink/45 shrink-0" />}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 9 WHY NOW */
function WhyNow() {
  return (
    <Frame kicker="Why now">
      <h2 className="slide-title rise">A year to prove <span className="serif text-helped">oversight works.</span></h2>
      <div className="flex-1 relative mt-10">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-ink/35" />
        <div className="grid grid-cols-2 gap-24 h-full">
          <div className="flex flex-col justify-start rise" style={d(400)}>
            <Scale className="size-16 text-helped" />
            <div className="slide-subtitle font-medium mt-6">EU AI Act · Art. 14</div>
            <p className="slide-body text-ink/85 mt-3 max-w-[700px]">Overseers must know automation bias.</p>
          </div>
          <div className="flex flex-col justify-end rise" style={d(800)}>
            <CalendarClock className="size-16 text-hurt" />
            <div className="slide-subtitle font-medium mt-6">2 Dec 2027</div>
            <p className="slide-body text-ink/85 mt-3">High-risk rules apply.</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 10 MARKET */
function Market() {
  const dots = [
    { t: "Model eval tools", x: 30, y: 82 },
    { t: "AI skills tests", x: 18, y: 30 },
    { t: "AI judgment quizzes", x: 42, y: 18 },
  ];
  return (
    <Frame kicker="Market & competition">
      <div className="flex-1 grid grid-cols-[1fr_1.1fr] gap-20">
        <div className="flex flex-col justify-center gap-16">
          <div className="rise" style={d(200)}>
            <div className="text-[100px] leading-none font-semibold">$<CountUp to={0.9} decimals={1} />B <span className="text-helped">→</span> $<CountUp to={5.8} decimals={1} />B</div>
            <p className="slide-body text-ink/85 mt-4">AI governance, 2024 → 2029</p>
          </div>
          <div className="rise" style={d(500)}>
            <div className="text-[100px] leading-none font-semibold">$<CountUp to={1.9} decimals={1} />B</div>
            <p className="slide-body text-ink/85 mt-4">security awareness training — our playbook</p>
          </div>
        </div>
        <div className="relative glass rise" style={d(300)}>
          <div className="absolute left-1/2 top-10 bottom-10 w-px bg-ink/35" />
          <div className="absolute top-1/2 left-10 right-10 h-px bg-ink/35" />
          <div className="absolute bottom-3 left-0 right-0 text-center slide-chrome text-ink/85">knowledge → behaviour</div>
          <div className="absolute top-3 left-0 right-0 text-center slide-chrome text-ink/85">↑ tests people · ↓ tests AI</div>
          {dots.map((p, i) => (
            <div key={p.t} className="absolute flex items-center gap-3 rise" style={{ left: `${p.x}%`, top: `${p.y}%`, ...d(800 + i * 200) }}>
              <span className="size-5 rounded-full bg-ink/40 shrink-0" />
              <span className="slide-chrome text-ink/85">{p.t}</span>
            </div>
          ))}
          <div className="absolute flex items-center gap-4 rise" style={{ left: "62%", top: "12%", ...d(1500) }}>
            <span className="size-10 rounded-full bg-helped pulse shrink-0" />
            <span className="slide-caption font-semibold text-helped">The Centaur Test</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 11 BUSINESS */
function Business() {
  const tiles = [
    { icon: ClipboardCheck, t: "Reliance assessment", s: "4 weeks · fixed fee" },
    { icon: Repeat, t: "Quarterly re-test", s: "Subscription · audit evidence" },
    { icon: Handshake, t: "Channel", s: "Assurance & audit firms" },
  ];
  return (
    <Frame kicker="Business model">
      <h2 className="slide-title rise">Test the humans. <span className="serif text-helped">Every quarter.</span></h2>
      <div className="flex-1 grid grid-cols-3 gap-10 mt-14">
        {tiles.map((x, i) => (
          <div key={x.t} className="glass p-12 flex flex-col rise" style={d(300 + i * 250)}>
            <div className="size-24 rounded-3xl bg-helped/15 grid place-items-center"><x.icon className="size-12 text-helped" /></div>
            <div className="slide-subtitle font-medium mt-auto">{x.t}</div>
            <p className="slide-body text-ink/65 mt-3">{x.s}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 12 CLOSE */
function Close() {
  return (
    <Frame>
      <div className="flex-1 flex items-center gap-24">
        <div className="flex-1">
          <p className="slide-body text-ink/70 rise">Everyone relies on the human in the loop. Nobody tests it.</p>
          <div className="text-[160px] leading-none mt-6 serif text-helped rise" style={d(500)}>Now you can.</div>
          <p className="slide-subtitle mt-12 rise" style={d(900)}>Your turn — <span className="serif text-hurt">1 minute.</span></p>
          <div className="slide-body mt-14 text-ink/85 rise" style={d(1300)}>Jay Shiroya · Srivathsa N Rao · Pranav Tiwari · Bohdan Zdorovets</div>
          <div className="slide-chrome mt-3 text-helped rise" style={d(1400)}>#NiTSparkathon</div>
        </div>
        <div className="rise rounded-[40px] p-10 glass text-center" style={d(1100)}>
          <QRCodeSVG value={JURY_URL} size={430} bgColor="transparent" fgColor="#1b2540" level="M" />
          <div className="slide-chrome text-ink/60 mt-5">scan to play</div>
        </div>
      </div>
    </Frame>
  );
}

export const slides = [
  { title: "Would you notice?", C: Hook },
  { title: "The problem", C: Problem },
  { title: "The Centaur Test", C: Centaur },
  { title: "What we measure", C: Measure },
  { title: "Results", C: Results },
  { title: "Any company's cases", C: AnyCompany },
  { title: "Why now", C: WhyNow },
  { title: "Market & competition", C: Market },
  { title: "Business model", C: Business },
  { title: "Close", C: Close },
];
