import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles, Check, Calendar, Star } from "lucide-react";

const ColorSwatch = ({ name, variable, hex, className }: { name: string; variable: string; hex: string; className?: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-12 h-12 rounded-lg border border-border shadow-sm ${className}`} style={{ backgroundColor: `hsl(var(${variable}))` }} />
    <div>
      <p className="text-[14px] leading-[20px] font-normal text-foreground">{name}</p>
      <p className="text-[12px] leading-[16px] font-light" style={{ color: '#666663' }}>{hex} · var({variable})</p>
    </div>
  </div>
);

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-background p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-[40px] leading-[48px] font-light tracking-[-0.5px] text-foreground font-headline">
          Design System
        </h1>
        <p className="text-[16px] leading-[24px] font-light mt-2" style={{ color: '#666663' }}>
          JPMC Assistant · Brand guidelines & component library
        </p>
      </div>

      {/* ── COLORS ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Colors
        </h2>

        {/* Brand Palette */}
        <div className="mb-8">
          <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-4">Brand palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ColorSwatch name="Bronze" variable="--jpmc-bronze" hex="#8F5A39" />
            <ColorSwatch name="Bronze Light" variable="--jpmc-bronze-light" hex="#B08968" />
            <ColorSwatch name="Travertine" variable="--jpmc-travertine" hex="#F4EFE7" />
            <ColorSwatch name="Sky Blue" variable="--jpmc-sky-blue" hex="#A6D7F0" />
            <ColorSwatch name="Black" variable="--jpmc-black" hex="#000000" />
            <ColorSwatch name="White" variable="--jpmc-white" hex="#FFFFFF" />
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="mb-8">
          <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-4">Semantic tokens</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ColorSwatch name="Background" variable="--background" hex="#F4EFE7" />
            <ColorSwatch name="Foreground" variable="--foreground" hex="#000000" />
            <ColorSwatch name="Primary" variable="--primary" hex="#8F5A39" />
            <ColorSwatch name="Accent" variable="--accent" hex="#A6D7F0" />
            <ColorSwatch name="Muted" variable="--muted" hex="#C8C0B4" />
            <ColorSwatch name="Muted Foreground" variable="--muted-foreground" hex="#666663" />
            <ColorSwatch name="Card" variable="--card" hex="#FFFFFF" />
            <ColorSwatch name="Destructive" variable="--destructive" hex="#B22222" />
          </div>
        </div>

        {/* Data Viz */}
        <div>
          <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-4">Data visualization</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ColorSwatch name="Success" variable="--jpmc-success" hex="#367138" />
            <ColorSwatch name="Info" variable="--jpmc-info" hex="#2E4770" />
            <ColorSwatch name="Error" variable="--jpmc-error" hex="#B22222" />
            <ColorSwatch name="Gold" variable="--jpmc-gold" hex="#C4A96A" />
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── TYPOGRAPHY ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Typography
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Display / Headlines */}
          <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-6">Tiempos Headline</h3>
            <p className="text-[12px] leading-[16px] font-light mb-6" style={{ color: '#666663' }}>
              Used for headings, titles, and display text. Serif typeface.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>H1 · 40px / 48px · Light · -0.5</p>
                <h1 className="text-[40px] leading-[48px] font-light tracking-[-0.5px] font-headline">Welcome back, Taylor</h1>
              </div>
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>H2 · 28px / 36px · Light · -0.3</p>
                <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] font-headline">Your daily schedule</h2>
              </div>
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>H3 · 24px / 32px · Light · -0.3</p>
                <h3 className="text-[24px] leading-[32px] font-light tracking-[-0.3px] font-headline">Review feedback</h3>
              </div>
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>H4 · 20px / 28px · Light</p>
                <h4 className="text-[20px] leading-[28px] font-light font-headline">Feedback requested</h4>
              </div>
            </div>
          </div>

          {/* Body / UI */}
          <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-6">Inter / Source Sans Pro</h3>
            <p className="text-[12px] leading-[16px] font-light mb-6" style={{ color: '#666663' }}>
              Used for body text, labels, and UI elements. Sans-serif typeface.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>Body Large · 16px / 24px · Light</p>
                <p className="text-[16px] leading-[24px] font-light">Here's a draft feedback request for Taylor Smith based on your project.</p>
              </div>
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>Body · 14px / 20px · Light</p>
                <p className="text-[14px] leading-[20px] font-light">Listens well in meetings, ideas are good but unclearly communicated.</p>
              </div>
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>Body Semibold · 14px / 20px · Semibold</p>
                <p className="text-[14px] leading-[20px] font-semibold">What you said:</p>
              </div>
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>Caption · 13px / 18px · Light</p>
                <p className="text-[13px] leading-[18px] font-light" style={{ color: '#666663' }}>Listen deeply · Create clarity</p>
              </div>
              <div>
                <p className="text-[12px] font-light mb-1" style={{ color: '#666663' }}>Small · 12px / 16px · Light</p>
                <p className="text-[12px] leading-[16px] font-light" style={{ color: '#666663' }}>Secondary label or metadata</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── SPACING & RADIUS ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Spacing & Radius
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-4">Border radius</h3>
            <div className="flex items-end gap-6">
              {[
                { label: "sm", value: "4px", radius: "4px" },
                { label: "md", value: "6px", radius: "6px" },
                { label: "lg", value: "8px", radius: "8px" },
                { label: "xl", value: "12px", radius: "12px" },
                { label: "full", value: "9999px", radius: "9999px" },
              ].map(r => (
                <div key={r.label} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-primary" style={{ borderRadius: r.radius }} />
                  <p className="text-[12px] font-light" style={{ color: '#666663' }}>{r.label}</p>
                  <p className="text-[11px] font-light" style={{ color: '#999' }}>{r.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-4">Spacing scale</h3>
            <div className="space-y-3">
              {[
                { label: "4px", desc: "Tight — icon gaps, inline spacing" },
                { label: "8px", desc: "Compact — form field gaps" },
                { label: "12px", desc: "Default — card padding, element gaps" },
                { label: "16px", desc: "Comfortable — section gaps" },
                { label: "24px", desc: "Spacious — card content padding" },
                { label: "32px", desc: "Large — section separators" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="bg-primary/20 h-4" style={{ width: s.label }} />
                  <p className="text-[13px] font-light text-foreground">{s.label}</p>
                  <p className="text-[12px] font-light" style={{ color: '#666663' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── BUTTONS ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Buttons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-6">Variants</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button>Primary</Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>Default — Bronze bg, white text</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary">Secondary</Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>Secondary — Travertine bg</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline">Outline</Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>Outline — Border only</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost">Ghost</Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>Ghost — No bg, hover accent</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="destructive">Destructive</Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>Destructive — Error red</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="link">Link button</Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>Link — Underline on hover</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground mb-6">Sizes & states</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex items-center gap-4">
                <Button size="icon"><ArrowRight className="w-4 h-4" /></Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>Icon button · 40×40</p>
              </div>
              <div className="flex items-center gap-4">
                <Button disabled>Disabled</Button>
                <p className="text-[12px] font-light" style={{ color: '#666663' }}>50% opacity, no pointer</p>
              </div>

              {/* Chat-specific buttons */}
              <h3 className="text-[18px] leading-[24px] font-normal text-foreground mt-8 mb-4">Chat-specific</h3>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-full text-[14px] font-light border transition-colors bg-foreground text-background">
                  Choice chip (active)
                </button>
                <button className="px-4 py-2 rounded-full text-[14px] font-light border border-border text-foreground hover:bg-muted/50 transition-colors">
                  Choice chip
                </button>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button className="px-4 py-2 rounded-full text-[14px] font-light border border-border text-muted-foreground opacity-50 cursor-not-allowed">
                  Disabled chip
                </button>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-light bg-foreground text-background">
                  <Sparkles className="w-3 h-3" /> Refine
                </button>
                <button className="px-4 py-2 rounded-lg text-[13px] font-light bg-foreground text-background">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── CARDS ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-light">Default card</CardTitle>
              <CardDescription>White bg, subtle border, shadow-sm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[14px] leading-[20px] font-light">Standard content card used across the application.</p>
            </CardContent>
          </Card>

          {/* Chat Card */}
          <div className="bg-card rounded-2xl p-5 border border-border max-w-[360px]">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Star className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[14px] leading-[20px] font-normal text-foreground">Chat response card</p>
                <p className="text-[13px] leading-[18px] font-light" style={{ color: '#666663' }}>Rounded-2xl, padded, with icon</p>
              </div>
            </div>
            <p className="text-[14px] leading-[20px] font-light">Used for AI responses, confirmations, and interactive cards in the chat.</p>
          </div>

          {/* Confirmation Card */}
          <div className="bg-card rounded-2xl p-6 border border-border max-w-[360px] flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
              <Check className="w-6 h-6 text-foreground" />
            </div>
            <p className="text-[24px] leading-[24px] font-light tracking-[-0.3px] font-headline">Confirmation card</p>
            <p className="text-[14px] leading-[20px] font-light" style={{ color: '#666663' }}>Centered layout with icon, title, and description.</p>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── FORM ELEMENTS ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Form elements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[800px]">
          <div className="space-y-6">
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
          <div className="space-y-6">
            {/* Chat input */}
            <div>
              <Label className="mb-2 block">Chat input</Label>
              <div className="flex items-end gap-2 bg-card rounded-2xl border border-border p-3">
                <div className="flex-1">
                  <p className="text-[14px] font-light" style={{ color: '#999' }}>Ask a follow up...</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-background" />
                </button>
              </div>
            </div>
            {/* Badge */}
            <div>
              <Label className="mb-2 block">Badges</Label>
              <div className="flex gap-2 flex-wrap">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── CHAT BUBBLES ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Chat bubbles
        </h2>
        <div className="max-w-[500px] space-y-4">
          {/* User bubble */}
          <div className="flex justify-end">
            <div className="bg-foreground text-background rounded-[20px] rounded-br-[4px] px-5 py-3 max-w-[85%]">
              <p className="text-[14px] leading-[20px] font-light">User message — black bg, white text, 20px radius with 4px bottom-right</p>
            </div>
          </div>
          {/* Assistant bubble */}
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <p className="text-[14px] leading-[20px] font-light text-foreground">
                Assistant response — no bubble bg, left-aligned, appears with typewriter animation. Uses markdown rendering for rich content.
              </p>
            </div>
          </div>
          {/* User bubble 2 */}
          <div className="flex justify-end">
            <div className="bg-foreground text-background rounded-[20px] rounded-br-[4px] px-5 py-3 max-w-[85%]">
              <p className="text-[14px] leading-[20px] font-light">Messages animate in with spring (stiffness: 100, damping: 15)</p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── SIDEBAR ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Sidebar
        </h2>
        <div className="flex gap-8">
          <div className="w-[72px] bg-sidebar rounded-2xl p-3 flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
              <Calendar className="w-5 h-5 text-sidebar-foreground" />
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-sidebar-accent transition-colors">
              <Star className="w-5 h-5 text-sidebar-foreground" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[14px] leading-[20px] font-light text-foreground">
              <strong>Background:</strong> Black (#000) · var(--sidebar-background)
            </p>
            <p className="text-[14px] leading-[20px] font-light text-foreground">
              <strong>Foreground:</strong> Warm gray · var(--sidebar-foreground)
            </p>
            <p className="text-[14px] leading-[20px] font-light text-foreground">
              <strong>Active state:</strong> 12% white bg · var(--sidebar-accent)
            </p>
            <p className="text-[14px] leading-[20px] font-light text-foreground">
              <strong>Border:</strong> 18% white · var(--sidebar-border)
            </p>
            <p className="text-[14px] leading-[20px] font-light text-foreground">
              <strong>Ring:</strong> Bronze · var(--sidebar-ring)
            </p>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* ── ANIMATION ── */}
      <section className="mb-16">
        <h2 className="text-[28px] leading-[36px] font-light tracking-[-0.3px] text-foreground font-headline mb-8">
          Animation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px]">
          <div className="space-y-3">
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground">Framer Motion</h3>
            <div className="space-y-2">
              <p className="text-[14px] leading-[20px] font-light"><strong>Chat bubble entry:</strong> spring, stiffness 100, damping 15</p>
              <p className="text-[14px] leading-[20px] font-light"><strong>Initial:</strong> opacity 0, y 30</p>
              <p className="text-[14px] leading-[20px] font-light"><strong>Animate:</strong> opacity 1, y 0</p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-[18px] leading-[24px] font-normal text-foreground">CSS Animations</h3>
            <div className="space-y-2">
              <p className="text-[14px] leading-[20px] font-light"><strong>Typewriter:</strong> Character-by-character text reveal</p>
              <p className="text-[14px] leading-[20px] font-light"><strong>Pulse dot:</strong> 1.4s ease-in-out infinite (loading)</p>
              <p className="text-[14px] leading-[20px] font-light"><strong>Skeleton:</strong> 2s shimmer before content swap</p>
              <p className="text-[14px] leading-[20px] font-light"><strong>Accordion:</strong> 0.2s ease-out height transition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-24 pb-8 text-center">
        <p className="text-[13px] leading-[18px] font-light" style={{ color: '#666663' }}>
          JPMC Assistant Design System · Built with Tailwind CSS, shadcn/ui, Framer Motion
        </p>
      </div>
    </div>
  );
};

export default DesignSystem;
