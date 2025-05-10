import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Mouse, Target, HelpCircle, Info } from 'lucide-react';
import MainLayout from '@/Layout/MainLayout';
import InfoSection from '@/components/InfoSection';

const DPIAnalyzer = () => {
  const [distance, setDistance] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [calculatedDPI, setCalculatedDPI] = useState<number | null>(null);
  const [inputDistance, setInputDistance] = useState<string>("10");
  const trackRef = useRef<HTMLDivElement>(null);

  // Handle mouse down to start tracking
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive) {
      setIsActive(true);
      setStartX(e.clientX);
      setCurrentX(e.clientX);
    }
  };

  // Handle mouse move to track distance
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isActive) {
      setCurrentX(e.clientX);
    }
  };

  // Handle mouse up to end tracking and calculate
  const handleMouseUp = () => {
    if (isActive && startX !== null && currentX !== null) {
      const pixelsMoved = Math.abs(currentX - startX);
      const cmMoved = parseFloat(inputDistance);

      if (!isNaN(cmMoved) && cmMoved > 0) {
        // DPI = pixels moved / inches moved
        const inchesMoved = cmMoved / 2.54;
        const dpi = Math.round(pixelsMoved / inchesMoved);
        setCalculatedDPI(dpi);
      }

      setIsActive(false);
      setDistance(0);
      setStartX(null);
      setCurrentX(null);
    }
  };

  // Update distance calculation in real-time
  useEffect(() => {
    if (isActive && startX !== null && currentX !== null) {
      const pixelsMoved = Math.abs(currentX - startX);
      setDistance(pixelsMoved);
    }
  }, [currentX, isActive, startX]);

  // Reset the test
  const handleReset = () => {
    setIsActive(false);
    setDistance(0);
    setStartX(null);
    setCurrentX(null);
    setCalculatedDPI(null);
  };

  const dpiAnalyzerInfoData = {
    leftCardData: {
      title: "Understanding Mouse DPI",
      description: "Learn what DPI means and how it affects your mouse.",
      mainParagraph: "DPI (Dots Per Inch) is a measure of a mouse's sensitivity. A higher DPI means the cursor will move further on the screen for the same physical mouse movement. Finding the right DPI is key for comfort and precision.",
      detailList: {
        heading: "DPI Considerations:",
        items: [
          "Low DPI (400-800): Often preferred by FPS gamers for precise aiming, requires larger mouse movements.",
          "Medium DPI (800-1600): A common range for general use and various game genres.",
          "High DPI (1600+): Allows for fast cursor movement with minimal physical effort, can be useful for high-resolution displays or specific tasks.",
          "Effective DPI (eDPI): DPI multiplied by in-game sensitivity. A more consistent measure across different games."
        ]
      }
    },
    rightCardData: {
      title: "DPI Analyzer FAQs",
      description: "Common questions about mouse DPI analysis.",
      faqItems: [
        { question: "Why does my calculated DPI differ from my mouse's advertised DPI?", answer: "Advertised DPI can sometimes be inaccurate or rounded. Mouse surface, sensor inconsistencies, and even software interpolation can affect actual DPI. This tool helps find your mouse's true, functional DPI." },
        { question: "How do I perform the test accurately?", answer: "Use a ruler to measure the physical distance you intend to move your mouse. Move your mouse smoothly and horizontally across that measured distance on your mousepad while capturing. Ensure your mouse is on a flat, consistent surface." },
        { question: "Does Windows pointer speed affect DPI?", answer: "Yes, Windows pointer speed settings (especially 'Enhance pointer precision') can alter how physical mouse movement translates to cursor movement, effectively changing your eDPI. For accurate DPI measurement, it's often recommended to disable 'Enhance pointer precision' and set Windows sensitivity to the 6th notch (default)." },
        { question: "What is eDPI?", answer: "eDPI stands for effective Dots Per Inch. It's calculated by multiplying your mouse DPI by your in-game sensitivity setting. It provides a standardized way to compare true sensitivity across different games and DPI settings." }
      ]
    }
  };

  return (
    <MainLayout headerTitle="Mouse DPI Analyzer" headerDescription="Measure your mouse's DPI with precision">
      <Helmet>
        <title>Mouse DPI Analyzer - Check Your True Mouse DPI | TestMyRig</title>
        <meta name="description" content="Accurately measure your mouse's true DPI (Dots Per Inch). Understand how DPI affects sensitivity and precision for gaming and everyday use." />
        <link rel="canonical" href="https://testmyrig.com/mouse-tools/dpi-analyzer" />
        <meta property="og:title" content="Mouse DPI Analyzer - Check Your True Mouse DPI | TestMyRig" />
        <meta property="og:description" content="Accurately measure your mouse's true DPI (Dots Per Inch). Understand how DPI affects sensitivity and precision." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://testmyrig.com/mouse-tools/dpi-analyzer" />
        <meta property="og:image" content="https://testmyrig.com/images/og-mouse-tools.png" /> {/* Re-using category OG image */}
        <meta property="og:site_name" content="TestMyRig" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mouse DPI Analyzer - Check Your True Mouse DPI | TestMyRig" />
        <meta name="twitter:description" content="Accurately measure your mouse's true DPI (Dots Per Inch). Understand how DPI affects sensitivity and precision." />
        <meta name="twitter:image" content="https://testmyrig.com/images/og-mouse-tools.png" /> {/* Re-using category OG image */}
      </Helmet>
      {/* Instructions Card */}
      <div className="flex flex-col gap-2 ">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              How to Measure Your Mouse DPI
            </CardTitle>
            <CardDescription>
              Follow these steps to accurately measure your mouse's DPI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal ml-5 space-y-2">
              <li>Enter the physical distance you plan to move your mouse (in centimeters)</li>
              <li>Click and hold in the test area below</li>
              <li>Move your mouse horizontally the exact distance you entered</li>
              <li>Release the mouse button to see your calculated DPI</li>
            </ol>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Test Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="distance" className="mb-2 block">
                  Physical Distance to Move Mouse (cm)
                </Label>
                <Input
                  id="distance"
                  type="number"
                  min="1"
                  max="50"
                  value={inputDistance}
                  onChange={(e) => setInputDistance(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleReset} variant="outline">
                Reset Test
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Area */}
        <Card>
          <CardHeader>
            <CardTitle>DPI Test Area</CardTitle>
            <CardDescription>
              Click and drag horizontally within this area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={trackRef}
              className={`test-area h-32 flex items-center justify-center ${isActive ? 'test-area-active' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {isActive ? (
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-primary animate-pulse" />
                  <p className="text-xl">
                    <span className="font-bold">{distance}</span> pixels moved
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Keep moving horizontally...
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Mouse className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-xl font-medium">
                    Click and drag horizontally
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Move exactly {inputDistance} cm to measure your DPI
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>DPI Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              {calculatedDPI !== null ? (
                <div className="text-center">
                  <p className="text-6xl font-bold mb-2 text-primary">
                    {calculatedDPI}
                  </p>
                  <p className="text-xl text-muted-foreground">DPI</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Complete the test to see your mouse DPI</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <section className="container mx-auto p-4 md:p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">About Mouse DPI</h2>
        <InfoSection {...dpiAnalyzerInfoData} />
      </section>
    </MainLayout>
  );
};

export default DPIAnalyzer;
