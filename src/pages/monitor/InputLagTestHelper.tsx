import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize, Play, Pause } from 'lucide-react';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

const FLASH_INTERVAL_MS = 200; // Toggle color every 200ms

const InputLagTestHelper: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [flashColor, setFlashColor] = useState<string>('bg-white'); // 'bg-white' or 'bg-black'
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleFullScreenChange = useCallback(() => {
    setIsFullScreen(document.fullscreenElement != null);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, [handleFullScreenChange]);

  const toggleFullScreen = async () => {
    if (!fullScreenRef.current) return;
    const elementToFullscreen = fullScreenRef.current.querySelector('#flash-area-container') || fullScreenRef.current;
    if (!document.fullscreenElement) {
      try {
        await elementToFullscreen.requestFullscreen();
        if (!isRunning) setIsRunning(true); // Auto-start on full screen
      }
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

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setFlashColor(prev => prev === 'bg-white' ? 'bg-black' : 'bg-white');
      }, FLASH_INTERVAL_MS);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]);

  const inputLagTestInfo: InfoSectionProps = {
    leftCardData: {
      title: "About Input Lag Test Helper",
      description: "A visual aid for *estimating* input lag. This is NOT a precise measurement tool.",
      mainParagraph: "Input lag is the delay between an action (like a mouse click or key press) and the result appearing on screen. This tool provides a flashing visual stimulus. By photographing this stimulus alongside an LED on your input device (e.g., mouse LED when clicked) simultaneously, you can *estimate* the delay by counting frame differences in your photo/video. Specialized hardware is required for accurate input lag measurement.",
      detailList: {
        heading: "How to Use This Helper Tool:",
        items: [
          "**Preparation:** You'll need a camera (preferably one that can take burst photos or high frame-rate video) and an input device (mouse/keyboard) that has an LED indicator for clicks/presses.",
          "Place your input device near the screen so both the flashing square on screen and the device's LED are visible in your camera's viewfinder.",
          "Use the 'Toggle Full Screen' button. The flashing will start automatically.",
          "**Capture:** Simultaneously click/press your input device (to activate its LED) AND take a photo or a short burst of video. This might take a few tries to get the timing right.",
          "**Analysis (Photo):** If using single photos, inspect the image. If the on-screen square has changed color *after* your device's LED is lit, there's a delay. The challenge is catching the exact moment of transition.",
          "**Analysis (Video/Burst):** Step through the frames. Count how many frames pass between the input device's LED lighting up and the on-screen square changing state. Each frame represents a duration (e.g., at 60fps, 1 frame = ~16.7ms; at 240fps, 1 frame = ~4.17ms).",
          "**Estimation:** This difference provides a rough visual estimate of input lag + your device's internal processing + LED response time.",
          "**Important:** This method has many variables (camera shutter speed, display refresh rate sync, LED latency) and is only a basic estimation. For true measurements, tools like a Nvidia LDAT or a high-speed camera setup with a photodiode are necessary."
        ]
      }
    },
    rightCardData: {
      title: "Understanding Input Lag",
      description: "Why it matters and factors involved.",
      faqItems: [
        {
          question: "Why is low input lag important?",
          answer: "Especially in gaming, low input lag means your actions feel more responsive and immediate, providing a better sense of control. High input lag can feel sluggish."
        },
        {
          question: "What contributes to input lag?",
          answer: "Input device processing, system processing (CPU/GPU), display processing (internal scaling, image enhancements), and the display panel's own response time all contribute to the total 'photon-to-action' latency."
        },
        {
          question: "Can I reduce input lag?",
          answer: "Use 'Game Mode' on your TV/monitor if available (disables some processing). Ensure V-Sync is off or use adaptive sync (G-Sync/FreeSync) if input lag is a high priority over screen tearing. Use a high refresh rate monitor. Use wired peripherals. Close unnecessary background applications."
        },
        {
          question: "Does this tool measure my monitor's response time?",
          answer: "No. Pixel response time (how fast pixels change color) is one component that *can* contribute to overall input lag perception but is distinct. We have other tests (like the Ghosting Test) for visually assessing motion blur related to response time."
        }
      ]
    }
  };

  return (
    <MainLayout
      title="Input Lag Test Helper - TestMyRig"
      headerTitle="Input Lag Test (Helper Tool)"
      headerDescription="A visual aid for estimating input lag (requires external camera)."
    >
      <div ref={fullScreenRef} className={`${isFullScreen ? 'fixed inset-0 z-[100] bg-gray-500' : 'relative'}`}>
        {isFullScreen && (
          <div id="flash-area-container" className='w-full h-full flex flex-col items-center justify-center p-4 bg-gray-500'>
            <div className={`w-64 h-64 md:w-96 md:h-96 ${flashColor} transition-colors duration-50`}></div>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 p-3 bg-black bg-opacity-70 rounded-md shadow-lg">
              <Button onClick={() => setIsRunning(!isRunning)} variant="outline" size="icon" className="w-10 h-10 border-2 border-white text-white">
                {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
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
                <CardTitle>Flashing Stimulus Control</CardTitle>
                <CardDescription>Start the flashing square and use full-screen for your test setup.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="flash-area-container" className='border rounded-md p-4 min-h-[200px] flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
                  <div className={`w-32 h-32 ${flashColor} shadow-lg transition-colors duration-50`}></div>
                </div>
                <Button onClick={() => setIsRunning(!isRunning)} variant={isRunning ? "destructive" : "default"} className='w-full'>
                  {isRunning ? <><Pause className="mr-2 h-4 w-4" /> Stop Flashing</> : <><Play className="mr-2 h-4 w-4" /> Start Flashing</>}
                </Button>
                <Button onClick={toggleFullScreen} className="w-full mt-2">
                  <Maximize className="mr-2 h-4 w-4" /> Toggle Full Screen View
                </Button>
                <p className="text-xs text-muted-foreground mt-1">Flashing starts automatically in full-screen mode. Interval: {FLASH_INTERVAL_MS}ms per color.</p>
              </CardContent>
            </Card>
            <InfoSection {...inputLagTestInfo} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default InputLagTestHelper;
