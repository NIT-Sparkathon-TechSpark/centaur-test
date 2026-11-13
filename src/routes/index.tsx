import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { slides } from "@/components/deck/slides";

type Search = { slide?: number };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const n = Number(s["slide"]);
    return Number.isFinite(n) && n >= 1 ? { slide: Math.floor(n) } : {};
  },
  head: () => ({
    meta: [
      { title: "The Centaur Test — Pitch Deck" },
      { name: "description", content: "Would you notice if your AI was wrong? A phishing simulation for AI advice, built at NiT Sparkathon." },
      { property: "og:title", content: "The Centaur Test — Pitch Deck" },
      { property: "og:description", content: "We test whether the human in the loop actually catches the AI's mistakes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

function Deck() {
  const { slide } = Route.useSearch();
  const navigate = Route.useNavigate();
  const total = slides.length;
  const idx = Math.min(total - 1, Math.max(0, (slide ?? 1) - 1));
  const current = slides[idx]!;
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  const go = useCallback(
    (i: number) => {
      const n = Math.min(total - 1, Math.max(0, i));
      navigate({ search: { slide: n + 1 }, replace: true });
    },
    [navigate, total],
  );

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown", "Enter"].includes(e.key)) { e.preventDefault(); go(idx + 1); }
      else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); go(idx - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
      else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, idx, total]);

  useEffect(() => {
    document.title = `${idx + 1}/${total} — ${current.title}`;
  }, [idx, total]);

  const touchX = useRef<number | null>(null);
  const S = current.C;

  return (
    <div
      ref={box}
      className="deck fixed inset-0 overflow-hidden select-none cursor-pointer"
      onClick={(e) => go(e.clientX < window.innerWidth / 3 ? idx - 1 : idx + 1)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? idx + 1 : idx - 1);
        touchX.current = null;
      }}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: 1920, height: 1080, marginLeft: -960, marginTop: -540, transform: `scale(${scale})` }}
      >
        <div key={idx} className="rise" style={{ animationDuration: ".5s" }}>
          <S />
        </div>
        <div className="absolute bottom-10 right-14 slide-chrome text-white/40 tabular-nums">
          {String(idx + 1).padStart(2, "0")} / {total}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-helped transition-all duration-500" style={{ width: `${((idx + 1) / total) * 100}%` }} />
    </div>
  );
}
