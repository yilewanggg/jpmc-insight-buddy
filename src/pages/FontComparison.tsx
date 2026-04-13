import { ThumbsUp, ThumbsDown, MoreHorizontal, CornerDownRight } from "lucide-react";

const sampleText = {
  greeting: "Good morning, Carmen",
  paragraph: "Your morning is packed with back-to-back meetings, from a **QA Review** to an **Internal** and a **1:1 with Priya**. The afternoon remains clear, giving you room for focus time, catch-ups, or planning ahead.",
  followUp: "I noticed you have a clash at 9 AM between **QA Review** and **Design Jam**.\n\nI can move Design Jam to 10 AM — Anna is available then. Would you like me to reschedule it?",
  chips: ["Move Design Jam to 10", "Move QA Review to 10", "Book a room for 11"],
};

function renderBold(text: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (boldStart > 0) parts.push(<span key={key++}>{remaining.slice(0, boldStart)}</span>);
    const afterStart = remaining.slice(boldStart + 2);
    const boldEnd = afterStart.indexOf("**");
    if (boldEnd === -1) {
      parts.push(<strong key={key++} className="font-medium">{afterStart}</strong>);
      break;
    }
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
    <div className="flex flex-col h-full border-r last:border-r-0 border-border p-6 overflow-y-auto">
      {/* Font tag */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase"
          style={{ backgroundColor: '#E8E4DE', color: '#5A5652' }}>
          {font.name}
        </span>
      </div>

      <div style={{ fontFamily: font.family }}>
        {/* Greeting */}
        <h2 className="text-[28px] leading-[36px] font-light mb-6 font-headline">
          Good morning, Carmen
        </h2>

        {/* Body text - font-normal (400) instead of font-light (300) */}
        <p className="text-[15px] leading-[24px] font-normal mb-5" style={{ color: '#202020' }}>
          {renderBold(sampleText.paragraph)}
        </p>

        {/* Follow-up */}
        <p className="text-[15px] leading-[24px] font-normal mb-5" style={{ color: '#202020' }}>
          {renderBold("I noticed you have a clash at 9 AM between **QA Review** and **Design Jam**.")}
        </p>
        <p className="text-[15px] leading-[24px] font-normal mb-5" style={{ color: '#202020' }}>
          {renderBold("I can move Design Jam to 10 AM — Anna is available then. Would you like me to reschedule it?")}
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sampleText.chips.map((chip) => (
            <button
              key={chip}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] leading-[18px] font-normal"
              style={{ border: '1px solid #7D7A7A', color: '#202020' }}
            >
              <CornerDownRight className="w-3.5 h-3.5" />
              {chip}
            </button>
          ))}
        </div>

        {/* Thumbs */}
        <div className="flex items-center gap-3" style={{ color: '#202020' }}>
          <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />
          <ThumbsDown className="w-4 h-4" strokeWidth={1.5} />
          <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
        </div>

        {/* Weight specimens */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-[11px] uppercase tracking-wider mb-3" style={{ color: '#999' }}>Weight Specimens</p>
          <p className="text-[15px] leading-[24px] font-light mb-1">Light (300): The quick brown fox jumps over the lazy dog</p>
          <p className="text-[15px] leading-[24px] font-normal mb-1">Regular (400): The quick brown fox jumps over the lazy dog</p>
          <p className="text-[15px] leading-[24px] font-medium mb-1">Medium (500): The quick brown fox jumps over the lazy dog</p>
          <p className="text-[15px] leading-[24px] font-semibold mb-1">Semibold (600): The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>
    </div>
  );
}

export default function FontComparison() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-8 py-5 border-b border-border">
        <h1 className="text-[24px] font-headline font-light">Font Comparison — Body Text</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Daily digest content rendered at font-weight 400 (normal) with bold at 500 (medium)</p>
      </div>

      {/* 4-column grid */}
      <div className="grid grid-cols-4 h-[calc(100vh-73px)]">
        {fonts.map((font) => (
          <FontPanel key={font.name} font={font} />
        ))}
      </div>
    </div>
  );
}
