import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  icon: string;
  heading: string;
  description: string;
  userBubble?: string;
  options?: { icon: string; label: string }[];
}

const steps: OnboardingStep[] = [
  {
    icon: "✈️",
    heading: "I can take care of travel\nplanning for you.",
    description: "That means finding the best flights, hotels, and transportation — even helping with expenses afterward. Can I handle travel bookings on your behalf?",
    userBubble: "Yes, manage my calendar",
  },
  {
    icon: "📢",
    heading: "I can make suggestions to\noptimize the way you work.",
    description: "I'll learn how you work and what's important to you so I can help you focus on the right things. Do you want me to make these suggestions for you?",
    userBubble: "Yes, handle travel for me",
  },
  {
    icon: "📅",
    heading: "I can manage and schedule\nmeetings for you.",
    description: "If something comes up that needs your time, I can find a slot in your calendar and get it scheduled. Is it okay for me to manage your calendar when needed?",
    userBubble: "Yes, optimize the way I work",
  },
  {
    icon: "🔲",
    heading: "I can adapt to how\nyou like to work.",
    description: "You can always drag the corner and resize this window or you can choose from a few default sizes below.",
    options: [
      { icon: "⬜", label: "Default" },
      { icon: "🖥️", label: "Fullscreen" },
      { icon: "📱", label: "Panel" },
      { icon: "🪟", label: "Widget" },
    ],
  },
  {
    icon: "🎉",
    heading: "You're off to a great start!",
    description: "I can't wait to get to know you more as we work together. You can always **manage your preferences** later.",
  },
];

function OnboardingStep({
  step,
  isActive,
  onAction,
}: {
  step: OnboardingStep;
  isActive: boolean;
  onAction: (action: "now" | "later") => void;
}) {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="min-h-screen flex flex-col justify-center px-16 py-20 relative" style={{ minHeight: '100vh' }}>
      {/* User bubble top-right */}
      {step.userBubble && (
        <div className="absolute top-[20%] right-16">
          <div
            className="inline-flex items-center relative"
            style={{
              backgroundColor: "#E9E0D3",
              borderRadius: "16px",
              padding: "12px 24px",
            }}
          >
            <p className="text-[15px] leading-[22.5px] text-foreground">
              {step.userBubble}
            </p>
            <svg
              className="absolute bottom-0 right-[16px]"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ transform: "translateY(10px)" }}
            >
              <path
                d="M16 15.5858C16 16.4767 14.923 16.9229 14.293 16.2929L-0.293 1.70711C-0.923 1.07714 -0.477 0 0.414 0L15 0C15.552 0 16 0.44772 16 1L16 15.5858Z"
                fill="#E9E0D3"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ maxWidth: "616px" }}>
        <span className="text-[40px] mb-4 block">{step.icon}</span>
        <h2
          className="text-[32px] leading-[40px] tracking-[-0.5px] text-foreground mb-4 font-light whitespace-pre-line"
          style={{ fontFamily: "'Tiempos Headline', 'Times New Roman', serif" }}
        >
          {step.heading}
        </h2>
        <p className="text-[16px] leading-[24px] text-foreground font-light mb-6" style={{ maxWidth: "520px" }}>
          {step.description.includes("**") ? (
            <>
              {step.description.split("**").map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="font-semibold underline">
                    {part}
                  </strong>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </>
          ) : (
            step.description
          )}
        </p>

        {/* Layout options grid */}
        {step.options && (
          <div className="grid grid-cols-2 gap-3 mb-6" style={{ maxWidth: "480px" }}>
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
          </div>
        )}

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onAction("now")}
            className="px-6 py-2.5 rounded-full text-[14px] leading-[20px] tracking-[0.16px] font-medium transition-colors"
            style={{ backgroundColor: "#202020", color: "#FFFFFF" }}
          >
            Do it now
          </button>
          <button
            onClick={() => onAction("later")}
            className="px-6 py-2.5 rounded-full text-[14px] leading-[20px] tracking-[0.16px] font-medium transition-colors hover:bg-[#DDD5C8]"
            style={{ border: "1px solid #7D7A7A", color: "#202020" }}
          >
            Schedule for later
          </button>
        </div>
      </div>
    </div>
  );
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-based step tracking
  useEffect(() => {
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
  }, []);

  const scrollToStep = (index: number) => {
    const ref = stepRefs.current[index];
    if (ref && scrollRef.current) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleAction = (action: "now" | "later") => {
    if (currentStep < steps.length - 1) {
      scrollToStep(currentStep + 1);
    }
  };

  return (
    <div className="flex-1 flex h-full bg-background relative overflow-hidden">
      {/* Navigation dots */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToStep(i)}
            className="transition-all duration-300"
          >
            {currentStep === i ? (
              <div className="w-[3px] h-6 rounded-full bg-foreground" />
            ) : (
              <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 hover:bg-foreground/50" />
            )}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { stepRefs.current[i] = el; }}
            style={{ scrollSnapAlign: "start" }}
          >
            <OnboardingStep
              step={step}
              isActive={currentStep === i}
              onAction={handleAction}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
