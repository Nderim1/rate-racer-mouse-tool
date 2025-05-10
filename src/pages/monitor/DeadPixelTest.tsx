import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

const colors = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Yellow', hex: '#FFFF00' },
];

const DeadPixelTest: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string>('#FFFFFF'); // Default to white
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const handleFullScreenChange = useCallback(() => {
    setIsFullScreen(document.fullscreenElement != null);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [handleFullScreenChange]);

  const toggleFullScreen = async () => {
    if (!fullScreenRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await fullScreenRef.current.requestFullscreen();
        // isFullScreen state will be updated by the 'fullscreenchange' event listener
      } catch (err) {
        console.error('Error attempting to enable full-screen mode:', err);
        alert(`Error attempting to enable full-screen mode: ${(err as Error).message}. Please try again or check browser permissions.`);
      }
    } else {
      if (document.exitFullscreen) {
        try {
          await document.exitFullscreen();
          // isFullScreen state will be updated by the 'fullscreenchange' event listener
        } catch (err) {
          console.error('Error attempting to disable full-screen mode:', err);
          alert(`Error attempting to disable full-screen mode: ${(err as Error).message}.`);
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && document.fullscreenElement) {
        // Browser handles ESC for exiting fullscreen.
        // The 'fullscreenchange' event listener will update 'isFullScreen' state.
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const deadPixelTestInfo: InfoSectionProps = {
    leftCardData: {
      title: "About the Dead/Stuck Pixel Test",
      description: "This tool helps you identify dead, stuck, or bright pixels on your monitor.",
      mainParagraph: "Dead pixels remain unlit (black) regardless of the displayed image. Stuck pixels are always on, displaying a solid color (red, green, blue, or white). Bright pixels are a sub-category of stuck pixels that are always white. This test cycles through solid colors to make these faulty pixels stand out.",
      detailList: {
        heading: "How to Use This Test:",
        items: [
          "Click the 'Toggle Full Screen' button to enter full-screen mode for optimal viewing.",
          "Use the color buttons to change the background color of the entire screen (buttons available in full-screen too).",
          "Carefully inspect all areas of your monitor for any pixels that do not match the selected color or appear black/white when they shouldn't.",
          "Press the 'ESC' key or click the 'Exit Full Screen' button to exit full-screen mode.",
          "For best results, perform this test in a dimly lit room."
        ]
      }
    },
    rightCardData: {
      title: "Pixel Anomalies Explained",
      description: "Understanding common types of pixel defects.",
      faqItems: [
        {
          question: "What is a dead pixel?",
          answer: "A dead pixel is a pixel that fails to light up and appears black on a colored or white background. This is usually due to a malfunctioning transistor."
        },
        {
          question: "What is a stuck pixel?",
          answer: "A stuck pixel is constantly lit, displaying a single color (red, green, blue, or white) regardless of the image. This means one or more sub-pixels are always on."
        },
        {
          question: "What is a bright pixel?",
          answer: "A bright pixel is a type of stuck pixel where all sub-pixels are stuck in the 'on' state, making the pixel appear constantly white."
        },
        {
          question: "Can dead or stuck pixels be fixed?",
          answer: "Sometimes, stuck pixels can be 'unstuck' using software that rapidly cycles colors or by gently massaging the area. Dead pixels are generally permanent hardware failures. Refer to your monitor's warranty policy, as many manufacturers have specific criteria for pixel defects."
        },
        {
          question: "How many dead/stuck pixels are acceptable?",
          answer: "This varies by manufacturer and monitor grade. Most have a policy defining the number and type of pixel defects allowed before a monitor is considered defective for warranty claims (e.g., ISO 13406-2 or ISO 9241-302 to 307 standards)."
        }
      ]
    }
  };

  return (
    <MainLayout
      title="Dead Pixel & Stuck Pixel Test - TestMyRig"
      headerTitle="Dead Pixel / Stuck Pixel Test"
      headerDescription="Check your screen for dead, stuck, or bright pixels using full-screen solid colors."
    >
      <div
        ref={fullScreenRef}
        style={{ backgroundColor: isFullScreen ? currentColor : 'transparent' }}
        className={`transition-colors duration-150 ${isFullScreen ? 'fixed inset-0 z-[100]' : 'relative'}`}
      >
        {isFullScreen && (
          <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4'>
            <div className='absolute top-4 left-1/2 -translate-x-1/2 p-3 bg-black bg-opacity-70 text-white rounded-md shadow-lg text-center'>
              <p className='text-lg font-semibold'>
                Selected Color: <span style={{ color: currentColor === '#000000' ? '#FFFFFF' : currentColor, textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>
                  {colors.find(c => c.hex === currentColor)?.name}
                </span>
              </p>
              <p className='text-sm mt-1'>Press 'ESC' or click button below to exit Full Screen</p>
            </div>

            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-3 bg-black bg-opacity-70 rounded-md shadow-lg">
              {colors.map((color) => (
                <Button
                  key={color.name + '-fullscreen'}
                  onClick={() => setCurrentColor(color.hex)}
                  variant={'outline'}
                  size={'icon'}
                  className="w-10 h-10 border-2 border-white hover:opacity-80 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  title={color.name}
                  style={{ backgroundColor: color.hex }}
                >
                  {currentColor === color.hex && <span className="text-white mix-blend-difference text-lg">✓</span>}
                </Button>
              ))}
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
                <CardTitle>Test Area & Controls</CardTitle>
                <CardDescription>
                  Select a color and use the full-screen mode to inspect your monitor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  style={{ backgroundColor: currentColor }}
                  className="w-full h-64 border rounded-md flex items-center justify-center text-xl font-semibold transition-colors duration-150 relative"
                >
                  <span style={{ color: currentColor === '#FFFFFF' || currentColor === '#FFFF00' || currentColor === '#00FFFF' ? '#000000' : '#FFFFFF', textShadow: '1px 1px 1px rgba(0,0,0,0.2)' }}>
                    {colors.find(c => c.hex === currentColor)?.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color.name}
                      onClick={() => setCurrentColor(color.hex)}
                      variant={currentColor === color.hex ? 'default' : 'outline'}
                      className="w-full justify-start text-sm h-auto py-2 px-3 leading-tight"
                    >
                      <span style={{ backgroundColor: color.hex }} className="w-4 h-4 rounded-full inline-block mr-2 border border-gray-400"></span>
                      {color.name}
                    </Button>
                  ))}
                </div>
                <Button onClick={toggleFullScreen} className="w-full mt-4">\n                  <Maximize className="mr-2 h-4 w-4" />
                  Toggle Full Screen
                </Button>
              </CardContent>
            </Card>
            <InfoSection {...deadPixelTestInfo} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DeadPixelTest;
