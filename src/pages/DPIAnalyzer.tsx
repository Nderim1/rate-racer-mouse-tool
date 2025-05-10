
import React, { useState, useRef, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Mouse, Target, HelpCircle, Info } from 'lucide-react';

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
                Mouse DPI Analyzer
              </h1>
            </div>
            <div className="ad-placeholder ad-banner mx-auto mb-8">
              Ad Space (728x90)
            </div>
          </header>

          <main className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main content - 2/3 width on desktop */}
              <div className="md:col-span-2 space-y-6">
                {/* Instructions Card */}
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
              
              {/* Sidebar - 1/3 width on desktop */}
              <div className="space-y-6">
                {/* Ad Space */}
                <div className="ad-placeholder ad-sidebar mb-6 mx-auto">
                  Ad Space (300x600)
                </div>
                
                {/* Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      What is DPI?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      DPI (Dots Per Inch) is a measurement of how sensitive your mouse is. A higher DPI means the cursor moves further on screen for the same physical movement of your mouse.
                    </p>
                    <h4 className="font-semibold text-lg">Common DPI Values</h4>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-medium">400-800 DPI:</span> Often used by professional FPS gamers for precise aiming
                      </li>
                      <li>
                        <span className="font-medium">800-1600 DPI:</span> Common general-purpose setting
                      </li>
                      <li>
                        <span className="font-medium">1600-3200+ DPI:</span> Preferred for high-resolution displays or when minimal physical movement is desired
                      </li>
                    </ul>
                    <h4 className="font-semibold text-lg">DPI vs Sensitivity</h4>
                    <p>
                      Mouse DPI is hardware-based sensitivity, while in-game sensitivity is a software multiplier. For consistent muscle memory, many gamers maintain the same DPI and adjust in-game sensitivity per game.
                    </p>
                  </CardContent>
                </Card>
                
                {/* FAQ Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Is higher DPI always better?</h4>
                      <p className="text-sm text-muted-foreground">
                        Not necessarily. While higher DPI offers more precision, many professional gamers use lower DPI for better control. The best DPI depends on your preferences, setup, and use case.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">How accurate is this test?</h4>
                      <p className="text-sm text-muted-foreground">
                        This test gives an approximation of your DPI. For best results, measure carefully and try multiple times. Factors like mouse acceleration and display scaling can affect results.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Why does my measured DPI differ from advertised?</h4>
                      <p className="text-sm text-muted-foreground">
                        Mouse software settings, driver settings, or OS-level mouse sensitivity can all affect the effective DPI of your mouse.
                      </p>
                    </div>
                  </CardContent>
                </Card>
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

export default DPIAnalyzer;
