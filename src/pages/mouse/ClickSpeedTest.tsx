import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
import MainLayout from '@/Layout/MainLayout'; 
import InfoSection from '@/components/InfoSection'; 

const ClickSpeedTest = () => {
  const { toast } = useToast();
  const [clicks, setClicks] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cps, setCps] = useState<number>(0);
  const [bestCps, setBestCps] = useState<number>(0);
  const [clickData, setClickData] = useState<{ time: number, clicks: number }[]>([]);

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

  const clickSpeedInfoData = {
    leftCardData: {
      title: "Understanding Click Speed (CPS)",
      description: "Learn the basics of clicks per second.",
      mainParagraph: "Clicks Per Second (CPS) is a measure of how many times you can click your mouse button in one second. It's often used as a benchmark in gaming, particularly in games that require rapid clicking.",
      detailList: {
        heading: "Factors Affecting CPS:",
        items: [
          "Mouse Hardware: Quality of switches and mouse design.",
          "Clicking Technique: Jitter clicking, butterfly clicking, etc.",
          "Physical Condition: Finger dexterity and stamina.",
          "Software/OS: System responsiveness and input processing."
        ]
      }
    },
    rightCardData: {
      title: "CPS Test FAQs",
      description: "Common questions about click speed tests.",
      faqItems: [
        { question: "How can I improve my CPS?", answer: "Practice different clicking techniques, use a mouse designed for fast clicking, and ensure your computer is running smoothly. Regular practice can improve muscle memory and speed." },
        { question: "What's a good CPS score?", answer: "Average CPS is around 6-8. Gamers might aim for 10-15 CPS or higher. Scores above 20 are exceptional and often involve specific techniques like jitter or butterfly clicking." },
        { question: "Does higher CPS make me a better gamer?", answer: "While high CPS can be advantageous in certain games (like Minecraft PvP or OSU!), it's not the only factor. Aim, strategy, and game sense are often more important. However, for click-intensive tasks, higher CPS is beneficial." },
        { question: "Is this test accurate?", answer: "This test provides a reliable measure of your clicking speed within the browser environment. For absolute precision, ensure no other demanding applications are running." }
      ]
    }
  };

  return (
    <MainLayout headerTitle="Click Speed Test" headerDescription="Measure how many clicks per second (CPS) you can perform">
      <Helmet>
        <title>Click Speed Test (CPS Test) - Check Your Mouse Clicking Speed | TestMyRig</title>
        <meta name="description" content="Test your mouse click speed (CPS - clicks per second). Find out how fast you can click in 10 seconds. Improve your CPS for gaming and other applications." />
        <link rel="canonical" href="https://testmyrig.com/mouse-tools/click-speed-test" />
        <meta property="og:title" content="Click Speed Test (CPS Test) - Check Your Mouse Clicking Speed | TestMyRig" />
        <meta property="og:description" content="Test your mouse click speed (CPS - clicks per second). Find out how fast you can click in 10 seconds." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://testmyrig.com/mouse-tools/click-speed-test" />
        <meta property="og:image" content="https://testmyrig.com/images/og-mouse-tools.png" /> 
        <meta property="og:site_name" content="TestMyRig" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Click Speed Test (CPS Test) - Check Your Mouse Clicking Speed | TestMyRig" />
        <meta name="twitter:description" content="Test your mouse click speed (CPS - clicks per second). Find out how fast you can click in 10 seconds." />
        <meta name="twitter:image" content="https://testmyrig.com/images/og-mouse-tools.png" /> 
      </Helmet>

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

      <Separator className="my-8" />

      {/* Info Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">About Click Speed Testing</h2>
        <InfoSection {...clickSpeedInfoData} />
      </section>

    </MainLayout>
  );
};

export default ClickSpeedTest;
