import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPage } from "@/components/tool-page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Nexa" },
      { name: "description", content: "Summarize topics or articles and get insights and recommendations." },
      { property: "og:title", content: "AI Research Assistant — Nexa" },
      { property: "og:description", content: "Summarize topics or articles and get insights and recommendations." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState("");
  return (
    <ToolPage
      title="AI Research Assistant" subtitle="Enter a topic or paste an article — get insights and recommendations." feature="research"
      canSubmit={topic.trim().length > 2 || article.trim().length > 50}
      buildPrompt={() => `Topic / question: ${topic || "Summarize the article below"}\n${article ? `\nArticle text:\n${article}` : ""}`}
    >
      <div className="space-y-2"><Label htmlFor="q">Topic or question</Label>
        <Input id="q" placeholder="e.g. Benefits of a 4-day work week" value={topic} onChange={(e) => setTopic(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="a">Article text (optional)</Label>
        <Textarea id="a" rows={10} placeholder="Paste an article to summarize…" value={article} onChange={(e) => setArticle(e.target.value)} /></div>
    </ToolPage>
  );
}
