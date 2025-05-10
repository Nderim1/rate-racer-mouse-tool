import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mouse, BarChart2, Settings, HelpCircle, Menu, Info, Target, ShoppingCart, Keyboard, Monitor, Type, Scan } from 'lucide-react';
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
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}

const mouseToolItems: MenuItem[] = [
  {
    title: "Polling Rate Test",
    path: "/polling-rate-test",
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
];

const keyboardToolItems: MenuItem[] = [
  {
    title: "Typing Speed Test",
    path: "/keyboard-tools/typing-speed",
    icon: Type,
    description: "Measure your WPM and accuracy"
  },
  {
    title: "Key Rollover Test",
    path: "/keyboard-tools/key-rollover",
    icon: Scan,
    description: "Check simultaneous key presses (NKRO)"
  },
  // Future: Add specific keyboard tests here e.g. Key Rollover, Switch Tester etc.
];

const monitorToolItems: MenuItem[] = [
  {
    title: "Monitor Home",
    path: "/monitor-tools",
    icon: Monitor,
    description: "Explore monitor testing utilities"
  },
];

const utilityItems: MenuItem[] = [
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

const renderMenuGroup = (items: MenuItem[], locationPathname: string) => (
  <SidebarMenu>
    {items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild tooltip={item.description} isActive={item.path === locationPathname}>
          <Link to={item.path}>
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
);

export function AppSidebar() {
  const location = useLocation();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between py-4">
        <div className="flex items-center px-4">
          <Mouse className={`h-6 w-6 text-primary ${open ? ' mr-2' : ' mr-0'}`} />
          {open && <span className="text-lg font-bold">TestMyRig</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Mouse Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to="/mouse-tools" className="hover:underline">
              Mouse Tools
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuGroup(mouseToolItems, location.pathname)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Keyboard Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to="/keyboard-tools" className="hover:underline">
              Keyboard Tools
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuGroup(keyboardToolItems, location.pathname)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Monitor Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to="/monitor-tools" className="hover:underline">
              Monitor Tools
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuGroup(monitorToolItems, location.pathname)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Utility Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuGroup(utilityItems, location.pathname)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TestMyRig.com
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
