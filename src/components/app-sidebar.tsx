import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, NotebookPen, CalendarClock, Search, MessagesSquare, Hexagon } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";

export const tools = [
  { title: "Email Generator", url: "/email", icon: Mail, desc: "Professional emails in any tone" },
  { title: "Notes Summarizer", url: "/notes", icon: NotebookPen, desc: "Decisions, actions & deadlines" },
  { title: "Task Planner", url: "/planner", icon: CalendarClock, desc: "Prioritised daily & weekly plans" },
  { title: "Research Assistant", url: "/research", icon: Search, desc: "Summaries, insights, next steps" },
  { title: "Workplace Chat", url: "/chat", icon: MessagesSquare, desc: "Ask anything about work" },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <Hexagon className="h-6 w-6 shrink-0 text-sidebar-primary" />
          <span className="font-display text-lg font-semibold group-data-[collapsible=icon]:hidden">Nexa</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path === "/"} tooltip="Dashboard">
                  <Link to="/"><LayoutDashboard /><span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((t) => (
                <SidebarMenuItem key={t.url}>
                  <SidebarMenuButton asChild isActive={path === t.url} tooltip={t.title}>
                    <Link to={t.url}><t.icon /><span>{t.title}</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="px-2 pb-2 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          AI output can be wrong. Always review before use.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
