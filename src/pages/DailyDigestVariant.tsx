import { useState, useEffect } from "react";
import { ExternalLink, CornerDownRight, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import graduationIcon from "@/assets/graduation-icon.png";
import logoSparkle from "@/assets/logo-option-sparkle-v2.png";
import logoAtom from "@/assets/logo-option-atom-v2.png";
import logoOrbit from "@/assets/logo-option-orbit.svg";
import logoOrbitTransparent from "@/assets/logo-option-orbit-v2.svg";

// Local copies of small helpers from ChatArea so this page is self-contained
// and we don't risk breaking the production Daily Digest.
function useTypewriter(text: string, speed = 25, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, Math.min(displayed.length + 2, text.length)));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return { displayed, done };
}

function TypedText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (boldStart > 0) parts.push(<span key={key++}>{remaining.slice(0, boldStart)}</span>);
    const afterStart = remaining.slice(boldStart + 2);
    const boldEnd = afterStart.indexOf("**");
    if (boldEnd === -1) {
      parts.push(<strong key={key++}>{afterStart}</strong>);
      break;
    }
    parts.push(<strong key={key++}>{afterStart.slice(0, boldEnd)}</strong>);
    remaining = afterStart.slice(boldEnd + 2);
  }
  return <>{parts}</>;
}

function VariantWelcome({ logo, label, transparent }: { logo: string; label: string; transparent?: boolean }) {
  const [showLogo, setShowLogo] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [thinkingDone, setThinkingDone] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setShowLogo(true), 200);
    const b = setTimeout(() => setThinking(true), 500);
    const c = setTimeout(() => { setThinking(false); setThinkingDone(true); }, 3500);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, []);

  const heading = useTypewriter(`Good morning, Kyra`, 45, thinkingDone ? 100 : 99999);
  const para1Text = "There are a few things that need your attention. You have a **Data Security and Compliance Training** that is due today. You also have a pending **Mid Year Feedback Request** due by end of the week.";
  const para1 = useTypewriter(para1Text, 15, heading.done ? 150 : 99999);
  const para2 = useTypewriter("Let's start with the training.", 18, para1.done ? 150 : 99999);

  return (
    <div className="flex items-start pt-[80px] mx-auto" style={{ width: '740px' }}>
      <div className="absolute -mt-8 ml-[-8px] text-[11px] uppercase tracking-[0.12em]" style={{ color: '#666663' }}>{label}</div>
      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={showLogo ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className={`relative w-10 h-10 overflow-hidden rounded-full ${transparent ? '' : 'bg-white'}`}>
          <img src={logo} alt="Assistant" className="w-10 h-10 relative z-10 object-cover" width={40} height={40} loading="lazy" />
          {thinking && !thinkingDone && (
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['-100% -100%', '200% 200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>
      <div className="flex flex-col">
        {thinkingDone && (
          <>
            <h2 className="text-[24px] leading-[32px] text-foreground mb-2 tracking-[0] mt-0.5 font-light" style={{ fontFamily: "'Tiempos Headline', 'Times New Roman', serif" }}>
              {heading.displayed}
            </h2>
            {heading.done && (
              <>
                <div className="text-[16px] leading-[24px] text-foreground font-normal" style={{ width: '616px' }}>
                  <p className="mb-4"><TypedText text={para1.displayed} /></p>
                  {para1.done && <p className="mb-4">{para2.displayed}</p>}
                </div>

                {para1.done && para2.done && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                    <div className="bg-card rounded-2xl shadow-sm w-full overflow-hidden mb-6">
                      <div className="flex items-start gap-4 p-6">
                        <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                          <img src={graduationIcon} alt="Training" className="w-10 h-10" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-foreground">Data Security and Compliance</p>
                          <p className="text-[14px] leading-[20px] tracking-[0.16px] font-normal mt-0.5" style={{ color: '#666663' }}>Estimated time to complete: 25 min</p>
                        </div>
                        <button className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px] font-normal whitespace-nowrap" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                          Go to My Learning <ExternalLink className="w-[13px] h-[13px]" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px] font-normal" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                        <CornerDownRight className="w-4 h-4" />
                        Remind me later
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px] font-normal" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                        <CornerDownRight className="w-4 h-4" />
                        Book time to do it later
                      </button>
                    </div>
                    <div className="flex items-center gap-3" style={{ color: '#202020' }}>
                      <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
                      <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
                      <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const DailyDigestVariant = () => {
  // Three logo options on the original travertine background.
  const options = [
    { logo: logoSparkle, label: 'Option 1 — Sparkle' },
    { logo: logoAtom, label: 'Option 3 — Atom' },
    { logo: logoOrbit, label: 'Option 4 — Orbit' },
  ];
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex flex-col gap-16 py-12">
        {options.map((opt) => (
          <div key={opt.label} className="relative">
            <VariantWelcome logo={opt.logo} label={opt.label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyDigestVariant;