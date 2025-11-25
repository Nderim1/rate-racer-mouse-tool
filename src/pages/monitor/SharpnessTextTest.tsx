import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SEO } from '@/components/SEO';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

const SharpnessTextTest: React.FC = () => {
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

  const testPatternsInfo: InfoSectionProps = {
    leftCardData: {
      title: "About Sharpness & Text Clarity Test",
      description: "Assess and adjust your monitor's sharpness for optimal visual clarity.",
      mainParagraph: "This test provides patterns and text samples to help you fine-tune your monitor's sharpness settings. Incorrect sharpness can lead to text appearing blurry (too low) or having distracting 'halos' around edges (too high). The goal is to find a balance where text is crisp and details are clear without artificial enhancement.",
      detailList: {
        heading: "How to Use This Test:",
        items: [
          "Use the 'Toggle Full Screen' button to view the patterns without distractions.",
          "Observe the checkerboard patterns: Lines should be distinct without appearing overly thick or thin. Look for moiré patterns or ringing artifacts.",
          "Examine the text samples: Text should be easily readable at various sizes. Edges of characters should be clean and well-defined.",
          "If text looks blurry or soft, try increasing your monitor's sharpness setting slightly.",
          "If text or lines have bright or dark outlines (halos/ringing), try decreasing the sharpness.",
          "Adjust your monitor’s built-in sharpness setting. This is usually found in the OSD (On-Screen Display) menu under 'Picture' or 'Image Settings'.",
          "Press 'ESC' or use the button to exit full-screen mode."
        ]
      }
    },
    rightCardData: {
      title: "Understanding Sharpness",
      description: "Why it matters and common issues.",
      faqItems: [
        {
          question: "What does a monitor's sharpness setting actually do?",
          answer: "Sharpness settings typically apply an image processing filter called 'unsharp masking' or edge enhancement. It increases the contrast along edges to make them appear more defined. Too little, and the image is soft; too much, and it creates artificial-looking outlines and can obscure fine detail."
        },
        {
          question: "What's the 'native' or 'neutral' sharpness setting?",
          answer: "Many monitors have a neutral sharpness setting (often 0, 5, or 50 depending on the scale) where no additional sharpening or blurring is applied. This is often the ideal starting point. Some monitors might label this as 'Standard' or 'PC Mode'."
        },
        {
          question: "Can sharpness affect gaming or multimedia?",
          answer: "Yes. Over-sharpening can make game textures look artificial or grainy and can introduce artifacts in videos. A well-calibrated sharpness setting enhances detail naturally without these drawbacks."
        },
        {
          question: "Should I use software sharpening (e.g., in GPU drivers) as well?",
          answer: "It's generally best to get the monitor's hardware sharpness correct first. Software sharpening can be used for specific applications or games if desired, but a good hardware setting provides a solid baseline for all content."
        }
      ]
    }
  };

  const textSamples = [
    { size: '8px', weight: 'normal', content: 'The quick brown fox jumps over the lazy dog. 0123456789' },
    { size: '10px', weight: 'normal', content: 'The quick brown fox jumps over the lazy dog. 0123456789' },
    { size: '12px', weight: 'normal', content: 'The quick brown fox jumps over the lazy dog. 0123456789' },
    { size: '16px', weight: 'normal', content: 'The quick brown fox jumps over the lazy dog. 0123456789' },
    { size: '12px', weight: 'bold', content: 'The quick brown fox jumps over the lazy dog. 0123456789' },
    { size: '16px', weight: 'bold', content: 'The quick brown fox jumps over the lazy dog. 0123456789' },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'Monitor Sharpness & Text Clarity Test',
        'Test and adjust your monitor\'s sharpness for optimal text clarity and image detail. Use checkerboard patterns and text samples to fine-tune settings.',
        'https://testmyrig.com/monitor-tools/sharpness-text-test'
      ),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Monitor Tools', url: '/monitor-tools' },
        { name: 'Sharpness Test', url: '/monitor-tools/sharpness-text-test' }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Monitor Sharpness & Text Clarity Test"
        description="Test and adjust your monitor's sharpness for optimal text clarity and image detail. Use checkerboard patterns and text samples to fine-tune settings."
        canonical="https://testmyrig.com/monitor-tools/sharpness-text-test"
        keywords="sharpness test, text clarity test, monitor sharpness, display sharpness, screen clarity"
        schema={schema}
      />
      <MainLayout
        title="Sharpness & Text Clarity Test - TestMyRig"
        headerTitle="Sharpness & Text Clarity Test"
        headerDescription="Evaluate your monitor's sharpness for clear text and images."
      >
        <div ref={fullScreenRef} className={`${isFullScreen ? 'fixed inset-0 z-[100] bg-white overflow-auto' : 'relative'}`}>
          {isFullScreen && (
            <Button onClick={toggleFullScreen} variant="outline" size="sm" className="fixed top-4 right-4 z-[110] bg-black bg-opacity-50 text-white hover:bg-opacity-75">
              <Minimize className="mr-2 h-4 w-4" /> Exit Full Screen
            </Button>
          )}
          <div id="test-content-area" className={`p-1 ${isFullScreen ? 'p-8 bg-white' : ''}`}>
            {!isFullScreen && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={toggleFullScreen} className="w-full">
                    <Maximize className="mr-2 h-4 w-4" /> Toggle Full Screen View
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Use full-screen mode for an optimal assessment environment. Press 'ESC' to exit anytime.</p>
                </CardContent>
              </Card>
            )}

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Checkerboard Patterns</CardTitle>
                <CardDescription>Observe for crisp lines without halos or blurring.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md bg-gray-100">
                  <p className="text-sm font-medium mb-2 text-center">1px Black/White Checkerboard</p>
                  <div style={{ width: '100%', height: '150px', backgroundSize: '2px 2px', backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundPosition: '0 0, 1px 1px, 0 0, 0 0' }}></div>
                </div>
                <div className="p-4 border rounded-md bg-gray-100">
                  <p className="text-sm font-medium mb-2 text-center">2px Black/White Checkerboard</p>
                  <div style={{ width: '100%', height: '150px', backgroundSize: '4px 4px', backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(to right, #fff 2px, transparent 2px), linear-gradient(to bottom, #fff 2px, transparent 2px)', backgroundPosition: '0 0, 2px 2px, 0 0, 0 0' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Text Clarity Samples</CardTitle>
                <CardDescription>Ensure text is sharp, clear, and readable without artifacts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {textSamples.map((sample, index) => (
                  <div key={index} style={{ fontSize: sample.size, fontWeight: sample.weight, fontFamily: 'Arial, Helvetica, sans-serif', color: '#000000', backgroundColor: '#FFFFFF', padding: '8px', border: '1px solid #EEE' }} className="leading-snug">
                    ({sample.size} {sample.weight}) {sample.content}
                  </div>
                ))}
              </CardContent>
            </Card>

            {!isFullScreen && <InfoSection {...testPatternsInfo} />}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SharpnessTextTest;
