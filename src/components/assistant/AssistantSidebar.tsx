import { useState } from "react";
import { MessageSquare, Bell, Calendar, SlidersHorizontal, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarPhoto from "@/assets/avatar-profile.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHistoryPanel } from "./panels/ChatHistoryPanel";
import { TasksPanel } from "./panels/TasksPanel";
import { NotificationsPanel } from "./panels/NotificationsPanel";
import { CalendarPanel } from "./panels/CalendarPanel";
import { PreferencesPanel } from "./panels/PreferencesPanel";
import { cn } from "@/lib/utils";

type Tab = "history" | "tasks" | "calendar" | "preferences";

const tabs = [
  { id: "history" as Tab, icon: MessageSquare, label: "Chats" },
  { id: "tasks" as Tab, icon: Bell, label: "Activity center", badge: 3 },
  { id: "calendar" as Tab, icon: Calendar, label: "Calendar" },
  { id: "preferences" as Tab, icon: SlidersHorizontal, label: "Preferences" },
];

interface AssistantSidebarProps {
  onSelectChat: (id: string) => void;
  currentChatId: string | null;
  onNewChat: () => void;
}

export function AssistantSidebar({ onSelectChat, currentChatId, onNewChat }: AssistantSidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>("history");
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30"
            style={{ backgroundColor: 'rgba(233, 224, 211, 0.75)' }}
            onClick={() => setCollapsed(true)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-40 flex h-full w-16 shrink-0">
        {/* Icon rail */}
        <div className={cn("flex flex-col items-center w-16 py-4 shrink-0 transition-colors duration-300", collapsed ? "bg-background" : "bg-card")}>
          <nav className="flex flex-col gap-1.5 flex-1 mt-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCollapsed(false); }}
                className={cn(
                  "relative w-11 h-11 rounded-lg flex items-center justify-center transition-all",
                  activeTab === tab.id && !collapsed
                    ? "bg-[#DDD5C8] shadow-sm text-foreground"
                    : "bg-[#E9E0D3] text-foreground hover:bg-[#D4C9B8] active:bg-[#DDD5C8]"
                )}
                title={tab.label}
              >
                <tab.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {tab.badge && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive" />
                )}
              </button>
            ))}
          </nav>

          {/* Profile */}
          <div className="mt-auto flex flex-col items-center">
            <Avatar className="w-10 h-10 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
              <AvatarImage src={avatarPhoto} alt="Profile" className="rounded-lg object-cover" style={{ objectPosition: '10% center' }} />
              <AvatarFallback className="rounded-lg bg-[#E9E0D3] text-muted-foreground text-sm font-medium">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Panel content - overlays */}
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 452, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-16 top-0 h-full bg-card overflow-hidden"
              style={{ borderLeft: '1px solid rgba(16, 16, 16, 0.1)' }}
            >
              <div className="h-full flex flex-col w-[452px]">
                {activeTab !== "tasks" && (
                  <div className="p-6 flex items-start justify-between">
                    <h2 className="font-headline text-[24px] leading-[34px] font-light text-foreground tracking-[-0.03em]">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                    <button onClick={() => setCollapsed(true)} className="w-8 h-8 mt-0.5 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      <X className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
                {activeTab === "tasks" && (
                  <div className="p-6 flex items-start justify-between">
                    <h2 className="font-headline text-[24px] leading-[34px] font-light text-foreground tracking-[-0.03em]">
                      Activity center
                    </h2>
                    <button onClick={() => setCollapsed(true)} className="w-8 h-8 mt-0.5 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      <X className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                  {activeTab === "history" && <ChatHistoryPanel onSelectChat={onSelectChat} currentChatId={currentChatId} onNewChat={onNewChat} />}
                  {activeTab === "tasks" && <TasksPanel defaultTab="tasks" />}
                  {activeTab === "calendar" && <CalendarPanel />}
                  {activeTab === "preferences" && <PreferencesPanel />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
