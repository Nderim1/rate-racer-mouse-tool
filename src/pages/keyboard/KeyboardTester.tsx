import React, { useState, useEffect, useCallback } from 'react';
import { SEO } from '@/components/SEO';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import InfoSection, { InfoSectionProps } from '@/components/InfoSection';

// Define the structure of a key
interface KeyProps {
  display: string; // Character(s) shown on the keycap
  code: string;    // event.code for this key
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'; // Optional size for keys like Space, Enter, Shift
  flexGrow?: number; // Optional flex-grow factor
}

// Define rows of keys for a US QWERTY layout (simplified)
// This will be expanded later
const usQwertyLayout: KeyProps[][] = [
  [
    { display: '~ `', code: 'Backquote' }, { display: '! 1', code: 'Digit1' }, { display: '@ 2', code: 'Digit2' },
    { display: '# 3', code: 'Digit3' }, { display: '$ 4', code: 'Digit4' }, { display: '% 5', code: 'Digit5' },
    { display: '^ 6', code: 'Digit6' }, { display: '& 7', code: 'Digit7' }, { display: '* 8', code: 'Digit8' },
    { display: '( 9', code: 'Digit9' }, { display: ') 0', code: 'Digit0' }, { display: '_ -', code: 'Minus' },
    { display: '+ =', code: 'Equal' }, { display: 'Backspace', code: 'Backspace', size: 'large', flexGrow: 2 },
  ],
  [
    { display: 'Tab', code: 'Tab', size: 'medium', flexGrow: 1.5 }, { display: 'Q', code: 'KeyQ' }, { display: 'W', code: 'KeyW' },
    { display: 'E', code: 'KeyE' }, { display: 'R', code: 'KeyR' }, { display: 'T', code: 'KeyT' }, { display: 'Y', code: 'KeyY' },
    { display: 'U', code: 'KeyU' }, { display: 'I', code: 'KeyI' }, { display: 'O', code: 'KeyO' }, { display: 'P', code: 'KeyP' },
    { display: '{ [', code: 'BracketLeft' }, { display: '} ]', code: 'BracketRight' }, { display: '| \\', code: 'Backslash', flexGrow: 1.5 },
  ],
  [
    { display: 'Caps Lock', code: 'CapsLock', size: 'large', flexGrow: 1.8 }, { display: 'A', code: 'KeyA' }, { display: 'S', code: 'KeyS' },
    { display: 'D', code: 'KeyD' }, { display: 'F', code: 'KeyF' }, { display: 'G', code: 'KeyG' }, { display: 'H', code: 'KeyH' },
    { display: 'J', code: 'KeyJ' }, { display: 'K', code: 'KeyK' }, { display: 'L', code: 'KeyL' }, { display: ': ;', code: 'Semicolon' },
    { display: '" \'', code: 'Quote' }, { display: 'Enter', code: 'Enter', size: 'large', flexGrow: 2.2 },
  ],
  [
    { display: 'Shift', code: 'ShiftLeft', size: 'xlarge', flexGrow: 2.5 }, { display: 'Z', code: 'KeyZ' }, { display: 'X', code: 'KeyX' },
    { display: 'C', code: 'KeyC' }, { display: 'V', code: 'KeyV' }, { display: 'B', code: 'KeyB' }, { display: 'N', code: 'KeyN' },
    { display: 'M', code: 'KeyM' }, { display: '< ,', code: 'Comma' }, { display: '> .', code: 'Period' }, { display: '? /', code: 'Slash' },
    { display: 'Shift', code: 'ShiftRight', size: 'xlarge', flexGrow: 2.5 },
  ],
  [
    { display: 'Ctrl', code: 'ControlLeft', size: 'medium', flexGrow: 1.5 }, { display: 'Win', code: 'MetaLeft', size: 'small', flexGrow: 1.25 },
    { display: 'Alt', code: 'AltLeft', size: 'medium', flexGrow: 1.25 }, { display: 'Space', code: 'Space', size: 'xxlarge', flexGrow: 8 },
    { display: 'Alt', code: 'AltRight', size: 'medium', flexGrow: 1.25 }, { display: 'Win', code: 'MetaRight', size: 'small', flexGrow: 1.25 },
    { display: 'Menu', code: 'ContextMenu', size: 'small', flexGrow: 1.25 }, { display: 'Ctrl', code: 'ControlRight', size: 'medium', flexGrow: 1.5 },
  ],
];

