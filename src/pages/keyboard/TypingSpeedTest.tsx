import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Type, Timer, Percent, AlertCircle, RefreshCcw } from 'lucide-react';
import InfoSection from '@/components/InfoSection';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling a computer what to do through a series of instructions.",
  "React makes it painless to create interactive UIs. Design simple views for each state in your application.",
  "The journey of a thousand miles begins with a single step. Keep typing and improve your speed.",
  "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
  "A well-typed line of code is a joy to behold; a testament to clarity and precision."
];

const TypingSpeedTest: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  
  // charIndex tracks the current position in the *sample text* that the user should be typing
  const [charIndex, setCharIndex] = useState(0); 
  const [correctChars, setCorrectChars] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [rawWpm, setRawWpm] = useState(0);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectNewText = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    setCurrentText(SAMPLE_TEXTS[randomIndex]);
    setCharIndex(0); 
    setInputValue(''); // Also clear input value when new text is selected
    setCorrectChars(0);
    setMistakes(0);
  }, []);

  useEffect(() => {
    selectNewText();
  }, [selectNewText]);

  const resetTest = useCallback(() => {
    setStatus('idle');
    // setInputValue(''); // Handled by selectNewText
    setStartTime(null);
    setElapsedTime(0);
    // charIndex, correctChars, mistakes are reset by selectNewText & its call
    setWpm(0);
    setCpm(0);
    setRawWpm(0);
    setAccuracy(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    selectNewText(); // This will also clear inputValue and set charIndex to 0
    inputRef.current?.focus();
  }, [selectNewText]);

  const calculateMetrics = useCallback(() => {
    if (!startTime || elapsedTime <= 0) {
      setWpm(0);
      setCpm(0);
      setRawWpm(0);
      setAccuracy(0);
      return;
    }

    const minutes = elapsedTime / 60;
    const grossChars = correctChars + mistakes; // Total characters attempted

    const currentRawWpm = Math.round((grossChars / 5) / minutes);
    setRawWpm(currentRawWpm < 0 ? 0 : currentRawWpm);

    // Net WPM = ( (All Typed Entries / 5) - Uncorrected Errors ) / Time in Minutes
    // Standard definition: ( (total_chars_typed / 5) - errors ) / time_in_minutes
    // For simplicity here, let's use correctChars for WPM
    const currentWpm = Math.round((correctChars / 5) / minutes);
    setWpm(currentWpm < 0 ? 0 : currentWpm);

    const currentCpm = Math.round(correctChars / minutes);
    setCpm(currentCpm < 0 ? 0 : currentCpm);

    const totalTypedChars = correctChars + mistakes;
    const currentAccuracy = totalTypedChars > 0 ? (correctChars / totalTypedChars) * 100 : 0;
    setAccuracy(currentAccuracy);

  }, [startTime, elapsedTime, correctChars, mistakes]);


  useEffect(() => {
    if (status === 'running' && startTime) {
      timerIntervalRef.current = setInterval(() => {
        const currentElapsedTime = (Date.now() - startTime) / 1000;
        setElapsedTime(currentElapsedTime);
        calculateMetrics();
      }, 100);
    } else if (status !== 'running' && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
      // Final calculation when test is finished
      if(status === 'finished') calculateMetrics();
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [status, startTime, calculateMetrics]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTypedValue = event.target.value;
    const previousInputValue = inputValue; // inputValue from state is the value *before* this event

    if (status === 'finished' || !currentText) return;

    if (status === 'idle' && newTypedValue.length > 0) {
      setStatus('running');
      setStartTime(Date.now());
      setElapsedTime(0);
    }

    setInputValue(newTypedValue); // Update the input field's display value

    // Determine if a character was added or removed (backspace)
    if (newTypedValue.length > previousInputValue.length) {
      // Character(s) added
      const newCharsCount = newTypedValue.length - previousInputValue.length;
      // Check only the newly added character(s) for mistakes
      for (let i = 0; i < newCharsCount; i++) {
        const charIndexInNewTypedValue = previousInputValue.length + i;
        if (charIndexInNewTypedValue < currentText.length) {
          if (newTypedValue[charIndexInNewTypedValue] !== currentText[charIndexInNewTypedValue]) {
            setMistakes(prevMistakes => prevMistakes + 1);
          }
        } else {
          // Typed beyond the sample text, count as a mistake
          setMistakes(prevMistakes => prevMistakes + 1);
        }
      }
    } else if (newTypedValue.length < previousInputValue.length) {
      // Character(s) removed (backspace)
      const backspaceCount = previousInputValue.length - newTypedValue.length;
      setMistakes(prevMistakes => prevMistakes + backspaceCount);
    }
    // If lengths are equal (e.g., character replaced by selection), mistakes are not added here
    // but correctChars will be updated below, effectively penalizing if the replacement is wrong.

    // Recalculate correctChars based on the entire current newTypedValue
    let currentCorrectChars = 0;
    for (let i = 0; i < newTypedValue.length; i++) {
      if (i < currentText.length && newTypedValue[i] === currentText[i]) {
        currentCorrectChars++;
      }
    }
    setCorrectChars(currentCorrectChars);
    
    // charIndex still represents the current length of the input
    setCharIndex(newTypedValue.length);

    // Check for test completion
    if (status === 'running' && newTypedValue.length >= currentText.length) {
      setStatus('finished');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  // More refined renderSampleText
  const renderSampleText = () => {
    if (!currentText) return null;
    return currentText.split('').map((char, index) => {
      let className = 'text-muted-foreground'; // Default for untyped characters

      if (index < charIndex) { // Characters up to the current input length (charIndex)
        if (index < inputValue.length && inputValue[index] === currentText[index]) {
             className = 'text-green-500'; // Correctly typed
        } else if (index < inputValue.length) { // Check inputValue bounds again for safety
             className = 'text-red-500 line-through'; // Incorrectly typed
        }
        // If inputValue is shorter than charIndex (e.g., after backspace), already typed chars remain 'muted'
        // This part might need further refinement if we want to show 'previously correct but now untyped' differently
      }
      
      // Highlight the character that *should* be typed next
      if (index === charIndex && status !== 'finished') { 
        className = 'bg-blue-200 dark:bg-blue-700 rounded-sm text-black dark:text-white animate-pulse';
      }
      // If the test is finished and this char was beyond the input, keep it muted.
      if (status === 'finished' && index >= charIndex) {
        className = 'text-muted-foreground';
      }

      return <span key={`${char}-${index}`} className={className}>{char}</span>;
    });
  };

  // SEO and Info Content
  const typingTestInfo = {
    leftCardData: {
      title: "Master Your Typing: Understanding Your Speed & Accuracy",
      description: "Learn what your typing speed test results mean and how this tool helps you track your progress.",
      mainParagraph: "Our Typing Speed Test measures your proficiency by calculating your Words Per Minute (WPM), Characters Per Minute (CPM), and overall accuracy. Regular practice can significantly improve your typing skills, boosting productivity for work, study, or general computer use. This tool provides instant feedback, highlighting errors and tracking your performance over time. Aim for a balance between speed and precision to become a truly efficient typist.",
      detailList: {
        heading: "Key Metrics We Track:",
        items: [
          "**Net Words Per Minute (WPM):** Your effective typing speed, factoring in errors (based on a standard 5-character word).",
          "**Characters Per Minute (CPM):** The total number of correct characters typed in one minute.",
          "**Accuracy:** The percentage of correctly typed characters out of all characters entered.",
          "**Raw WPM:** Typing speed calculated without penalty for errors, reflecting gross typing rate.",
          "**Mistakes:** Total count of incorrect characters and backspaces used."
        ]
      }
    },
    rightCardData: {
      title: "Typing Speed Test: Frequently Asked Questions",
      description: "Get answers to common questions about typing speed, WPM, and how to improve.",
      faqItems: [
        {
          question: "What is a good typing speed?",
          answer: "Average typing speed is around 40 WPM. Speeds of 60-70 WPM are considered good for most professional roles. Competitive typists often exceed 100 WPM. The 'best' speed depends on your personal or professional needs."
        },
        {
          question: "How is Words Per Minute (WPM) calculated?",
          answer: "Net WPM is typically calculated as: (((Total characters typed / 5) - Uncorrected Errors) / Time in Minutes). Raw WPM ignores errors. Our test primarily focuses on Net WPM and CPM for a comprehensive view."
        },
        {
          question: "How can I improve my typing speed and accuracy?",
          answer: "Consistent practice is key. Focus on accuracy first, then speed. Use proper finger placement (touch typing), avoid looking at the keyboard, and take short, regular typing tests. Our tool helps you monitor your progress."
        },
        {
          question: "Does accuracy matter more than speed?",
          answer: "Ideally, both are important. High speed with low accuracy leads to more time spent correcting errors. Aim for at least 95% accuracy while gradually increasing your speed."
        },
        {
          question: "How often should I practice typing?",
          answer: "Even 10-15 minutes of focused practice daily can lead to significant improvements over a few weeks. Consistency is more effective than infrequent long sessions."
        },
        {
          question: "Why does this test penalize backspaces?",
          answer: "Penalizing backspaces encourages more precise typing and reflects a truer measure of efficiency, as correcting mistakes takes time in real-world scenarios. It helps train you to type accurately from the start."
        }
      ]
    }
  };

  return (
    <MainLayout 
      title="Typing Speed Test - TestMyRig"
      headerTitle="Typing Speed Test"
      headerDescription="Measure your typing speed (WPM), accuracy, and characters per minute (CPM). Practice and improve!"
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Type className="w-6 h-6 text-primary" />
              Test Your Speed
            </CardTitle>
            <Button onClick={resetTest} variant="outline" size="sm">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="p-4 bg-muted/40 min-h-[100px]">
            <p className="text-xl leading-relaxed font-mono select-none">
              {/* Display full text in idle, otherwise render with highlights */}
              {status === 'idle' && currentText ? currentText : renderSampleText()}
            </p>
          </Card>

          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onPaste={(e) => e.preventDefault()} // Prevent pasting
            placeholder={status === 'idle' ? 'Start typing here to begin the test...' : 'Type the text above...'}
            className={`
              w-full h-32 p-4 text-lg border rounded-md shadow-sm 
              focus:ring-2 focus:ring-blue-500 
              dark:text-white dark:focus:ring-blue-400
              ${status === 'finished' 
                ? 'bg-slate-50 dark:bg-slate-900' // Subtle background for finished state
                : 'dark:bg-gray-800 dark:border-gray-700' // Original dark mode styles for normal state
              }
            `}
            disabled={status === 'finished'}
            aria-label="Typing input area"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div className="p-3 bg-card border rounded-lg shadow-sm">
              <div className="text-xs text-muted-foreground uppercase flex items-center justify-center gap-1"><Timer size={14}/>Time</div>
              <div className="text-3xl font-bold">{elapsedTime.toFixed(1)}s</div>
            </div>
            <div className="p-3 bg-card border rounded-lg shadow-sm">
              <div className="text-xs text-muted-foreground uppercase">WPM</div>
              <div className="text-3xl font-bold">{wpm}</div>
            </div>
            <div className="p-3 bg-card border rounded-lg shadow-sm">
              <div className="text-xs text-muted-foreground uppercase">CPM</div>
              <div className="text-3xl font-bold">{cpm}</div>
            </div>
            <div className="p-3 bg-card border rounded-lg shadow-sm">
              <div className="text-xs text-muted-foreground uppercase flex items-center justify-center gap-1"><Percent size={14}/>Accuracy</div>
              <div className="text-3xl font-bold">{accuracy.toFixed(1)}%</div>
            </div>
            <div className="p-3 bg-card border rounded-lg shadow-sm">
              <div className="text-xs text-muted-foreground uppercase flex items-center justify-center gap-1"><AlertCircle size={14}/>Errors</div>
              <div className="text-3xl font-bold">{mistakes}</div>
            </div>
          </div>

          {status === 'finished' && (
            <Card className="mt-6 p-6 bg-card border rounded-lg shadow-sm"> {/* Updated Styling */}
              <CardTitle className="text-2xl text-green-600 dark:text-green-500 mb-2">Test Completed!</CardTitle> {/* Adjusted Title Color */}
              <CardDescription className="text-muted-foreground mb-4"> {/* Adjusted Description Color */}
                Well done! Here are your results. Press Restart to try another text or adjust settings.
              </CardDescription>
              {/* More detailed summary card here */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Raw WPM:</strong> {rawWpm}</div>
                  <div><strong>Net WPM:</strong> {wpm}</div>
                  <div><strong>CPM:</strong> {cpm}</div>
                  <div><strong>Accuracy:</strong> {accuracy.toFixed(2)}%</div>
                  <div><strong>Correct Characters:</strong> {correctChars}</div>
                  <div><strong>Mistakes:</strong> {mistakes}</div>
                  <div><strong>Time Taken:</strong> {elapsedTime.toFixed(2)}s</div>
              </div>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Info Section Added Here */}
      <div className="mt-8">
        <InfoSection leftCardData={typingTestInfo.leftCardData} rightCardData={typingTestInfo.rightCardData} />
      </div>

    </MainLayout>
  );
};

export default TypingSpeedTest;
