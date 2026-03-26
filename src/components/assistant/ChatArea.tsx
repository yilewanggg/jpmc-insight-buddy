import { useState, useRef, useEffect } from "react"; // v3
import { ArrowRight, CornerDownRight, ThumbsUp, ThumbsDown, MoreHorizontal, GraduationCap, ExternalLink, Calendar, Plus, Star, MapPin, Sparkles } from "lucide-react";
import calendarIcon from "@/assets/calendar-icon.svg";
import jpmcLogo from "@/assets/jpmc-logo-transparent.png";
import graduationIcon from "@/assets/graduation-icon.png";
import trainingIcon from "@/assets/training-icon.svg";
import raviPhoto from "@/assets/ravi-photo.jpg";
import priyaPhoto from "@/assets/priya-photo.jpg";
import seatIcon from "@/assets/seat-icon.svg";
import confirmationIcon from "@/assets/confirmation-icon.svg";
import feedbackCardIcon from "@/assets/feedback-card.svg";
import carmenProfile from "@/assets/carmen-profile.png";
import handIcon from "@/assets/hand-icon.svg";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { DailyScheduleWelcomeScreen, DailyScheduleResponse, MoveDesignJamResponse } from "@/components/assistant/DailyScheduleWelcomeScreen";
import { OnboardingFlow } from "@/components/assistant/OnboardingFlow";

export type ChatFlow = "daily-digest" | "feedback" | "request-feedback" | "book-a-seat" | "daily-schedule" | "onboarding";


interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const welcomeSuggestions = [
  "Summarize the latest compliance updates",
  "Show my pending tasks",
  "Draft a meeting agenda for sprint review",
  "Explain the remote work policy",
];

// Simulated responses
const mockResponses: Record<string, string> = {
  default: `Here's what I found:\n\n**Key points:**\n- I've reviewed the relevant internal documents\n- Based on current policies and available data\n- Let me know if you need more detail on any area\n\nAnything else I can help with?`,
  compliance: `## Compliance updates\n\nHere are the key compliance updates for Q1 2026:\n\n1. **Data privacy** — New GDPR amendments take effect April 1\n2. **AML training** — Annual refresher due by March 31\n3. **Code of conduct** — Updated remote work addendum published\n4. **Vendor risk** — New third-party assessment framework rolled out\n\n> Your annual compliance training deadline is **March 20, 2026**.\n\nWould you like me to enroll you in any of these courses?`,
  tasks: `## Your pending tasks\n\n| Task | Due date | Priority |\n|------|----------|----------|\n| Annual compliance training | Mar 20 | High |\n| Q1 risk assessment review | Mar 18 | High |\n| Travel expense report | Mar 22 | Medium |\n| Data privacy refresher | Mar 25 | Medium |\n\nYou have **4 pending tasks**. Would you like help getting started on any of these?`,
  meeting: `## Sprint review agenda\n\n**Date:** March 15, 2026 | **Duration:** 60 minutes\n\n1. **Opening and recap** (5 min)\n   - Sprint goals review\n   - Attendance check\n\n2. **Demo and deliverables** (25 min)\n   - Feature showcase\n   - Technical achievements\n\n3. **Metrics review** (10 min)\n   - Velocity and burndown\n   - Quality metrics\n\n4. **Retrospective highlights** (10 min)\n   - What went well\n   - Areas for improvement\n\n5. **Next sprint preview** (10 min)\n   - Upcoming priorities\n   - Resource allocation\n\nShall I send calendar invites to your team?`,
  policy: `## Remote work policy\n\nUpdated February 2026\n\n**Key changes:**\n\n- **Hybrid model**: Minimum 3 days in-office per week (up from 2)\n- **Core hours**: 10:00 AM – 3:00 PM ET for all team members\n- **Equipment**: Up to $1,500 annual home office stipend\n- **International remote**: Requires VP+ approval, max 4 weeks per year\n\n**Eligibility:**\n- All full-time employees after 90-day onboarding\n- Role must be classified as remote-eligible\n\nFor full details, see the [HR Portal](#) or contact your HR business partner.\n\nWould you like me to check your role's eligibility?`,
};

const BLOCK_TIME_RESPONSE = "__BLOCK_TIME__";
const ONBOARDING_RESPONSE = "__ONBOARDING__";
const CHOOSE_RAVI_RESPONSE = "__CHOOSE_RAVI__";
const REMIND_ME_LATER_RESPONSE = "__REMIND_ME_LATER__";
const BOOK_SEAT_RESPONSE = "__BOOK_SEAT__";
const SHOW_MORE_OPTIONS_RESPONSE = "__SHOW_MORE_OPTIONS__";
const RECENTLY_BOOKED_RESPONSE = "__RECENTLY_BOOKED__";
const BOOK_SEAT_CONFIRM_RESPONSE = "__BOOK_SEAT_CONFIRM__";
const SETUP_AUTOBOOK_RESPONSE = "__SETUP_AUTOBOOK__";
const REFINED_FEEDBACK_RESPONSE = "__REFINED_FEEDBACK__";
const REVIEW_FEEDBACK_RESPONSE = "__REVIEW_FEEDBACK__";
const FEEDBACK_SENT_RESPONSE = "__FEEDBACK_SENT__";
const DAILY_SCHEDULE_RESPONSE = "__DAILY_SCHEDULE__";
const MOVE_DESIGN_JAM_RESPONSE = "__MOVE_DESIGN_JAM__";
const REQUEST_FEEDBACK_DRAFT_RESPONSE = "__REQUEST_FEEDBACK_DRAFT__";
const REQUEST_FEEDBACK_SENT_RESPONSE = "__REQUEST_FEEDBACK_SENT__";

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("book time")) return BLOCK_TIME_RESPONSE;
  if (lower.includes("block time")) return BLOCK_TIME_RESPONSE;
  if (lower.includes("start my onboarding")) return ONBOARDING_RESPONSE;
  if (lower.includes("choose ravi")) return CHOOSE_RAVI_RESPONSE;
  if (lower.includes("remind me later")) return REMIND_ME_LATER_RESPONSE;
  if (lower.includes("help me book a seat")) return BOOK_SEAT_RESPONSE;
  if (lower.includes("book this seat")) return BOOK_SEAT_CONFIRM_RESPONSE;
  if (lower.includes("setup autobook")) return SETUP_AUTOBOOK_RESPONSE;
  if (lower.includes("show me more options")) return SHOW_MORE_OPTIONS_RESPONSE;
  if (lower.includes("recently booked")) return RECENTLY_BOOKED_RESPONSE;
  if (lower.includes("ask taylor")) return REQUEST_FEEDBACK_DRAFT_RESPONSE;
  if (lower.includes("send feedback request")) return REQUEST_FEEDBACK_SENT_RESPONSE;
  if (lower.includes("send to carmen")) return FEEDBACK_SENT_RESPONSE;
  if (lower.includes("use refined version")) return REVIEW_FEEDBACK_RESPONSE;
  if (lower.includes("listens well") || lower.includes("unclearly communicated")) return REFINED_FEEDBACK_RESPONSE;
  if (lower.includes("meeting schedule")) return DAILY_SCHEDULE_RESPONSE;
  if (lower.includes("move design jam")) return MOVE_DESIGN_JAM_RESPONSE;
  if (lower.includes("compliance")) return mockResponses.compliance;
  if (lower.includes("task") || lower.includes("pending")) return mockResponses.tasks;
  if (lower.includes("meeting") || lower.includes("agenda")) return mockResponses.meeting;
  if (lower.includes("policy") || lower.includes("remote")) return mockResponses.policy;
  return mockResponses.default;
}

