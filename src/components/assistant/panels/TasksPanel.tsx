import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationsPanel } from "./NotificationsPanel";

type TaskStatus = "overdue" | "due_soon" | "not_started" | "in_progress" | "completed";

interface Task {
  id: number;
  category: string;
  status: TaskStatus;
  statusLabel: string;
  title: string;
  due: string;
}

const tasks: Task[] = [
  { id: 1, category: "Learning", status: "overdue", statusLabel: "Overdue", title: "Complete your Cybersecurity training", due: "Due: Friday, October 8" },
  { id: 2, category: "Learning", status: "due_soon", statusLabel: "Due soon", title: "Complete your Data & Security Compliance training", due: "Due: Friday, October 15" },
  { id: 3, category: "Travel & Expenses", status: "not_started", statusLabel: "Not started", title: "Submit your expense report from your travel to Chicago", due: "Due: Friday, October 17" },
  { id: 4, category: "Learning", status: "in_progress", statusLabel: "In progress", title: "Complete your Compliance training", due: "Due: Friday, October 29" },
];

const completedTasks: Task[] = [
  { id: 5, category: "Learning", status: "completed", statusLabel: "Completed", title: "Annual ethics training", due: "Completed: September 30" },
];

const statusStyles: Record<TaskStatus, string> = {
  overdue: "bg-[#A8332B26] text-[#A8332B]",
  due_soon: "bg-[#FEF1BFbf] text-[#785C1A]",
  not_started: "bg-[#1A17141a] text-[#202020]",
  in_progress: "bg-[#B3D6FD4d] text-[#294770]",
  completed: "bg-[#E8F5E9] text-[#388E3C]",
};

interface TasksPanelProps {
  defaultTab?: "tasks" | "notifications";
}

export function TasksPanel({ defaultTab = "tasks" }: TasksPanelProps) {
  const [activeTab, setActiveTab] = useState<"tasks" | "notifications">(defaultTab);
  const [completedOpen, setCompletedOpen] = useState(false);
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-6 pl-0 pr-6 border-b border-border justify-start w-[404px] mx-auto pt-2">
        <button
          onClick={() => setActiveTab("tasks")}
          className={cn(
            "pb-2 text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal transition-colors relative",
            activeTab === "tasks" ? "text-foreground" : "text-[#666663]"
          )}
        >
          Tasks ({tasks.length})
          {activeTab === "tasks" && <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-foreground" />}
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={cn(
            "pb-2 text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal transition-colors relative",
            activeTab === "notifications" ? "text-foreground" : "text-[#666663]"
          )}
        >
          Notifications (3)
          {activeTab === "notifications" && <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-foreground" />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "tasks" ? (
          <>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="px-6 py-5 border-b border-border cursor-pointer"
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal" style={{ color: '#666663' }}>
                    {task.category}
                  </span>
                  <span className={cn(
                    "text-[12px] leading-[16px] tracking-[0px] px-2 h-5 inline-flex items-center rounded font-semibold",
                    statusStyles[task.status]
                  )}>
                    {task.statusLabel}
                  </span>
                </div>
                <p className="text-[13px] leading-[19.5px] tracking-[-0.3px] text-foreground mb-1">
                  {task.title}
                </p>
                <p className="text-[12px] leading-[16px] tracking-[0px]" style={{ color: '#666663' }}>
                  {task.due}
                </p>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    hoveredTask === task.id ? "grid-rows-[1fr] opacity-100 mt-6 pb-1" : "grid-rows-[0fr] opacity-0 mt-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center justify-center gap-2 w-[120px] h-[40px] rounded-full bg-[#000000] text-[#FFFFFF] text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal hover:bg-[#DDD5C8] hover:text-[#202020] transition-colors">
                        Do it now <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button className="flex items-center justify-center gap-2 w-[142px] h-[40px] rounded-full bg-transparent text-[#202020] text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal hover:bg-[#DDD5C8] transition-colors" style={{ border: '1px solid #7D7A7A' }}>
                        Schedule for later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setCompletedOpen(!completedOpen)}
              className="w-full px-6 py-6 flex items-center justify-between border-b border-border hover:bg-[#DDD5C8] transition-colors"
            >
              <span className="text-[15px] leading-[22.5px] tracking-[-0.3px] font-normal text-foreground">
                Completed tasks
              </span>
              <ChevronDown className={cn("w-4 h-4 text-foreground transition-transform", completedOpen && "rotate-180")} strokeWidth={1.5} />
            </button>

            {completedOpen && completedTasks.map((task) => (
              <div key={task.id} className="px-6 py-5 border-b border-border opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] leading-[19.5px] tracking-[-0.3px] font-normal" style={{ color: '#666663' }}>
                    {task.category}
                  </span>
                  <span className={cn(
                    "text-[12px] leading-[16px] tracking-[0px] px-2 h-5 inline-flex items-center rounded font-semibold",
                    statusStyles[task.status]
                  )}>
                    {task.statusLabel}
                  </span>
                </div>
                <p className="text-[13px] leading-[19.5px] tracking-[-0.3px] text-foreground mb-1 line-through">
                  {task.title}
                </p>
                <p className="text-[12px] leading-[16px] tracking-[0px]" style={{ color: '#666663' }}>
                  {task.due}
                </p>
              </div>
            ))}
          </>
        ) : (
          <NotificationsPanel />
        )}
      </div>
    </div>
  );
}
