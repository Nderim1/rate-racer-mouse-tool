import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

const KeyRolloverTest: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [maxPressedCount, setMaxPressedCount] = useState<number>(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevent default browser action for some keys (e.g., Space scrolling, Tab changing focus)
    // Allow text input fields or textareas to function normally if they are focused.
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.code)) {
        event.preventDefault();
      }
    }
    
    setPressedKeys((prevKeys) => {
      const newKeys = new Set(prevKeys);
      newKeys.add(event.code);
      if (newKeys.size > maxPressedCount) {
        setMaxPressedCount(newKeys.size);
      }
      return newKeys;
    });
  }, [maxPressedCount]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setPressedKeys((prevKeys) => {
      const newKeys = new Set(prevKeys);
      newKeys.delete(event.code);
      return newKeys;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const resetTest = () => {
    setPressedKeys(new Set());
    setMaxPressedCount(0);
  };

  const getRolloverStatus = (count: number): string => {
    if (count === 0) return "No keys pressed";
    if (count >= 10) return "NKRO Detected (10+ Keys)"; // Common threshold for NKRO marketing
    return `${count}-Key Rollover`;
  };
  
  const keyRolloverInfo: InfoSectionProps = {
    leftCardData: {
      title: "Understanding Key Rollover (NKRO) & Ghosting",
      description: "This test helps you determine how many keys your keyboard can register simultaneously (N-Key Rollover) and check for potential ghosting issues.",
      mainParagraph: "N-Key Rollover (NKRO) refers to a keyboard's ability to correctly register multiple key presses at the same time. A higher N-value means more keys can be pressed simultaneously without issue. Ghosting occurs when pressing certain key combinations results in an unintended key press being registered, or some key presses not registering at all.",
      detailList: {
        heading: "How to Test:",
        items: [
          "Press and hold multiple keys on your keyboard simultaneously.",
          "The 'Currently Pressed Keys' list will show all keys your keyboard reports as active.",
          "The 'Maximum Simultaneous Presses' will show the highest number of keys registered at once during this session.",
          "If you press keys A and S, and see G also appear (without pressing it), that's ghosting.",
          "For a true NKRO test, try pressing as many keys as you can across different rows and columns."
        ]
      }
    },
    rightCardData: {
      title: "Key Rollover & Ghosting FAQs",
      description: "Common questions about keyboard rollover capabilities and ghosting phenomena.",
      faqItems: [
        {
          question: "What is N-Key Rollover (NKRO)?",
          answer: "NKRO means each key press is scanned independently by the keyboard hardware. This allows the keyboard to correctly report any number of simultaneous key presses. Many gaming keyboards advertise NKRO."
        },
        {
          question: "What is 6-Key Rollover (6KRO)?",
          answer: "6KRO is common for USB keyboards due to USB-HID protocol limitations. It means the keyboard can accurately report up to 6 simultaneous standard key presses, plus some modifiers (Ctrl, Alt, Shift)."
        },
        {
          question: "What causes keyboard ghosting?",
          answer: "Ghosting is typically a limitation of the keyboard's matrix design. In simpler keyboards, when multiple keys in certain configurations are pressed, the circuitry can't distinguish the exact keys, leading to false signals (ghosts) or blocked keys."
        },
        {
          question: "How can I tell if my keyboard has ghosting?",
          answer: "Press common problematic combinations (e.g., three keys forming a square or a line on the matrix, often letter keys close together). If the 'Currently Pressed Keys' shows a key you didn't press, or doesn't show a key you did press while holding others, it might be ghosting or blocking."
        },
        {
          question: "Is more rollover always better?",
          answer: "For most users, 6KRO is sufficient. Gamers or fast typists might benefit from NKRO to ensure all inputs are registered during intense sequences. Lack of ghosting is generally more important than extremely high rollover for everyday use."
        }
      ]
    }
  };

  return (
    <MainLayout 
      title="Key Rollover & NKRO Test - TestMyRig"
      headerTitle="Key Rollover & Ghosting Test"
      headerDescription="Test your keyboard's N-Key Rollover (NKRO) capability and check for ghosting."
    >
      <Helmet>
        <title>Key Rollover & NKRO Test - Keyboard Simultaneous Press Test | TestMyRig</title>
        <meta name="description" content="Test your keyboard's N-Key Rollover (NKRO) and identify ghosting. See how many keys your keyboard can register at once. Essential for gamers and fast typists." />
        <link rel="canonical" href="https://testmyrig.com/keyboard-tools/key-rollover-test" />
        <meta property="og:title" content="Key Rollover & NKRO Test - Keyboard Simultaneous Press Test | TestMyRig" />
        <meta property="og:description" content="Test your keyboard's N-Key Rollover (NKRO) and identify ghosting. See how many keys your keyboard can register at once." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://testmyrig.com/keyboard-tools/key-rollover-test" />
        <meta property="og:image" content="https://testmyrig.com/images/og-keyboard-tools.png" /> {/* Using keyboard category OG image */}
        <meta property="og:site_name" content="TestMyRig" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Key Rollover & NKRO Test - Keyboard Simultaneous Press Test | TestMyRig" />
        <meta name="twitter:description" content="Test your keyboard's N-Key Rollover (NKRO) and identify ghosting. See how many keys your keyboard can register at once." />
        <meta name="twitter:image" content="https://testmyrig.com/images/og-keyboard-tools.png" /> {/* Using keyboard category OG image */}
      </Helmet>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Rollover Test</CardTitle>
            <CardDescription>
              Press and hold multiple keys simultaneously. See which ones register below and the maximum detected rollover.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Currently Pressed Keys:</h3>
              <div className="min-h-[6rem] p-3 border rounded-md bg-muted/30 flex flex-wrap gap-2 items-center text-sm">
                {pressedKeys.size > 0 ? (
                  Array.from(pressedKeys).map((key) => (
                    <span key={key} className="px-2 py-1 bg-primary text-primary-foreground rounded-md shadow">
                      {key}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">No keys currently pressed.</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Maximum Simultaneous Presses:</h3>
              <p className="text-2xl font-bold text-primary">{getRolloverStatus(maxPressedCount)}</p>
            </div>
            <Button onClick={resetTest} className="mt-2">Reset Test</Button>
          </CardContent>
        </Card>
        
        <InfoSection {...keyRolloverInfo} />
      </div>
    </MainLayout>
  );
};

export default KeyRolloverTest;