function TypewriterMarkdown({ text, speed = 10 }: { text: string; speed?: number }) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(0);
  }, [text]);

  useEffect(() => {
    if (charCount >= text.length) return;
    // Accelerate: type more chars as we progress for a natural feel
    const progress = charCount / text.length;
    const charsToAdd = progress < 0.3 ? 1 : progress < 0.7 ? 2 : 3;
    const timer = setTimeout(() => {
      setCharCount(prev => Math.min(prev + charsToAdd, text.length));
    }, speed);
    return () => clearTimeout(timer);
  }, [charCount, text, speed]);

  const displayed = text.slice(0, charCount);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
    >
      <ReactMarkdown>{displayed}</ReactMarkdown>
    </motion.span>
  );
}

function useTypewriter(text: string, speed = 25, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const charsToAdd = 2;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, Math.min(displayed.length + charsToAdd, text.length)));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return { displayed, done };
}

// Renders text with **bold** markers inline as it types
function TypedText({ text, showCursor }: { text: string; showCursor?: boolean }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (boldStart > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, boldStart)}</span>);
    }
    const afterStart = remaining.slice(boldStart + 2);
    const boldEnd = afterStart.indexOf("**");
    if (boldEnd === -1) {
      // Incomplete bold tag — still typing inside bold
      parts.push(<strong key={key++}>{afterStart}</strong>);
      remaining = "";
      break;
    }
    parts.push(<strong key={key++}>{afterStart.slice(0, boldEnd)}</strong>);
    remaining = afterStart.slice(boldEnd + 2);
  }

  return (
    <>
      {parts}
      {false && showCursor && <span className="inline-block w-[2px] h-[16px] bg-foreground ml-0.5 animate-pulse align-text-bottom" />}
    </>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 h-8 mt-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-foreground/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function WelcomeChipsAndThumbs({ show, onSend }: { show: boolean; onSend: (text: string) => void }) {
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (show && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [show, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <>
      {chipsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onSend("Remind me later")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Remind me later
            </button>
            <button
              onClick={() => onSend("Book time to do it later")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Book time to do it later
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </>
  );
}

function WelcomeScreen({ onSend }: { onSend: (text: string) => void }) {
  const [showLogo, setShowLogo] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [thinkingDone, setThinkingDone] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    const thinkTimer = setTimeout(() => setThinking(true), 500);
    const doneTimer = setTimeout(() => { setThinking(false); setThinkingDone(true); }, 3500);
    return () => { clearTimeout(logoTimer); clearTimeout(thinkTimer); clearTimeout(doneTimer); };
  }, []);

  const heading = useTypewriter("Good morning, Kyra", 45, thinkingDone ? 100 : 99999);
  const para1Text = "There are a few things that need your attention. You have a **Data Security and Compliance Training** that is due today. You also have a pending **Mid Year Feedback Request** due by end of the week.";
  const para1 = useTypewriter(para1Text, 15, heading.done ? 150 : 99999);
  const para2 = useTypewriter(
    "Let's start with the training.",
    18,
    para1.done ? 150 : 99999
  );

  return (
    <div className="flex items-start pt-[210px] mx-auto" style={{ width: '740px' }}>
      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={showLogo ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <img src={jpmcLogo} alt="JPMC" className="w-10 h-10 relative z-10" />
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
           <div className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold" style={{ width: '616px' }}>
            <p className="mb-4">
              <TypedText text={para1.displayed} showCursor={!para1.done} />
            </p>
            
            {para1.done && (
              <p className="mb-4">
                {para2.displayed}
              </p>
            )}
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
                    <p className="text-[14px] leading-[20px] tracking-[0.16px] mt-0.5" style={{ color: '#666663' }}>Estimated time to complete: 25 min</p>
                  </div>
                  <button className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                    Go to My Learning <ExternalLink className="w-[13px] h-[13px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          <WelcomeChipsAndThumbs show={para1.done && para2.done} onSend={onSend} />
          </>
        )}
          </>
        )}
      </div>
    </div>
  );
}

