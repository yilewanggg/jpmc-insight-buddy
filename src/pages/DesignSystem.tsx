import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CornerDownRight, Sparkles, Check, Calendar, Star, MessageSquare, Palette, Type, Square, MousePointer, Layout, Zap, Plus, Bell, SlidersHorizontal, ThumbsUp, ThumbsDown, MoreHorizontal, ExternalLink, Image } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import jpmcLogo from "@/assets/jpmc-logo-transparent.png";
import graduationIcon from "@/assets/graduation-icon.png";
import seatIcon from "@/assets/seat-icon.svg";
import carmenProfile from "@/assets/carmen-profile.png";
import calendarCardImage from "@/assets/calendar-card.png";
import calendarIcon from "@/assets/calendar-icon.svg";
import calendarCarouselIcon from "@/assets/calendar-carousel-icon.svg";
import handIcon from "@/assets/hand-icon.svg";
import confirmationIcon from "@/assets/confirmation-icon.svg";
import confirmationCheckIcon from "@/assets/confirmation-check.svg";
import trainingIcon from "@/assets/training-icon.svg";
import planeIcon from "@/assets/plane-icon.svg";
import megaphoneIcon from "@/assets/megaphone-icon.svg";
import celebrationIcon from "@/assets/celebration-icon.svg";
import feedbackCardIcon from "@/assets/feedback-card.svg";

const sections = [
  { id: "colors", label: "Colors", icon: Palette },
  { id: "typography", label: "Typography", icon: Type },
  { id: "spacing", label: "Spacing & Radius", icon: Square },
  { id: "buttons", label: "Buttons", icon: MousePointer },
  { id: "cards", label: "Cards", icon: Layout },
  { id: "illustrations", label: "Illustrations", icon: Image },
  { id: "forms", label: "Form Elements", icon: Square },
  { id: "chat", label: "Chat Patterns", icon: MessageSquare },
  { id: "sidebar", label: "Sidebar", icon: Layout },
  { id: "animation", label: "Animation", icon: Zap },
];

const ColorSwatch = ({ name, variable, hex, className }: { name: string; variable: string; hex: string; className?: string }) => (
  <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors">
    <div className={`w-14 h-14 rounded-xl border border-border shadow-sm shrink-0 ${className}`} style={{ backgroundColor: `hsl(var(${variable}))` }} />
    <div className="min-w-0">
      <p className="text-[14px] leading-[20px] font-normal text-foreground">{name}</p>
      <p className="text-[12px] leading-[16px] font-light text-muted-foreground font-mono">{hex}</p>
      <p className="text-[11px] leading-[14px] font-light text-muted-foreground font-mono opacity-60">var({variable})</p>
    </div>
  </div>
);

const SectionHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-10">
    <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline">{title}</h2>
    <p className="text-[14px] leading-[20px] font-light text-muted-foreground mt-1">{description}</p>
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-5">
      <h3 className="text-[13px] leading-[18px] font-semibold tracking-[0.5px] uppercase text-muted-foreground">{title}</h3>
      <div className="flex-1 h-px bg-border" />
    </div>
    {children}
  </div>
);

