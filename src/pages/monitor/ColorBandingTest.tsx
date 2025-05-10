import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GradientPattern {
  name: string;
  type: 'linear-horizontal' | 'linear-vertical' | 'radial';
  css: string;
  description: string;
}

const gradientPatterns: GradientPattern[] = [
  { name: 'Horizontal: Black to White', type: 'linear-horizontal', css: 'linear-gradient(to right, #000000, #FFFFFF)', description: 'Smooth transition from black to white, left to right.' },
  { name: 'Horizontal: Red to Green', type: 'linear-horizontal', css: 'linear-gradient(to right, #FF0000, #00FF00)', description: 'Smooth transition from red to green, left to right.' },
  { name: 'Horizontal: Blue to Yellow', type: 'linear-horizontal', css: 'linear-gradient(to right, #0000FF, #FFFF00)', description: 'Smooth transition from blue to yellow, left to right.' },
  { name: 'Vertical: Black to White', type: 'linear-vertical', css: 'linear-gradient(to bottom, #000000, #FFFFFF)', description: 'Smooth transition from black to white, top to bottom.' },
  { name: 'Vertical: Red to Green', type: 'linear-vertical', css: 'linear-gradient(to bottom, #FF0000, #00FF00)', description: 'Smooth transition from red to green, top to bottom.' },
  { name: 'Vertical: Blue to Yellow', type: 'linear-vertical', css: 'linear-gradient(to bottom, #0000FF, #FFFF00)', description: 'Smooth transition from blue to yellow, top to bottom.' },
  { name: 'Radial: Black to White', type: 'radial', css: 'radial-gradient(circle, #000000, #FFFFFF)', description: 'Smooth transition from black (center) to white (edges).' },
  { name: 'Radial: Red to Green', type: 'radial', css: 'radial-gradient(circle, #FF0000, #00FF00)', description: 'Smooth transition from red (center) to green (edges).' },
  { name: 'Radial: Blue to Yellow', type: 'radial', css: 'radial-gradient(circle, #0000FF, #FFFF00)', description: 'Smooth transition from blue (center) to yellow (edges).' },
];

