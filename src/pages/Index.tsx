import { useState } from "react";
import { AssistantSidebar } from "@/components/assistant/AssistantSidebar";
import { ChatArea, type ChatFlow } from "@/components/assistant/ChatArea";
import { NudgesFlow } from "@/components/assistant/NudgesFlow";
import { cn } from "@/lib/utils";

const flowTabs: { id: ChatFlow; label: string }[] = [
  { id: "onboarding", label: "Onboarding" },
  { id: "daily-digest", label: "Daily Digest" },
  { id: "feedback", label: "Give Feedback" },
  { id: "request-feedback", label: "Request Feedback" },
  { id: "book-a-seat", label: "Book a Seat" },
  { id: "daily-schedule", label: "Daily Schedule" },
  { id: "nudges", label: "Nudges" },
];

const Index = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [activeFlow, setActiveFlow] = useState<ChatFlow>("onboarding");

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Top navigation bar — full width, separate from interface */}
      <div className="shrink-0 flex justify-center py-3 border-b border-border bg-card z-20">
        <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: '#E9E0D3' }}>
          {flowTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFlow(tab.id)}
              className={cn(
                "px-5 py-2 rounded-full text-[14px] leading-[20px] tracking-[0.16px] font-medium transition-all duration-200",
                activeFlow === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-card/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content row */}
      <div className="flex flex-1 overflow-hidden">
        {activeFlow !== "onboarding" && activeFlow !== "nudges" && (
          <AssistantSidebar
            onSelectChat={setCurrentChatId}
            currentChatId={currentChatId}
            onNewChat={() => setCurrentChatId(null)}
          />
        )}
        {activeFlow === "nudges" ? (
          <NudgesFlow />
        ) : (
          <ChatArea activeFlow={activeFlow} onFlowChange={setActiveFlow} />
        )}
      </div>
    </div>
  );
};

export default Index;