const DesignSystem = () => {
  const [activeSection, setActiveSection] = useState("colors");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sticky sidebar nav */}
      <nav className="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-border sticky top-0 h-screen p-6 pt-10">
        <p className="text-[11px] leading-[14px] font-semibold tracking-[1px] uppercase text-muted-foreground mb-6">Design System</p>
        <div className="space-y-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-light transition-colors text-left ${
                activeSection === s.id
                  ? "bg-foreground text-background font-normal"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              <s.icon className="w-3.5 h-3.5 shrink-0" />
              {s.label}
            </button>
          ))}
        </div>
        <div className="mt-auto pt-6">
          <p className="text-[11px] leading-[14px] font-light text-muted-foreground">JPMC Assistant</p>
          <p className="text-[11px] leading-[14px] font-light text-muted-foreground opacity-60">v1.0</p>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-[960px] mx-auto px-8 py-12 lg:px-16">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
              <Palette className="w-5 h-5 text-background" />
            </div>
            <div>
              <p className="text-[11px] leading-[14px] font-semibold tracking-[1px] uppercase text-muted-foreground">JPMC Assistant</p>
              <p className="text-[11px] leading-[14px] font-light text-muted-foreground">Brand guidelines & component library</p>
            </div>
          </div>
          <h1 className="text-[48px] leading-[56px] font-light tracking-[-0.5px] text-foreground font-headline mt-6">
            Design System
          </h1>
          <p className="text-[16px] leading-[24px] font-light text-muted-foreground mt-3 max-w-[600px]">
            A comprehensive reference for colors, typography, components, and interaction patterns used throughout the JPMC Assistant experience.
          </p>
        </div>

        {/* ── COLORS ── */}
        <section id="colors" className="mb-20 scroll-mt-12">
          <SectionHeader title="Colors" description="Brand palette, semantic tokens, and data visualization colors." />

          <SubSection title="Brand palette">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              <ColorSwatch name="Bronze" variable="--jpmc-bronze" hex="#8F5A39" />
              <ColorSwatch name="Bronze Light" variable="--jpmc-bronze-light" hex="#B08968" />
              <ColorSwatch name="Travertine" variable="--jpmc-travertine" hex="#F4EFE7" />
              <ColorSwatch name="Sky Blue" variable="--jpmc-sky-blue" hex="#A6D7F0" />
              <ColorSwatch name="Black" variable="--jpmc-black" hex="#000000" />
              <ColorSwatch name="White" variable="--jpmc-white" hex="#FFFFFF" className="!border-border" />
            </div>
          </SubSection>

          <SubSection title="Semantic tokens">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              <ColorSwatch name="Background" variable="--background" hex="#F4EFE7" />
              <ColorSwatch name="Foreground" variable="--foreground" hex="#000000" />
              <ColorSwatch name="Primary" variable="--primary" hex="#8F5A39" />
              <ColorSwatch name="Accent" variable="--accent" hex="#A6D7F0" />
              <ColorSwatch name="Muted" variable="--muted" hex="#C8C0B4" />
              <ColorSwatch name="Muted Foreground" variable="--muted-foreground" hex="#666663" />
              <ColorSwatch name="Card" variable="--card" hex="#FFFFFF" className="!border-border" />
              <ColorSwatch name="Destructive" variable="--destructive" hex="#B22222" />
            </div>
          </SubSection>

          <SubSection title="Data visualization">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              <ColorSwatch name="Success" variable="--jpmc-success" hex="#367138" />
              <ColorSwatch name="Info" variable="--jpmc-info" hex="#2E4770" />
              <ColorSwatch name="Error" variable="--jpmc-error" hex="#B22222" />
              <ColorSwatch name="Gold" variable="--jpmc-gold" hex="#C4A96A" />
            </div>
          </SubSection>
        </section>

        <Separator className="mb-20" />

        {/* ── TYPOGRAPHY ── */}
        <section id="typography" className="mb-20 scroll-mt-12">
          <SectionHeader title="Typography" description="Type scale, weights, and font families for headings and body text." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SubSection title="Tiempos Headline · Serif">
                <p className="text-[12px] leading-[16px] font-light text-muted-foreground mb-8">
                  Display and heading typeface. Light weight for elegance.
                </p>
                <div className="space-y-6">
                  {[
                    { spec: "H1 · 40/48 · Light · -0.5", text: "Welcome back, Taylor", className: "text-[40px] leading-[48px] font-light tracking-[-0.5px] font-headline" },
                    { spec: "H2 · 28/36 · Light · -0.3", text: "Your daily schedule", className: "text-[28px] leading-[36px] font-light tracking-[-0.3px] font-headline" },
                    { spec: "H3 · 24/32 · Light · -0.3", text: "Review feedback", className: "text-[24px] leading-[32px] font-light tracking-[-0.3px] font-headline" },
                    { spec: "H4 · 20/28 · Light", text: "Feedback requested", className: "text-[20px] leading-[28px] font-light font-headline" },
                  ].map(h => (
                    <div key={h.spec} className="pb-6 border-b border-border last:border-0 last:pb-0">
                      <p className="text-[11px] font-mono font-light text-muted-foreground mb-2">{h.spec}</p>
                      <p className={h.className}>{h.text}</p>
                    </div>
                  ))}
                </div>
              </SubSection>
            </div>

            <div>
              <SubSection title="Inter / Source Sans Pro · Sans-serif">
                <p className="text-[12px] leading-[16px] font-light text-muted-foreground mb-8">
                  Body, labels, and UI elements. Light to semibold weights.
                </p>
                <div className="space-y-6">
                  {[
                    { spec: "Body Large · 16/24 · Light", text: "Here's a draft feedback request for Taylor Smith based on your project.", className: "text-[16px] leading-[24px] font-light" },
                    { spec: "Body · 14/20 · Light", text: "Listens well in meetings, ideas are good but unclearly communicated.", className: "text-[14px] leading-[20px] font-light" },
                    { spec: "Body Semibold · 14/20 · 600", text: "What you said:", className: "text-[14px] leading-[20px] font-semibold" },
                    { spec: "Caption · 13/18 · Light", text: "Listen deeply · Create clarity", className: "text-[13px] leading-[18px] font-light text-muted-foreground" },
                    { spec: "Small · 12/16 · Light", text: "Secondary label or metadata", className: "text-[12px] leading-[16px] font-light text-muted-foreground" },
                  ].map(t => (
                    <div key={t.spec} className="pb-6 border-b border-border last:border-0 last:pb-0">
                      <p className="text-[11px] font-mono font-light text-muted-foreground mb-2">{t.spec}</p>
                      <p className={t.className}>{t.text}</p>
                    </div>
                  ))}
                </div>
              </SubSection>
            </div>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── SPACING & RADIUS ── */}
        <section id="spacing" className="mb-20 scroll-mt-12">
          <SectionHeader title="Spacing & Radius" description="Consistent spacing scale and border radius tokens." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SubSection title="Border radius">
              <div className="flex items-end gap-5 mt-4">
                {[
                  { label: "sm", value: "4px", radius: "4px" },
                  { label: "md", value: "6px", radius: "6px" },
                  { label: "lg", value: "8px", radius: "8px" },
                  { label: "xl", value: "12px", radius: "12px" },
                  { label: "2xl", value: "16px", radius: "16px" },
                  { label: "full", value: "9999px", radius: "9999px" },
                ].map(r => (
                  <div key={r.label} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-foreground" style={{ borderRadius: r.radius }} />
                    <p className="text-[12px] font-mono font-light text-muted-foreground">{r.label}</p>
                    <p className="text-[10px] font-mono font-light text-muted-foreground opacity-50">{r.value}</p>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="Spacing scale">
              <div className="space-y-3 mt-4">
                {[
                  { px: "4", desc: "Tight — icon gaps" },
                  { px: "8", desc: "Compact — form gaps" },
                  { px: "12", desc: "Default — element gaps" },
                  { px: "16", desc: "Comfortable — sections" },
                  { px: "24", desc: "Spacious — card padding" },
                  { px: "32", desc: "Large — section breaks" },
                  { px: "48", desc: "XL — major divisions" },
                ].map(s => (
                  <div key={s.px} className="flex items-center gap-4">
                    <div className="w-10 text-right">
                      <span className="text-[12px] font-mono font-light text-foreground">{s.px}px</span>
                    </div>
                    <div className="bg-primary/30 rounded-sm h-5" style={{ width: `${Number(s.px) * 2}px` }} />
                    <span className="text-[12px] font-light text-muted-foreground">{s.desc}</span>
                  </div>
                ))}
              </div>
            </SubSection>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── BUTTONS ── */}
        <section id="buttons" className="mb-20 scroll-mt-12">
          <SectionHeader title="Buttons" description="Button variants, sizes, states, and chat-specific action elements." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <SubSection title="Action buttons">
              <p className="text-[12px] leading-[16px] font-light text-muted-foreground mb-6">
                Used in task cards, notification cards, and calendar panels. Buttons hug their content (no fixed width).
              </p>
              <div className="space-y-8">
                <div>
                  <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Primary action · Default</p>
                  <div className="flex items-center gap-5">
                    <button className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-foreground text-background text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium transition-colors">
                      Do it now <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Primary action · Hover</p>
                  <div className="flex items-center gap-5">
                    <button className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#DDD5C8] text-foreground text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium transition-colors">
                      Do it now <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[12px] font-light text-muted-foreground">Hover: bg #DDD5C8, text foreground</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Secondary action · Default</p>
                  <div className="flex items-center gap-5">
                    <button className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-transparent text-foreground text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium transition-colors" style={{ border: '1px solid #7D7A7A' }}>
                      Schedule for later
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Secondary action · Hover</p>
                  <div className="flex items-center gap-5">
                    <button className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#DDD5C8] text-foreground text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium transition-colors" style={{ border: '1px solid #7D7A7A' }}>
                      Schedule for later
                    </button>
                    <p className="text-[12px] font-light text-muted-foreground">Hover: bg #DDD5C8</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Linkout button (used in cards)</p>
                  <div className="flex items-center gap-5">
                    <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                      Go to My Learning <ExternalLink className="w-[13px] h-[13px]" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Combined (as used in tasks)</p>
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-foreground text-background text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium hover:bg-[#DDD5C8] hover:text-foreground transition-colors">
                      Do it now <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-transparent text-foreground text-[13px] leading-[19.5px] tracking-[-0.3px] font-medium hover:bg-[#DDD5C8] transition-colors" style={{ border: '1px solid #7D7A7A' }}>
                      Schedule for later
                    </button>
                  </div>
                </div>
              </div>
            </SubSection>

            <div>
              <SubSection title="Choice chips">
                <p className="text-[12px] leading-[16px] font-light text-muted-foreground mb-6">
                  Used after AI responses for quick actions. Include leading CornerDownRight icon (16px).
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Default</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent transition-colors text-[14px] leading-[20px] hover:bg-[#DDD5C8]" style={{ border: '1px solid #7D7A7A', color: '#202020', letterSpacing: '0.16px' }}>
                        <CornerDownRight className="w-4 h-4" /> Yes, book this seat
                      </button>
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent transition-colors text-[14px] leading-[20px] hover:bg-[#DDD5C8]" style={{ border: '1px solid #7D7A7A', color: '#202020', letterSpacing: '0.16px' }}>
                        <CornerDownRight className="w-4 h-4" /> Show me more options
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Hover</p>
                    <div className="flex items-center gap-3">
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DDD5C8] transition-colors text-[14px] leading-[20px]" style={{ border: '1px solid #7D7A7A', color: '#202020', letterSpacing: '0.16px' }}>
                        <CornerDownRight className="w-4 h-4" /> Yes, book this seat
                      </button>
                      <p className="text-[12px] font-light text-muted-foreground">Hover: bg #DDD5C8</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Selected</p>
                    <div className="flex items-center gap-3 flex-nowrap">
                      <button className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors text-[14px] leading-[20px]" style={{ backgroundColor: '#E9E0D3', color: '#202020', letterSpacing: '0.16px' }}>
                        <CornerDownRight className="w-4 h-4 shrink-0" /> Yes, book this seat
                      </button>
                      <p className="text-[12px] font-light text-muted-foreground shrink-0">Selected: bg Travertine (#E9E0D3)</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Unselected (after selection)</p>
                    <div className="flex items-center gap-3 flex-nowrap">
                      <button className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent opacity-40 cursor-not-allowed text-[14px] leading-[20px]" style={{ border: '1px solid #7D7A7A', color: '#202020', letterSpacing: '0.16px' }}>
                        <CornerDownRight className="w-4 h-4 shrink-0" /> Show me more options
                      </button>
                      <p className="text-[12px] font-light text-muted-foreground shrink-0">Unselected: opacity 40%</p>
                    </div>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Component buttons">
                <p className="text-[12px] leading-[16px] font-light text-muted-foreground mb-4">
                  Shadcn/UI variants for forms and dialogs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
              </SubSection>
            </div>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── CARDS ── */}
        <section id="cards" className="mb-20 scroll-mt-12">
          <SectionHeader title="Cards" description="Card patterns used across daily digest, book a seat, and feedback flows." />

          <div className="space-y-12">
            {/* Training card */}
            <SubSection title="Training card (Daily Digest)">
              <div className="max-w-[620px]">
                <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <div className="flex items-start gap-4 p-6">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                      <img src={graduationIcon} alt="Training" className="w-10 h-10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-foreground">Data Security and Compliance</p>
                      <p className="text-[14px] leading-[20px] tracking-[0.16px] mt-0.5" style={{ color: '#666663' }}>Estimated time to complete: 25 min</p>
                    </div>
                    <button className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px] tracking-[0.16px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                      Go to My Learning <ExternalLink className="w-[13px] h-[13px]" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
                  <span>Icon: 40×40 illustration</span>
                  <span>Title: 16/24, tracking 0.16px</span>
                  <span>Subtitle: 14/20, #666663</span>
                  <span>Action: pill button with linkout</span>
                  <span>Padding: 24px (p-6)</span>
                  <span>Bg: bg-card, rounded-2xl, shadow-sm</span>
                </div>
              </div>
            </SubSection>

            {/* Seat suggestion card */}
            <SubSection title="Seat suggestion card (Book a Seat)">
              <div className="max-w-[620px]">
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="flex items-start justify-between pt-4 px-6 pb-0">
                    <span className="text-[16px] leading-[24px] font-semibold text-foreground">Seats suggested for you</span>
                    <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ border: '1px solid #7D7A7A', color: '#202020' }}>
                      Go to Book a Seat <ExternalLink className="w-[13px] h-[13px]" />
                    </button>
                  </div>
                  {[
                    { id: "04AAC065", building: "4 Metrotech Center", floor: "Floor 3", selected: true },
                    { id: "04AAC072", building: "4 Metrotech Center", floor: "Floor 5", selected: false },
                  ].map((seat, i) => (
                    <div key={seat.id} className={`flex items-center pl-6 pr-6 py-3 gap-4 ${i === 1 ? "pb-6" : ""}`}>
                      <img src={seatIcon} alt="Seat" className="w-10 h-10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[16px] leading-[24px] font-normal text-foreground">Seat {seat.id}</span>
                          <span className="text-[12px] leading-[16px] px-2 h-5 inline-flex items-center rounded font-semibold text-[#1C5917]" style={{ backgroundColor: 'rgba(79, 140, 64, 0.2)' }}>
                            Frequently booked
                          </span>
                          <span className="text-[12px] leading-[16px] px-2 h-5 inline-flex items-center rounded font-semibold text-[#294770]" style={{ backgroundColor: 'rgba(179, 214, 253, 0.3)' }}>
                            Near team
                          </span>
                        </div>
                        <p className="text-[13px] leading-[19.5px] tracking-[-0.3px]" style={{ color: '#666663' }}>
                          {seat.building} | {seat.floor}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${seat.selected ? "border-foreground" : "border-[#7D7A7A]"}`}>
                        {seat.selected && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
                  <span>Icon: 40×40 seat illustration</span>
                  <span>Header: 16/24, font-semibold</span>
                  <span>Tags: 12/16, rounded, font-semibold</span>
                  <span>Radio: 20×20, 2px border</span>
                  <span>Green tag: #1C5917 / rgba(79,140,64,0.2)</span>
                  <span>Blue tag: #294770 / rgba(179,214,253,0.3)</span>
                  <span>Right padding to radio: 24px</span>
                  <span>Linkout: top-right, 16px/24px offset</span>
                </div>
              </div>
            </SubSection>

            {/* Feedback card */}
            <SubSection title="Feedback request card">
              <div className="max-w-[420px]">
                <div className="bg-card rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
                  <img src={carmenProfile} alt="Carmen Vargas" className="w-14 h-14 rounded-full object-cover mb-3" />
                  <p className="font-headline font-light mb-2" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '0px' }}>
                    Provide feedback for Carmen
                  </p>
                  <p className="font-light text-center" style={{ fontSize: '16px', lineHeight: '24px', color: '#666663' }}>
                    "Hi! Since we've been working closely on VP hiring over the last month, I'd love to get feedback from you."
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
                  <span>Avatar: 56×56, rounded-full</span>
                  <span>Title: Tiempos 24/32, font-light</span>
                  <span>Body: 16/24, #666663</span>
                  <span>Padding: 24px, centered layout</span>
                </div>
              </div>
            </SubSection>

            {/* Calendar card */}
            <SubSection title="Calendar card (Daily Digest)">
              <div className="max-w-[420px]">
                <img src={calendarCardImage} alt="Calendar card" className="w-full rounded-2xl shadow-sm" />
                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
                  <span>Full-bleed image card</span>
                  <span>Rounded-2xl, shadow-sm</span>
                  <span>Hover state: expanded view</span>
                  <span>Interactive calendar widget</span>
                </div>
              </div>
            </SubSection>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── ILLUSTRATIONS ── */}
        <section id="illustrations" className="mb-20 scroll-mt-12">
          <SectionHeader title="Illustration Library" description="Icons and illustrations used across onboarding, daily digest, and book a seat flows." />

          <SubSection title="All illustrations">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[
                { src: calendarCarouselIcon, name: "Meetings", desc: "Onboarding · 64×64", size: "w-16 h-16" },
                { src: planeIcon, name: "Travel", desc: "Onboarding · 64×64", size: "w-16 h-16" },
                { src: confirmationIcon, name: "Tasks", desc: "Onboarding · 64×64", size: "w-16 h-16" },
                { src: megaphoneIcon, name: "Nudges", desc: "Onboarding · 64×64", size: "w-16 h-16" },
                { src: celebrationIcon, name: "Celebration", desc: "Onboarding · 64×64", size: "w-16 h-16" },
                { src: handIcon, name: "Wave", desc: "Onboarding · 64×64", size: "w-16 h-16" },
                { src: graduationIcon, name: "Graduation", desc: "Cards · 40×40", size: "w-10 h-10" },
                { src: seatIcon, name: "Seat", desc: "Cards · 40×40", size: "w-10 h-10" },
                { src: calendarIcon, name: "Calendar", desc: "Cards · 40×40", size: "w-10 h-10" },
                { src: trainingIcon, name: "Training", desc: "Cards · 40×40", size: "w-10 h-10" },
                { src: confirmationCheckIcon, name: "Check", desc: "Cards · 40×40", size: "w-10 h-10" },
              ].map((icon) => (
                <div key={icon.name} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img src={icon.src} alt={icon.name} className={icon.size} />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-normal text-foreground">{icon.name}</p>
                    <p className="text-[11px] font-light text-muted-foreground">{icon.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="Profile images">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {[
                { src: carmenProfile, name: "Carmen Vargas", desc: "Feedback card, 56×56" },
                { src: jpmcLogo, name: "JPMC Logo", desc: "AI avatar, 40×40" },
              ].map((img) => (
                <div key={img.name} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                    <img src={img.src} alt={img.name} className="w-14 h-14 object-cover" />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-normal text-foreground">{img.name}</p>
                    <p className="text-[11px] font-light text-muted-foreground">{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </section>

        <Separator className="mb-20" />

        {/* ── FORM ELEMENTS ── */}
        <section id="forms" className="mb-20 scroll-mt-12">
          <SectionHeader title="Form Elements" description="Inputs, checkboxes, and badges." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-[800px]">
            <SubSection title="Inputs">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Text input</Label>
                  <Input placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label>Disabled input</Label>
                  <Input placeholder="Cannot edit" disabled />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="check" />
                  <Label htmlFor="check">Accept terms and conditions</Label>
                </div>
              </div>
            </SubSection>

            <SubSection title="Badges">
              <div className="flex gap-2 flex-wrap">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </SubSection>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── CHAT PATTERNS ── */}
        <section id="chat" className="mb-20 scroll-mt-12">
          <SectionHeader title="Chat Patterns" description="Message bubbles, input field, alignment, and conversation flow." />

          <div className="space-y-12">
            {/* Conversation specimen */}
            <SubSection title="Conversation flow">
              <div className="bg-background rounded-2xl border border-border p-8 max-w-[620px]">
                <div className="space-y-8">
                  {/* AI Response */}
                  <div>
                    <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">AI response</p>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img src={jpmcLogo} alt="JPMC" className="w-10 h-10" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-[16px] leading-[24px] font-light text-foreground mb-1">
                          Good morning, Taylor. Here are a few things that need your attention.
                        </p>
                        <p className="text-[16px] leading-[24px] font-light text-foreground">
                          You have a <strong className="font-semibold">Data Security Training</strong> due today.
                        </p>
                        {/* Thumbs */}
                        <div className="flex items-center gap-3 mt-4" style={{ color: '#202020' }}>
                          <button className="hover:opacity-70 transition-opacity"><ThumbsUp className="w-4 h-4" strokeWidth={1.5} /></button>
                          <button className="hover:opacity-70 transition-opacity"><ThumbsDown className="w-4 h-4" strokeWidth={1.5} /></button>
                          <button className="hover:opacity-70 transition-opacity"><MoreHorizontal className="w-4 h-4" strokeWidth={1.5} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 ml-[52px] grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
                      <span>Logo: 40×40 rounded-full</span>
                      <span>Body: 16/24 font-light</span>
                      <span>Bold: font-semibold</span>
                      <span>Gap logo→text: 14px</span>
                      <span>No bubble background</span>
                      <span>Typewriter animation</span>
                    </div>
                  </div>

                  {/* User bubble */}
                  <div>
                    <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">User message</p>
                    <div className="flex justify-end">
                      <div className="relative" style={{ maxWidth: '492px' }}>
                        <div className="inline-flex items-center" style={{ backgroundColor: '#E9E0D3', borderRadius: '16px', padding: '12px 24px' }}>
                          <p className="text-[15px] leading-[22.5px] text-foreground" style={{ letterSpacing: '-0.3%' }}>Remind me later</p>
                        </div>
                        <svg className="absolute bottom-0 right-[16px]" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'translateY(10px)' }}>
                          <path d="M16 15.5858C16 16.4767 14.923 16.9229 14.293 16.2929L-0.293 1.70711C-0.923 1.07714 -0.477 0 0.414 0L15 0C15.552 0 16 0.44772 16 1L16 15.5858Z" fill="#E9E0D3" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground text-right">
                      <span>Bg: #E9E0D3 (Travertine dark)</span>
                      <span>Radius: 16px</span>
                      <span>Padding: 12px 24px</span>
                      <span>Max-width: 492px</span>
                      <span>Text: 15/22.5, -0.3% tracking</span>
                      <span>Tail: SVG triangle bottom-right</span>
                    </div>
                  </div>

                  {/* Choice chips */}
                  <div>
                    <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Choice chips</p>
                    <div className="flex items-center gap-3 ml-[52px]">
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px]" style={{ border: '1px solid #7D7A7A', color: '#202020', letterSpacing: '0.16px' }}>
                        <CornerDownRight className="w-4 h-4" /> Remind me later
                      </button>
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DDD5C8] transition-colors text-[14px] leading-[20px]" style={{ border: '1px solid #7D7A7A', color: '#202020', letterSpacing: '0.16px' }}>
                        <CornerDownRight className="w-4 h-4" /> Book time to do it later
                      </button>
                    </div>
                    <div className="mt-3 ml-[52px] grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
                      <span>Icon: CornerDownRight, 16×16</span>
                      <span>Border: 1px solid #7D7A7A</span>
                      <span>Radius: full (pill)</span>
                      <span>Hover: bg #DDD5C8</span>
                      <span>Padding: 10px 20px</span>
                      <span>Text: 14/20, 0.16px tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </SubSection>

            {/* Chat input */}
            <SubSection title="Chat input field">
              <div className="max-w-[620px]">
                <div className="bg-background rounded-2xl border border-border p-6">
                  <div className="relative flex items-center bg-card rounded-xl px-4 py-2.5">
                    <button className="shrink-0 mr-2 w-8 h-8 flex items-center justify-center rounded-full" style={{ color: '#666663' }}>
                      <Plus className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <span className="flex-1 text-[15px] leading-[22.5px] text-[#666663]" style={{ letterSpacing: '-0.3%' }}>How can I help?</span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
                        <span className="text-[14px] text-muted-foreground">/</span>
                      </div>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted/50">
                        <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                      </div>
                    </div>
                  </div>
                  {/* Active state */}
                  <div className="mt-4 relative flex items-center bg-card rounded-xl px-4 py-2.5 ring-2 ring-ring">
                    <button className="shrink-0 mr-2 w-8 h-8 flex items-center justify-center rounded-full" style={{ color: '#666663' }}>
                      <Plus className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <span className="flex-1 text-[15px] leading-[22.5px] text-foreground" style={{ letterSpacing: '-0.3%' }}>Show my pending tasks</span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
                        <span className="text-[14px] text-muted-foreground">/</span>
                      </div>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-foreground">
                        <ArrowRight className="w-5 h-5 text-background" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
                  <span>Container: bg-card, rounded-xl</span>
                  <span>Padding: 10px 16px</span>
                  <span>Text: 15/22.5, -0.3% tracking</span>
                  <span>Placeholder: #666663</span>
                  <span>Send btn idle: bg-muted/50</span>
                  <span>Send btn active: bg-foreground</span>
                  <span>Plus icon: 20×20, #666663</span>
                  <span>Slash cmd: 1px border, rounded-lg</span>
                  <span>Width: matches 740px content area</span>
                  <span>Offset: 64px left (sidebar width)</span>
                </div>
              </div>
            </SubSection>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── SIDEBAR ── */}
        <section id="sidebar" className="mb-20 scroll-mt-12">
          <SectionHeader title="Sidebar" description="Icon rail navigation with expandable panels." />

          <div className="flex gap-12 items-start">
            {/* Full nav bar specimen */}
            <div className="flex flex-col items-center w-16 py-4 shrink-0 bg-background rounded-2xl border border-border" style={{ height: '420px' }}>
              <nav className="flex flex-col gap-1.5 flex-1 mt-2">
                {[
                  { icon: MessageSquare, label: "Chats", active: true },
                  { icon: Bell, label: "Activity center", badge: true },
                  { icon: Calendar, label: "Calendar" },
                  { icon: SlidersHorizontal, label: "Preferences" },
                ].map((tab, i) => (
                  <div key={i} className="relative group">
                    <div
                      className={`relative w-11 h-11 rounded-lg flex items-center justify-center transition-all ${
                        tab.active
                          ? "bg-[#DDD5C8] shadow-sm text-foreground"
                          : "bg-[#E9E0D3] text-foreground"
                      }`}
                    >
                      <tab.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                      {tab.badge && (
                        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive" />
                      )}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-foreground text-background text-[11px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {tab.label}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Profile avatar */}
              <div className="mt-auto flex flex-col items-center">
                <Avatar className="w-10 h-10 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-[#E9E0D3] text-muted-foreground text-sm font-medium">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Specs */}
            <div className="flex-1 space-y-8">
              <SubSection title="Nav bar specs">
                <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                  {[
                    { prop: "Rail width", value: "64px (w-16)" },
                    { prop: "Icon button", value: "44×44px (w-11 h-11), rounded-lg" },
                    { prop: "Icon size", value: "18×18px, strokeWidth 1.5" },
                    { prop: "Button gap", value: "6px (gap-1.5)" },
                    { prop: "Idle bg", value: "#E9E0D3" },
                    { prop: "Active bg", value: "#DDD5C8 + shadow-sm" },
                    { prop: "Hover bg", value: "#D4C9B8" },
                    { prop: "Badge", value: "12×12px circle, bg-destructive, top-right offset" },
                    { prop: "Profile avatar", value: "40×40px, rounded-lg, bg-[#E9E0D3]" },
                    { prop: "Padding", value: "py-4 (16px top/bottom)" },
                  ].map(a => (
                    <div key={a.prop} className="flex items-baseline gap-3">
                      <span className="text-[12px] font-mono font-normal text-foreground w-28 shrink-0">{a.prop}</span>
                      <span className="text-[12px] font-mono font-light text-muted-foreground">{a.value}</span>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Expanded panel">
                <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                  {[
                    { prop: "Panel width", value: "452px" },
                    { prop: "Border left", value: "1px solid rgba(16,16,16,0.1)" },
                    { prop: "Background", value: "bg-card (hsl(var(--card)))" },
                    { prop: "Header padding", value: "24px (p-6)" },
                    { prop: "Title", value: "Tiempos Headline, 24/34, font-light, -0.03em" },
                    { prop: "Close btn", value: "32×32px, X icon 20×20" },
                    { prop: "Overlay", value: "rgba(233,224,211,0.75)" },
                    { prop: "Animation", value: "width 0→452px, 200ms, framer-motion" },
                  ].map(a => (
                    <div key={a.prop} className="flex items-baseline gap-3">
                      <span className="text-[12px] font-mono font-normal text-foreground w-28 shrink-0">{a.prop}</span>
                      <span className="text-[12px] font-mono font-light text-muted-foreground">{a.value}</span>
                    </div>
                  ))}
                </div>
              </SubSection>
            </div>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── ANIMATION ── */}
        <section id="animation" className="mb-20 scroll-mt-12">
          <SectionHeader title="Animation" description="Motion specifications for transitions and micro-interactions." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SubSection title="Framer Motion">
              <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                {[
                  { prop: "type", value: "spring" },
                  { prop: "stiffness", value: "100" },
                  { prop: "damping", value: "15" },
                  { prop: "initial", value: "{ opacity: 0, y: 30 }" },
                  { prop: "animate", value: "{ opacity: 1, y: 0 }" },
                ].map(a => (
                  <div key={a.prop} className="flex items-baseline gap-3">
                    <span className="text-[12px] font-mono font-normal text-foreground w-20 shrink-0">{a.prop}</span>
                    <span className="text-[12px] font-mono font-light text-muted-foreground">{a.value}</span>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="CSS Animations">
              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                {[
                  { name: "Typewriter", desc: "Character-by-character text reveal" },
                  { name: "Pulse dot", desc: "1.4s ease-in-out infinite (loading)" },
                  { name: "Skeleton", desc: "2s shimmer before content swap" },
                  { name: "Accordion", desc: "0.2s ease-out height transition" },
                ].map(a => (
                  <div key={a.name}>
                    <p className="text-[13px] font-normal text-foreground">{a.name}</p>
                    <p className="text-[12px] font-light text-muted-foreground">{a.desc}</p>
                  </div>
                ))}
              </div>
            </SubSection>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-24 pb-8 pt-8 border-t border-border text-center">
          <p className="text-[12px] leading-[16px] font-light text-muted-foreground">
            JPMC Assistant Design System · Tailwind CSS · shadcn/ui · Framer Motion
          </p>
        </div>
      </main>
    </div>
  );
};

export default DesignSystem;
