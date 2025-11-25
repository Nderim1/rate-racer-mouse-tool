import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SEO } from '@/components/SEO';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

const blackLevelShades = [
  { name: '1%', hex: '#030303', value: 1 }, // Approx 1% on typical sRGB gamma
  { name: '2%', hex: '#050505', value: 2 },
  { name: '3%', hex: '#080808', value: 3 },
  { name: '4%', hex: '#0A0A0A', value: 4 },
  { name: '5%', hex: '#0D0D0D', value: 5 },
  { name: '6%', hex: '#0F0F0F', value: 6 },
  { name: '7%', hex: '#121212', value: 7 },
  { name: '8%', hex: '#141414', value: 8 },
  { name: '9%', hex: '#171717', value: 9 },
  { name: '10%', hex: '#1A1A1A', value: 10 },
];

const whiteSaturationShades = [
  { name: '99%', hex: '#FCFCFC', value: 99 }, // Approx 99% on typical sRGB gamma
  { name: '98%', hex: '#FAFAFA', value: 98 },
  { name: '97%', hex: '#F7F7F7', value: 97 },
  { name: '96%', hex: '#F5F5F5', value: 96 },
  { name: '95%', hex: '#F2F2F2', value: 95 },
  { name: '94%', hex: '#F0F0F0', value: 94 },
  { name: '93%', hex: '#EDEDED', value: 93 },
  { name: '92%', hex: '#EBEBEB', value: 92 },
  { name: '91%', hex: '#E8E8E8', value: 91 },
  { name: '90%', hex: '#E5E5E5', value: 90 },
].reverse(); // Display from darker to lighter to match progression from white

