
import React, { useState, useRef, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InfoSection from '@/components/InfoSection';
import DataDisplay from '@/components/DataDisplay';
import { useToast } from '@/components/ui/use-toast';
import { Timer, Clock } from 'lucide-react';
import InputLagChart from '@/components/InputLagChart';

const InputLagTest = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [averageLag, setAverageLag] = useState<number | null>(null);
  const [bestLag, setBestLag] = useState<number | null>(null);
  const [worstLag, setWorstLag] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timestampRef = useRef<number | null>(null);
  const clickCounterRef = useRef<number>(0);

  // Reset the test
  const handleReset = () => {
    setResults([]);
    setAverageLag(null);
    setBestLag(null);
    setWorstLag(null);
    clickCounterRef.current = 0;
    toast({
      title: "Test Reset",
      description: "All test results have been cleared.",
    });
  };

  // Start the test
  const handleStart = () => {
    if (isActive) return;
    setIsActive(true);
    timestampRef.current = null;

    // Random delay between 1-5 seconds
    const delay = Math.random() * 4000 + 1000;

    setTimeout(() => {
      if (targetRef.current) {
        timestampRef.current = performance.now();
      }
    }, delay);
  };

  // Handle click on target
  const handleClick = () => {
    if (!isActive) return;

    if (!timestampRef.current) {
      toast({
        title: "Too early!",
        description: "Please wait for the target to activate before clicking.",
        variant: "destructive"
      });
      setIsActive(false);
      return;
    }

    const now = performance.now();
    const lagTime = now - timestampRef.current;

    // Update results
    const newResults = [...results, lagTime];
    setResults(newResults);

    // Calculate statistics
    const avg = newResults.reduce((sum, val) => sum + val, 0) / newResults.length;
    setAverageLag(avg);
    setBestLag(Math.min(...newResults));
    setWorstLag(Math.max(...newResults));

    clickCounterRef.current += 1;
    setIsActive(false);

    toast({
      title: "Input lag recorded",
      description: `Your reaction time was ${Math.round(lagTime)}ms`,
    });
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
                Input Lag Test
              </h1>
            </div>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto">
              Measure the input lag of your mouse to determine how responsive it feels when gaming.
            </p>
          </header>

          <main className="container mx-auto">
            {/* Ad banner */}
            <div className="ad-placeholder ad-banner w-full mb-8">Advertisement</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main content */}
              <div className="md:col-span-2 space-y-6">
                {/* Test area */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Timer className="h-5 w-5" />
                      Input Lag Test
                    </CardTitle>
                    <CardDescription>
                      Click the green area as soon as it appears to measure your input lag
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      ref={targetRef}
                      onClick={handleClick}
                      className={`test-area cursor-pointer flex items-center justify-center transition-colors ${isActive && timestampRef.current ? 'bg-primary/30 test-area-active' : ''}`}
                      style={{ minHeight: '300px' }}
                    >
                      {isActive ? (
                        timestampRef.current ? (
                          <div className="text-2xl font-bold">Click Now!</div>
                        ) : (
                          <div className="text-xl">Wait for green...</div>
                        )
                      ) : (
                        <div className="text-xl">Press Start to begin</div>
                      )}
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        onClick={handleStart}
                        disabled={isActive}
                        className="flex-1"
                      >
                        Start Test
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1"
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Your Results
                    </CardTitle>
                    <CardDescription>
                      Input lag test results and performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <DataDisplay
                        title="Average Lag"
                        value={averageLag !== null ? `${Math.round(averageLag)}ms` : 'N/A'}
                        description="Lower is better"
                      />
                      <DataDisplay
                        title="Best Result"
                        value={bestLag !== null ? `${Math.round(bestLag)}ms` : 'N/A'}
                        description="Your fastest response"
                      />
                      <DataDisplay
                        title="Worst Result"
                        value={worstLag !== null ? `${Math.round(worstLag)}ms` : 'N/A'}
                        description="Your slowest response"
                      />
                    </div>

                    {/* Graph */}
                    <div className="graph-container">
                      <InputLagChart data={results.map((value, index) => ({
                        attempt: index + 1,
                        lag: Math.round(value)
                      }))} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar content */}
              <div className="space-y-6">
                {/* Ad sidebar */}
                <div className="ad-placeholder ad-sidebar mx-auto md:mx-0">
                  Advertisement
                </div>

                {/* Information */}
                <InfoSection
                  title="What is Input Lag?"
                  items={[
                    {
                      title: "Definition",
                      content: "Input lag is the delay between when you click your mouse button and when that action is registered by your computer."
                    },
                    {
                      title: "Why It Matters",
                      content: "Lower input lag gives you a competitive advantage in fast-paced games, especially FPS and competitive titles."
                    },
                    {
                      title: "Good Results",
                      content: "For gaming: < 20ms is excellent, 20-50ms is good, >50ms may be noticeable lag."
                    }
                  ]}
                />

                <InfoSection
                  title="How to Improve"
                  items={[
                    {
                      title: "Gaming Mouse",
                      content: "Use a high-quality gaming mouse with a high polling rate (1000Hz or higher)."
                    },
                    {
                      title: "Update Drivers",
                      content: "Keep your mouse drivers updated to the latest version."
                    },
                    {
                      title: "Reduce USB Interference",
                      content: "Connect your mouse directly to your PC, not through a USB hub."
                    }
                  ]}
                />
              </div>
            </div>
          </main>

          <footer className="container mx-auto pt-8 text-center text-sm text-muted-foreground mt-8">
            <p>© {new Date().getFullYear()} Mouse Tools. All rights reserved.</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InputLagTest;
