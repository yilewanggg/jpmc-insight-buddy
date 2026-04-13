import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  
  { id: 2, category: "Learning", message: "You have cybersecurity learning overdue", time: "10:41 am", unread: true },
  { id: 3, category: "Dining", message: "New menu available at 270 Park Avenue", time: "10:40 am", unread: false },
  { id: 4, category: "Help", message: "You raised a help request for an issue with your paycheck", time: "10:38 am", unread: false },
  { id: 5, category: "Onboarding", message: "Complete your onboarding tasks for your new hire starting next week", time: "10:37 am", unread: false },
];

export function NotificationsPanel() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {notifications.map((n, i) => (
        <div key={n.id}>
          <div
            className="w-full px-6 py-5 cursor-pointer"
            onMouseEnter={() => setHoveredId(n.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-start justify-between gap-4 w-full">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium mb-1" style={{ color: '#666663' }}>
                  {n.category}
                </p>
                <p className="text-[13px] leading-[19.5px] tracking-[-0.3px] text-foreground flex items-center gap-2">
                  {n.unread && <span className="w-2 h-2 rounded-full bg-foreground shrink-0" />}
                  <span className={n.unread ? "font-normal" : "font-light"}>{n.message}</span>
                </p>
              </div>
              <span className="text-[12px] leading-[16px] tracking-[0px] shrink-0" style={{ color: '#666663' }}>
                {n.time}
              </span>
            </div>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                hoveredId === n.id ? "grid-rows-[1fr] opacity-100 mt-6 pb-1" : "grid-rows-[0fr] opacity-0 mt-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="flex items-center">
                  <button className="flex items-center justify-center gap-2 w-[120px] h-[40px] rounded-full bg-[#000000] text-[#FFFFFF] text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal hover:bg-[#DDD5C8] hover:text-[#202020] transition-colors">
                    Do it now <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {i < notifications.length - 1 && <div className="border-t border-border" />}
        </div>
      ))}
    </div>
  );
}
