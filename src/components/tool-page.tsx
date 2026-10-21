import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Disclaimer } from "@/components/disclaimer";
import { runAI } from "@/lib/ai.functions";

type Feature = "email" | "notes" | "planner" | "research";

export function ToolPage({
  title, subtitle, feature, children, buildPrompt, canSubmit,
}: {
  title: string; subtitle: string; feature: Feature; children: ReactNode;
  buildPrompt: () => string; canSubmit: boolean;
}) {
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function go() {
    setLoading(true);
    try {
      const r = await runAI({ data: { feature, messages: [{ role: "user", content: buildPrompt() }] } });
      if (!r.ok) toast.error(r.text);
      else setOut(r.text);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
        <p className="mt-1 text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="silver-plate space-y-4 p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Input</h2>
          {children}
          <Button onClick={go} disabled={!canSubmit || loading} className="w-full" size="lg">
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />} {loading ? "Generating…" : "Generate"}
          </Button>
        </Card>
        <Card className="silver-plate flex min-h-80 flex-col p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">AI Output</h2>
            {out && (
              <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(out); toast.success("Copied"); }}>
                <Copy /> Copy
              </Button>
            )}
          </div>
          {loading ? (
            <div className="space-y-2">{[90, 75, 85, 60].map((w) => <div key={w} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />)}</div>
          ) : out ? (
            <div className="ai-output text-sm"><ReactMarkdown remarkPlugins={[remarkGfm]}>{out}</ReactMarkdown></div>
          ) : (
            <p className="m-auto text-center text-sm text-muted-foreground">Your result will appear here.</p>
          )}
        </Card>
      </div>
      <Disclaimer />
    </div>
  );
}