function FeedbackWelcomeScreen({ onSend }: { onSend: (text: string) => void }) {
  const [showLogo, setShowLogo] = useState(false);
  const [thinkingDone, setThinkingDone] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [adviceVisible, setAdviceVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    const doneTimer = setTimeout(() => setThinkingDone(true), 1500);
    return () => { clearTimeout(logoTimer); clearTimeout(doneTimer); };
  }, []);

  const para1Text = "Complete your feedback request from Carmen:";
  const para1 = useTypewriter(para1Text, 15, thinkingDone ? 100 : 99999);

  const adviceText = "When giving feedback, consider what Carmen has done well, what she could do better, and what next steps she can take.\n\nType your thoughts, I\u2019ll help you turn them into clear, constructive feedback.";
  const advice = useTypewriter(adviceText, 15, cardVisible ? 500 : 99999);

  useEffect(() => {
    if (para1.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [para1.done, cardVisible]);

  useEffect(() => {
    if (cardVisible && !adviceVisible) {
      const t = setTimeout(() => setAdviceVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [cardVisible, adviceVisible]);

  useEffect(() => {
    if (advice.done && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [advice.done, thumbsVisible]);

  return (
    <div className="flex items-start pt-[160px] mx-auto" style={{ width: '740px' }}>
      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={showLogo ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <img src={jpmcLogo} alt="JPMC" className="w-10 h-10 relative z-10" />
        </div>
      </motion.div>
      <div className="flex flex-col" style={{ width: '616px' }}>
        {thinkingDone && (
          <>
            <div className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold mt-2.5">
              <p className="mb-4">
                <TypedText text={para1.displayed} showCursor={!para1.done} />
              </p>
              {cardVisible && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                  <div className="bg-card rounded-2xl shadow-sm mb-6 p-6 flex flex-col items-center text-center">
                    <img src={carmenProfile} alt="Carmen Vargas" className="w-14 h-14 rounded-full object-cover mb-3" />
                    <p className="font-headline font-light mb-2" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '0px' }}>
                      Provide feedback for Carmen
                    </p>
                    <p className="font-light text-center" style={{ fontSize: '16px', lineHeight: '24px', color: '#666663' }}>
                      "Hi! Since we've been working closely on VP hiring over the last month, I'd love to get feedback from you. All thoughts are welcome but it would help to provide specific examples and context whenever possible."
                      <br /><br />
                      Thank you!<br />
                      Carmen
                    </p>
                  </div>
                </motion.div>
              )}
              {adviceVisible && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                  {(() => {
                    const parts = advice.displayed.split("\n\n");
                    return parts.map((part, i) => (
                      <p key={i} className="mb-4">
                        {i === parts.length - 1 ? <TypedText text={part} showCursor={!advice.done} /> : <TypedText text={part} />}
                      </p>
                    ));
                  })()}
                </motion.div>
              )}
              {thumbsVisible && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                  <div className="flex items-center gap-3" style={{ color: '#202020' }}>
                    <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
                    <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
                    <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BookASeatWelcomeScreen({ onSend }: { onSend: (text: string) => void }) {
  const [showLogo, setShowLogo] = useState(false);
  const [thinkingDone, setThinkingDone] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    const doneTimer = setTimeout(() => setThinkingDone(true), 1500);
    return () => { clearTimeout(logoTimer); clearTimeout(doneTimer); };
  }, []);

  const heading = useTypewriter("Hey Kyra", 45, thinkingDone ? 100 : 99999);
  const para1Text = "I noticed that several of your meetings next week are at **4 Metrotech in Brooklyn, NY** and you usually **sit near your teammates**.";
  const para1 = useTypewriter(para1Text, 15, heading.done ? 150 : 99999);
  const para2Text = "Would you like me to help book a seat in that office **next week (March 16 - March 20)**?";
  const para2 = useTypewriter(para2Text, 15, para1.done ? 150 : 99999);

  useEffect(() => {
    if (para2.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [para2.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div className="flex items-start pt-[260px] mx-auto" style={{ width: '740px' }}>
      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={showLogo ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <img src={jpmcLogo} alt="JPMC" className="w-10 h-10 relative z-10" />
          {!thinkingDone && (
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.6) 50%, transparent 80%)',
                  width: '200%',
                  left: '-100%',
                }}
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
              />
            </motion.div>
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
              <div className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold" style={{ width: '616px' }}>
                <p className="mb-4">
                  <TypedText text={para1.displayed} showCursor={!para1.done} />
                </p>
                {para1.done && (
                  <>
                    <p className="mb-4">
                      <TypedText text={para2.displayed} showCursor={!para2.done} />
                    </p>
                    {para2.done && (
                      <>
                        {chipsVisible && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                            <div className="flex items-center gap-3 mb-4">
                              <button
                                onClick={() => onSend("Yes, help me book a seat")}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
                                style={{ border: '1px solid #7D7A7A', color: '#202020' }}
                              >
                                <CornerDownRight className="w-4 h-4" />
                                Yes, help me book a seat
                              </button>
                            </div>
                          </motion.div>
                        )}
                        {thumbsVisible && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
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
            )}
          </>
        )}
      </div>
    </div>
  );
}

function BlockTimeResponse({ onSend }: { onSend: (text: string) => void }) {
  const text = "Done! I've found a 30 minute time slot on your calendar to complete the training.";
  const typed = useTypewriter(text, 15, 100);
  const followUpText = "Next, you'll need to complete one last onboarding task for your new hire and fill out your feedback request due by the end of the week. Which would you like to tackle first?";
  const followUp = useTypewriter(followUpText, 15, typed.done ? 300 : 99999);
  const [cardVisible, setCardVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed.done, cardVisible]);

  useEffect(() => {
    if (followUp.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [followUp.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground mb-4">
          <TypedText text={typed.displayed} />
        </p>
      </motion.div>
      {cardVisible && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4"
            >
              <div className="bg-card rounded-2xl shadow-sm w-full overflow-hidden">
                <div className="flex items-start gap-4 p-6">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                    <img src={calendarIcon} alt="Calendar" className="w-10 h-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-foreground">Complete Security & Compliance Training</p>
                    <p className="text-[14px] leading-[20px] tracking-[0.16px] mt-0.5" style={{ color: '#666663' }}>Wednesday, June 18</p>
                    <p className="text-[14px] leading-[20px] tracking-[0.16px]" style={{ color: '#666663' }}>9:05–10:30am</p>
                  </div>
                  <button className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                    Open Outlook <ExternalLink className="w-[13px] h-[13px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {cardVisible && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ maxWidth: '616px', marginTop: '24px' }}
            >
              <p className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold" style={{ marginBottom: '16px' }}>
                <TypedText text={followUp.displayed} />
              </p>
            </motion.div>
          )}
          {chipsVisible && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => onSend("Start my onboarding task")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
                  style={{ border: '1px solid #7D7A7A', color: '#202020' }}
                >
                  <CornerDownRight className="w-4 h-4" />
                  Start my onboarding task
                </button>
                <button
                  onClick={() => onSend("Start my feedback task")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
                  style={{ border: '1px solid #7D7A7A', color: '#202020' }}
                >
                  <CornerDownRight className="w-4 h-4" />
                  Start my feedback task
                </button>
              </div>
            </motion.div>
          )}
          {thumbsVisible && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <div className="flex items-center gap-3" style={{ color: '#202020' }}>
                <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
                <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
                <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
              </div>
            </motion.div>
          )}
    </div>
  );
}

function OnboardingBuddyResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "Ok, you need to assign **Anila Patel** an onboarding buddy.";
  const line2 = "Here is my recommendation for some employees who bring relevant experience and availability:";
  const typed1 = useTypewriter(line1, 15, 100);
  const typed2 = useTypewriter(line2, 15, typed1.done ? 200 : 99999);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed2.done && !cardsVisible) {
      const t = setTimeout(() => setCardsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed2.done, cardsVisible]);

  useEffect(() => {
    if (cardsVisible && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [cardsVisible, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <div style={{ maxWidth: '616px' }}>
        <p className="text-[16px] leading-[24px] text-foreground mb-4">
          <TypedText text={typed1.displayed} />
        </p>
        {typed1.done && (
          <p className="text-[16px] leading-[24px] text-foreground mb-4">
            <TypedText text={typed2.displayed} />
          </p>
        )}
      </div>
      {cardsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
        >
          <div className="flex gap-2 w-full">
            {/* Card 1 - Ravi Murthy */}
            <div className="flex-1 bg-card rounded-xl overflow-hidden p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 overflow-hidden shrink-0" style={{ borderRadius: '8px' }}>
                  <img src={raviPhoto} alt="Ravi Murthy" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                </div>
                <div>
                  <p className="text-[14px] leading-[20px] font-medium text-foreground">Ravi Murthy</p>
                  <p className="text-[13px] leading-[18px]" style={{ color: '#666663' }}>Lead Infrastructure Engineer</p>
                </div>
              </div>
              <p className="text-[13px] leading-[20px]" style={{ color: '#666663' }}>
                Ravi has over three years on the team, strong knowledge of our codebase, and experience mentoring junior engineers. He's leading the project the new hire will join, making him a great fit for technical and contextual support.
              </p>
            </div>

            {/* Card 2 - Priya Hegde */}
            <div className="flex-1 bg-card rounded-xl overflow-hidden p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 overflow-hidden shrink-0" style={{ borderRadius: '8px' }}>
                  <img src={priyaPhoto} alt="Priya Hegde" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                </div>
                <div>
                  <p className="text-[14px] leading-[20px] font-medium text-foreground">Priya Hegde</p>
                  <p className="text-[13px] leading-[18px]" style={{ color: '#666663' }}>Lead Infrastructure Engineer</p>
                </div>
              </div>
              <p className="text-[13px] leading-[20px]" style={{ color: '#666663' }}>
                Priya joined a year ago and brings a fresh perspective on onboarding. She's worked on key systems the new hire will support and is known for clear, collaborative communication - great for helping them ramp up quickly.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      {chipsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => onSend("Choose Ravi M")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Choose Ravi M
            </button>
            <button
              onClick={() => onSend("Choose Priya H")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Choose Priya H
            </button>
            <button
              onClick={() => onSend("Show me more suggestions")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Show me more suggestions
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ChooseRaviResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "Great! I've let **Ravi Murthy** know, and **Anila Patel** is all set to start next week. I'll let you know if any further action needs to be taken.";
  const line2 = "In your remaining time today, I suggest you complete the feedback request for **Henry Lim**. Would you like to get started now?";
  const typed1 = useTypewriter(line1, 15, 100);
  const typed2 = useTypewriter(line2, 15, typed1.done ? 300 : 99999);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed2.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed2.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <div style={{ maxWidth: '616px' }}>
        <p className="text-[16px] leading-[24px] text-foreground mb-4">
          <TypedText text={typed1.displayed} />
        </p>
        {typed1.done && (
          <p className="text-[16px] leading-[24px] text-foreground mb-4">
            <TypedText text={typed2.displayed} />
          </p>
        )}
      </div>
      {chipsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onSend("Give feedback")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Give feedback
            </button>
            <button
              onClick={() => onSend("Remind me later")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Remind me later
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function RemindMeLaterResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "Got it – I will remind you tomorrow morning.";
  const line2 = "Just a heads-up: the feedback request is time-sensitive and must be completed by the end of the week. Let me know if you'd like to work on it sooner.";
  const line3 = "Otherwise, that's it for now but I will let you know if anything else comes up today.";
  const typed1 = useTypewriter(line1, 15, 100);
  const typed2 = useTypewriter(line2, 15, typed1.done ? 300 : 99999);
  const typed3 = useTypewriter(line3, 15, typed2.done ? 300 : 99999);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed3.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed3.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <div style={{ maxWidth: '616px' }}>
        <p className="text-[16px] leading-[24px] text-foreground mb-4">
          <TypedText text={typed1.displayed} />
        </p>
        {typed1.done && (
          <p className="text-[16px] leading-[24px] text-foreground mb-4">
            <TypedText text={typed2.displayed} />
          </p>
        )}
        {typed2.done && (
          <p className="text-[16px] leading-[24px] text-foreground mb-4">
            <TypedText text={typed3.displayed} />
          </p>
        )}
      </div>
      {chipsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onSend("Yes, please")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Yes, please
            </button>
            <button
              onClick={() => onSend("No, thanks")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              No, thanks
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function BookSeatResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "Got it! Based off you booking in the past, here're some seats you might like:";
  const typed1 = useTypewriter(line1, 15, 100);
  const [cardVisible, setCardVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  useEffect(() => {
    if (typed1.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed1.done, cardVisible]);

  useEffect(() => {
    if (cardVisible && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [cardVisible, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  const seats = [
    { id: "04AAC065", floor: "Floor 04", building: "4 Metrotech", tag: "Favourite", tagColor: "bg-[#A8332B26] text-[#A8332B]" },
    { id: "04AAC072", floor: "Floor 04", building: "4 Metrotech", tag: "Near team", tagColor: "bg-[#B3D6FD4d] text-[#294770]" },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold mb-4">
          <TypedText text={typed1.displayed} />
        </p>
      </motion.div>
      <AnimatePresence>
        {cardVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
          style={{ maxWidth: '616px' }}
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Card header */}
            <div className="flex items-start justify-between p-6 pb-0">
              <span className="text-[16px] leading-[24px] font-semibold text-foreground">Seats suggested for you</span>
              <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                Go to Book a Seat <ExternalLink className="w-[13px] h-[13px]" />
              </button>
            </div>
            {/* Seats */}
            {seats.map((seat, i) => (
              <div key={seat.id}>
                  <div className={cn("flex items-center px-6 py-3 gap-4", i === seats.length - 1 && "pb-6")}>
                  <img src={seatIcon} alt="Seat" className="w-10 h-10 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[16px] leading-[24px] font-normal text-foreground">Seat {seat.id}</span>
                      <span className={cn("text-[12px] leading-[16px] px-2 h-5 inline-flex items-center rounded font-semibold", seat.tagColor)}>
                        {seat.tag}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ color: '#666663' }}>
                      {seat.building} | {seat.floor}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSeat(seat.id)}
                    className={cn(
                      "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
                      selectedSeat === seat.id ? "border-foreground" : "border-[#7D7A7A]"
                    )}
                  >
                    {selectedSeat === seat.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
       )}
      </AnimatePresence>
      {chipsVisible && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onSend("Yes, book this seat")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Yes, book this seat
            </button>
            <button
              onClick={() => onSend("Show me more options")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Show me more options
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ShowMoreOptionsResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "No problem, I can tailor a few more options for you. What are you looking for?";
  const typed1 = useTypewriter(line1, 15, 100);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed1.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed1.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
          <TypedText text={typed1.displayed} />
        </p>
      </motion.div>
      {chipsVisible && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => onSend("Near my team")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Near my team
            </button>
            <button
              onClick={() => onSend("Close to my meetings")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Close to my meetings
            </button>
            <button
              onClick={() => onSend("Recently booked seats")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Recently booked seats
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function RecentlyBookedResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "Got it! I found a few seats on Floor 4 that you've booked recently:";
  const typed1 = useTypewriter(line1, 15, 100);
  const [cardVisible, setCardVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  useEffect(() => {
    if (typed1.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed1.done, cardVisible]);

  useEffect(() => {
    if (cardVisible && !textVisible) {
      const t = setTimeout(() => setTextVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [cardVisible, textVisible]);

  useEffect(() => {
    if (textVisible && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [textVisible, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  const seats = [
    { id: "04AAC091", floor: "Floor 04", building: "4 Metrotech", tag: "Booked on Mar 16", tagColor: "text-[#785C1A]" },
    { id: "04AAC088", floor: "Floor 04", building: "4 Metrotech", tag: "Booked on Feb 24", tagColor: "text-[#785C1A]" },
    { id: "04AAC103", floor: "Floor 04", building: "4 Metrotech", tag: "Booked on Feb 10", tagColor: "text-[#785C1A]" },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold mb-4">
          <TypedText text={typed1.displayed} />
        </p>
      </motion.div>
      <AnimatePresence>
        {cardVisible && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4"
            style={{ maxWidth: '616px' }}
          >
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Card header */}
              <div className="flex items-start justify-between p-6 pb-0">
                <span className="text-[16px] leading-[24px] font-semibold text-foreground">Seats you have booked recently</span>
                <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                  Go to Book a Seat <ExternalLink className="w-[13px] h-[13px]" />
                </button>
              </div>
              {/* Seats */}
              {seats.map((seat, i) => (
                <div key={seat.id}>
                  <div className={cn("flex items-center px-6 py-3 gap-4", i === seats.length - 1 && "pb-6")}>
                    <img src={seatIcon} alt="Seat" className="w-10 h-10 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[16px] leading-[24px] font-normal text-foreground">Seat {seat.id}</span>
                        <span className={cn("text-[12px] leading-[16px] px-2 h-5 inline-flex items-center rounded font-semibold", seat.tagColor)} style={{ backgroundColor: 'rgba(254, 241, 191, 0.75)' }}>
                          {seat.tag}
                        </span>
                      </div>
                      <p className="text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ color: '#666663' }}>
                        {seat.building} | {seat.floor}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedSeat(seat.id)}
                      className={cn(
                        "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
                        selectedSeat === seat.id ? "border-foreground" : "border-[#7D7A7A]"
                      )}
                    >
                      {selectedSeat === seat.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {textVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ maxWidth: '616px' }}
        >
          <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
            Would you like to book it now?
          </p>
        </motion.div>
      )}
      {chipsVisible && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onSend("Book this seat")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Book this seat
            </button>
            <button
              onClick={() => onSend("Show me more options")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Show me more options
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function BookSeatConfirmResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "Great! I've booked seat 04AAC091 for next week.";
  const line2 = "Here are your booking details:";
  const typed1 = useTypewriter(line1, 15, 100);
  const typed2 = useTypewriter(line2, 15, typed1.done ? 200 : 99999);
  const [cardVisible, setCardVisible] = useState(false);
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  const followUpText = "Would you like for me to automatically book this seat for you each Monday?";
  const followUp = useTypewriter(followUpText, 15, followUpVisible ? 0 : 99999);

  useEffect(() => {
    if (typed2.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed2.done, cardVisible]);

  useEffect(() => {
    if (cardVisible && !followUpVisible) {
      const t = setTimeout(() => setFollowUpVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [cardVisible, followUpVisible]);

  useEffect(() => {
    if (followUp.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [followUp.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
          <TypedText text={typed1.displayed} />
        </p>
        {typed1.done && (
          <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
            <TypedText text={typed2.displayed} />
          </p>
        )}
      </motion.div>
      {cardVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
          style={{ maxWidth: '616px' }}
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-start gap-4 p-6">
              <img src={confirmationIcon} alt="Confirmed" className="w-10 h-10 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[16px] leading-[24px] font-normal text-foreground">Seat 04AAC091 is booked!</p>
                <p className="text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ color: '#666663' }}>Monday, March 16 - Friday, March 20</p>
                <p className="text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ color: '#666663' }}>4 Metrotech | Floor 04 | Highland Park</p>
              </div>
              <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                View seat map <ExternalLink className="w-[13px] h-[13px]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {followUpVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ maxWidth: '616px' }}
        >
          <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
            <TypedText text={followUp.displayed} />
          </p>
        </motion.div>
      )}
      {chipsVisible && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => onSend("Setup autobook")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Setup autobook
            </button>
            <button
              onClick={() => onSend("View current bookings")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              View current bookings
            </button>
            <button
              onClick={() => onSend("View this seat on the map")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              View this seat on the map
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function SetupAutobookResponse({ onSend }: { onSend: (text: string) => void }) {
  const line1 = "Great! I'll plan to automatically book seat 04AAC091 every week.";
  const line2 = "You can edit this in **Settings**.";
  const typed1 = useTypewriter(line1, 15, 100);
  const typed2 = useTypewriter(line2, 15, typed1.done ? 200 : 99999);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed2.done && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed2.done, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
          <TypedText text={typed1.displayed} />
        </p>
        {typed1.done && (
          <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
            {(() => {
              const t = typed2.displayed;
              const settingsStart = t.indexOf("**Settings**");
              if (settingsStart === -1) {
                const partialBold = t.indexOf("**");
                if (partialBold === -1) return <>{t}</>;
                const before = t.slice(0, partialBold);
                const inside = t.slice(partialBold + 2).replace("**", "");
                return <>{before}<span style={{ color: '#8F5A39' }}>{inside}</span></>;
              }
              const before = t.slice(0, settingsStart);
              return <>{before}<span style={{ color: '#8F5A39' }}>Settings</span>.</>;
            })()}
          </p>
        )}
      </motion.div>
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function RefinedFeedbackResponse({ onSend }: { onSend: (text: string) => void }) {
  const introText = "To strengthen your feedback, you could make it more specific and actionable. Here\u2019s a refined version:";
  const typed = useTypewriter(introText, 15, 100);
  const [cardVisible, setCardVisible] = useState(false);
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed.done, cardVisible]);

  useEffect(() => {
    if (cardVisible && !followUpVisible) {
      const t = setTimeout(() => setFollowUpVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [cardVisible, followUpVisible]);

  const followUpText = "Would you like to use the refined version or keep your original version?";
  const followUpTyped = useTypewriter(followUpText, 15, followUpVisible ? 100 : 99999);

  useEffect(() => {
    if (followUpTyped.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [followUpTyped.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
          <TypedText text={typed.displayed} />
        </p>
      </motion.div>

      {cardVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
          style={{ maxWidth: '616px' }}
        >
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: '#666663' }} strokeWidth={1.5} />
              <span className="text-[14px] leading-[20px] font-light" style={{ color: '#666663' }}>Refined feedback</span>
            </div>
            <p className="text-[16px] leading-[24px] text-foreground font-light">
              During our client meetings, you regularly summarize discussions and confirm your understanding before offering input. Keep it up! You have great ideas. To make them easier to follow, take a pause and structure your thoughts into three concise bullet points.
            </p>
          </div>
        </motion.div>
      )}

      {followUpVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ maxWidth: '616px' }}
        >
          <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
            <TypedText text={followUpTyped.displayed} />
          </p>
        </motion.div>
      )}

      {chipsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap gap-3 mb-4"
        >
          <button
            onClick={() => onSend("Use refined version")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
            style={{ border: '1px solid #7D7A7A', color: '#202020' }}
          >
            <CornerDownRight className="w-4 h-4" />
            Use refined version
          </button>
          <button
            onClick={() => onSend("Use original version")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
            style={{ border: '1px solid #7D7A7A', color: '#202020' }}
          >
            <CornerDownRight className="w-4 h-4" />
            Use original version
          </button>
          <button
            onClick={() => onSend("Edit further")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
            style={{ border: '1px solid #7D7A7A', color: '#202020' }}
          >
            <CornerDownRight className="w-4 h-4" />
            Edit further
          </button>
        </motion.div>
      )}

      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ReviewFeedbackResponse({ onSend }: { onSend: (text: string) => void }) {
  const introText = "Great! Here's the refined version of your feedback. Take a quick look before sending:";
  const typed = useTypewriter(introText, 15, 100);
  const [cardVisible, setCardVisible] = useState(false);
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    if (typed.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed.done, cardVisible]);

  useEffect(() => {
    if (cardVisible && !followUpVisible) {
      const t = setTimeout(() => setFollowUpVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [cardVisible, followUpVisible]);

  const followUpText = "Who would you like to share this feedback with?";
  const followUpTyped = useTypewriter(followUpText, 15, followUpVisible ? 100 : 99999);

  useEffect(() => {
    if (followUpTyped.done && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [followUpTyped.done, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
          <TypedText text={typed.displayed} />
        </p>
      </motion.div>

      {cardVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
          style={{ maxWidth: '616px' }}
        >
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF' }}>
            {/* Profile photo */}
            <div className="flex flex-col items-center gap-4">
              <img src={carmenProfile} alt="Carmen" className="w-14 h-14 rounded-full object-cover" />
              <h3 className="text-[24px] leading-[32px] font-normal text-foreground">Review feedback</h3>
            </div>

            {/* What you said */}
            <p className="text-[14px] leading-[20px] font-semibold text-foreground text-center mt-4">What you said:</p>
            <p className="text-[14px] leading-[20px] font-light text-center mt-4" style={{ color: '#666663' }}>
              "During our client meetings, you regularly summarize discussions and confirm your understanding before offering input. Keep it up! You have great ideas. To make them easier to follow, take a pause and structure your thoughts into three concise bullet points."
            </p>

            {/* Based on your feedback */}
            <p className="text-[14px] leading-[20px] font-semibold text-foreground text-center mt-4">Based on your feedback, Carmen demonstrates:</p>

            {/* Strengths & Opportunities */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-xl p-4" style={{ backgroundColor: '#F7F7F7' }}>
                <p className="text-[12px] leading-[16px] font-light mb-2" style={{ color: '#666663' }}>Strengths</p>
                <div className="flex items-center gap-2 mb-1">
                  <img src={handIcon} alt="" className="w-10 h-10" />
                  <div>
                    <p className="text-[14px] leading-[20px] font-semibold text-foreground">Earn trust</p>
                    <p className="text-[13px] leading-[18px] font-light" style={{ color: '#666663' }}>Listen deeply</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: '#F7F7F7' }}>
                <p className="text-[12px] leading-[16px] font-light mb-2" style={{ color: '#666663' }}>Opportunities</p>
                <div className="flex items-center gap-2 mb-1">
                  <img src={handIcon} alt="" className="w-10 h-10" />
                  <div>
                    <p className="text-[14px] leading-[20px] font-semibold text-foreground">Earn trust</p>
                    <p className="text-[13px] leading-[18px] font-light" style={{ color: '#666663' }}>Create clarity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {followUpVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ maxWidth: '616px' }}
        >
          <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
            <TypedText text={followUpTyped.displayed} />
          </p>
        </motion.div>
      )}

      {chipsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap gap-3 mb-4"
        >
          <button
            onClick={() => onSend("Send to Carmen")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
            style={{ border: '1px solid #7D7A7A', color: '#202020' }}
          >
            <CornerDownRight className="w-4 h-4" />
            Send to Carmen
          </button>
          <button
            onClick={() => onSend("Send to Carmen and her manager")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
            style={{ border: '1px solid #7D7A7A', color: '#202020' }}
          >
            <CornerDownRight className="w-4 h-4" />
            Send to Carmen and her manager
          </button>
        </motion.div>
      )}

      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function FeedbackSentResponse({ onSend }: { onSend: (text: string) => void }) {
  const introText = "Nice, your feedback has been sent.";
  const typed = useTypewriter(introText, 15, 100);
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  const followUpText = "Want help with another one, or would you like feedback on your own performance?";
  const followUpTyped = useTypewriter(followUpText, 15, followUpVisible ? 100 : 99999);

  useEffect(() => {
    if (typed.done && !followUpVisible) {
      const t = setTimeout(() => setFollowUpVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed.done, followUpVisible]);

  useEffect(() => {
    if (followUpTyped.done && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [followUpTyped.done, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
          <TypedText text={typed.displayed} />
        </p>
      </motion.div>

      {followUpVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ maxWidth: '616px' }}
        >
          <p className="text-[16px] leading-[24px] text-foreground font-light mb-4">
            <TypedText text={followUpTyped.displayed} />
          </p>
        </motion.div>
      )}

      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function RequestFeedbackDraftResponse({ onSend }: { onSend: (text: string) => void }) {
  const text = "You got it! Here's a draft request:";
  const typed = useTypewriter(text, 15, 100);
  const [cardVisible, setCardVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isRefined, setIsRefined] = useState(false);

  useEffect(() => {
    if (typed.done && !cardVisible) {
      const t = setTimeout(() => setCardVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [typed.done, cardVisible]);

  useEffect(() => {
    if (cardVisible && !chipsVisible) {
      const t = setTimeout(() => setChipsVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, [cardVisible, chipsVisible]);

  useEffect(() => {
    if (chipsVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [chipsVisible, thumbsVisible]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '616px' }}
      >
        <p className="text-[16px] leading-[24px] text-foreground mb-4 font-light">
          <TypedText text={typed.displayed} />
        </p>
      </motion.div>
      {cardVisible && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div 
            className={`bg-card rounded-2xl shadow-sm mb-6 overflow-hidden group transition-all duration-200 cursor-pointer ${isEditing ? 'shadow-md' : 'hover:shadow-md'}`} 
            style={{ maxWidth: '616px', border: isEditing ? '2px solid #8F5A39' : '2px solid transparent' }}
            onClick={() => {
              if (!isEditing && !isRefined) {
                setIsEditing(true);
              } else if (isEditing && !isRefining && !isRefined) {
                setIsRefining(true);
                setTimeout(() => {
                  setIsRefining(false);
                  setIsRefined(true);
                }, 2000);
              }
            }}
          >
            <div className="p-6">
              {!isEditing && (
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[14px] leading-[20px] tracking-[0.16px]" style={{ color: '#666663' }}>Draft message</p>
                  <button className="flex items-center gap-1.5 text-[14px] leading-[20px] tracking-[0.16px] font-medium rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: '#8F5A39', backgroundColor: '#EDE8E0' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    Edit
                  </button>
                </div>
              )}
              {isEditing && (
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[14px] leading-[20px] tracking-[0.16px]" style={{ color: '#666663' }}>Draft message</p>
                </div>
              )}
              {isRefining ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 rounded" style={{ backgroundColor: '#E8E3DB', width: '30%' }} />
                  <div className="h-4 rounded" style={{ backgroundColor: '#E8E3DB', width: '100%' }} />
                  <div className="h-4 rounded" style={{ backgroundColor: '#E8E3DB', width: '90%' }} />
                  <div className="h-4 rounded" style={{ backgroundColor: '#E8E3DB', width: '60%' }} />
                  <div className="h-4 rounded" style={{ backgroundColor: '#E8E3DB', width: '40%' }} />
                </div>
              ) : (
                <motion.div 
                  key={isRefined ? 'refined' : 'original'}
                  initial={isRefined ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[16px] leading-[24px] text-foreground font-light" 
                  contentEditable={isEditing && !isRefined} 
                  suppressContentEditableWarning
                >
                  {isRefined ? (
                    <>
                      <p className="mb-4">Hi, I'd love to get your feedback on our current work on the mobile app.</p>
                      <p className="mb-4">Any specific examples or suggestions for improvement would be really helpful.</p>
                      <p className="mb-0">Thanks,<br />Carmen</p>
                    </>
                  ) : (
                    <>
                      <p className="mb-4">Hi,</p>
                      <p className="mb-4">Since we've been working closely on the mobile app project, I'd love to get feedback from you. Please provide specific examples and actions I can take to improve!</p>
                      <p className="mb-0">Thanks,<br />Carmen</p>
                    </>
                  )}
                </motion.div>
              )}
            </div>
            {isEditing && (
              <div className="flex items-center justify-between px-6 pb-4 pt-2">
                <div className="flex items-center gap-4">
                  <button className="text-foreground/60 hover:text-foreground transition-colors font-bold text-[16px]">B</button>
                  <button className="text-foreground/60 hover:text-foreground transition-colors italic text-[16px]">I</button>
                  <button className="text-foreground/60 hover:text-foreground transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  </button>
                  <button className="text-foreground/60 hover:text-foreground transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
                  </button>
                  <button className="text-foreground/60 hover:text-foreground transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-[14px] leading-[20px] tracking-[0.16px] font-medium" style={{ color: '#8F5A39' }}>
                    <Sparkles size={16} />
                    Refine
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsEditing(false); }}
                    className="px-5 py-2 rounded-full text-[14px] leading-[20px] font-medium text-white"
                    style={{ backgroundColor: '#000000' }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      {chipsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => !isEditing && onSend("Send feedback request")}
              disabled={isEditing}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent transition-colors text-[14px] leading-[20px] tracking-[0.16px] ${isEditing ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#DDD5C8]'}`}
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Send feedback request
            </button>
            <button
              onClick={() => onSend("Remind me later")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-4 h-4" />
              Remind me later
            </button>
          </div>
        </motion.div>
      )}
      {thumbsVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex items-center gap-3" style={{ color: '#202020' }}>
            <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
            <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function AiResponseWrapper({ msg, onSend }: { msg: Message; onSend: (text: string) => void }) {
  const [showLogo, setShowLogo] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
      setThinking(true);
    }, 1000);
    const readyTimer = setTimeout(() => {
      setThinking(false);
      setReady(true);
    }, 3000);
    return () => { clearTimeout(logoTimer); clearTimeout(readyTimer); };
  }, []);

  return (
    <div className="flex items-start">
      <div className="w-12 shrink-0 mr-4 flex items-start justify-center pt-0.5">
        <motion.div
          className="relative w-10 h-10 overflow-hidden rounded-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={showLogo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img src={jpmcLogo} alt="JPMC" className="w-10 h-10 relative z-10" />
          {thinking && (
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.6) 50%, transparent 80%)',
                  width: '200%',
                  left: '-100%',
                }}
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col" style={{ minHeight: '40px' }}>
        {!ready ? <div className="h-6" /> : msg.content === BLOCK_TIME_RESPONSE ? (
          <BlockTimeResponse onSend={onSend} />
        ) : msg.content === ONBOARDING_RESPONSE ? (
          <OnboardingBuddyResponse onSend={onSend} />
        ) : msg.content === CHOOSE_RAVI_RESPONSE ? (
          <ChooseRaviResponse onSend={onSend} />
        ) : msg.content === REMIND_ME_LATER_RESPONSE ? (
          <RemindMeLaterResponse onSend={onSend} />
        ) : msg.content === BOOK_SEAT_RESPONSE ? (
          <BookSeatResponse onSend={onSend} />
        ) : msg.content === SHOW_MORE_OPTIONS_RESPONSE ? (
          <ShowMoreOptionsResponse onSend={onSend} />
        ) : msg.content === RECENTLY_BOOKED_RESPONSE ? (
          <RecentlyBookedResponse onSend={onSend} />
        ) : msg.content === BOOK_SEAT_CONFIRM_RESPONSE ? (
          <BookSeatConfirmResponse onSend={onSend} />
        ) : msg.content === SETUP_AUTOBOOK_RESPONSE ? (
          <SetupAutobookResponse onSend={onSend} />
        ) : msg.content === REFINED_FEEDBACK_RESPONSE ? (
          <RefinedFeedbackResponse onSend={onSend} />
        ) : msg.content === REVIEW_FEEDBACK_RESPONSE ? (
          <ReviewFeedbackResponse onSend={onSend} />
        ) : msg.content === FEEDBACK_SENT_RESPONSE ? (
          <FeedbackSentResponse onSend={onSend} />
        ) : msg.content === DAILY_SCHEDULE_RESPONSE ? (
          <DailyScheduleResponse onSend={onSend} />
        ) : msg.content === MOVE_DESIGN_JAM_RESPONSE ? (
          <MoveDesignJamResponse onSend={onSend} />
        ) : msg.content === REQUEST_FEEDBACK_DRAFT_RESPONSE ? (
          <RequestFeedbackDraftResponse onSend={onSend} />
        ) : (
          <>
            <div style={{ maxWidth: '616px' }}>
              <div className="prose max-w-none text-foreground text-[16px] leading-[24px] [&_h2]:text-foreground [&_h2]:text-base [&_h2]:mt-2 [&_strong]:text-foreground [&_table]:text-sm [&_blockquote]:border-jpmc-gold [&_blockquote]:text-muted-foreground [&_a]:text-jpmc-blue [&_p]:text-[16px] [&_p]:leading-[24px] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_li]:text-[16px] [&_li]:leading-[24px]">
                <TypewriterMarkdown text={msg.content} speed={15} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6" style={{ color: '#202020' }}>
              <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
              <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
              <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const flowTabs: { id: ChatFlow; label: string }[] = [
  { id: "daily-digest", label: "Daily Digest" },
  { id: "feedback", label: "Give Feedback" },
  { id: "book-a-seat", label: "Book a Seat" },
  { id: "daily-schedule", label: "Daily Schedule" },
];

export function ChatArea({ activeFlow, onFlowChange }: { activeFlow: ChatFlow; onFlowChange: (flow: ChatFlow) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [feedbackAutoTyped, setFeedbackAutoTyped] = useState(false);
  const [scheduleAutoTyped, setScheduleAutoTyped] = useState(false);
  const [requestFeedbackAutoTyped, setRequestFeedbackAutoTyped] = useState(false);
  const [isWaitingForAssistant, setIsWaitingForAssistant] = useState(false);
  
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Reset messages when flow changes
  useEffect(() => {
    setMessages([]);
    setInput("");
    setFeedbackAutoTyped(false);
    setScheduleAutoTyped(false);
    setRequestFeedbackAutoTyped(false);
    setIsWaitingForAssistant(false);
    
  }, [activeFlow]);

  const springScrollTo = (container: HTMLElement, targetScrollTop: number) => {
    const start = container.scrollTop;
    const distance = targetScrollTop - start;
    if (Math.abs(distance) < 1) return;

    const stiffness = 20;
    const damping = 10;
    const mass = 1.6;
    let velocity = 0;
    let position = 0;
    const dt = 1 / 60;

    let raf: number;
    const step = () => {
      const springForce = -stiffness * (position - 1);
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;
      velocity += acceleration * dt;
      position += velocity * dt;

      container.scrollTop = start + distance * position;

      if (Math.abs(position - 1) > 0.001 || Math.abs(velocity) > 0.001) {
        raf = requestAnimationFrame(step);
      } else {
        container.scrollTop = targetScrollTop;
      }
    };
    raf = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (lastMessageRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const target = lastMessageRef.current;
      const lastMsg = messages[messages.length - 1];
      
      if (lastMsg?.role === 'user') {
        if (isWaitingForAssistant) return;

        const scrollTarget = target.offsetTop - container.clientHeight * 0.1 - 100 - container.clientHeight * 0.15;
        springScrollTo(container, Math.max(0, scrollTarget));
      } else if (lastMsg?.role === 'assistant') {
        const scrollTarget = target.offsetTop - container.clientHeight * 0.25;
        springScrollTo(container, Math.max(0, scrollTarget));
      }
    }
  }, [messages, isWaitingForAssistant]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (activeFlow === "feedback" && !feedbackAutoTyped && messages.length === 0) {
      setFeedbackAutoTyped(true);
      const text = "Listens well in meetings, ideas are good but unclearly communicated";
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setInput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 25);
    }
    if (activeFlow === "request-feedback" && !requestFeedbackAutoTyped && messages.length === 0) {
      setRequestFeedbackAutoTyped(true);
      const text = "Can you ask Taylor to send me some feedback?";
      let i = 0;
      const interval = setInterval(() => {
        i += 2;
        setInput(text.slice(0, Math.min(i, text.length)));
        if (i >= text.length) clearInterval(interval);
      }, 25);
    }
    if (activeFlow === "daily-schedule" && !scheduleAutoTyped && messages.length === 0) {
      setScheduleAutoTyped(true);
      const text = "Show my meeting schedule for tomorrow";
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setInput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 25);
    }
  };

function SlashCommandMenu({ onSelect, inputValue, onOpen, onClose }: { onSelect: (cmd: string) => void; inputValue?: string; onOpen?: () => void; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const commands = [
    { label: "Profile", desc: "View someone's profile" },
    { label: "SID", desc: "Copy SID to clipboard" },
    { label: "Org", desc: "See org chart" },
    { label: "Zoom", desc: "Start a Zoom call with someone" },
    { label: "Message", desc: "Send a message in Teams" },
    { label: "Go", desc: "Navigate to an internal go/link" },
    { label: "Recognize", desc: "Send a recognition to someone" },
  ];

  // Filter commands based on input value when menu is open
  const filterText = inputValue?.startsWith("/") ? inputValue.slice(1).toLowerCase().trim() : "";
  const filtered = filterText
    ? commands.filter(c => c.label.toLowerCase().includes(filterText) || c.desc.toLowerCase().includes(filterText))
    : commands;

  return (
    <>
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.(); else onClose?.();
        }}
        className="w-9 h-9 rounded-lg bg-[#E9E0D3] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-base font-medium">/</span>
      </button>
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full left-0 right-0 mb-1 mx-0 z-50"
          >
            <div className="bg-white rounded-xl shadow-lg py-1.5 px-1.5" style={{ border: '1px solid #E8E4DE' }}>
              {filtered.map((cmd) => {
                const matchIndex = filterText ? cmd.label.toLowerCase().indexOf(filterText) : -1;
                return (
                  <button
                    key={cmd.label}
                    onClick={() => { onSelect(cmd.label); setOpen(false); onClose?.(); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F4EFE7] transition-colors flex items-baseline gap-3"
                  >
                    <span className="text-[14px] leading-[21px] font-bold text-foreground min-w-[72px]">
                      {matchIndex >= 0 ? (
                        <>
                          {cmd.label.slice(0, matchIndex)}
                          <span className="text-[#0060A9]">{cmd.label.slice(matchIndex, matchIndex + filterText.length)}</span>
                          {cmd.label.slice(matchIndex + filterText.length)}
                        </>
                      ) : cmd.label}
                    </span>
                    <span className="text-[14px] leading-[21px] font-normal text-[#666663]">{cmd.desc}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setInput("");
    setIsWaitingForAssistant(true);

    // Delay: 0.5s for user bubble, then 1s before AI response (logo) appears
    setMessages(prev => [...prev, userMsg]);
    
    const response = getResponse(message);
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMsg]);
      setIsWaitingForAssistant(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (activeFlow === "onboarding") {
    return <OnboardingFlow />;
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative">
      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      {/* Messages */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-thin">
        {activeFlow === "daily-digest" && <WelcomeScreen key="daily-digest" onSend={handleSend} />}
        {activeFlow === "feedback" && <FeedbackWelcomeScreen key="feedback" onSend={handleSend} />}
        {activeFlow === "book-a-seat" && <BookASeatWelcomeScreen key="book-a-seat" onSend={handleSend} />}
        {activeFlow === "daily-schedule" && <DailyScheduleWelcomeScreen key="daily-schedule" onSend={handleSend} />}

        {messages.length > 0 && (
          <div className="mx-auto flex flex-col" style={{ width: '740px', gap: '32px', marginTop: '32px', paddingBottom: '50vh' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  ref={idx === messages.length - 1 ? lastMessageRef : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    y: { type: "spring", stiffness: 100, damping: 15, mass: 1, duration: 0.8 },
                    opacity: { duration: 0.4, ease: "easeOut" }
                  }}
                >
                  {msg.role === "user" ? (
                    /* User bubble: max 492px, right-aligned to 740px frame */
                    <div className="flex justify-end">
                      <div className="relative" style={{ maxWidth: '492px', marginBottom: '10px' }}>
                        <div className="inline-flex items-center" style={{ backgroundColor: '#E9E0D3', borderRadius: '16px', padding: '12px 24px' }}>
                          <p className="text-[15px] leading-[22.5px] tracking-[-0.3%] text-foreground">{msg.content}</p>
                        </div>
                        <svg className="absolute bottom-0 right-[16px]" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'translateY(10px)' }}>
                          <path d="M16 15.5858C16 16.4767 14.923 16.9229 14.293 16.2929L-0.293 1.70711C-0.923 1.07714 -0.477 0 0.414 0L15 0C15.552 0 16 0.44772 16 1L16 15.5858Z" fill="#E9E0D3" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    /* AI response: logo with shimmer thinking, then typed content */
                    <AiResponseWrapper msg={msg} onSend={handleSend} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div />
          </div>
        )}
      </div>

      {/* Input */}
      {/* Input */}
      <div className="shrink-0 relative">
        <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="bg-background pb-4 pt-2 flex justify-center">
          <div style={{ width: '740px' }}>
            <div className="relative flex items-center bg-card rounded-xl px-4 py-2.5 ml-16">
              <button className="shrink-0 mr-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1A17140a] active:bg-[#1A17141a] transition-all duration-200" style={{ color: '#666663' }}>
                <Plus className="w-5 h-5 transition-transform duration-200 hover:scale-110" strokeWidth={1.5} />
              </button>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleFocus}
                onFocus={handleInputFocus}
                autoFocus
                placeholder="How can I help?"
                rows={1}
                className="flex-1 bg-transparent text-[15px] leading-[22.5px] tracking-[-0.3%] text-foreground placeholder:text-[#666663] resize-none outline-none max-h-32"
              />
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <SlashCommandMenu
                  inputValue={input}
                  onSelect={(cmd) => {
                    setInput("/" + cmd.toLowerCase() + " ");
                    inputRef.current?.focus();
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                    input.trim()
                      ? "bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90"
                      : "bg-muted/50 text-muted-foreground/50"
                  )}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
