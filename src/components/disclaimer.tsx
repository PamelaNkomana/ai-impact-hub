import { ShieldCheck } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex gap-3 rounded-lg border border-accent/50 bg-accent/10 p-3 text-sm text-foreground/80">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p>
        <strong>Responsible AI:</strong> Responses are AI-generated and may contain errors or bias. Verify facts,
        dates and names before sharing. Don't paste passwords, personal IDs or confidential client data.
      </p>
    </div>
  );
}
