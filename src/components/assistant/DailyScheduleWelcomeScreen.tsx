import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Video, MessageSquare, Mail, Calendar, Trash2, Settings, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import jpmcLogo from "@/assets/jpmc-logo-transparent.png";
import { motion } from "framer-motion";

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
      parts.push(<strong key={key++}>{afterStart}</strong>);
      remaining = "";
      break;
    }
    parts.push(<strong key={key++}>{afterStart.slice(0, boldEnd)}</strong>);
    remaining = afterStart.slice(boldEnd + 2);
  }

  return <>{parts}</>;
}

interface ScheduleEvent {
  time: string;
  title: string;
  location: string;
  color: string;
  width: string; // percentage width of the bar
  status?: "tentative" | "declined";
}

const scheduleEvents: ScheduleEvent[] = [
  { time: "9 AM", title: "QA Review", location: "Microsoft Teams", color: "#7EC8E3", width: "85%" },
  { time: "10AM", title: "QA Review", location: "Microsoft Teams", color: "#7EC8E3", width: "100%" },
  { time: "11AM", title: "Tentative: Internal", location: "Room 03", color: "#7EC8E3", width: "60%", status: "tentative" },
  { time: "12 AM", title: "Declined: Priya 1:1", location: "Microsoft Teams", color: "#D4D4D4", width: "50%", status: "declined" },
];

const actionMenuItems = [
  { label: "Join via Zoom", icon: ExternalLink },
  { label: "Message all", icon: ExternalLink },
  { label: "Message host", icon: ExternalLink },
  { label: "Email all", icon: ExternalLink },
  { label: "Open calendar invite", icon: ExternalLink },
  { label: "Open Zoom controller", icon: ExternalLink },
  { label: "Cancel meeting", icon: ExternalLink },
];

function InlineCalendarWidget() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(0);

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7EC8E3' }} />
          <span className="text-[14px] leading-[20px] tracking-[0.16px] font-medium text-foreground">August 27, 2025</span>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted/50 transition-colors text-muted-foreground">
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted/50 transition-colors text-muted-foreground">
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium"
          style={{ border: '1px solid #7D7A7A', color: '#202020' }}
        >
          Open Outlook <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Events + Action Menu side by side */}
      <div className="flex">
        {/* Events column */}
        <div className="flex-1">
          {scheduleEvents.map((event, idx) => (
            <div
              key={idx}
              className="flex items-stretch border-b border-border cursor-pointer transition-colors"
              style={{ backgroundColor: selectedEvent === idx ? '#F9F7F4' : 'transparent' }}
              onClick={() => setSelectedEvent(selectedEvent === idx ? null : idx)}
            >
              {/* Time label */}
              <div className="w-[60px] shrink-0 flex items-start justify-end pr-3 pt-3 pb-3">
                <span className="text-[12px] leading-[16px] tracking-[0px] text-muted-foreground">{event.time}</span>
              </div>
              {/* Event bar */}
              <div className="flex-1 py-2.5 pr-4">
                <div
                  className="rounded-md px-3 py-2.5"
                  style={{
                    backgroundColor: event.status === "declined" ? '#F0EDED' : '#E8F4FA',
                    width: event.width,
                    opacity: event.status === "declined" ? 0.7 : 1,
                  }}
                >
                  <p className="text-[13px] leading-[18px] font-medium" style={{ color: event.status === "declined" ? '#999' : '#202020' }}>
                    {event.title}
                  </p>
                  <p className="text-[11px] leading-[16px]" style={{ color: event.status === "declined" ? '#AAA' : '#666663' }}>
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Empty time slots */}
          {["1 PM", "2 PM"].map((time) => (
            <div key={time} className="flex items-stretch border-b border-border">
              <div className="w-[60px] shrink-0 flex items-start justify-end pr-3 pt-3 pb-3">
                <span className="text-[12px] leading-[16px] tracking-[0px] text-muted-foreground">{time}</span>
              </div>
              <div className="flex-1 py-4" />
            </div>
          ))}
        </div>

        {/* Action menu - visible when an event is selected */}
        {selectedEvent !== null && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[200px] border-l border-border py-2"
          >
            {actionMenuItems.map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#F4EFE7] transition-colors"
              >
                <span className="text-[13px] leading-[19.5px] tracking-[-0.3px] text-foreground">{item.label}</span>
                <item.icon className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function DailyScheduleWelcomeScreen({ onSend }: { onSend: (text: string) => void }) {
  const [showLogo, setShowLogo] = useState(false);
  const [thinkingDone, setThinkingDone] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    const doneTimer = setTimeout(() => setThinkingDone(true), 1500);
    return () => { clearTimeout(logoTimer); clearTimeout(doneTimer); };
  }, []);

  const paraText = "Your morning is packed with back-to-back meetings, from a **QA Review** to an **Internal** and a **1:1 with Priya**. The afternoon remains clear, giving you room for focus time, catch-ups, or planning ahead.";
  const para = useTypewriter(paraText, 15, thinkingDone ? 100 : 99999);

  useEffect(() => {
    if (para.done && !calendarVisible) {
      const t = setTimeout(() => setCalendarVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, [para.done, calendarVisible]);

  useEffect(() => {
    if (calendarVisible && !followUpVisible) {
      const t = setTimeout(() => setFollowUpVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [calendarVisible, followUpVisible]);

  useEffect(() => {
    if (followUpVisible && !thumbsVisible) {
      const t = setTimeout(() => setThumbsVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, [followUpVisible, thumbsVisible]);

  const followUpText = "At 11 AM you've got an Internal onsite in Room 03. Want me to book you a seat at the office for the Internal?";
  const followUp = useTypewriter(followUpText, 15, followUpVisible ? 100 : 99999);

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
          {!thinkingDone && (
            <motion.div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full">
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
      <div className="flex flex-col" style={{ width: '616px' }}>
        {thinkingDone && (
          <>
            {/* User bubble shown above */}
            <div className="flex justify-end mb-8">
              <div className="relative" style={{ maxWidth: '492px' }}>
                <div className="inline-flex items-center" style={{ backgroundColor: '#E9E0D3', borderRadius: '16px', padding: '12px 24px' }}>
                  <p className="text-[15px] leading-[22.5px] tracking-[-0.3%] text-foreground">Show my meeting schedule for tomorrow</p>
                </div>
              </div>
            </div>

            <div className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold">
              <p className="mb-4">
                <TypedText text={para.displayed} showCursor={!para.done} />
              </p>

              {calendarVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mb-6"
                >
                  <InlineCalendarWidget />
                </motion.div>
              )}

              {followUpVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <p className="mb-4 underline decoration-foreground/30 underline-offset-4">
                    <TypedText text={followUp.displayed} showCursor={!followUp.done} />
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
          </>
        )}
      </div>
    </div>
  );
}
