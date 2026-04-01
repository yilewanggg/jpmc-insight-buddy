import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Menu, ChevronDown, Trash2, Archive, Flag, MailOpen, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import chatBubbleIcon from "@/assets/chat-bubble-icon.png";

const emails = [
  { id: 1, from: "Jeremiah Gibson", initials: "JG", color: "#7C3AED", subject: "Please review the updated project timeline.", preview: "Focus on delivery dates for Phase 2 a...", time: "Mon 8:05 AM", unread: true, section: "Today" },
  { id: 2, from: "Finance Team", initials: "FT", color: "#7C3AED", subject: "Your monthly expense report is ready for approval.", preview: "Please confirm allocations and...", time: "Mon 9:20 AM", unread: false, section: "Today" },
  { id: 3, from: "Dana Davidson", initials: "MC", color: "#2563EB", subject: "Can we confirm the agenda for tomorrow's meeting.", preview: "Key topics include scope ch...", time: "Fri 11:45 AM", unread: true, section: "Yesterday" },
  { id: 4, from: "HR Updates", initials: "HR", color: "#DC2626", subject: "Mandatory training has been assigned to your profile.", preview: "Deadline is Friday; accessibili...", time: "Fri 3:10 PM", unread: false, section: "Yesterday" },
  { id: 5, from: "Priya Singh", initials: "PS", color: "#2563EB", subject: "Sharing the client feedback summary from last week.", preview: "Highlights cover NPS trends...", time: "Fri 9:00 AM", unread: false, section: "Yesterday" },
  { id: 6, from: "Compliance Office", initials: "CO", color: "#DC2626", subject: "Action required on the quarterly attestations.", preview: "Review policy exceptions and comple...", time: "Fri 10:30 AM", unread: false, section: "Yesterday" },
  { id: 7, from: "Product Marketing", initials: "PM", color: "#7C3AED", subject: "Draft launch plan needs your input today.", preview: "Please weigh in on messaging pillars an...", time: "Tue 9:00 AM", unread: true, section: "This month" },
  { id: 8, from: "Service Desk", initials: "SD", color: "#2563EB", subject: "Ticket #48219 has been resolved successfully.", preview: "Confirm the fix in UAT and reopen if...", time: "Tue 10:30 AM", unread: false, section: "This month" },
  { id: 9, from: "Elena Garcia", initials: "EG", color: "#16A34A", subject: "The partnership proposal is ready for your review.", preview: "Pay attention to pricing terms an...", time: "Wed 2:15 PM", unread: false, section: "This month" },
  { id: 10, from: "Operations Hub", initials: "OH", color: "#DC2626", subject: "System maintenance window begins this evening.", preview: "Expect brief downtime from 9–1...", time: "Wed 8:40 AM", unread: false, section: "This month" },
  { id: 11, from: "Risk Management", initials: "RM", color: "#DC2626", subject: "Please verify the controls for the new workflow.", preview: "Focus on segregation of duties and...", time: "Thurs 12:05 PM", unread: false, section: "This month" },
  { id: 12, from: "Client Services", initials: "CS", color: "#7C3AED", subject: "Meeting confirmation and materials are attached.", preview: "Agenda includes onboarding ste...", time: "Fri 4:20 PM", unread: false, section: "This month" },
];

const sidebarFolders = [
  { name: "Inbox", count: 2, icon: "📥", indent: false, isFavorite: true },
  { name: "Sent Items", icon: "📤", indent: true, isFavorite: true },
  { name: "Drafts", count: 2, icon: "📝", indent: true, isFavorite: true },
];

const folders = [
  { name: "Inbox", indent: true },
  { name: "Junk Email", indent: true },
  { name: "Drafts", count: 2, indent: true },
  { name: "Sent Items", indent: true },
  { name: "Deleted Items", indent: true },
  { name: "Archive", indent: true },
  { name: "Notes", indent: true },
];

