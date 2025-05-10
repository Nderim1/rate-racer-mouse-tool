import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mouse, BarChart2, Settings, HelpCircle, Menu, Info, Target, ShoppingCart } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Sidebar menu items for mouse-related tools
const menuItems = [
  {
    title: "Polling Rate Test",
    path: "/",
    icon: Mouse,
    description: "Test your mouse polling rate in real-time"
  },
  {
    title: "Click Speed Test",
    path: "/click-speed",
    icon: BarChart2,
    description: "Measure your clicks per second (CPS)"
  },
  {
    title: "DPI Analyzer",
    path: "/dpi-analyzer",
    icon: Settings,
    description: "Find your mouse's true DPI setting"
  },
  {
    title: "Input Lag Test",
    path: "/input-lag",
    icon: BarChart2,
    description: "Measure mouse input latency"
  },
  {
    title: "Sensor Precision",
    path: "/sensor-precision",
    icon: Target,
    description: "Test mouse sensor accuracy and precision"
  },
  {
    title: "Mouse Guide",
    path: "/guide",
    icon: Info,
    description: "Learn about mouse specifications"
  },
  {
    title: "Recommended Mice",
    path: "/recommended-mice",
    icon: ShoppingCart,
    description: "Curated list of mice for different needs"
  },
  {
    title: "Help & Support",
    path: "/help",
    icon: HelpCircle,
    description: "Get help with using our tools"
  },
];

export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between py-4">
        <div className="flex items-center px-4">
          <Mouse className="h-6 w-6 text-primary mr-2" />
          <span className="text-lg font-bold">MouseTools</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mouse Testing Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.description} isActive={item.path === location.pathname}>
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          {new Date().getFullYear()} MouseTools
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
