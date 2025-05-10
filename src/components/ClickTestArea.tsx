
import React from 'react';
import { MousePointer } from 'lucide-react';

interface ClickTestAreaProps {
  isActive: boolean;
  onClick: () => void;
  timeLeft: number;
  clicks: number;
}

const ClickTestArea: React.FC<ClickTestAreaProps> = ({ isActive, onClick, timeLeft, clicks }) => {
  return (
    <div 
      onClick={onClick}
      className={`test-area p-8 flex flex-col items-center justify-center min-h-[240px] cursor-pointer transition-all ${isActive ? 'test-area-active' : ''}`}
    >
      {isActive ? (
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">{timeLeft}</div>
          <p className="text-xl">Keep clicking! <span className="font-bold">{clicks}</span> clicks so far</p>
        </div>
      ) : timeLeft === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Test Complete!</h2>
          <p className="text-muted-foreground">
            Click to try again
          </p>
        </div>
      ) : (
        <div className="text-center">
          <MousePointer className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Click Here to Start</h2>
          <p className="text-muted-foreground">
            Click as quickly as you can for 10 seconds
          </p>
        </div>
      )}
    </div>
  );
};

export default ClickTestArea;
