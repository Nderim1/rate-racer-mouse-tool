
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';

// This is a placeholder component for future tools
const PlaceholderPage = () => {
  const location = useLocation();
  const path = location.pathname.substring(1); // Remove leading slash
  
  // Convert path to title (e.g., "click-speed" to "Click Speed Test")
  const getTitle = () => {
    if (!path) return "Home";
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset className="pb-16">
          <header className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
              <SidebarTrigger />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center flex-1">
                {getTitle()}
              </h1>
            </div>
          </header>

          <main className="container mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                  We're working on this feature and will release it soon!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This {getTitle()} tool is currently in development. 
                  Check back later for updates or try our Mouse Polling Rate Test tool.
                </p>
              </CardContent>
            </Card>
          </main>

          <footer className="container mx-auto pt-8 text-center text-sm text-muted-foreground mt-8">
            <p>© {new Date().getFullYear()} Mouse Tools. All rights reserved.</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PlaceholderPage;
