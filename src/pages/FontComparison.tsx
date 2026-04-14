import { ThumbsUp, ThumbsDown, MoreHorizontal, CornerDownRight, Calendar, Clock } from "lucide-react";
import calendarCardImage from "@/assets/calendar-card.png";
import feedbackCardIcon from "@/assets/feedback-card.svg";

const sampleText = {
  paragraph: "Your morning is packed with back-to-back meetings, from a **QA Review** to an **Internal** and a **1:1 with Priya**. The afternoon remains clear, giving you room for focus time, catch-ups, or planning ahead.",
  chips: ["Move Design Jam to 10", "Move QA Review to 10", "Book a room for 11"],
};

function renderBold(text: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) { parts.push(<span key={key++}>{remaining}</span>); break; }
    if (boldStart > 0) parts.push(<span key={key++}>{remaining.slice(0, boldStart)}</span>);
    const afterStart = remaining.slice(boldStart + 2);
    const boldEnd = afterStart.indexOf("**");
    if (boldEnd === -1) { parts.push(<strong key={key++} className="font-medium">{afterStart}</strong>); break; }
    parts.push(<strong key={key++} className="font-medium">{afterStart.slice(0, boldEnd)}</strong>);
    remaining = afterStart.slice(boldEnd + 2);
  }
  return parts;
}

const fonts = [
  { name: "Söhne", family: "'Sohne', 'Söhne', -apple-system, BlinkMacSystemFont, sans-serif" },
  { name: "Open Sans", family: "'Open Sans', sans-serif" },
  { name: "Helvetica", family: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { name: "Arial", family: "Arial, sans-serif" },
];

function FontPanel({ font }: { font: { name: string; family: string } }) {
  return (
    <div className="flex-1 min-w-[280px] border-r last:border-r-0 border-border p-5 overflow-y-auto" style={{ fontFamily: font.family }}>
      {/* Font tag */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase"
          style={{ backgroundColor: '#E8E4DE', color: '#5A5652', fontFamily: "'Open Sans', sans-serif" }}>
          {font.name}
        </span>
      </div>

      {/* Body text */}
      <p className="text-[15px] leading-[24px] font-normal mb-4" style={{ color: '#202020' }}>
        {renderBold(sampleText.paragraph)}
      </p>

      <p className="text-[15px] leading-[24px] font-normal mb-4" style={{ color: '#202020' }}>
        {renderBold("I noticed you have a clash at 9 AM between **QA Review** and **Design Jam**. I can move Design Jam to 10 AM — Anna is available then. Would you like me to reschedule it?")}
      </p>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {sampleText.chips.map((chip) => (
          <button key={chip} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] leading-[16px] font-normal"
            style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
            <CornerDownRight className="w-3 h-3" />
            {chip}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6" style={{ color: '#202020' }}>
        <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.5} />
        <ThumbsDown className="w-3.5 h-3.5" strokeWidth={1.5} />
        <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
      </div>

      {/* Action Card */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-4 shadow-sm">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FFF4E6' }}>
            <Calendar className="w-4 h-4" style={{ color: '#8F5A39' }} />
          </div>
          <div>
            <p className="text-[14px] leading-[20px] font-medium" style={{ color: '#202020' }}>Data Security and Compliance Training</p>
            <p className="text-[12px] leading-[16px] font-normal text-muted-foreground mt-0.5">Due by June 30, 2025</p>
          </div>
        </div>
        <p className="text-[13px] leading-[20px] font-normal text-muted-foreground mb-3">
          Complete the mandatory annual training module on data handling and compliance protocols.
        </p>
        <button className="w-full py-2 rounded-xl text-[13px] font-medium text-center"
          style={{ backgroundColor: '#202020', color: '#fff' }}>
          Start Training
        </button>
      </div>

      {/* Feedback Card */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-4 shadow-sm">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#E8F4FD' }}>
            <img src={feedbackCardIcon} alt="" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[14px] leading-[20px] font-medium" style={{ color: '#202020' }}>Mid-Year Feedback Request</p>
            <p className="text-[12px] leading-[16px] font-normal text-muted-foreground mt-0.5">From: Sarah Chen, VP Product</p>
          </div>
        </div>
        <p className="text-[13px] leading-[20px] font-normal text-muted-foreground mb-3">
          Sarah has requested peer feedback for her mid-year review. Share your observations by Friday.
        </p>
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-xl text-[13px] font-medium text-center"
            style={{ backgroundColor: '#202020', color: '#fff' }}>
            Give Feedback
          </button>
          <button className="flex-1 py-2 rounded-xl text-[13px] font-medium text-center border"
            style={{ borderColor: '#7D7A7A', color: '#202020' }}>
            Remind Me Later
          </button>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="rounded-2xl border border-border overflow-hidden shadow-sm mb-4">
        <img src={calendarCardImage} alt="Calendar" className="w-full" />
      </div>

      {/* Weight specimens */}
      <div className="pt-4 border-t border-border">
        <p className="text-[11px] uppercase tracking-wider mb-2" style={{ color: '#999' }}>Weight Specimens</p>
        <p className="text-[14px] leading-[22px] font-light mb-0.5">Light (300): The quick brown fox jumps</p>
        <p className="text-[14px] leading-[22px] font-normal mb-0.5">Regular (400): The quick brown fox jumps</p>
        <p className="text-[14px] leading-[22px] font-medium mb-0.5">Medium (500): The quick brown fox jumps</p>
        <p className="text-[14px] leading-[22px] font-semibold mb-0.5">Semibold (600): The quick brown fox jumps</p>
      </div>
    </div>
  );
}

export default function FontComparison() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-8 py-4 border-b border-border">
        <h1 className="text-[24px] font-headline font-light">Font Comparison — Body Text</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Daily digest content at weight 400 (normal), bold at 500 (medium)</p>
      </div>

      {/* Horizontal 4-column layout */}
      <div className="flex h-[calc(100vh-65px)] overflow-x-auto">
        {fonts.map((font) => (
          <FontPanel key={font.name} font={font} />
        ))}
      </div>
    </div>
  );
}
