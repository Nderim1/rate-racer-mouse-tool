import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

const patterns = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: '25% Gray', hex: '#404040' },
  { name: '50% Gray', hex: '#808080' },
  { name: '75% Gray', hex: '#BFBFBF' },
];

const ScreenUniformityTest: React.FC = () => {
  const [currentPattern, setCurrentPattern] = useState<string>('#FFFFFF'); // Default to white
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
      } catch (err) {
        console.error('Error attempting to enable full-screen mode:', err);
        alert(`Error attempting to enable full-screen mode: ${(err as Error).message}.`);
      }
    } else {
      if (document.exitFullscreen) {
        try {
          await document.exitFullscreen();
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
        // 'fullscreenchange' event will handle state update
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const uniformityTestInfo: InfoSectionProps = {
    leftCardData: {
      title: "About Screen Uniformity Test",
      description: "Check for inconsistencies in color and brightness across your screen.",
      mainParagraph: "This test displays full-screen solid colors and shades of gray to help you identify issues like backlight bleed (light leaking from the edges on dark screens), clouding or mura (uneven patches of brightness), and color tints (areas of the screen showing a slight color cast).",
      detailList: {
        heading: "How to Use This Test:",
        items: [
          "Perform this test in a dimly lit room for best results, especially when checking for backlight bleed on the black pattern.",
          "Click 'Toggle Full Screen' to view patterns across your entire display.",
          "Cycle through White, Black, and various Gray shades.",
          "On White/Gray: Look for any areas that appear noticeably brighter or darker, or have a different color tint.",
          "On Black: Look for light 'bleeding' in from the edges or corners of the screen. Also check for unevenly lit patches (clouding).",
          "Press 'ESC' or use the button to exit full-screen mode."
        ]
      }
    },
    rightCardData: {
      title: "Understanding Uniformity Issues",
      description: "Common problems and what they mean.",
      faqItems: [
        {
          question: "What is backlight bleed?",
          answer: "Backlight bleed is when light from the monitor's backlight escapes around the edges or corners of the screen. It's most noticeable on dark backgrounds in a dim room. Some level of bleed is common, especially in LCDs, but excessive bleed can be distracting."
        },
        {
          question: "What is clouding or mura effect?",
          answer: "Clouding (or mura) refers to uneven patches of brightness or darkness on the screen, resembling clouds. It's caused by inconsistencies in the display panel or backlight diffusion. Severe clouding can affect image quality."
        },
        {
          question: "What are color tints or color uniformity issues?",
          answer: "This is when different parts of the screen show a slight shift in color. For example, one side might appear slightly warmer (more yellow/red) or cooler (more blue) than the other. This can be due to panel variations or aging."
        },
        {
          question: "Are these issues fixable?",
          answer: "Generally, backlight bleed, clouding, and significant color uniformity issues are hardware-related and not easily fixable by the user. If severe, they might be covered under warranty depending on the manufacturer's policy."
        },
        {
          question: "Does every monitor have these issues?",
          answer: "Most LCD/LED monitors exhibit some degree of non-uniformity. Higher-end monitors often have better quality control and uniformity, but perfection is rare. The key is whether the issue is noticeable and distracting during normal use."
        }
      ]
    }
  };

  return (
    <MainLayout 
      title="Screen Uniformity Test - RateRacer"
      headerTitle="Screen Uniformity Test"
      headerDescription="Check for color and brightness inconsistencies across your monitor."
    >
      <div ref={fullScreenRef} style={{ backgroundColor: isFullScreen ? currentPattern : 'transparent' }} className={`transition-colors duration-150 ${isFullScreen ? 'fixed inset-0 z-[100]' : 'relative'}`}>
        {isFullScreen && (
          <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4'>
            <div className='absolute top-4 left-1/2 -translate-x-1/2 p-3 bg-black bg-opacity-70 text-white rounded-md shadow-lg text-center'>
              <p className='text-lg font-semibold'>Selected Pattern: <span style={{ color: currentPattern === '#000000' ? '#FFFFFF' : currentPattern, textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>{patterns.find(p => p.hex === currentPattern)?.name}</span></p>
              <p className='text-sm mt-1'>Press 'ESC' or click button below to exit</p>
            </div>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-3 bg-black bg-opacity-70 rounded-md shadow-lg">
              {patterns.map((p) => (
                <Button key={p.name + '-fullscreen'} onClick={() => setCurrentPattern(p.hex)} variant={'outline'} size={'icon'} className="w-10 h-10 border-2 border-white hover:opacity-80 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" title={p.name} style={{ backgroundColor: p.hex }}>
                  {currentPattern === p.hex && <span className="text-white mix-blend-difference text-lg">✓</span>}
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
                <CardDescription>Select a pattern and use full-screen mode to check for uniformity issues.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div style={{ backgroundColor: currentPattern }} className="w-full h-64 border rounded-md flex items-center justify-center text-xl font-semibold transition-colors duration-150 relative">
                  <span style={{ color: currentPattern === '#FFFFFF' || currentPattern === '#BFBFBF' || currentPattern === '#808080' ? '#000000' : '#FFFFFF', textShadow: '1px 1px 1px rgba(0,0,0,0.2)' }}>{patterns.find(p => p.hex === currentPattern)?.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {patterns.map((pattern) => (
                    <Button key={pattern.name} onClick={() => setCurrentPattern(pattern.hex)} variant={currentPattern === pattern.hex ? 'default' : 'outline'} className="w-full justify-start text-sm h-auto py-2 px-3 leading-tight">
                      <span style={{ backgroundColor: pattern.hex }} className="w-4 h-4 rounded-full inline-block mr-2 border border-gray-400"></span>
                      {pattern.name}
                    </Button>
                  ))}
                </div>
                <Button onClick={toggleFullScreen} className="w-full mt-4">
                  <Maximize className="mr-2 h-4 w-4" /> Toggle Full Screen
                </Button>
              </CardContent>
            </Card>
            <InfoSection {...uniformityTestInfo} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ScreenUniformityTest;
