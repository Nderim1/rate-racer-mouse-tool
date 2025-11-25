import { useState, useRef, useEffect, useCallback } from 'react';
import { SEO } from '@/components/SEO';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Target, MousePointer, RefreshCcw, HelpCircle, Activity, Maximize, Minimize } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import MainLayout from '@/Layout/MainLayout';
import InfoSection from '@/components/InfoSection';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Dot {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface ClickData {
  targetX: number;
  targetY: number;
  actualX: number;
  actualY: number;
  deviation: number;
  timestamp: number;
}

const DOT_SIZE = 20;
const TARGET_AREA_WIDTH = 500;
const TARGET_AREA_HEIGHT = 300;
const NUM_DOTS = 10;

const SensorPrecisionTest = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [averageDeviation, setAverageDeviation] = useState<number | null>(null);
  const [consistency, setConsistency] = useState<number | null>(null);
  const [testDuration, setTestDuration] = useState<number | null>(null);

  const targetAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generateDots = useCallback(() => {
    const newDots: Dot[] = [];
    for (let i = 0; i < NUM_DOTS; i++) {
      newDots.push({
        id: i,
        x: Math.random() * (TARGET_AREA_WIDTH - DOT_SIZE),
        y: Math.random() * (TARGET_AREA_HEIGHT - DOT_SIZE),
        timestamp: Date.now() + i * 100,
      });
    }
    setDots(newDots);
  }, []);

  useEffect(() => {
    generateDots();
  }, [generateDots]);

  const handleStartTest = () => {
    setIsTesting(true);
    setClicks([]);
    setCurrentDotIndex(0);
    setStartTime(Date.now());
    setAverageDeviation(null);
    setConsistency(null);
    setTestDuration(null);
    if (dots.length === 0) generateDots();
  };

  const handleResetTest = () => {
    setIsTesting(false);
    setClicks([]);
    setCurrentDotIndex(0);
    setStartTime(null);
    setAverageDeviation(null);
    setConsistency(null);
    setTestDuration(null);
    generateDots();
  };

  const handleTargetAreaClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isTesting || currentDotIndex >= dots.length || !targetAreaRef.current) return;

    const rect = targetAreaRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const currentDot = dots[currentDotIndex];
    const dotCenterX = currentDot.x + DOT_SIZE / 2;
    const dotCenterY = currentDot.y + DOT_SIZE / 2;

    const deviation = Math.sqrt(Math.pow(clickX - dotCenterX, 2) + Math.pow(clickY - dotCenterY, 2));

    setClicks(prevClicks => [
      ...prevClicks,
      {
        targetX: dotCenterX,
        targetY: dotCenterY,
        actualX: clickX,
        actualY: clickY,
        deviation,
        timestamp: Date.now(),
      },
    ]);

    if (currentDotIndex < NUM_DOTS - 1) {
      setCurrentDotIndex(currentDotIndex + 1);
    } else {
      setIsTesting(false);
      const endTime = Date.now();
      if (startTime) {
        setTestDuration((endTime - startTime) / 1000);
      }
      toast({
        title: "Test Complete!",
        description: `You clicked all ${NUM_DOTS} targets. Check your results below.`,
      });
    }
  };

  useEffect(() => {
    if (clicks.length === NUM_DOTS) {
      const totalDeviation = clicks.reduce((sum, click) => sum + click.deviation, 0);
      const avgDev = totalDeviation / NUM_DOTS;
      setAverageDeviation(avgDev);

      const mean = avgDev;
      const squaredDifferencesSum = clicks.reduce((sum, click) => sum + Math.pow(click.deviation - mean, 2), 0);
      const stdDev = Math.sqrt(squaredDifferencesSum / NUM_DOTS);
      setConsistency(stdDev);
    }
  }, [clicks]);

  const sensorPrecisionInfoData = {
    leftCardData: {
      title: "Understanding Sensor Precision",
      description: "Learn how mouse sensor precision is tested.",
      mainParagraph: "Mouse sensor precision refers to the accuracy and consistency of your mouse's tracking. A precise sensor will translate your physical hand movements into cursor movements on screen with minimal error or jitter. This test helps evaluate how accurately you can hit small targets.",
      detailList: {
        heading: "Factors Affecting Precision:",
        items: [
          "Sensor Quality: Optical vs. Laser, sensor model (e.g., PMW3360, HERO).",
          "DPI/CPI Settings: Optimal DPI varies per user and task.",
          "Surface: Mousepad material and consistency.",
          "Polling Rate: Higher rates provide smoother tracking.",
          "Mouse Skates/Feet: Smooth glide reduces friction.",
          "User Skill: Hand-eye coordination and mouse control."
        ]
      }
    },
    rightCardData: {
      title: "Sensor Precision FAQs",
      description: "Common questions about sensor precision.",
      faqItems: [
        { question: "What does 'deviation' mean in this test?", answer: "Deviation is the distance (in pixels) between the center of the target dot and where you actually clicked. Lower average deviation indicates higher precision." },
        { question: "What is 'consistency' (Std. Dev.)?", answer: "Consistency, measured by Standard Deviation of your deviations, indicates how much your click accuracy varies. A lower standard deviation means your clicks are more consistently accurate around your average." },
        { question: "How can I improve my sensor precision?", answer: "Practice aiming exercises, ensure your mousepad is clean and suitable for your mouse, experiment with different DPI settings, and maintain a comfortable grip. Good posture and a relaxed arm can also help." },
        { question: "Is a lower score always better?", answer: "Yes, for both average deviation and consistency, lower scores are better, indicating more accurate and consistent mouse control." }
      ]
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'Mouse Sensor Precision & Accuracy Test',
        'Test your mouse sensor\'s precision and consistency. Click targets to measure deviation and accuracy. Improve your aim and mouse control.',
        'https://testmyrig.com/mouse-tools/sensor-precision-test'
      ),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Mouse Tools', url: '/mouse-tools' },
        { name: 'Sensor Precision Test', url: '/mouse-tools/sensor-precision-test' }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Mouse Sensor Precision & Accuracy Test"
        description="Test your mouse sensor's precision and consistency. Click targets to measure deviation and accuracy. Improve your aim and mouse control."
        canonical="https://testmyrig.com/mouse-tools/sensor-precision-test"
        keywords="mouse sensor precision, mouse accuracy test, sensor test, mouse precision, aim test"
        schema={schema}
      />
      <MainLayout headerTitle="Mouse Sensor Precision Test" headerDescription="Test the accuracy and consistency of your mouse sensor by clicking targets.">
        <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6" />
                Sensor Precision Test
              </CardTitle>
              <CardDescription>
                Click the highlighted dots as accurately and quickly as you can. Test involves {NUM_DOTS} targets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={targetAreaRef}
                className="w-full bg-muted rounded-lg relative cursor-crosshair mb-6 select-none"
                style={{ height: `${TARGET_AREA_HEIGHT}px`, width: `${TARGET_AREA_WIDTH}px` }}
                onClick={handleTargetAreaClick}
              >
                {isTesting && dots.length > 0 && currentDotIndex < dots.length && (
                  <div
                    key={dots[currentDotIndex].id}
                    className="absolute bg-primary rounded-full transition-all duration-50 ease-in-out"
                    style={{
                      left: dots[currentDotIndex].x,
                      top: dots[currentDotIndex].y,
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
                {!isTesting && clicks.length < NUM_DOTS && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xl text-muted-foreground">Click Start Test to begin</p>
                  </div>
                )}
                {!isTesting && clicks.length === NUM_DOTS && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xl text-green-600">Test Complete! Check results.</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mb-6">
                {!isTesting ? (
                  <Button onClick={handleStartTest} className="text-lg py-6 px-8" size="lg">
                    <MousePointer className="mr-2 h-5 w-5" /> Start Test
                  </Button>
                ) : (
                  <Button onClick={handleResetTest} variant="outline" className="text-lg py-6 px-8" size="lg" disabled={true}>
                    <Activity className="mr-2 h-5 w-5" /> Test in Progress...
                  </Button>
                )}
                <Button onClick={handleResetTest} variant="secondary" className="text-lg py-6 px-8" size="lg" disabled={isTesting}>
                  <RefreshCcw className="mr-2 h-5 w-5" /> Reset
                </Button>
              </div>
            </CardContent>

            {clicks.length > 0 && (
              <CardFooter className="flex-col items-start space-y-4 pt-6 border-t">
                <h3 className="text-xl font-semibold mb-2">Test Results ({clicks.length}/{NUM_DOTS} Clicks):</h3>
                <TooltipProvider>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
                    <div className="p-4 bg-secondary/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Avg. Deviation</p>
                      <p className="text-2xl font-bold text-primary">{averageDeviation !== null ? `${averageDeviation.toFixed(2)}px` : 'N/A'}</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="inline h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Lower is better. Average distance from target center.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Consistency (Std.Dev)</p>
                      <p className="text-2xl font-bold text-primary">{consistency !== null ? `${consistency.toFixed(2)}px` : 'N/A'}</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="inline h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Lower is better. Variation in your click accuracy.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Time Taken</p>
                      <p className="text-2xl font-bold">{testDuration !== null ? `${testDuration.toFixed(2)}s` : 'N/A'}</p>
                    </div>
                  </div>
                </TooltipProvider>
                {clicks.length > 0 && (
                  <div className="w-full h-72">
                    <h4 className="text-lg font-semibold mb-2">Deviation Over Time:</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={clicks.map((c, i) => ({ name: `Click ${i + 1}`, deviation: c.deviation }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Deviation (px)', angle: -90, position: 'insideLeft' }} />
                        <RechartsTooltip formatter={(value: number) => [`${value.toFixed(2)}px`, "Deviation"]} />
                        <Legend />
                        <Line type="monotone" dataKey="deviation" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
        <section className="container mx-auto p-4 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">About Sensor Precision</h2>
          <InfoSection {...sensorPrecisionInfoData} />
        </section>
      </MainLayout>
    </>
  );
};

export default SensorPrecisionTest;