interface KeyInfo {
  key: string;
  code: string;
  keyCode: number;
}

const keyboardTesterInfo: InfoSectionProps = {
  leftCardData: {
    title: "Understanding Your Keyboard Test",
    description: "This tool helps you visually check if each key on your keyboard is functioning correctly. It also provides technical details about key events.",
    mainParagraph: "Press any key on your physical keyboard. The corresponding key on the visual layout will light up. The 'Typed Output' area shows the characters your keys produce, while the 'Key Information' section displays raw event data (like 'event.key', 'event.code', and 'event.keyCode') useful for developers and advanced troubleshooting.",
    detailList: {
      heading: "Why Use a Keyboard Tester?",
      items: [
        "Diagnose non-working (dead) keys.",
        "Identify sticky or intermittently failing keys.",
        "Verify that key presses register correctly after cleaning or repairs.",
        "Understand how your operating system interprets key presses (key vs. code)."
      ]
    }
  },
  rightCardData: {
    title: "Keyboard Tester FAQs",
    description: "Frequently asked questions about using the keyboard tester and interpreting its results.",
    faqItems: [
      {
        question: "What's the difference between 'event.key', 'event.code', and 'event.keyCode'?",
        answer: "'event.key' provides the value of the key pressed (e.g., 'a', 'A', 'Enter'). 'event.code' represents the physical key on the keyboard (e.g., 'KeyA', 'Enter', 'Digit1'), independent of layout or modifier keys. 'event.keyCode' is a deprecated numerical code for the key, less reliable across browsers/OS."
      },
      {
        question: "A key lights up, but no character appears in 'Typed Output'. Why?",
        answer: "This usually means the key is a modifier (like Shift, Ctrl, Alt) or a function key (F1-F12) that doesn't produce a printable character by itself. Its 'event.key' value might be something like 'Shift' or 'F5'."
      },
      {
        question: "A key doesn't light up or show any information. What's wrong?",
        answer: "This could indicate a hardware issue with the key (it might be dead), a problem with your keyboard's connection, or a driver issue. Try cleaning the key, checking connections, or testing on another device."
      },
      {
        question: "Why does the visual keyboard look different from my physical keyboard?",
        answer: "The visual keyboard currently defaults to a standard US QWERTY layout. Physical keyboards vary by region (e.g., UK, AZERTY, QWERTZ) and form factor. This tool primarily tests if the key codes are sent, which are generally standard."
      },
      {
        question: "What does the 'Reset Visuals' button do?",
        answer: "It clears any 'stuck' highlights on the visual keyboard (which can sometimes happen if a key-up event is missed by the browser) and clears the 'Key Information' and 'Typed Output' areas."
      }
    ]
  }
};