export function NudgesFlow() {
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNudge(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const sections = ["Today", "Yesterday", "This month"];

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1a2e] p-8 overflow-hidden">
      {/* Nudge notification - above Outlook */}
      <div className="h-8 mb-2 flex items-center justify-center">
        <AnimatePresence>
          {showNudge && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center gap-1 bg-[#F5F0E8] text-[#333] pl-6 pr-4 py-1 rounded-full shadow-md border border-[#E5DDD0] text-[11px] tracking-tight">
                <img src={chatBubbleIcon} alt="" className="w-5 h-5 translate-y-[1px]" />
                <span className="font-semibold">Request feedback</span>
                <span className="text-[#666]">from people you work with the most</span>
                <button
                  onClick={() => setShowNudge(false)}
                  className="ml-1 w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-3 h-3 text-[#999]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-[1100px] rounded-xl overflow-hidden shadow-2xl border border-white/10" style={{ aspectRatio: "16/10" }}>
        {/* Outlook UI */}
        <div className="flex flex-col h-full bg-[#F3F3F3]">
          {/* Title bar */}
          <div className="flex items-center h-8 bg-[#0078D4] px-3 shrink-0">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-white text-[11px] font-medium">Outlook</span>
            </div>
            <div className="flex items-center gap-0.5">
              <div className="w-3 h-3 rounded-full border border-white/40" />
              <div className="w-3 h-3 rounded-sm border border-white/40 mx-1" />
              <div className="w-3 h-3 text-white/60 text-[10px] flex items-center justify-center">✕</div>
            </div>
          </div>

          {/* Toolbar area */}
          <div className="bg-[#F3F3F3] border-b border-[#E1E1E1] px-3 py-1.5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Menu className="w-4 h-4 text-[#666]" />
                <div className="bg-[#0078D4] text-white text-[11px] px-3 py-1 rounded flex items-center gap-1">
                  New email <ChevronDown className="w-2.5 h-2.5" />
                </div>
              </div>
              <div className="flex-1 flex items-center bg-white border border-[#E1E1E1] rounded px-2 py-0.5 max-w-[240px]">
                <Search className="w-3 h-3 text-[#999] mr-1.5" />
                <span className="text-[11px] text-[#999]">Search</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#0078D4] flex items-center justify-center text-white text-[10px] font-bold">JS</div>
            </div>
          </div>

          {/* Ribbon */}
          <div className="bg-[#F3F3F3] border-b border-[#E1E1E1] px-3 py-1 flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-[10px] text-[#444]">
              <span className="font-medium text-[#333]">Home</span>
              <span className="ml-2">View</span>
              <span className="ml-2">Help</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-3 text-[10px] text-[#666]">
              <span className="flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</span>
              <span className="flex items-center gap-1"><Archive className="w-3 h-3" /> Archive</span>
              <span className="flex items-center gap-1"><Flag className="w-3 h-3" /> Report</span>
              <span className="text-[#ccc]">|</span>
              <span className="flex items-center gap-1"><MailOpen className="w-3 h-3" /> Mark all as read</span>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-1 min-h-0">
            {/* Left sidebar */}
            <div className="w-[180px] bg-[#F8F8F8] border-r border-[#E1E1E1] py-2 px-2 shrink-0 overflow-y-auto">
              <div className="text-[10px] text-[#666] font-medium px-2 mb-1">Favorites</div>
              {sidebarFolders.map((f) => (
                <div key={f.name} className={cn("flex items-center justify-between px-2 py-1 rounded text-[11px] hover:bg-[#E8E8E8] cursor-pointer", f.name === "Inbox" && "bg-[#E8E8E8] font-medium")}>
                  <span className="text-[#333]">{f.name}</span>
                  {f.count && <span className="text-[#0078D4] font-medium text-[10px]">{f.count}</span>}
                </div>
              ))}
              <div className="text-[10px] text-[#0078D4] px-2 mt-1 mb-2 cursor-pointer">Add favorite</div>
              <div className="text-[10px] text-[#666] font-medium px-2 mb-1">Folders</div>
              {folders.map((f) => (
                <div key={f.name} className="flex items-center justify-between px-2 py-1 rounded text-[11px] hover:bg-[#E8E8E8] cursor-pointer">
                  <span className="text-[#333]">{f.name}</span>
                  {f.count && <span className="text-[#0078D4] font-medium text-[10px]">{f.count}</span>}
                </div>
              ))}
            </div>

            {/* Email list */}
            <div className="flex-1 overflow-y-auto bg-white">
              {/* Focused / Other tabs */}
              <div className="flex items-center gap-3 px-4 py-2 border-b border-[#E8E8E8]">
                <span className="text-[11px] font-medium text-[#333] border-b-2 border-[#0078D4] pb-1">Focused</span>
                <span className="text-[11px] text-[#666] pb-1">Other</span>
                <div className="flex-1" />
                <div className="flex items-center gap-1 text-[10px] text-[#666]">
                  <Filter className="w-3 h-3" /> Filter
                </div>
              </div>

              {/* Column headers */}
              <div className="flex items-center px-4 py-1 text-[10px] text-[#999] border-b border-[#F0F0F0]">
                <span className="w-[160px]">From</span>
                <span className="flex-1">Subject</span>
                <span className="w-[100px] text-right">Received ▾</span>
              </div>

              {sections.map((section) => {
                const sectionEmails = emails.filter(e => e.section === section);
                if (sectionEmails.length === 0) return null;
                return (
                  <div key={section}>
                    <div className="px-4 py-1.5 text-[10px] font-medium text-[#666] bg-[#FAFAFA]">{section}</div>
                    {sectionEmails.map((email) => (
                      <div
                        key={email.id}
                        className={cn(
                          "flex items-center px-4 py-2 border-b border-[#F5F5F5] hover:bg-[#F5F5F5] cursor-pointer text-[11px]",
                          email.unread && "bg-white"
                        )}
                      >
                        <div className="flex items-center gap-2 w-[160px] shrink-0">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold shrink-0"
                            style={{ backgroundColor: email.color }}
                          >
                            {email.initials}
                          </div>
                          <span className={cn("truncate", email.unread ? "font-semibold text-[#333]" : "text-[#666]")}>
                            {email.from}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 flex items-baseline gap-2">
                          <span className={cn("truncate", email.unread ? "font-semibold text-[#0078D4]" : "text-[#333]")}>
                            {email.subject}
                          </span>
                          <span className="text-[#999] truncate text-[10px]">{email.preview}</span>
                        </div>
                        <span className="w-[100px] text-right text-[10px] text-[#999] shrink-0">{email.time}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
