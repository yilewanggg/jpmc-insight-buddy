import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const chatHistory = [
  { id: "1", title: "Q4 revenue analysis", time: "2 min ago", preview: "Can you pull up the Q4 revenue breakdown..." },
  { id: "2", title: "HR policy questions", time: "1 hour ago", preview: "What's the updated remote work policy..." },
  { id: "3", title: "Risk assessment template", time: "Yesterday", preview: "Generate a risk assessment template for..." },
  { id: "4", title: "Team standup summary", time: "Yesterday", preview: "Summarize yesterday's standup notes..." },
  { id: "5", title: "Compliance training", time: "Mar 12", preview: "When is the next compliance deadline..." },
];

interface Props {
  onSelectChat: (id: string) => void;
  currentChatId: string | null;
  onNewChat: () => void;
}

export function ChatHistoryPanel({ onSelectChat, currentChatId, onNewChat }: Props) {
  const [search, setSearch] = useState("");

  const filtered = chatHistory.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#666663' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-10 pr-3 py-2.5 rounded-xl text-[13px] leading-[19.5px] tracking-[-0.3px] text-foreground placeholder:text-[#666663] border-0 outline-none bg-[#1A17140a] focus:bg-[#1A17140f] transition-colors"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex flex-col">
        {filtered.map((chat, i) => (
          <div key={chat.id}>
            <button
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "text-left w-full px-6 py-6 transition-all duration-200 ease-out border-l-2",
                currentChatId === chat.id
                  ? "bg-[#F4EFE7] border-l-[#202020]"
                  : "border-l-transparent hover:bg-[#F4EFE7]/60 hover:border-l-[#202020]/30 hover:pl-7"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal text-foreground truncate">{chat.title}</span>
                <span className="text-[13px] leading-[19.5px] tracking-[0px] shrink-0 ml-2" style={{ color: '#666663' }}>{chat.time}</span>
              </div>
              <p className="text-[13px] leading-[19.5px] tracking-[0px] truncate" style={{ color: '#666663' }}>{chat.preview}</p>
            </button>
            {i < filtered.length - 1 && <div className="border-t" style={{ borderColor: 'rgba(16, 16, 16, 0.1)' }} />}
          </div>
        ))}
      </div>

      {/* New conversation button at bottom */}
      <div className="mt-auto px-6 py-6">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 h-[40px] rounded-full text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal transition-colors bg-[#000000] text-[#FFFFFF] hover:bg-[#F4EFE7] hover:text-[#202020]"
        >
          <Plus className="w-4 h-4" />
          New conversation
        </button>
      </div>
    </div>
  );
}
