
import { useState, useEffect } from 'react';
import TestArea from '@/components/TestArea';
import DataDisplay from '@/components/DataDisplay';
import PollingChart from '@/components/PollingChart';
import InfoSection from '@/components/InfoSection';
import { usePollingRate } from '@/hooks/usePollingRate';
import { useToast } from '@/hooks/use-toast';
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  const { toast } = useToast();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { 
    current, 
    average, 
    max, 
    chartData, 
    isActive, 
    handleMouseMove, 
    resetTest,
    toggleTest,
  } = usePollingRate();

  // Check if device is touch-only
  useEffect(() => {
    const detectTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };

    detectTouch();

    if (isTouchDevice) {
      toast({
        title: "Touch Device Detected",
        description: "For accurate polling rate testing, please use a device with a physical mouse.",
        duration: 5000,
      });
    }
  }, [isTouchDevice, toast]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset className="pb-16">
          {/* Header */}
          <header className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
              <SidebarTrigger />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center flex-1">
                Mouse Polling Rate Tester
              </h1>
            </div>
            <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
              Measure how many times per second your mouse reports its position to your computer
            </p>
          </header>

          {/* Ad Placeholder - Top Banner */}
          <div className="container mx-auto mb-6">
            <div className="ad-placeholder ad-banner">
              Ad Banner (728×90)
            </div>
          </div>

          <main className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Testing Area */}
                <div className="mb-6">
                  {isTouchDevice ? (
                    <div className="test-area p-6 flex items-center justify-center">
                      <div className="text-center">
                        <h2 className="text-xl font-semibold mb-2">Touch Device Detected</h2>
                        <p className="text-muted-foreground">
                          Mouse polling rate testing requires a physical mouse.
                          This tool may not function correctly on touch-only devices.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <TestArea 
                      isActive={isActive} 
                      onMouseMove={handleMouseMove} 
                    />
                  )}
                </div>

                {/* Data Display */}
                <div className="mb-6">
                  <DataDisplay
                    current={current}
                    average={average}
                    max={max}
                    isActive={isActive}
                    onReset={resetTest}
                    onToggle={toggleTest}
                  />
                </div>

                {/* Chart */}
                <div className="mb-6">
                  <PollingChart data={chartData} maxRate={max} />
                </div>
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

            <Separator className="my-8" />
            
            {/* Info Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Understanding Mouse Polling Rate</h2>
              <InfoSection />
            </section>

            {/* Ad Placeholder - Bottom Banner */}
            <div className="mt-8">
              <div className="ad-placeholder ad-banner">
                Ad Banner (728×90)
              </div>
            </div>
          </main>

          <footer className="container mx-auto pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Mouse Polling Rate Tester. All rights reserved.</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
