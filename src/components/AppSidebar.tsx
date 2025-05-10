import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mouse, Menu, HelpCircle } from 'lucide-react';
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
import { MenuItem, mouseToolItems, keyboardToolItems, monitorToolItems, utilityItems } from '@/toolMenuItems';

const renderMenuGroup = (items: MenuItem[], locationPathname: string) => (
  <SidebarMenu>
    {items.map((item) => (
      <SidebarMenuItem key={item.title} tooltip={item.description}>
        <SidebarMenuButton asChild isActive={item.path === locationPathname}>
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
            <Link to="/monitor-tools/dead-pixel-test" className="hover:underline">
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
