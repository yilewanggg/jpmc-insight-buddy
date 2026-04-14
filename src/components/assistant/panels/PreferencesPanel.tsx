import { useState } from "react";
import { Bell, Sparkles, Mail, Video, Phone, Lightbulb, Pen, LayoutGrid, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const preferenceItems = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "ai-assistant", label: "AI Assistant", icon: Sparkles },
  { id: "outlook", label: "Outlook", icon: Mail },
  { id: "zoom", label: "Zoom", icon: Video },
  { id: "calling", label: "Calling", icon: Phone },
  { id: "insights", label: "Insights", icon: Lightbulb },
  { id: "quick-prompt", label: "Quick Prompt", icon: Pen },
  { id: "window-view", label: "Window View", icon: LayoutGrid },
];

export function PreferencesPanel() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {preferenceItems.map((item, i) => (
        <div key={item.id}>
          <button
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#DDD5C8] transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-[18px] h-[18px]" strokeWidth={1.5} style={{ color: '#202020' }} />
              <span className="text-[13px] leading-[19.5px] tracking-[0.16px] text-foreground">{item.label}</span>
            </div>
            <ChevronDown
              className={cn("w-4 h-4 transition-transform", expandedId === item.id && "rotate-180")}
              strokeWidth={1.5}
              style={{ color: '#666663' }}
            />
          </button>
          {expandedId === item.id && (
            <div className="px-6 pb-5 pl-[54px]">
              <p className="text-[13px] leading-[19.5px] tracking-[0.16px]" style={{ color: '#666663' }}>
                {item.label} preferences coming soon.
              </p>
            </div>
          )}
          {i < preferenceItems.length - 1 && <div className="border-t border-border" />}
        </div>
      ))}
    </div>
  );
}
