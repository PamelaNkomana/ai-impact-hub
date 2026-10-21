import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPage } from "@/components/tool-page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Nexa" },
      { name: "description", content: "Generate professional emails in formal, friendly or persuasive tones." },
      { property: "og:title", content: "Smart Email Generator — Nexa" },
      { property: "og:description", content: "Generate professional emails in formal, friendly or persuasive tones." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [tone, setTone] = useState("formal");
  const [to, setTo] = useState("");
  const [purpose, setPurpose] = useState("");
  return (
    <ToolPage
      title="Smart Email Generator" subtitle="Describe what you need — get a polished email." feature="email"
      canSubmit={purpose.trim().length > 5}
      buildPrompt={() => `Tone: ${tone}\nRecipient: ${to || "not specified"}\nPurpose and key points:\n${purpose}`}
    >
      <div className="space-y-2">
        <Label>Tone</Label>
        <ToggleGroup type="single" value={tone} onValueChange={(v) => v && setTone(v)} variant="outline" className="justify-start">
          <ToggleGroupItem value="formal">Formal</ToggleGroupItem>
          <ToggleGroupItem value="friendly">Friendly</ToggleGroupItem>
          <ToggleGroupItem value="persuasive">Persuasive</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-2"><Label htmlFor="to">Recipient</Label>
        <Input id="to" placeholder="e.g. Hiring manager at Acme" value={to} onChange={(e) => setTo(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="p">What is the email about?</Label>
        <Textarea id="p" rows={7} placeholder="e.g. Follow up on last week's proposal, ask for a call on Friday" value={purpose} onChange={(e) => setPurpose(e.target.value)} /></div>
    </ToolPage>
  );
}
