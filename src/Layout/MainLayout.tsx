import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarRail, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'

const Main = ({ children, headerTitle, headerDescription }: { children: React.ReactNode, headerTitle: string, headerDescription: string }) => {
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
                {headerTitle}
              </h1>
            </div>
            <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
              {headerDescription}
            </p>
          </header>

          {/* Ad Placeholder - Top Banner */}
          <div className="container mx-auto mb-6">
            <div className="ad-placeholder ad-banner">
              Ad Banner (728×90)
            </div>
          </div>

          <main className="container mx-auto">
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {children}
              </div>
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Ad Placeholder - Sidebar */}
                <div className="mb-6 hidden lg:block">
                  <div className="ad-placeholder ad-sidebar">
                    Ad Sidebar (300×600)
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Ad Placeholder - Bottom Banner */}
          <div className="container mx-auto mt-6">
            <div className="ad-placeholder ad-banner">
              Ad Banner (728×90)
            </div>
          </div>
          <footer className="container mx-auto pt-8 text-center text-sm text-muted-foreground mt-8">
            <p>© {new Date().getFullYear()} Mouse Tools. All rights reserved.</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default Main