const ContrastTest: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const handleFullScreenChange = useCallback(() => {
    setIsFullScreen(document.fullscreenElement != null);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, [handleFullScreenChange]);

  const toggleFullScreen = async () => {
    if (!fullScreenRef.current) return;
    const elementToFullscreen = fullScreenRef.current.querySelector('#test-content-area') || fullScreenRef.current;
    if (!document.fullscreenElement) {
      try { await elementToFullscreen.requestFullscreen(); }
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

  const contrastTestInfo: InfoSectionProps = {
    leftCardData: {
      title: "About Visual Contrast Ratio Test",
      description: "Assess your monitor's ability to distinguish subtle shades of dark and bright colors.",
      mainParagraph: "Contrast ratio is the difference between the brightest white and the darkest black a monitor can produce. A higher contrast ratio means more image depth and detail. This test helps you visually check how well your monitor differentiates near-black and near-white shades. The more squares you can distinguish from their background, the better your monitor's (or current calibration's) performance in that range.",
      detailList: {
        heading: "How to Use This Test:",
        items: [
          "Use the 'Toggle Full Screen' button for optimal viewing, preferably in a dimly lit room.",
          "For the Black Level Test: Try to distinguish as many dark gray squares from the pure black background as possible. Each square is slightly lighter.",
          "For the White Saturation Test: Try to distinguish as many light gray squares from the pure white background. Each square is slightly darker.",
          "If you can't see the first few squares in the black level test, your monitor's black levels might be crushed, or brightness set too low.",
          "If you can't see the first few squares in the white saturation test (those closest to white), your monitor's white levels might be clipped, or contrast set too high.",
          "Adjust your monitor's Brightness and Contrast settings to see if you can reveal more squares. Aim for a balance where you see most shades without washing out blacks or clipping whites.",
          "Press 'ESC' or use the button to exit full-screen mode."
        ]
      }
    },
    rightCardData: {
      title: "Understanding Contrast",
      description: "Why it's important for image quality.",
      faqItems: [
        {
          question: "What is static contrast ratio?",
          answer: "This refers to the ratio of luminance of the brightest white to the darkest black that a monitor can produce *at the same time*. This is the most meaningful type of contrast ratio for everyday use."
        },
        {
          question: "What about dynamic contrast ratio?",
          answer: "Dynamic contrast ratio (DCR) figures are often much higher because they measure the difference between full-screen white (backlight max) and full-screen black (backlight min/off) over time. While it sounds impressive, it's less relevant for typical mixed-content scenes."
        },
        {
          question: "Does my monitor type affect contrast?",
          answer: "Yes. VA (Vertical Alignment) panels generally offer the best static contrast ratios. IPS (In-Plane Switching) panels have better viewing angles and color accuracy but typically lower contrast (often around 1000:1). TN (Twisted Nematic) panels usually have the lowest contrast of the three common LCD types. OLED displays have 'infinite' contrast because they can turn individual pixels completely off for true black."
        },
        {
          question: "How do brightness and contrast settings interact?",
          answer: "'Brightness' usually controls the backlight intensity (how bright the screen can get). 'Contrast' adjusts the white level. Setting contrast too high can clip white details, while setting it too low reduces the dynamic range. Finding the right balance is key."
        }
      ]
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'Monitor Contrast Ratio Test - Black & White Levels',
        'Test your monitor\'s contrast ratio by checking black and white level differentiation. Identify crushed blacks or clipped whites for optimal picture quality.',
        'https://testmyrig.com/monitor-tools/contrast-test'
      ),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Monitor Tools', url: '/monitor-tools' },
        { name: 'Contrast Test', url: '/monitor-tools/contrast-test' }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Monitor Contrast Ratio Test - Black & White Levels"
        description="Test your monitor's contrast ratio by checking black and white level differentiation. Identify crushed blacks or clipped whites for optimal picture quality."
        canonical="https://testmyrig.com/monitor-tools/contrast-test"
        keywords="contrast test, monitor contrast, black level test, white level test, display calibration"
        schema={schema}
      />
      <MainLayout
        title="Contrast Ratio Test - TestMyRig"
        headerTitle="Visual Contrast Ratio Test"
        headerDescription="Check your monitor's black and white level differentiation."
      >
        <div ref={fullScreenRef} className={`${isFullScreen ? 'fixed inset-0 z-[100] bg-gray-200 dark:bg-gray-800 overflow-auto' : 'relative'}`}>
          {isFullScreen && (
            <Button onClick={toggleFullScreen} variant="outline" size="sm" className="fixed top-4 right-4 z-[110] bg-black bg-opacity-50 text-white hover:bg-opacity-75">
              <Minimize className="mr-2 h-4 w-4" /> Exit Full Screen
            </Button>
          )}
          <div id="test-content-area" className={`p-1 ${isFullScreen ? 'p-8' : ''}`}>
            {!isFullScreen && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={toggleFullScreen} className="w-full">
                    <Maximize className="mr-2 h-4 w-4" /> Toggle Full Screen View
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Use full-screen mode for an optimal assessment environment, preferably in a dim room. Press 'ESC' to exit anytime.</p>
                </CardContent>
              </Card>
            )}

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Black Level Test</CardTitle>
                <CardDescription>Distinguish dark gray squares from the black background. The more you see, the better your monitor's shadow detail.</CardDescription>
              </CardHeader>
              <CardContent style={{ backgroundColor: '#000000' }} className="p-4 md:p-6 flex flex-wrap justify-center items-center gap-1 md:gap-2 rounded-md">
                {blackLevelShades.map(shade => (
                  <div key={`black-${shade.name}`} title={`Black Level: ${shade.name}`} style={{ backgroundColor: shade.hex, width: isFullScreen ? '60px' : '50px', height: isFullScreen ? '60px' : '50px' }} className="flex items-center justify-center">
                    <span className={`text-xs ${isFullScreen ? 'text-gray-400' : 'text-gray-500'}`}>{isFullScreen ? shade.name : ''}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>White Saturation Test</CardTitle>
                <CardDescription>Distinguish light gray squares from the white background. The more you see, the better your monitor's highlight detail.</CardDescription>
              </CardHeader>
              <CardContent style={{ backgroundColor: '#FFFFFF' }} className="p-4 md:p-6 flex flex-wrap justify-center items-center gap-1 md:gap-2 rounded-md border">
                {whiteSaturationShades.map(shade => (
                  <div key={`white-${shade.name}`} title={`White Level: ${shade.name}`} style={{ backgroundColor: shade.hex, width: isFullScreen ? '60px' : '50px', height: isFullScreen ? '60px' : '50px' }} className="flex items-center justify-center">
                    <span className={`text-xs ${isFullScreen ? 'text-gray-600' : 'text-gray-500'}`}>{isFullScreen ? shade.name : ''}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {!isFullScreen && <InfoSection {...contrastTestInfo} />}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ContrastTest;
