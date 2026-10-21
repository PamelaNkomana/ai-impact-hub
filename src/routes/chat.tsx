import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Hexagon, Loader2, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Disclaimer } from "@/components/disclaimer";
import { runAI } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Workplace Chat Assistant — Nexa" },
      { name: "description", content: "Chat with an AI workplace assistant about communication, planning and productivity." },
      { property: "og:title", content: "Workplace Chat Assistant — Nexa" },
      { property: "og:description", content: "Chat with an AI workplace assistant about communication, planning and productivity." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };
const STARTERS = ["How do I give constructive feedback?", "Tips to run shorter meetings", "Draft an agenda for a kickoff"];

function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, loading]);

  async function send(content: string) {
    if (!content.trim() || loading) return;
    const next = [...msgs, { role: "user" as const, content }];
    setMsgs(next); setText(""); setLoading(true);
    try {
      const r = await runAI({ data: { feature: "chat", messages: next.slice(-30) } });
      if (!r.ok) { toast.error(r.text); setMsgs(msgs); setText(content); }
      else setMsgs([...next, { role: "assistant", content: r.text }]);
    } catch { toast.error("Something went wrong."); setMsgs(msgs); setText(content); }
    finally { setLoading(false); }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-3xl flex-col p-4 md:p-6">
      <div className="flex-1 space-y-5 overflow-y-auto pb-4">
        {msgs.length === 0 && (
          <div className="pt-12 text-center">
            <Hexagon className="mx-auto h-10 w-10 text-primary-deep" />
            <h1 className="mt-3 text-2xl font-semibold">How can Nexa help today?</h1>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {STARTERS.map((s) => <Button key={s} variant="outline" size="sm" onClick={() => send(s)}>{s}</Button>)}
            </div>
          </div>
        )}
        {msgs.map((m, i) => m.role === "user" ? (
          <div key={i} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.content}</div>
        ) : (
          <div key={i} className="flex gap-3">
            <Hexagon className="mt-1 h-5 w-5 shrink-0 text-primary-deep" />
            <div className="ai-output min-w-0 text-sm"><ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown></div>
          </div>
        ))}
        {loading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Thinking…</div>}
        <div ref={end} />
      </div>
      <form className="silver-plate flex items-end gap-2 rounded-xl border bg-card p-2 shadow-soft" onSubmit={(e) => { e.preventDefault(); send(text); }}>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={1} placeholder="Ask a workplace question…"
          className="min-h-10 resize-none border-0 shadow-none focus-visible:ring-0"
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(text); } }} />
        <Button type="submit" size="icon" disabled={!text.trim() || loading} aria-label="Send"><SendHorizontal /></Button>
      </form>
      <div className="mt-3"><Disclaimer /></div>
    </div>
  );
}
