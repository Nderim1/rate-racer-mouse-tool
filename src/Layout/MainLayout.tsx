import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarRail, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import React, { useEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  headerTitle: string;
  headerDescription: string;
  showSidebar?: boolean;
  title?: string;
  showAds?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  headerTitle,
  headerDescription,
  showSidebar = true,
  title,
  showAds = false
}) => {

  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'TestMyRig';
    }
    // Optional: Clean up title on component unmount if needed
    // return () => { document.title = 'TestMyRig'; };
  }, [title]);

  const HeaderContent = (
    <header className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        {showSidebar && <SidebarTrigger />} {/* Conditionally render Trigger */}
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold flex-1 ${showSidebar ? 'text-center' : 'text-left'}`}>
          {headerTitle}
        </h1>
      </div>
      <p className={`text-muted-foreground mt-2 max-w-2xl mx-auto ${showSidebar ? 'text-center' : 'text-left'}`}>
        {headerDescription}
      </p>
    </header>
  );

  const AdPlaceholdersAndMainContent = (
    <>
      {/* Ad Placeholder - Top Banner */}
      {showAds && (
        <div className="container mx-auto mb-6">
          <div className="ad-placeholder ad-banner">
            Ad Banner (728×90)
          </div>
        </div>
      )}

      <main className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={showAds ? "flex-1" : "w-full"}>
            <Breadcrumbs />
            {children}
          </div>
          {showAds && (
            <div className="w-full lg:w-72">
              <div className="mb-6 hidden lg:block">
                <div
                  className="ad-placeholder ad-sidebar bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center text-muted-foreground"
                  style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span>Ad Sidebar<br />(Fixed Width: 288px)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Ad Placeholder - Bottom Banner */}
      {showAds && (
        <div className="container mx-auto mt-6">
          <div className="ad-placeholder ad-banner">
            Ad Banner (728×90)
          </div>
        </div>
      )}
      <footer className="container mx-auto pt-8 text-center text-sm text-muted-foreground mt-8">
        <p>&copy; {new Date().getFullYear()} TestMyRig.com. All rights reserved.</p>
        <p>Powered by <a href="https://drawcharts.xyz/" target="_blank" rel="noopener">drawcharts</a></p>
      </footer>
    </>
  );

  if (!showSidebar) {
    return (
      <div className="flex min-h-screen w-full bg-background">
        <div className="flex-1 flex flex-col pb-16"> {/* Ensure content area can scroll if needed */}
          {HeaderContent}
          {AdPlaceholdersAndMainContent}
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset className="pb-16">
          {HeaderContent}
          {AdPlaceholdersAndMainContent}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;