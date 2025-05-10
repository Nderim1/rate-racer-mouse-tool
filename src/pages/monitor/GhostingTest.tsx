import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Maximize, Minimize, Play, Pause } from 'lucide-react';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

const GhostingTest: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5); // Pixels per frame
  const [position, setPosition] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 for right, -1 for left

  const fullScreenRef = useRef<HTMLDivElement>(null);
  const animationAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const movingObjectRef = useRef<HTMLDivElement>(null);

  const handleFullScreenChange = useCallback(() => {
    setIsFullScreen(document.fullscreenElement != null);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, [handleFullScreenChange]);

  const toggleFullScreen = async () => {
    if (!fullScreenRef.current) return;
    const elementToFullscreen = fullScreenRef.current.querySelector('#animation-container') || fullScreenRef.current;
    if (!document.fullscreenElement) {
      try { await elementToFullscreen.requestFullscreen(); setIsRunning(true); }
      catch (err) { alert(`Error enabling full-screen: ${(err as Error).message}`); }
    } else {
      if (document.exitFullscreen) {
        try { await document.exitFullscreen(); }
        catch (err) { alert(`Error disabling full-screen: ${(err as Error).message}`); }
      }
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && document.fullscreenElement && setIsFullScreen(false);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const animate = useCallback(() => {
    if (!animationAreaRef.current || !movingObjectRef.current) return;
    const areaWidth = animationAreaRef.current.offsetWidth;
    const objectWidth = movingObjectRef.current.offsetWidth;

    setPosition(prevPosition => {
      let newPosition = prevPosition + speed * direction;
      let newDirection = direction;

      if (newPosition + objectWidth > areaWidth) {
        newPosition = areaWidth - objectWidth;
        newDirection = -1;
      }
      if (newPosition < 0) {
        newPosition = 0;
        newDirection = 1;
      }
      setDirection(newDirection);
      return newPosition;
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, [speed, direction]);

  useEffect(() => {
    if (isRunning) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning, animate]);

  const ghostingTestInfo: InfoSectionProps = {
    leftCardData: {
      title: "About Ghosting & Motion Blur Test",
      description: "Visually assess your monitor's pixel response time and motion clarity.",
      mainParagraph: "This test features a moving object. Ghosting appears as a faint trail or 'ghost' image following the object, while motion blur makes the object appear smeared or less distinct during movement. Both are related to how quickly your monitor's pixels can change color (response time).",
      detailList: {
        heading: "How to Use This Test:",
        items: [
          "Use the 'Toggle Full Screen' button for the most accurate visual assessment, as it ensures consistent animation across the display.",
          "Click 'Start Animation' to begin. Observe the moving square.",
          "Look for any trailing artifacts (ghosts) or excessive blurring of the square as it moves.",
          "Adjust the 'Speed' slider. Higher speeds will often make ghosting and blur more apparent.",
          "Monitors with faster response times (e.g., 1ms GTG) will generally show clearer motion with less ghosting than those with slower response times.",
          "Some monitors have 'Overdrive' or 'Response Time' settings in their OSD. Experimenting with these might reduce ghosting, but aggressive settings can sometimes introduce 'inverse ghosting' (coronas or bright trails).",
          "Press 'ESC' or use the button to exit full-screen mode."
        ]
      }
    },
    rightCardData: {
      title: "Understanding Motion Artifacts",
      description: "Ghosting, motion blur, and response time explained.",
      faqItems: [
        {
          question: "What is pixel response time?",
          answer: "It's the time it takes for a pixel to change from one color to another (e.g., gray-to-gray or GtG). Faster response times (lower milliseconds) mean pixels can keep up better with fast-moving images, reducing blur and ghosting."
        },
        {
          question: "Is this test a precise measurement tool?",
          answer: "No, this is a visual test for subjective assessment. Precise response time and input lag measurements require specialized hardware (like a high-speed camera and photodiode sensors)."
        },
        {
          question: "What's the difference between ghosting and motion blur?",
          answer: "Ghosting typically refers to distinct, trailing images. Motion blur is a more general term for the smearing or lack of sharpness in moving objects. Both are often due to pixel transition limitations, but display technology (LCD vs. OLED) can also influence how they manifest."
        },
        {
          question: "Can refresh rate affect this?",
          answer: "Yes. Higher refresh rates (e.g., 120Hz, 144Hz, 240Hz) display more frames per second, which can lead to smoother perceived motion and can also make response time limitations more or less noticeable. This test's animation is tied to your browser's `requestAnimationFrame`, which usually syncs with your display's refresh rate."
        }
      ]
    }
  };

  return (
    <MainLayout 
      title="Ghosting & Motion Blur Test - RateRacer"
      headerTitle="Ghosting / Motion Blur Test"
      headerDescription="Visually assess your monitor's motion performance."
    >
      <div ref={fullScreenRef} className={`${isFullScreen ? 'fixed inset-0 z-[100] bg-gray-800' : 'relative'}`}>
        {isFullScreen && (
           <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4' id="animation-container">
            <div ref={animationAreaRef} className="w-full h-1/2 bg-gray-700 relative overflow-hidden">
              <div ref={movingObjectRef} style={{ transform: `translateX(${position}px)`, backgroundColor: '#00FF00' }} className="w-16 h-16 absolute top-1/2 -translate-y-1/2"></div>
            </div>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 p-3 bg-black bg-opacity-70 rounded-md shadow-lg">
              <Button onClick={() => setIsRunning(!isRunning)} variant="outline" size="icon" className="w-10 h-10 border-2 border-white text-white">
                {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Slider value={[speed]} onValueChange={(val) => setSpeed(val[0])} min={1} max={20} step={1} className="w-32" />
              <span className='text-white text-xs min-w-[50px] text-center'>Speed: {speed}</span>
              <Button onClick={toggleFullScreen} variant="outline" size="icon" className="w-10 h-10 border-2 border-white ml-2" title="Exit Full Screen">
                <Minimize className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        )}
        {!isFullScreen && (
          <div className="space-y-6 p-1">
            <Card>
              <CardHeader>
                <CardTitle>Animation Controls</CardTitle>
                <CardDescription>Start the animation and adjust speed to observe motion clarity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="animation-container" className='border rounded-md p-4'>
                    <div ref={animationAreaRef} className="w-full h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden rounded">
                      <div ref={movingObjectRef} style={{ transform: `translateX(${position}px)`, backgroundColor: '#00DD00' }} className="w-12 h-12 absolute top-1/2 -translate-y-1/2 shadow-lg"></div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button 
                    onClick={() => setIsRunning(!isRunning)} 
                    variant={isRunning ? "destructive" : "default"}
                    className='min-w-[180px] sm:w-auto'
                  >
                    {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {isRunning ? 'Stop Animation' : 'Start Animation'}
                  </Button>
                  <div className="flex items-center gap-2 w-full sm:w-auto flex-grow">
                    <label htmlFor="speedSlider" className="text-sm font-medium whitespace-nowrap">Speed:</label>
                    <Slider id="speedSlider" value={[speed]} onValueChange={(val) => setSpeed(val[0])} min={1} max={20} step={1} className="w-full" />
                    <span className="text-sm text-muted-foreground w-8 text-right">{speed}</span>
                  </div>
                </div>
                <Button onClick={toggleFullScreen} className="w-full mt-2">
                  <Maximize className="mr-2 h-4 w-4" /> Toggle Full Screen View
                </Button>
              </CardContent>
            </Card>
            <InfoSection {...ghostingTestInfo} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GhostingTest;
