import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import calendarIcon from "@/assets/calendar-icon.svg";
import handIcon from "@/assets/hand-icon.svg";
import confirmationIcon from "@/assets/confirmation-icon.svg";
import trainingIcon from "@/assets/training-icon.svg";
import calendarCarouselIcon from "@/assets/calendar-carousel-icon.svg";
import planeIcon from "@/assets/plane-icon.svg";
import megaphoneIcon from "@/assets/megaphone-icon.svg";
import celebrationIcon from "@/assets/celebration-icon.svg";

// ─── Typewriter hook ─────────────────────────────────────────────────

function useTypewriter(text: string, speed = 30, startDelay = 0, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      setDone(false);
      return;
    }

    setDisplayed("");
    setDone(false);

    const delayTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}

// ─── Pre-carousel screens ────────────────────────────────────────────

function WelcomeScreen({ onFadeComplete }: { onFadeComplete: () => void }) {
  const { displayed, done } = useTypewriter("Hello Kyra, I'm your JPMC Assistant.", 40, 500);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onFadeComplete, 1500);
      return () => clearTimeout(timer);
    }
  }, [done, onFadeComplete]);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center h-full bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span className="text-[40px] mb-6">👋</span>
      <h1
        className="text-[36px] leading-[44px] tracking-[-0.5px] text-foreground font-light text-center"
        style={{ fontFamily: "'Tiempos Headline', 'Times New Roman', serif" }}
      >
        {displayed}
        <span className="inline-block w-[2px] h-[36px] bg-foreground/40 ml-1 animate-pulse align-middle" />
      </h1>
    </motion.div>
  );
}

function IntroScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const headingText = "I'm here to make your work life a little easier by:";
  const { displayed: headingDisplayed, done: headingDone } = useTypewriter(headingText, 30, 300);

  const features = [
    { icon: calendarIcon, text: "Helping you manage your time by optimizing your calendar" },
    { icon: handIcon, text: "Seamlessly connecting you to people throughout the organization" },
    { icon: confirmationIcon, text: "Keeping you on top of your essential tasks such as gathering feedback and training" },
  ];

  const outroText = "Over time I will get to know you and get smarter about how to work for you. For now, let's start by setting up a few things I can help you with.";

  // Stagger feature typing after heading completes
  const feat0 = useTypewriter(features[0].text, 20, 0, headingDone);
  const feat1 = useTypewriter(features[1].text, 20, 0, feat0.done);
  const feat2 = useTypewriter(features[2].text, 20, 0, feat1.done);
  const featDisplayed = [feat0, feat1, feat2];

  const outro = useTypewriter(outroText, 20, 0, feat2.done);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center pt-[30vh] h-full bg-background px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
    >
      <div style={{ maxWidth: "616px", width: "616px" }}>
        <h2
          className="text-[32px] leading-[24px] tracking-[-0.5px] text-foreground font-light"
          style={{ fontFamily: "'Tiempos Headline', 'Times New Roman', serif" }}
        >
          {headingDisplayed}
        </h2>

        <div className="flex flex-col gap-5 mb-8" style={{ marginTop: "20px" }}>
          {features.map((f, i) => {
            const show = i === 0 ? headingDone : featDisplayed[i - 1].done;
            if (!show && featDisplayed[i].displayed === "") return null;
            return (
              <motion.div
                key={i}
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={f.icon} alt="" className="w-10 h-10 shrink-0" />
                <p className="text-[16px] leading-[24px] text-foreground font-light">
                  {featDisplayed[i].displayed}
                </p>
              </motion.div>
            );
          })}
        </div>

        {feat2.done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <p className="text-[16px] leading-[24px] text-foreground font-light mb-6" style={{ maxWidth: "520px" }}>
              {outro.displayed}
            </p>
          </motion.div>
        )}

        {outro.done && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <button
              onClick={onGetStarted}
              className="px-6 py-2.5 rounded-full text-[14px] leading-[20px] tracking-[0.16px] font-medium transition-colors"
              style={{ backgroundColor: "#202020", color: "#FFFFFF" }}
            >
              Get started
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Carousel data ───────────────────────────────────────────────────

interface CarouselStep {
  icon?: string;
  iconSvg?: string;
  heading: string;
  description: string;
  options?: { icon: string; label: string }[];
}

const steps: CarouselStep[] = [
  {
    iconSvg: calendarCarouselIcon,
    heading: "I can manage and schedule\nmeetings for you.",
    description:
      "If something comes up that needs your time, I can find a slot in your calendar and get it scheduled. Is it okay for me to manage your calendar when needed?",
  },
  {
    iconSvg: planeIcon,
    heading: "I can take care of travel\nplanning for you.",
    description:
      "That means finding the best flights, hotels, and transportation — even helping with expenses afterward. Can I handle travel bookings on your behalf?",
  },
  {
    iconSvg: megaphoneIcon,
    heading: "I can make suggestions to\noptimize the way you work.",
    description:
      "I'll learn how you work and what's important to you so I can help you focus on the right things. Do you want me to make these suggestions for you?",
  },
  {
    iconSvg: celebrationIcon,
    heading: "You're off to a great start!",
    description:
      "I can't wait to get to know you more as we work together. You can always **manage your preferences** later.",
  },
];

// ─── Single carousel step with typewriter ────────────────────────────

function CarouselStepView({
  step,
  onAction,
  isActive,
}: {
  step: CarouselStep;
  onAction: (action: "now" | "later") => void;
  isActive: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [hasBeenActive, setHasBeenActive] = useState(false);

  useEffect(() => {
    if (isActive && !hasBeenActive) setHasBeenActive(true);
  }, [isActive, hasBeenActive]);

  const plainHeading = step.heading.replace(/\n/g, " ");
  const plainDesc = step.description.replace(/\*\*/g, "");

  const heading = useTypewriter(plainHeading, 30, 200, hasBeenActive);
  const desc = useTypewriter(plainDesc, 15, 0, heading.done);


  // Render description with bold markdown
  const renderDesc = (text: string) => {
    if (!step.description.includes("**")) return text;
    // Map displayed text back to bold segments
    const parts = step.description.split("**");
    let charIndex = 0;
    return parts.map((part, i) => {
      const cleanPart = part;
      const start = charIndex;
      const end = charIndex + cleanPart.length;
      charIndex = end;
      const visiblePart = text.slice(start, Math.min(end, text.length));
      if (start >= text.length) return null;
      return i % 2 === 1 ? (
        <span key={i} className="font-semibold" style={{ color: "#8F5A39" }}>{visiblePart}</span>
      ) : (
        <span key={i}>{visiblePart}</span>
      );
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-[30vh] relative"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "616px", width: "616px" }}>
        {step.iconSvg ? (
          <img src={step.iconSvg} alt="" className="w-16 h-16 mb-4 block" />
        ) : (
          <span className="text-[64px] mb-4 block leading-none">{step.icon}</span>
        )}
        <h2
          className="text-[32px] leading-[40px] tracking-[-0.5px] text-foreground mb-4 font-light"
          style={{ fontFamily: "'Tiempos Headline', 'Times New Roman', serif" }}
        >
          {heading.displayed}
        </h2>

        {heading.done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <p
              className="text-[16px] leading-[24px] text-foreground font-light mb-6"
              style={{ maxWidth: "520px" }}
            >
              {renderDesc(desc.displayed)}
            </p>
          </motion.div>
        )}

        {step.options && desc.done && (
          <motion.div
            className="grid grid-cols-2 gap-3 mb-6"
            style={{ maxWidth: "480px" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {step.options.map((opt, i) => (
              <button
                key={opt.label}
                onClick={() => setSelectedOption(i)}
                className={cn(
                  "flex items-center justify-between px-5 py-4 rounded-xl transition-all",
                  selectedOption === i
                    ? "bg-white shadow-sm"
                    : "bg-[#F5F2ED] hover:bg-[#EDE9E2]"
                )}
                style={{ border: "1px solid #E8E4DE" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">{opt.icon}</span>
                  <span className="text-[15px] text-foreground font-medium">{opt.label}</span>
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    selectedOption === i ? "border-foreground" : "border-[#C4C0B9]"
                  )}
                >
                  {selectedOption === i && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {desc.done && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => onAction("now")}
              className="px-6 py-2.5 rounded-full text-[14px] leading-[20px] tracking-[0.16px] font-medium transition-colors"
              style={{ backgroundColor: "#202020", color: "#FFFFFF" }}
            >
              Yes, please
            </button>
            <button
              onClick={() => onAction("later")}
              className="px-6 py-2.5 rounded-full text-[14px] leading-[20px] tracking-[0.16px] font-medium transition-colors hover:bg-[#DDD5C8]"
              style={{ border: "1px solid #7D7A7A", color: "#202020" }}
            >
              Schedule for later
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Main flow ───────────────────────────────────────────────────────

type Phase = "welcome" | "intro" | "carousel";

export function OnboardingFlow() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (phase !== "carousel") return;
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportH = container.clientHeight;
      const center = scrollTop + viewportH / 2;

      let closest = 0;
      let minDist = Infinity;
      stepRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const stepCenter = ref.offsetTop + ref.clientHeight / 2;
        const dist = Math.abs(center - stepCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setCurrentStep(closest);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [phase]);

  const scrollToStep = (index: number) => {
    const target = stepRefs.current[index];
    const container = scrollRef.current;
    if (!target || !container) return;

    const targetTop = target.offsetTop - (container.clientHeight - target.clientHeight) / 2;
    const start = container.scrollTop;
    const distance = targetTop - start;
    const duration = 1200; // ms
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = start + distance * easeInOutCubic(progress);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const handleAction = (stepIndex: number, action: "now" | "later") => {
    if (stepIndex < steps.length - 1) {
      scrollToStep(stepIndex + 1);
    }
  };

  if (phase === "welcome" || phase === "intro") {
    return (
      <div className="flex-1 flex h-full bg-background relative overflow-hidden">
        <AnimatePresence mode="wait">
          {phase === "welcome" && (
            <WelcomeScreen key="welcome" onFadeComplete={() => setPhase("intro")} />
          )}
          {phase === "intro" && (
            <IntroScreen key="intro" onGetStarted={() => setPhase("carousel")} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div
      className="flex-1 flex h-full bg-background relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
        {steps.map((_, i) => (
          <button key={i} onClick={() => scrollToStep(i)} className="transition-all duration-300">
            {currentStep === i ? (
              <div className="w-[3px] h-6 rounded-full bg-foreground" />
            ) : (
              <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 hover:bg-foreground/50" />
            )}
          </button>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { stepRefs.current[i] = el; }}
          >
            <CarouselStepView
              step={step}
              onAction={(action) => handleAction(i, action)}
              isActive={currentStep === i}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