const ColorBandingTest: React.FC = () => {
  const [currentGradient, setCurrentGradient] = useState<GradientPattern>(gradientPatterns[0]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const handleFullScreenChange = useCallback(() => {
    const fullscreenActive = document.fullscreenElement != null;
    setIsFullScreen(fullscreenActive);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, [handleFullScreenChange]);

  const toggleFullScreen = async () => {
    if (!fullScreenRef.current) return;
    const elementToFullscreen = fullScreenRef.current.querySelector('#gradient-display-area') || fullScreenRef.current;
    if (!document.fullscreenElement) {
      try {
        await elementToFullscreen.requestFullscreen();
      } catch (err) {
        alert(`Error enabling full-screen: ${(err as Error).message}`);
      }
    } else {
      if (document.exitFullscreen) {
        try {
          await document.exitFullscreen();
        } catch (err) {
          alert(`Error disabling full-screen: ${(err as Error).message}`);
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && document.fullscreenElement && setIsFullScreen(false);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const colorBandingTestInfo: InfoSectionProps = {
    leftCardData: {
      title: "About the Color Banding / Gradient Test",
      description: "Check your monitor's ability to render smooth color transitions.",
      mainParagraph: "This test displays various color gradients. Color banding appears as visible steps or lines in a gradient where a smooth transition is expected. It can indicate limitations in your monitor's color depth (e.g., 6-bit vs 8-bit panel), color processing capabilities, or even issues with your graphics card settings or cables.",
      detailList: {
        heading: "How to Use This Test:",
        items: [
          "Select a gradient pattern from the dropdown menu.",
          "Click 'Toggle Full Screen' for the best viewing experience.",
          "Observe the displayed gradient carefully. Look for any distinct lines, steps, or blocks of color instead of a smooth, continuous transition.",
          "Test with different gradient types (horizontal, vertical, radial) and color combinations.",
          "Poor quality cables or incorrect graphics card settings (like limited color output format) can also contribute to banding.",
          "Press 'ESC' or use the button to exit full-screen mode."
        ]
      }
    },
    rightCardData: {
      title: "Understanding Color Banding",
      description: "Why it happens and what it signifies.",
      faqItems: [
        {
          question: "What causes color banding?",
          answer: "The primary cause is often insufficient color depth. If a monitor can't display enough distinct shades between two colors in a gradient, it will show noticeable steps. Other factors include monitor processing, compression artifacts in source material (less relevant for this pure gradient test), and graphics settings."
        },
        {
          question: "What is color depth (e.g., 6-bit, 8-bit, 10-bit)?",
          answer: "Color depth refers to the number of bits used to represent the color of a single pixel. Higher bit depth means more available colors and smoother gradients. 6-bit panels (often using FRC to simulate 8-bit) are more prone to banding than true 8-bit or 10-bit panels."
        },
        {
          question: "Can I fix color banding?",
          answer: "If it's due to monitor limitations, it's not directly fixable. However, ensure your graphics card drivers are up to date and that color output settings in your OS/GPU control panel are set to the highest possible (e.g., full dynamic range, 8-bit or 10-bit output if supported). Using high-quality display cables (like DisplayPort) can also help."
        },
        {
          question: "Is some banding normal?",
          answer: "Very subtle banding might be perceptible on almost any display if you look extremely closely at challenging gradients. The concern is when banding is obvious and distracting during normal use (e.g., watching movies, image editing)."
        }
      ]
    }
  };

  return (
    <MainLayout
      title="Color Banding & Gradient Test - TestMyRig"
      headerTitle="Color Banding / Gradient Test"
      headerDescription="Test your monitor's ability to display smooth color gradients."
    >
      <div ref={fullScreenRef} className={`relative ${isFullScreen ? 'fixed inset-0 z-[100] bg-background' : ''}`}>

        <div
          id="gradient-display-area"
          className="w-full h-[300px] md:h-[500px] rounded-md transition-all duration-300 ease-in-out mb-6 border"
          style={{
            background: currentGradient.css,
            height: isFullScreen ? '100vh' : undefined,
          }}
        />

        <div
          ref={controlsRef}
          className={`p-1 md:p-0 ${isFullScreen ? 'fixed top-4 left-1/2 -translate-x-1/2 z-[150] bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-xl' : 'space-y-6'}`}
        >
          <Card className={`${isFullScreen ? 'w-auto' : 'w-full'}`}>
            <CardHeader className={`${isFullScreen ? 'pb-2 pt-3 px-4' : ''}`}>
              <CardTitle className={`${isFullScreen ? 'text-lg' : ''}`}>Controls</CardTitle>
            </CardHeader>
            <CardContent className={`flex ${isFullScreen ? 'flex-row items-center gap-3 px-4 pb-3' : 'flex-col gap-4'}`}>
              <div className={` ${isFullScreen ? '' : 'w-full'}`}>
                <Select
                  value={currentGradient.name}
                  onValueChange={(value) => {
                    const selected = gradientPatterns.find(g => g.name === value);
                    if (selected) setCurrentGradient(selected);
                  }}
                >
                  <SelectTrigger className={`w-full ${isFullScreen ? 'min-w-[200px]' : ''} focus:ring-2 focus:ring-primary`}>
                    <SelectValue placeholder="Select a gradient" />
                  </SelectTrigger>
                  <SelectContent className={`${isFullScreen ? 'z-[200]' : 'z-[50]'}`}>
                    {gradientPatterns.map(gradient => (
                      <SelectItem key={gradient.name} value={gradient.name}>
                        {gradient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={toggleFullScreen} variant="outline" className={`w-full ${isFullScreen ? 'w-auto' : ''}`}>
                {isFullScreen ? <Minimize className="mr-2 h-4 w-4" /> : <Maximize className="mr-2 h-4 w-4" />}
                {isFullScreen ? 'Exit' : 'Toggle Full Screen'}
              </Button>
            </CardContent>
          </Card>

          {!isFullScreen && <InfoSection {...colorBandingTestInfo} />}
        </div>

      </div>
    </MainLayout>
  );
};

export default ColorBandingTest;
