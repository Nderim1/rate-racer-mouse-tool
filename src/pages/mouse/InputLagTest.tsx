import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InfoSection from '@/components/InfoSection';
import DataDisplay from '@/components/DataDisplay';
import { useToast } from '@/components/ui/use-toast';
import { Timer, Clock } from 'lucide-react';
import InputLagChart from '@/components/InputLagChart';
import MainLayout from '@/Layout/MainLayout';

const InputLagTest = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [isTargetReady, setIsTargetReady] = useState(false); 
  const [results, setResults] = useState<number[]>([]);
  const [averageLag, setAverageLag] = useState<number | null>(null);
  const [bestLag, setBestLag] = useState<number | null>(null);
  const [worstLag, setWorstLag] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timestampRef = useRef<number | null>(null);
  const clickCounterRef = useRef<number>(0);

  // Reset the test
  const handleReset = () => {
    setIsActive(false); 
    setIsTargetReady(false); 
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
    setIsTargetReady(false); // Reset for the new round
    timestampRef.current = null;
    console.log(`[InputLagTest] handleStart called at: ${performance.now()}`); // Log start

    // Random delay between 1-5 seconds
    const delay = Math.random() * 4000 + 1000;
    console.log(`[InputLagTest] Calculated delay: ${Math.round(delay)}ms`); // Log calculated delay

    setTimeout(() => {
      // Only proceed if the test is still considered active by the time the timeout fires
      // This can prevent setting target ready if reset was hit very quickly
      console.log(`[InputLagTest] setTimeout callback fired at: ${performance.now()}`); // Log when timeout executes
      if (targetRef.current) { // Check if component/ref is still mounted
        timestampRef.current = performance.now();
        setIsTargetReady(true); // <<-- This will trigger re-render
        console.log(`[InputLagTest] Target is now READY at: ${timestampRef.current}`); // Log target ready time
      }
    }, delay);
  };

  // Handle click on target
  const handleClick = () => {
    if (!isActive) return;

    if (!isTargetReady) { 
      toast({
        title: "Too early!",
        description: "Please wait for the target to activate before clicking.",
        variant: "destructive"
      });
      setIsActive(false);
      setIsTargetReady(false); 
      return;
    }

    // If isTargetReady is true, timestampRef.current should be set
    if (!timestampRef.current) {
      // This case should ideally not be hit if isTargetReady is true, but as a safeguard:
      console.error("Inconsistent state: Target was ready but timestampRef is null.");
      setIsActive(false);
      setIsTargetReady(false);
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
    setIsTargetReady(false); 

    toast({
      title: "Input lag recorded",
      description: `Your reaction time was ${Math.round(lagTime)}ms`,
    });
  };

  const inputLagInfoData = {
    leftCardData: {
      title: "Understanding Input Lag",
      description: "Learn about mouse input latency.",
      mainParagraph: "Input lag, or latency, is the delay between when you move or click your mouse and when that action appears on screen. Lower input lag results in a more responsive and immediate feel, crucial for gaming and precision tasks.",
      detailList: {
        heading: "Factors Influencing Input Lag:",
        items: [
          "Mouse Hardware: Sensor quality, wireless vs. wired connection.",
          "Display: Monitor refresh rate (Hz) and response time (ms).",
          "System Performance: CPU/GPU load, background processes.",
          "Software: Game engine, operating system, drivers."
        ]
      }
    },
    rightCardData: {
      title: "Input Lag Test FAQs",
      description: "Common questions about input lag.",
      faqItems: [
        { question: "How is input lag measured in this test?", answer: "This test measures your reaction time to a visual stimulus. While it includes your human reaction time, consistently low scores suggest a responsive system (mouse, PC, display). It's a relative measure of your setup's input lag performance." },
        { question: "What's a good input lag score?", answer: "For this type of reaction test, scores under 200-250ms are generally good. Highly skilled gamers might achieve below 150ms. Remember, this includes human reaction time, which averages 200-270ms for visual stimuli." },
        { question: "How can I reduce input lag?", answer: "Use a high refresh rate monitor (144Hz+), a wired gaming mouse, enable 'Game Mode' on your display, optimize your PC's performance, and ensure graphics drivers are up to date. In games, reduce graphics settings that heavily load the GPU." },
        { question: "Why do my results vary?", answer: "Human reaction time naturally varies. Fatigue, focus, and even caffeine intake can affect it. System performance fluctuations can also contribute. Look at your average score over several attempts for a better picture." }
      ]
    }
  };

  return (
    <MainLayout headerTitle="Input Lag Test" headerDescription="Click the green area as soon as it appears to measure your input lag">
      <Helmet>
        <title>Mouse Input Lag Test - Check Your Reaction Time & System Latency | TestMyRig</title>
        <meta name="description" content="Test your mouse input lag and reaction time. Click the target as it appears to measure your system's responsiveness. Understand factors affecting input latency." />
        <link rel="canonical" href="https://testmyrig.com/mouse-tools/input-lag-test" />
        <meta property="og:title" content="Mouse Input Lag Test - Check Your Reaction Time & System Latency | TestMyRig" />
        <meta property="og:description" content="Test your mouse input lag and reaction time. Click the target as it appears to measure your system's responsiveness." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://testmyrig.com/mouse-tools/input-lag-test" />
        <meta property="og:image" content="https://testmyrig.com/images/og-mouse-tools.png" /> {/* Re-using category OG image */}
        <meta property="og:site_name" content="TestMyRig" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mouse Input Lag Test - Check Your Reaction Time & System Latency | TestMyRig" />
        <meta name="twitter:description" content="Test your mouse input lag and reaction time. Click the target as it appears to measure your system's responsiveness." />
        <meta name="twitter:image" content="https://testmyrig.com/images/og-mouse-tools.png" /> {/* Re-using category OG image */}
      </Helmet>
      <div className='flex flex-col gap-4'>
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
              className={`test-area cursor-pointer flex items-center justify-center transition-colors ${isActive && isTargetReady ? 'bg-green-500' : 'bg-muted'}`}
              style={{ minHeight: '300px' }}
            >
              {isActive ? (
                isTargetReady ? (
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
                label="Average Lag (ms)"
                current={averageLag !== null ? Math.round(averageLag) : 0}
                average={averageLag !== null ? Math.round(averageLag) : 0}
                max={averageLag !== null ? Math.round(averageLag) : 0}
                isActive={isActive} 
                onReset={handleReset}   
                onToggle={handleStart}  
                showControls={false}  
              />
              <DataDisplay
                label="Best Lag (ms)"
                current={bestLag !== null ? Math.round(bestLag) : 0}
                average={bestLag !== null ? Math.round(bestLag) : 0}
                max={bestLag !== null ? Math.round(bestLag) : 0}
                isActive={isActive}
                onReset={handleReset}
                onToggle={handleStart}
                showControls={false} 
              />
              <DataDisplay
                label="Worst Lag (ms)"
                current={worstLag !== null ? Math.round(worstLag) : 0}
                average={worstLag !== null ? Math.round(worstLag) : 0}
                max={worstLag !== null ? Math.round(worstLag) : 0}
                isActive={isActive}
                onReset={handleReset}
                onToggle={handleStart}
                showControls={false} 
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
      <section className="container mx-auto p-4 md:p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">About Input Lag</h2>
        <InfoSection {...inputLagInfoData} />
      </section>
    </MainLayout>
  );
};

export default InputLagTest;