const KeyboardTester: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastPressedKeyInfo, setLastPressedKeyInfo] = useState<KeyInfo | null>(null);
  const [typedText, setTypedText] = useState<string>('');

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    setPressedKeys((prev) => new Set(prev).add(event.code));
    setLastPressedKeyInfo({ key: event.key, code: event.code, keyCode: event.keyCode });

    if (event.key === 'Backspace') {
      setTypedText((prev) => prev.slice(0, -1));
    } else if (event.key === 'Enter') {
      setTypedText((prev) => prev + '\n');
    } else if (event.key === 'Tab') {
      setTypedText((prev) => prev + '    ');
    } else if (event.key.length === 1) {
      setTypedText((prev) => prev + event.key);
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(event.code);
      return next;
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

  const resetVisuals = () => {
    setPressedKeys(new Set());
    setLastPressedKeyInfo(null);
    setTypedText('');
  };

  const getKeySizeClasses = (key: KeyProps): string => {
    const baseClasses = 'min-h-[3rem] md:min-h-[3.5rem]';
    const flexBasis = 'flex-basis-[3rem] md:flex-basis-[3.5rem]';

    if (key.flexGrow) {
      return `${baseClasses} flex-grow-[${key.flexGrow}] ${flexBasis}`;
    }

    switch (key.size) {
      case 'small': return `${baseClasses} flex-grow-[1.25] ${flexBasis}`;
      case 'medium': return `${baseClasses} flex-grow-[1.5] ${flexBasis}`;
      case 'large': return `${baseClasses} flex-grow-[2] ${flexBasis}`;
      case 'xlarge': return `${baseClasses} flex-grow-[2.5] ${flexBasis}`;
      case 'xxlarge': return `${baseClasses} flex-grow-[8] ${flexBasis}`;
      default: return `${baseClasses} flex-grow ${flexBasis}`;
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'Online Keyboard Tester - Check Your Keyboard Keys',
        'Test your keyboard online with our interactive keyboard tester. Visualize key presses, check for dead or malfunctioning keys, and see key event data.',
        'https://testmyrig.com/keyboard-tools/keyboard-tester'
      ),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Keyboard Tools', url: '/keyboard-tools' },
        { name: 'Keyboard Tester', url: '/keyboard-tools/keyboard-tester' }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Online Keyboard Tester - Check Your Keyboard Keys"
        description="Test your keyboard online with our interactive keyboard tester. Visualize key presses, check for dead or malfunctioning keys, and see key event data."
        canonical="https://testmyrig.com/keyboard-tools/keyboard-tester"
        keywords="keyboard tester, test keyboard online, check keyboard keys, keyboard test, dead keys"
        schema={schema}
      />
      <MainLayout
        title="Keyboard Tester - TestMyRig"
        headerTitle="Keyboard Tester"
        headerDescription="Visualize your key presses in real-time. Check if all your keyboard keys are working correctly."
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Typed Output</CardTitle>
              <CardDescription>This area shows what you are typing. Useful for checking if character keys produce the expected output.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={typedText}
                readOnly
                placeholder="Type on your keyboard..."
                className="w-full h-24 md:h-32 text-sm font-mono bg-muted/20 dark:bg-muted/30 border-input"
                aria-label="Typed text output"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Keyboard Layout</CardTitle>
              <CardDescription>Press any key on your physical keyboard. The corresponding key below will light up.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6 bg-muted/30 rounded-md">
              <div className="space-y-1.5 md:space-y-2 select-none">
                {usQwertyLayout.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="flex space-x-1.5 md:space-x-2 w-full">
                    {row.map((key) => {
                      const isPressed = pressedKeys.has(key.code);
                      const sizeClasses = getKeySizeClasses(key);
                      return (
                        <div
                          key={key.code}
                          className={`
                          ${sizeClasses}
                          flex items-center justify-center p-1 md:p-2 rounded-md border border-input 
                          text-xs sm:text-sm text-center whitespace-pre-wrap break-words 
                          transition-all duration-75 ease-in-out 
                          ${isPressed ? 'bg-primary text-primary-foreground scale-95 shadow-inner' : 'bg-card hover:bg-muted/50'}
                        `}
                        >
                          {key.display}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Information</CardTitle>
              <CardDescription>Details of the last key pressed.</CardDescription>
            </CardHeader>
            <CardContent>
              {lastPressedKeyInfo ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div><span className="font-semibold">event.key:</span> {lastPressedKeyInfo.key}</div>
                  <div><span className="font-semibold">event.code:</span> {lastPressedKeyInfo.code}</div>
                  <div><span className="font-semibold">event.keyCode:</span> {lastPressedKeyInfo.keyCode} <span className='text-xs text-muted-foreground'>(deprecated)</span></div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Press a key to see its information here.</p>
              )}
              <Button onClick={resetVisuals} className="mt-4">Reset Visuals</Button>
            </CardContent>
          </Card>

          <InfoSection {...keyboardTesterInfo} />
        </div>
      </MainLayout>
    </>
  );
};

export default KeyboardTester;
