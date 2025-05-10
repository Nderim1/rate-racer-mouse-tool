
import React, { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from "@/components/ui/separator";
import ClickTestArea from '@/components/ClickTestArea';
import ClickSpeedChart from '@/components/ClickSpeedChart';
import ClickSpeedInfo from '@/components/ClickSpeedInfo';
import { Badge } from "@/components/ui/badge";

const ClickSpeedTest = () => {
  const { toast } = useToast();
  const [clicks, setClicks] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cps, setCps] = useState<number>(0);
  const [bestCps, setBestCps] = useState<number>(0);
  const [clickData, setClickData] = useState<{time: number, clicks: number}[]>([]);
  
  // Reset the test
  const resetTest = () => {
    setClicks(0);
    setTimeLeft(10);
    setIsActive(false);
    setCps(0);
    setClickData([]);
  };
  
  // Start the test
  const startTest = () => {
    resetTest();
    setIsActive(true);
  };
  
  // Handle click in the test area
  const handleClick = () => {
    if (isActive) {
      setClicks(prevClicks => prevClicks + 1);
      
      // Update click data for chart
      setClickData(prevData => [
        ...prevData,
        { time: 10 - timeLeft, clicks: clicks + 1 }
      ]);
    } else if (timeLeft === 10) {
      // Start test on first click
      startTest();
    }
  };
  
  // Countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Test finished
      const finalCps = clicks / 10;
      setCps(finalCps);
      
      if (finalCps > bestCps) {
        setBestCps(finalCps);
        toast({
          title: "New Personal Best!",
          description: `${finalCps.toFixed(1)} clicks per second`,
        });
      } else {
        toast({
          title: "Test Complete",
          description: `${finalCps.toFixed(1)} clicks per second`,
        });
      }
      
      setIsActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, clicks, bestCps, toast]);

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
                Click Speed Test
              </h1>
            </div>
            <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
              Measure how many clicks per second (CPS) you can perform
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
                  <ClickTestArea 
                    isActive={isActive} 
                    onClick={handleClick}
                    timeLeft={timeLeft}
                    clicks={clicks}
                  />
                </div>

                {/* Data Display */}
                <div className="mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl flex items-center justify-between">
                        Results
                        {isActive && (
                          <Badge variant="outline" className="ml-2 text-lg p-1">
                            {timeLeft}s
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>Your click speed performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Test</h3>
                          <p className="text-3xl font-bold">{isActive ? (clicks / (10 - timeLeft) || 0).toFixed(1) : cps.toFixed(1)} <span className="text-lg text-muted-foreground">CPS</span></p>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Clicks</h3>
                          <p className="text-3xl font-bold">{clicks}</p>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Personal Best</h3>
                          <p className="text-3xl font-bold">{bestCps.toFixed(1)} <span className="text-lg text-muted-foreground">CPS</span></p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex flex-col sm:flex-row w-full gap-2">
                        <Button 
                          onClick={startTest}
                          disabled={isActive}
                          className="flex-1"
                          variant={isActive ? "outline" : "default"}
                        >
                          {timeLeft < 10 && timeLeft > 0 ? "Test in progress..." : "Start New Test"}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>

                {/* Chart */}
                <div className="mb-6">
                  <ClickSpeedChart data={clickData} bestCps={bestCps} />
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
              <h2 className="text-2xl font-bold mb-6">About Click Speed Testing</h2>
              <ClickSpeedInfo />
            </section>

            {/* Ad Placeholder - Bottom Banner */}
            <div className="mt-8">
              <div className="ad-placeholder ad-banner">
                Ad Banner (728×90)
              </div>
            </div>
          </main>

          <footer className="container mx-auto pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Mouse Tools. All rights reserved.</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ClickSpeedTest;
