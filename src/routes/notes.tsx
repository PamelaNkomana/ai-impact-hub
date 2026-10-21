import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPage, toolAccents } from "@/components/tool-page";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Nexa" },
      { name: "description", content: "Summarize meeting notes and extract decisions, action items and deadlines." },
      { property: "og:title", content: "Meeting Notes Summarizer — Nexa" },
      { property: "og:description", content: "Summarize meeting notes and extract decisions, action items and deadlines." },
    ],
  }),
  component: NotesPage,
});

const SAMPLE = `Weekly sync 14 Oct. Present: Thandi, Mark, Priya.
Agreed to launch the beta on 1 Nov. Mark to finish onboarding emails by 25 Oct.
Priya will review pricing page copy. Budget for ads approved at R20k.
Still unsure whether to support Android at launch.`;

function NotesPage() {
  const [notes, setNotes] = useState("");
  return (
    <ToolPage
      title="Meeting Notes Summarizer" subtitle="Paste raw notes — get summary, decisions, actions and deadlines." feature="notes"
      accent={toolAccents.notes}
      canSubmit={notes.trim().length > 20} buildPrompt={() => `Meeting notes:\n${notes}`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="n">Meeting notes</Label>
          <button type="button" className="text-xs font-medium text-tool-notes-deep hover:underline" onClick={() => setNotes(SAMPLE)}>Use sample</button>
        </div>
        <Textarea id="n" rows={14} placeholder="Paste your meeting notes or transcript…" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
    </ToolPage>
  );
}
