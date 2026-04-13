import { useState } from "react";
import { Copy, RefreshCw, Video, Mail, MoreHorizontal, ExternalLink, MessageSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import teamsIcon from "@/assets/teams-icon.svg";

interface CalendarEvent {
  id: number;
  time: string;
  duration: string;
  title: string;
  location: string;
  color: string;
  type: "meeting" | "focus";
  hasJoin?: boolean;
  hasBlock?: boolean;
  hasCopy?: boolean;
  status?: string;
  attendees?: number;
  tentative?: boolean;
}

const todayEvents: CalendarEvent[] = [
  { id: 1, time: "9:00 AM", duration: "1h", title: "Triad/UX Design check-in", location: "Zoom ID 95722623042", color: "#A6D7F0", type: "meeting", hasCopy: true, tentative: true },
  { id: 2, time: "9:05 AM", duration: "55m", title: "Design Team Review", location: "Zoom ID 95722623042", color: "#A6D7F0", type: "meeting", hasJoin: true, hasCopy: true, status: "accepted", attendees: 10 },
  { id: 3, time: "11:05 AM", duration: "25m", title: "EX Monthly All Hands", location: "https://teams.microsoft.com/l/meetup-...", color: "#A6D7F0", type: "meeting", hasCopy: true },
  { id: 4, time: "", duration: "3h5m", title: "Available for focus time", location: "", color: "", type: "focus", hasBlock: true },
  { id: 5, time: "2:35 PM", duration: "45m", title: "MVP roadmap preview", location: "No location", color: "#A6D7F0", type: "meeting" },
  { id: 6, time: "3:30 PM", duration: "1h", title: "Victoria Bates - Vice president interview...", location: "My desk", color: "#A6D7F0", type: "meeting" },
  { id: 7, time: "", duration: "30m", title: "Available for focus time", location: "", color: "", type: "focus", hasBlock: true },
];

const tomorrowEvents: CalendarEvent[] = [
  { id: 8, time: "9:00 AM", duration: "1h", title: "Triad/UX Design check-in", location: "https://teams.microsoft.com/l/meetup-...", color: "#A6D7F0", type: "meeting", hasCopy: true },
  { id: 9, time: "9:05 AM", duration: "55m", title: "Design Team Review", location: "Zoom ID 95722623042", color: "#A6D7F0", type: "meeting", hasCopy: true },
  { id: 10, time: "11:05 AM", duration: "25m", title: "EX Monthly All Hands", location: "Zoom ID 95722623042", color: "#A6D7F0", type: "meeting", hasCopy: true },
];

const avatarImages = [
  { src: avatar5, position: 'center 25%', name: 'James Wilson' },
  { src: avatar6, position: 'center 20%', name: 'Sarah Chen' },
  { src: avatar3, position: 'center 15%', name: 'David Kim' },
  { src: avatar4, position: 'center 10%', name: 'Maria Garcia' },
];

function EventRow({ event }: { event: CalendarEvent }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (event.type === "focus") {
    return (
      <div className="px-6 py-5 flex items-center justify-between border-b border-border">
        <div className="flex items-baseline gap-4">
          <div className="w-[55px] shrink-0">
            <p className="text-[14px] leading-[20px] tracking-[0.16px]" style={{ color: '#666663' }}>{event.duration}</p>
          </div>
          <p className="text-[13px] leading-[19.5px] tracking-[-0.3px] ml-[15px]" style={{ color: '#666663' }}>{event.title}</p>
        </div>
        {event.hasBlock && (
          <button
            className="px-4 py-1.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]"
            style={{ border: '1px solid #7D7A7A', color: '#202020' }}
          >
            Block
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="px-6 flex items-start justify-between border-b border-border"
      style={{ paddingTop: '16px', paddingBottom: '16px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="w-[55px] shrink-0">
          <p className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium" style={{ color: '#666663' }}>{event.time}</p>
          <p className="text-[12px] leading-[16px] tracking-[0px]" style={{ color: '#666663' }}>{event.duration}</p>
        </div>
        <div className="flex items-start gap-3">
          <div
            className={`rounded-full shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] self-stretch ${event.tentative ? 'w-[8px]' : 'w-[6px]'}`}
            style={{
              minHeight: '44px',
              ...(event.tentative
                ? { backgroundImage: `repeating-linear-gradient(45deg, ${event.color} 0px, ${event.color} 8px, transparent 8px, transparent 10px)`, backgroundSize: '10px 10px', backgroundPosition: '-3px 0', overflow: 'hidden' }
                : { backgroundColor: event.color }),
            }}
          />
          <div className="min-w-0 flex flex-col justify-center" style={{ minHeight: '44px' }}>
            <p className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium text-foreground">{event.title}</p>
            <p className="text-[12px] leading-[16px] tracking-[0px] flex items-center gap-1.5" style={{ color: '#666663' }}>
              {event.location}
              {event.hasCopy && (
                <button className="hover:text-foreground transition-colors">
                  <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              )}
            </p>

            {/* Expanded hover content */}
            <div
              className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                gridTemplateRows: isHovered && event.hasJoin ? '1fr' : '0fr',
                opacity: isHovered && event.hasJoin ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
              <div className="mt-2 flex flex-col gap-3">
                {event.status && (
                  <p className="text-[12px] leading-[16px] tracking-[0px]" style={{ color: '#666663' }}>
                    Status: {event.status}
                  </p>
                )}

                {/* Avatar row */}
                {event.attendees && (
                  <div className="flex items-center" style={{ gap: '4px' }}>
                    <TooltipProvider delayDuration={200}>
                    {avatarImages.map((avatar, i) => (
                      <Tooltip key={i}>
                        <TooltipTrigger asChild>
                          <img
                            src={avatar.src}
                            alt={avatar.name}
                            className="w-6 h-6 rounded object-cover"
                            style={{ objectPosition: avatar.position }}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="text-xs border-none px-2.5 py-1.5 rounded-md"
                          style={{ backgroundColor: '#554F4A', color: '#FFFFFF' }}
                          arrowPadding={4}
                        >
                          <TooltipPrimitive.Arrow width={8} height={4} style={{ fill: '#554F4A' }} />
                          {avatar.name}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    </TooltipProvider>
                    {event.attendees && event.attendees > 5 && (
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#F4EFE7' }}>
                        <span className="text-[10px] leading-[16px] font-medium" style={{ color: '#666663' }}>
                          +{event.attendees - 5}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action icons */}
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#DDD5C8] transition-colors"
                    style={{ border: '1px solid #7D7A7A' }}
                  >
                    <MessageSquare className="w-4 h-4" strokeWidth={1.5} style={{ color: '#202020' }} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#DDD5C8] transition-colors"
                    style={{ border: '1px solid #7D7A7A' }}
                  >
                    <Mail className="w-4 h-4" strokeWidth={1.5} style={{ color: '#202020' }} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#DDD5C8] transition-colors"
                    style={{ border: '1px solid #7D7A7A' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                    }}
                  >
                    <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} style={{ color: '#202020' }} />
                  </button>
                </div>
              </div>
              </div>
            </div>

            {/* Overflow menu - outside grid to avoid clipping */}
            {showMenu && (
              <div className="relative">
                <div className="absolute left-0 top-0 rounded-xl shadow-lg z-10 py-1.5 px-1.5 w-[200px]" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DE' }}>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#F4EFE7] transition-colors">
                    <span className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal text-foreground">Message host</span>
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} style={{ color: '#202020' }} />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#F4EFE7] transition-colors">
                    <span className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal text-foreground">Open Outlook</span>
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} style={{ color: '#202020' }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {event.hasJoin && (
        <button
          className="h-8 rounded-full bg-foreground text-background hover:opacity-90 text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal shrink-0 flex items-center justify-center whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ width: isHovered ? '128px' : '55px', gap: isHovered ? '8px' : '0px' }}
        >
          <span className="transition-all duration-300" style={{ opacity: isHovered ? 1 : 0, width: isHovered ? '16px' : '0px', overflow: 'hidden', flexShrink: 0 }}>
            <Video className="w-4 h-4" strokeWidth={1.5} />
          </span>
          <span>{isHovered ? 'Join via Zoom' : 'Join'}</span>
        </button>
      )}
    </div>
  );
}

export function CalendarPanel() {
  return (
    <div className="flex flex-col">
      {/* Today header */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-border">
        <div className="flex items-baseline gap-2" style={{ gap: '8px' }}>
          <span className="text-[15px] leading-[22.5px] tracking-[-0.3px] font-medium text-foreground">Today</span>
          <span className="text-[12px] leading-[16px] tracking-[0px] font-medium" style={{ color: '#666663' }}>February 25</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] leading-[16px] tracking-[0px]" style={{ color: '#666663' }}>Updated 19m ago</span>
          <button className="hover:text-foreground transition-colors" style={{ color: '#666663' }}>
            <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Today events */}
      {todayEvents.map(event => (
        <EventRow key={event.id} event={event} />
      ))}

      {/* Tomorrow header */}
      <div className="px-6 pb-2 flex items-baseline border-b border-border" style={{ gap: '8px', paddingTop: '32px' }}>
        <span className="text-[15px] leading-[22.5px] tracking-[-0.3px] font-medium text-foreground">Tomorrow</span>
        <span className="text-[12px] leading-[16px] tracking-[0px] font-medium" style={{ color: '#666663' }}>February 26</span>
      </div>

      {/* Tomorrow events */}
      {tomorrowEvents.map(event => (
        <EventRow key={event.id} event={event} />
      ))}
    </div>
  );
}
