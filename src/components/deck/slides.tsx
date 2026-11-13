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
          <h1 className="slide-title-lg rise" style={d(150)}>
            The AI said <span className="serif text-hurt">approve.</span>
            <br />
            She did.
          </h1>
          <p className="slide-subtitle text-ink/70 mt-8 rise" style={d(400)}>The policy said no.</p>
          <div className="mt-16 flex items-end gap-8 rise" style={d(600)}>
            <div className="text-[200px] leading-none font-semibold tracking-tight text-hurt">40%</div>
            <p className="slide-caption text-ink/60 pb-8">6 of 15 answers · 4 people · our pilot</p>
          </div>
        </div>
        <div className="rise" style={d(400)}><div className="floaty">
          <div className="w-[400px] h-[720px] rounded-[64px] border-[10px] border-ink/15 bg-navy-2 p-8 flex flex-col gap-6 shadow-2xl">
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
  const rows = [
    { icon: Scale, text: "AI helps. AI hurts. Most tools can't tell the difference.", tone: "text-ink" },
    { icon: Handshake, text: "So we test three: human alone · AI alone · human + AI", tone: "text-ink" },
    { icon: AlertTriangle, text: "And we measure reliance: followed · ignored · followed too readily", tone: "text-hurt" },
  ];
  return (
    <Frame kicker="The problem statement">
      <h2 className="slide-title rise" style={d(100)}>
        Pairing people with AI <span className="serif text-helped">can help.</span>
      </h2>
      <h2 className="slide-title rise text-hurt mt-4" style={d(300)}>It can also make wrong feel right.</h2>
      <div className="mt-16 flex flex-col gap-6">
        {rows.map((r, i) => (
          <div key={r.text} className="rise glass rounded-full px-10 py-7 flex items-center gap-8" style={d(600 + i * 220)}>
            <div className="size-16 rounded-full bg-ink/10 grid place-items-center shrink-0">
              <r.icon className="size-8 text-ink/80" />
            </div>
            <div className={`slide-body ${r.tone}`}>{r.text}</div>
          </div>
        ))}
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

/* 5 JURY */
function Jury() {
  return (
    <Frame kicker="Live jury test">
      <div className="flex-1 flex items-center gap-28">
        <div className="flex-1">
          <h2 className="slide-title-lg rise" style={d(100)}>Your turn.<br /><span className="serif text-helped">1 minute.</span></h2>
          <p className="slide-subtitle text-ink/85 mt-12 rise" style={d(400)}>3 questions.<br />One AI answer is wrong. 👀</p>
        </div>
        <div className="rise rounded-[40px] p-10 glass" style={d(300)}>
          <QRCodeSVG value={JURY_URL} size={560} bgColor="transparent" fgColor="#1b2540" level="M" />
        </div>
      </div>
    </Frame>
  );
}

/* 6 RESULTS */
function Results() {
  const bars = [
    { l: "People alone", v: "46%", h: 55, c: "bg-ink/25" },
    { l: "AI alone", v: "67%", h: 70, c: "bg-ink/40" },
    { l: "People + AI", v: "52%", h: 62, c: "bg-helped" },
  ];
  return (
    <Frame kicker="Results">
      <h2 className="slide-title rise">Are people + AI <span className="serif text-helped">better</span> than either?</h2>
      <div className="flex-1 flex items-end gap-24 mt-8">
        <div className="flex items-end gap-14 h-[600px]">
          {bars.map((b, i) => (
            <div key={b.l} className="flex flex-col items-center justify-end h-full w-[220px]">
              <div className="slide-subtitle font-semibold mb-4 rise" style={d(900 + i * 200)}>{b.v}</div>
              <div className={`w-full rounded-t-[28px] grow ${b.c}`} style={{ height: `${b.h}%`, ...d(300 + i * 200) }} />
              <div className="slide-caption text-ink/85 mt-4">{b.l}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 pb-20 rise" style={d(1400)}>
          <div className="glass p-14 inline-block">
            <div className="slide-kicker text-ink/80">Centaur gain</div>
            <div className="text-[150px] leading-none font-semibold text-hurt mt-4">−15 <span className="slide-subtitle">pts</span></div>
            <div className="slide-caption text-ink/85 mt-6">4 people · 46 answers · 95% CI −41 to +8 pts</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 7 WORSE */
function Worse() {
  const cards: { v: string; t: string; s?: string; small?: boolean }[] = [
    { v: "2 times", t: "switched away from a right answer" },
    { v: "7%", t: "ended wrong — and more confident" },
    { v: "Prediction on record", t: "AI shown first: fewer mistakes caught?", s: "Written before any data. Test running now.", small: true },
  ];
  return (
    <Frame kicker="When AI makes people worse">
      <h2 className="slide-title rise">The <span className="serif text-hurt">quiet</span> damage.</h2>
      <div className="flex-1 grid grid-cols-3 gap-10 mt-16">
        {cards.map((c, i) => (
          <div key={c.v} className="glass p-12 flex flex-col rise border-t-4 !border-t-hurt" style={d(300 + i * 250)}>
            <div className={`font-semibold text-hurt leading-none ${c.small ? "slide-subtitle mt-2" : "text-[100px]"}`}>{c.v}</div>
            <p className="slide-body text-ink/80 mt-auto">{c.t}</p>
            {c.s && <p className="slide-caption text-ink/60 mt-3">{c.s}</p>}
          </div>
        ))}
      </div>
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
      <div className="flex-1 flex items-center gap-20">
        <div className="flex-1">
          <h2 className="slide-title rise text-ink/80">Everyone relies on the human in the loop. Nobody tests it.</h2>
          <div className="text-[180px] leading-none mt-12 serif text-helped rise" style={d(700)}>Now you can.</div>
          <div className="slide-body mt-16 text-ink/85 rise" style={d(1200)}>Jay Shiroya · Srivathsa N Rao · Pranav Tiwari · Bohdan Zdorovets</div>
          <div className="slide-chrome mt-4 text-helped rise" style={d(1300)}>#NiTSparkathon</div>
        </div>
        <div className="rise glass p-8" style={d(1000)}>
          <QRCodeSVG value={JURY_URL} size={300} bgColor="transparent" fgColor="#1b2540" />
        </div>
      </div>
    </Frame>
  );
}

export const slides = [
  { title: "Would you notice?", C: Hook },
  { title: "The problem", C: Problem },
  { title: "What we measure", C: Measure },
  { title: "The Centaur Test", C: Centaur },
  { title: "Live jury test", C: Jury },
  { title: "Results", C: Results },
  { title: "When AI makes people worse", C: Worse },
  { title: "Any company's cases", C: AnyCompany },
  { title: "Why now", C: WhyNow },
  { title: "Market & competition", C: Market },
  { title: "Business model", C: Business },
  { title: "Close", C: Close },
];
