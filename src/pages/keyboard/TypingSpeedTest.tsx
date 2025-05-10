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
  "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune."
];

const TypingSpeedTest: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [charIndex, setCharIndex] = useState(0); // current character index in currentText for comparison
  const [correctChars, setCorrectChars] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectNewText = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    setCurrentText(SAMPLE_TEXTS[randomIndex]);
  }, []);

  // Initialize with a text
  useEffect(() => {
    selectNewText();
  }, [selectNewText]);

  const resetTest = useCallback(() => {
    setStatus('idle');
    setInputValue('');
    setStartTime(null);
    setElapsedTime(0);
    setCharIndex(0);
    setCorrectChars(0);
    setMistakes(0);
    setWpm(0);
    setCpm(0);
    setAccuracy(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    selectNewText();
    inputRef.current?.focus();
  }, [selectNewText]);

  useEffect(() => {
    if (status === 'running' && startTime) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => {
          const currentTime = (Date.now() - startTime) / 1000;
          // Calculate metrics on each tick for real-time update (basic for now)
          if (currentTime > 0) {
            const wordsTyped = correctChars / 5; // Standard 5 chars per word
            const minutes = currentTime / 60;
            setWpm(Math.round(wordsTyped / minutes));
            setCpm(Math.round(correctChars / minutes));
          }
          return currentTime;
        });
      }, 1000);
    } else if (status !== 'running' && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [status, startTime, correctChars]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    if (status === 'finished') return;

    if (status === 'idle') {
      setStatus('running');
      setStartTime(Date.now());
    }
    
    // More detailed input processing will be added in the next phase
    setInputValue(value);

    // Basic logic to check if test is complete (user typed whole text)
    if (value.length >= currentText.length && status === 'running') {
      setStatus('finished');
      if (startTime) {
        const endTime = Date.now();
        const durationSeconds = (endTime - startTime) / 1000;
        setElapsedTime(durationSeconds);
        // Final metrics calculation will be more robust later
      }
    }
  };

  // Function to render the sample text with highlighting (basic for now)
  const renderSampleText = () => {
    return currentText.split('').map((char, index) => {
      let color = 'text-muted-foreground'; // Default for untyped
      if (index < inputValue.length) {
        color = char === inputValue[index] ? 'text-green-500' : 'text-red-500';
      }
      // Highlight current character to type
      if (index === charIndex && status !== 'finished') {
         // This simple highlighting can be improved to show a cursor
      }
      return <span key={index} className={color}>{char}</span>;
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
          <Card className="p-4 bg-muted/40">
            <p className="text-lg leading-relaxed font-mono select-none">
              {status === 'idle' && currentText ? currentText : renderSampleText()}
            </p>
          </Card>

          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={status === 'idle' ? 'Start typing here to begin the test...' : ''}
            disabled={status === 'finished'}
            rows={5}
            className="text-lg font-mono focus:ring-primary"
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Timer size={16}/>Time</div>
              <div className="text-2xl font-bold">{elapsedTime.toFixed(1)}s</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">WPM</div>
              <div className="text-2xl font-bold">{wpm}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">CPM</div>
              <div className="text-2xl font-bold">{cpm}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Percent size={16}/>Accuracy</div>
              <div className="text-2xl font-bold">{accuracy.toFixed(1)}%</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1"><AlertCircle size={16}/>Errors</div>
              <div className="text-2xl font-bold">{mistakes}</div>
            </div>
          </div>

          {status === 'finished' && (
            <Card className="mt-6 p-4 bg-green-50 border border-green-200">
              <CardTitle className="text-green-700">Test Completed!</CardTitle>
              <CardDescription className="text-green-600">
                Well done! Here are your results. Press Restart to try another text.
              </CardDescription>
              {/* Detailed results summary will go here */}
            </Card>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default TypingSpeedTest;
