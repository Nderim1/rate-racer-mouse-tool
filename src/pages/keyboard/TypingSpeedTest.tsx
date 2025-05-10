import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Type, Timer, Percent, AlertCircle, RefreshCcw } from 'lucide-react';

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
    setCharIndex(0); // Reset charIndex when new text is selected
  }, []);

  useEffect(() => {
    selectNewText();
  }, [selectNewText]);

  const resetTest = useCallback(() => {
    setStatus('idle');
    setInputValue('');
    setStartTime(null);
    setElapsedTime(0);
    // charIndex is reset by selectNewText
    setCorrectChars(0);
    setMistakes(0);
    setWpm(0);
    setCpm(0);
    setRawWpm(0);
    setAccuracy(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    selectNewText();
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
    const typedValue = event.target.value;

    if (status === 'finished' || !currentText) return;

    if (status === 'idle') {
      setStatus('running');
      setStartTime(Date.now());
      setElapsedTime(0); // Ensure timer starts from 0
    }

    setInputValue(typedValue);

    // Process the last typed character
    const lastTypedChar = typedValue[typedValue.length - 1];
    const expectedChar = currentText[charIndex];

    if (lastTypedChar === expectedChar) {
      setCorrectChars(prev => prev + 1);
    } else {
      setMistakes(prev => prev + 1);
    }
    setCharIndex(prev => prev + 1);

    // Check for test completion
    if (charIndex + 1 >= currentText.length) {
      setStatus('finished');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); // Stop timer immediately
      // Final metrics are calculated by useEffect due to status change
    }
  };

  // More refined renderSampleText
  const renderSampleText = () => {
    if (!currentText) return null;
    return currentText.split('').map((char, index) => {
      let className = 'text-muted-foreground'; // Untyped characters

      if (index < charIndex) { // Characters already typed
        className = inputValue[index] === char ? 'text-green-500' : 'text-red-500 line-through';
      }
      
      if (index === charIndex && status !== 'finished') { // Current character to type
        className = 'bg-blue-200 dark:bg-blue-700 rounded-sm text-black dark:text-white animate-pulse';
      }

      return <span key={`${char}-${index}`} className={className}>{char}</span>;
    });
  };

  return (
    <MainLayout headerTitle="Typing Speed Test" headerDescription="Measure your words per minute (WPM) and accuracy.">
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
            placeholder={status === 'idle' ? 'Start typing here to begin the test...' : 'Type the text above...'}
            disabled={status === 'finished' || !currentText}
            rows={3} // Reduced rows as user types one line at a time essentially
            className="text-lg font-mono focus:ring-primary disabled:bg-slate-200 disabled:cursor-not-allowed"
            onPaste={(e) => e.preventDefault()} // Prevent pasting
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
            <Card className="mt-6 p-6 bg-green-50 border border-green-300 dark:bg-green-900/30 dark:border-green-700">
              <CardTitle className="text-2xl text-green-700 dark:text-green-400 mb-2">Test Completed!</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-300 mb-4">
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
    </MainLayout>
  );
};

export default TypingSpeedTest;
