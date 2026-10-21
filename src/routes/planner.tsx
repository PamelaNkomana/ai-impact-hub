import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPage, toolAccents } from "@/components/tool-page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Nexa" },
      { name: "description", content: "Turn your task list into a prioritised daily or weekly schedule." },
      { property: "og:title", content: "AI Task Planner — Nexa" },
      { property: "og:description", content: "Turn your task list into a prioritised daily or weekly schedule." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [range, setRange] = useState("daily");
  const [hours, setHours] = useState("08:00 - 17:00");
  const [tasks, setTasks] = useState("");
  return (
    <ToolPage
      title="AI Task Planner" subtitle="List your tasks — get priorities and a realistic schedule." feature="planner"
      accent={toolAccents.planner}
      canSubmit={tasks.trim().length > 5}
      buildPrompt={() => `Plan type: ${range}\nWorking hours: ${hours}\nTasks (with any deadlines/durations):\n${tasks}`}
    >
      <div className="space-y-2"><Label>Plan for</Label>
        <ToggleGroup type="single" value={range} onValueChange={(v) => v && setRange(v)} variant="outline" className="justify-start">
          <ToggleGroupItem value="daily">Today</ToggleGroupItem>
          <ToggleGroupItem value="weekly">This week</ToggleGroupItem>
        </ToggleGroup></div>
      <div className="space-y-2"><Label htmlFor="h">Working hours</Label>
        <Input id="h" value={hours} onChange={(e) => setHours(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="t">Tasks (one per line)</Label>
        <Textarea id="t" rows={9} placeholder={"Finish Q3 report (due tomorrow, ~3h)\nReply to client emails\nGym"} value={tasks} onChange={(e) => setTasks(e.target.value)} /></div>
    </ToolPage>
  );
}
