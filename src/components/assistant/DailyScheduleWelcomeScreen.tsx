import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, MoreHorizontal, ThumbsUp, ThumbsDown } from "lucide-react";
import jpmcLogo from "@/assets/jpmc-logo-transparent.png";
import { motion, AnimatePresence } from "framer-motion";

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
  title: string;
  location: string;
  status?: "tentative" | "declined";
}

interface TimeSlot {
  time: string;
  events: ScheduleEvent[];
}

const timeSlots: TimeSlot[] = [
  {
    time: "9 AM",
    events: [
      { title: "QA Review", location: "Microsoft Teams" },
      { title: "Design Jam", location: "Microsoft Teams" },
    ],
  },
  { time: "10AM", events: [] },
  { time: "11AM", events: [{ title: "Tentative: Internal", location: "Room 03", status: "tentative" }] },
  { time: "12 AM", events: [{ title: "Declined: Priya 1:1", location: "Microsoft Teams", status: "declined" }] },
  { time: "1 PM", events: [] },
  { time: "2 PM", events: [] },
];

const overflowMenuItems = [
  "Join via Zoom",
  "Message all",
  "Message host",
  "Email all",
  "Open calendar invite",
  "Open Zoom controller",
  "Cancel meeting",
];

function EventOverflowMenu({ open, onClose, anchorRef }: { open: boolean; onClose: () => void; anchorRef: React.RefObject<HTMLButtonElement> }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div ref={menuRef} className="absolute right-0 top-full mt-1 rounded-xl shadow-lg z-50 py-1.5 px-1.5 w-[210px]" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DE' }}>
      {overflowMenuItems.map((item, idx) => (
        <button
          key={idx}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#F4EFE7] transition-colors"
        >
          <span className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium text-foreground">{item}</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

function InlineCalendarWidget() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#A6D7F0' }} />
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

      {/* Time slots */}
      <div className="flex flex-col">
        {timeSlots.map((slot, slotIdx) => (
          <div
            key={slotIdx}
            className="flex items-stretch border-b border-border relative"
          >
            {/* Time label */}
            <div className="w-[60px] shrink-0 flex items-start justify-end pr-3 pt-3 pb-3">
              <span className="text-[12px] leading-[16px] tracking-[0px] text-muted-foreground">{slot.time}</span>
            </div>
            {/* Events */}
            {slot.events.length === 0 ? (
              <div className="flex-1 py-4" />
            ) : (
              <div className="flex-1 py-2.5 pr-6 flex items-center gap-2 group/event">
                {slot.events.map((event, evIdx) => {
                  const key = `${slotIdx}-${evIdx}`;
                  return (
                    <div
                      key={evIdx}
                      className="rounded-md px-3 py-2.5 flex-1 min-w-0"
                      style={{
                        backgroundColor: event.status === "declined" ? '#F0EDED' : '#D9EEF7',
                        opacity: event.status === "declined" ? 0.7 : 1,
                      }}
                    >
                      <p className="text-[13px] leading-[18px] font-medium truncate" style={{ color: event.status === "declined" ? '#999' : '#202020' }}>
                        {event.title}
                      </p>
                      <p className="text-[11px] leading-[16px] truncate" style={{ color: event.status === "declined" ? '#AAA' : '#666663' }}>
                        {event.location}
                      </p>
                    </div>
                  );
                })}
                {/* Overflow button */}
                <div className="relative shrink-0 opacity-0 group-hover/event:opacity-100 transition-opacity">
                  <button
                    ref={(el) => { buttonRefs.current[`${slotIdx}`] = el; }}
                    onClick={() => setOpenMenu(openMenu === `${slotIdx}` ? null : `${slotIdx}`)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#DDD5C8] transition-colors"
                    style={{ color: '#666663' }}
                  >
                    <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <EventOverflowMenu
                    open={openMenu === `${slotIdx}`}
                    onClose={() => setOpenMenu(null)}
                    anchorRef={{ current: buttonRefs.current[`${slotIdx}`] } as React.RefObject<HTMLButtonElement>}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailyScheduleWelcomeScreen({ onSend }: { onSend: (text: string) => void }) {
  // This screen is intentionally blank — the flow starts via auto-typed input + send.
  // The response is rendered via the message system after the user "sends" the auto-typed message.
  return null;
}

export function DailyScheduleResponse({ onSend }: { onSend: (text: string) => void }) {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [thumbsVisible, setThumbsVisible] = useState(false);

  const paraText = "Your morning is packed with back-to-back meetings, from a **QA Review** to an **Internal** and a **1:1 with Priya**. The afternoon remains clear, giving you room for focus time, catch-ups, or planning ahead.";
  const para = useTypewriter(paraText, 15, 100);

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
    <div>
      <div className="text-[16px] leading-[24px] text-foreground font-light [&_strong]:font-semibold" style={{ maxWidth: '616px' }}>
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
            <p className="mb-4">
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
    </div>
  );
}
