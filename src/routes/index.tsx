import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { tools } from "@/components/app-sidebar";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexa Dashboard — AI Workplace Assistant" },
      { name: "description", content: "One AI dashboard for emails, meeting notes, task planning, research and chat." },
      { property: "og:title", content: "Nexa Dashboard — AI Workplace Assistant" },
      { property: "og:description", content: "One AI dashboard for emails, meeting notes, task planning, research and chat." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-8">
      <section className="bg-hero rounded-2xl p-8 text-primary-foreground shadow-soft md:p-12">
        <p className="text-sm font-medium uppercase tracking-widest opacity-80">AI Workplace Suite</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold md:text-5xl">Do your busywork in seconds, not hours.</h1>
        <p className="mt-4 max-w-xl opacity-85">Five focused AI tools in one place — write, summarize, plan, research and ask.</p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.url} to={t.url} className="group">
            <Card className="h-full p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="mb-4 inline-flex rounded-lg bg-secondary p-2.5 text-primary-deep"><t.icon className="h-5 w-5" /></div>
              <h2 className="font-semibold">{t.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-deep">
                Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
      <Disclaimer />
    </div>
  );
}
