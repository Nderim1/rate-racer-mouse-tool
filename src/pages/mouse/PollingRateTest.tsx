import { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import TestArea from '@/components/TestArea';
import DataDisplay from '@/components/DataDisplay';
import PollingChart from '@/components/PollingChart';
import InfoSection from '@/components/InfoSection';
import { usePollingRate } from '@/hooks/usePollingRate';
import { useToast } from '@/hooks/use-toast';
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Target, Gauge, Timer, Maximize, ZoomIn, CheckSquare, ChevronsRightLeft, Scroll, Waves, Navigation } from 'lucide-react';
import MainLayout from '@/Layout/MainLayout';
import { RelatedTools } from '@/components/RelatedTools';
import { mouseToolItems } from '@/toolMenuItems';

const Index = () => {
  const { toast } = useToast();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const {
    current,
    average,
    max,
    chartData,
    isActive,
    handleMouseMove,
    resetTest,
    toggleTest,
  } = usePollingRate();

  // Check if device is touch-only
  useEffect(() => {
    const detectTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    detectTouch();

    if (isTouchDevice) {
      toast({
        title: "Touch Device Detected",
        description: "For accurate polling rate testing, please use a device with a physical mouse.",
        duration: 5000,
      });
    }
  }, [isTouchDevice, toast]);

  const pollingRateInfoData = {
    leftCardData: {
      title: "Understanding Mouse Polling Rate",
      description: "Understanding the basics of polling rate",
      mainParagraph: "The polling rate (measured in Hz) determines how often your computer checks for input from your mouse. For example, a mouse with a 1000Hz polling rate reports its position to your computer 1000 times per second (every 1ms).",
      detailList: {
        heading: "Common Polling Rates:",
        items: [
          "125 Hz - Basic office mice (8ms response time)",
          "500 Hz - Mid-range gaming mice (2ms response time)",
          "1000 Hz - High-end gaming mice (1ms response time)",
          "4000+ Hz - Premium gaming mice with ultra-high polling rates"
        ]
      }
    },
    rightCardData: {
      title: "Frequently Asked Questions",
      description: "Common questions about mouse polling rate",
      faqItems: [
        { question: "Is a higher polling rate always better?", answer: "Not necessarily. While a higher polling rate can reduce input lag and improve responsiveness, it also requires more CPU resources. Most gamers find that 1000Hz offers a good balance. For casual use, 125-500Hz is typically sufficient." },
        { question: "My polling rate seems low, what can I do?", answer: "Ensure your mouse drivers are up-to-date. Check your mouse software for polling rate settings. Some mice allow adjustments via onboard buttons. Close unnecessary background applications that might be consuming CPU resources. Try a different USB port." },
        { question: "Why does polling rate matter for gaming?", answer: "In competitive gaming, especially fast-paced shooters and esports titles, every millisecond counts. A higher polling rate means more frequent position updates, resulting in smoother tracking and reduced input lag. This can give players a slight edge in scenarios where precise, quick movements are crucial." },
        { question: "How accurate is this test?", answer: "This test provides a good approximation of your mouse's polling rate, but browser-based tests have limitations. Factors like CPU load, browser performance, and system resources can affect the results. For the most accurate testing, try running the test when your system isn't under heavy load." }
      ]
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'Mouse Polling Rate Test - Check Your Mouse Hz',
        'Test your mouse\'s polling rate (Hz) accurately. See real-time, average, and max polling rate. Understand what polling rate means for gaming and general use.',
        'https://testmyrig.com/mouse-tools/polling-rate-test'
      ),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Mouse Tools', url: '/mouse-tools' },
        { name: 'Polling Rate Test', url: '/mouse-tools/polling-rate-test' }
      ])
    ]
  };

  const relatedTools = mouseToolItems.filter(tool => tool.path !== '/mouse-tools/polling-rate-test');

  return (
    <>
      <SEO
        title="Mouse Polling Rate Test - Check Your Mouse Hz"
        description="Test your mouse's polling rate (Hz) accurately. See real-time, average, and max polling rate. Understand what polling rate means for gaming and general use."
        canonical="https://testmyrig.com/mouse-tools/polling-rate-test"
        keywords="mouse polling rate, Hz test, mouse test, gaming mouse, polling rate test"
        schema={schema}
      />
      <MainLayout headerTitle="Mouse Polling Rate Tester" headerDescription="Measure how many times per second your mouse reports its position to your computer">
        {/* Testing Area */}
        <div className="mb-6">
          {isTouchDevice ? (
            <div className="test-area p-6 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Touch Device Detected</h2>
                <p className="text-muted-foreground">
                  Mouse polling rate testing requires a physical mouse.
                  This tool may not function correctly on touch-only devices.
                </p>
              </div>
            </div>
          ) : (
            <TestArea
              isActive={isActive}
              onMouseMove={handleMouseMove}
            />
          )}
        </div>

        {/* Data Display */}
        <div className="mb-6">
          <DataDisplay
            current={current}
            average={average}
            max={max}
            isActive={isActive}
            onReset={resetTest}
            onToggle={toggleTest}
          />
        </div>

        {/* Chart */}
        <div className="mb-6">
          <PollingChart data={chartData} maxRate={max} />
        </div>

        <Separator className="my-8" />

        {/* Info Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Understanding Mouse Polling Rate</h2>
          <InfoSection {...pollingRateInfoData} />
        </section>

        <RelatedTools tools={relatedTools} />
      </MainLayout>
    </>
  );
};

export default Index;
