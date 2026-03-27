import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles, Check, Calendar, Star, MessageSquare, Palette, Type, Square, MousePointer, Layout, Zap } from "lucide-react";

const sections = [
  { id: "colors", label: "Colors", icon: Palette },
  { id: "typography", label: "Typography", icon: Type },
  { id: "spacing", label: "Spacing & Radius", icon: Square },
  { id: "buttons", label: "Buttons", icon: MousePointer },
  { id: "cards", label: "Cards", icon: Layout },
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
            <SubSection title="Variants">
              <div className="space-y-4">
                {[
                  { el: <Button>Primary</Button>, desc: "Bronze bg, white text" },
                  { el: <Button variant="secondary">Secondary</Button>, desc: "Travertine bg" },
                  { el: <Button variant="outline">Outline</Button>, desc: "Border only" },
                  { el: <Button variant="ghost">Ghost</Button>, desc: "No bg, hover accent" },
                  { el: <Button variant="destructive">Destructive</Button>, desc: "Error red" },
                  { el: <Button variant="link">Link button</Button>, desc: "Underline on hover" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-[140px]">{b.el}</div>
                    <p className="text-[12px] font-light text-muted-foreground">{b.desc}</p>
                  </div>
                ))}
              </div>
            </SubSection>

            <div>
              <SubSection title="Sizes">
                <div className="flex items-center gap-3 mb-6">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><ArrowRight className="w-4 h-4" /></Button>
                </div>
                <div className="flex items-center gap-3">
                  <Button disabled>Disabled</Button>
                  <p className="text-[12px] font-light text-muted-foreground">50% opacity, no pointer events</p>
                </div>
              </SubSection>

              <SubSection title="Chat-specific">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-full text-[14px] font-light border transition-colors bg-foreground text-background">
                      Active chip
                    </button>
                    <button className="px-4 py-2 rounded-full text-[14px] font-light border border-border text-foreground hover:bg-muted/50 transition-colors">
                      Choice chip
                    </button>
                    <button className="px-4 py-2 rounded-full text-[14px] font-light border border-border text-muted-foreground opacity-50 cursor-not-allowed">
                      Disabled
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-light bg-foreground text-background">
                      <Sparkles className="w-3 h-3" /> Refine
                    </button>
                    <button className="px-4 py-2 rounded-lg text-[13px] font-light bg-foreground text-background">
                      Save
                    </button>
                  </div>
                </div>
              </SubSection>
            </div>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── CARDS ── */}
        <section id="cards" className="mb-20 scroll-mt-12">
          <SectionHeader title="Cards" description="Card patterns used across the application." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Default</p>
              <Card>
                <CardHeader>
                  <CardTitle className="text-[18px] font-light">Card title</CardTitle>
                  <CardDescription>Supporting description text</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[14px] leading-[20px] font-light">White bg, subtle border, shadow-sm. Standard content card.</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Chat response</p>
              <div className="bg-card rounded-2xl p-5 border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[14px] leading-[20px] font-normal text-foreground">Response card</p>
                    <p className="text-[13px] leading-[18px] font-light text-muted-foreground">With icon and metadata</p>
                  </div>
                </div>
                <p className="text-[14px] leading-[20px] font-light">Used for AI responses, confirmations, and interactive elements.</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-mono font-light text-muted-foreground mb-3">Confirmation</p>
              <div className="bg-card rounded-2xl p-6 border border-border flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                  <Check className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-[24px] leading-[24px] font-light tracking-[-0.3px] font-headline">Confirmed</p>
                <p className="text-[14px] leading-[20px] font-light text-muted-foreground">Centered layout with icon and title.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── FORM ELEMENTS ── */}
        <section id="forms" className="mb-20 scroll-mt-12">
          <SectionHeader title="Form Elements" description="Inputs, checkboxes, badges, and chat input patterns." />

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

            <div>
              <SubSection title="Chat input">
                <div className="flex items-end gap-2 bg-card rounded-2xl border border-border p-3">
                  <div className="flex-1">
                    <p className="text-[14px] font-light text-muted-foreground">Ask a follow up...</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-background" />
                  </button>
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
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── CHAT PATTERNS ── */}
        <section id="chat" className="mb-20 scroll-mt-12">
          <SectionHeader title="Chat Patterns" description="Message bubbles, alignment, and conversation flow." />

          <div className="bg-secondary rounded-2xl border border-border p-8 max-w-[560px]">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-mono font-light text-muted-foreground mb-2">User message</p>
                <div className="flex justify-end">
                  <div className="bg-foreground text-background rounded-[20px] rounded-br-[4px] px-5 py-3 max-w-[85%]">
                    <p className="text-[14px] leading-[20px] font-light">Black bg, white text, 20px radius, 4px bottom-right</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono font-light text-muted-foreground mb-2">Assistant response</p>
                <div className="flex justify-start">
                  <div className="max-w-[85%]">
                    <p className="text-[14px] leading-[20px] font-light text-foreground">
                      No bubble bg, left-aligned. Typewriter animation with markdown rendering.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono font-light text-muted-foreground mb-2">User follow-up</p>
                <div className="flex justify-end">
                  <div className="bg-foreground text-background rounded-[20px] rounded-br-[4px] px-5 py-3 max-w-[85%]">
                    <p className="text-[14px] leading-[20px] font-light">Spring animation: stiffness 100, damping 15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── SIDEBAR ── */}
        <section id="sidebar" className="mb-20 scroll-mt-12">
          <SectionHeader title="Sidebar" description="Navigation sidebar tokens and states." />

          <div className="flex gap-10 items-start">
            <div className="w-[72px] bg-sidebar rounded-2xl p-3 flex flex-col items-center gap-4 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
                <Calendar className="w-5 h-5 text-sidebar-foreground" />
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-sidebar-accent transition-colors">
                <Star className="w-5 h-5 text-sidebar-foreground" />
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-sidebar-accent transition-colors">
                <MessageSquare className="w-5 h-5 text-sidebar-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {[
                { token: "--sidebar-background", value: "#000000", label: "Background" },
                { token: "--sidebar-foreground", value: "Warm gray", label: "Foreground" },
                { token: "--sidebar-accent", value: "12% white", label: "Active state" },
                { token: "--sidebar-border", value: "18% white", label: "Border" },
                { token: "--sidebar-ring", value: "Bronze", label: "Ring / focus" },
                { token: "--sidebar-muted", value: "50% white", label: "Muted text" },
              ].map(t => (
                <div key={t.token}>
                  <p className="text-[13px] leading-[18px] font-normal text-foreground">{t.label}</p>
                  <p className="text-[11px] font-mono font-light text-muted-foreground">{t.value} · var({t.token})</p>
                </div>
              ))}
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
