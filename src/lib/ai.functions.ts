import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GUARD = `You are Nexa, a responsible AI workplace assistant. Be accurate and concise. Never invent facts, names, dates or figures not present in the input; if information is missing, say so or use clear [placeholders]. Refuse harmful, deceptive or discriminatory requests. Format output in clean Markdown.`;

export const PROMPTS = {
  email: `${GUARD}
Task: write a professional email. Output exactly:
**Subject:** <subject line>

<email body with greeting, clear purpose in the first sentence, short paragraphs, a specific call to action, and a sign-off>
Match the requested tone precisely: formal = polished and respectful; friendly = warm and conversational; persuasive = benefit-led with a confident call to action.`,
  notes: `${GUARD}
Task: analyze meeting notes. Output these sections with headings:
## Summary (3-5 bullets)
## Key Decisions
## Action Items (Markdown table: Task | Owner | Deadline — use "Unassigned"/"Not specified" when absent)
## Deadlines & Dates
## Open Questions
Only use information present in the notes.`,
  planner: `${GUARD}
Task: build a realistic schedule from the user's tasks. Steps: 1) classify each task with the Eisenhower matrix (Urgent/Important), 2) order by priority and energy (deep work early), 3) include breaks and buffers, never over 85% utilisation.
Output: ## Priorities (table: Task | Priority | Reason), ## Schedule (table: Time | Task | Notes), ## Tips (2-3 bullets).`,
  research: `${GUARD}
Task: act as a research analyst. Output: ## Overview, ## Key Points (bullets), ## Insights, ## Recommendations (numbered, actionable), ## Limitations & What to Verify. Clearly state that facts should be verified with primary sources; your knowledge may be outdated. Do not fabricate citations or URLs.`,
  chat: `${GUARD}
You help with workplace questions: communication, productivity, planning, analysis. Ask a brief clarifying question when the request is ambiguous.`,
} as const;

const Input = z.object({
  feature: z.enum(["email", "notes", "planner", "research", "chat"]),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(20000) }))
    .min(1)
    .max(40),
});

export const runAI = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: PROMPTS[data.feature],
        input: data.messages.map((m) => ({ role: m.role, content: m.content })),
      });
      let text = "";
      for (const item of (res as { output?: unknown[] }).output ?? []) {
        const it = item as { type?: string; content?: { type?: string; text?: string }[] };
        if (it.type === "message")
          for (const c of it.content ?? []) if (c.type === "output_text") text += c.text ?? "";
      }
      return { ok: true as const, text: text || "No response generated." };
    } catch (e) {
      if (e instanceof GatewayError) {
        const msg =
          e.code === "rate_limited" || e.httpStatus === 429
            ? "Too many requests right now. Please wait a moment and try again."
            : e.httpStatus === 402
              ? "AI credits have run out. Please top up to continue."
              : "The AI service had a problem. Please try again.";
        return { ok: false as const, text: msg };
      }
      throw e;
    }
  });
