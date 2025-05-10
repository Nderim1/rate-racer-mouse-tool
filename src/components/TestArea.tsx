
import React from 'react';
import { cn } from '@/lib/utils';

interface TestAreaProps {
  isActive: boolean;
  onMouseMove: (event: React.MouseEvent) => void;
}

const TestArea = ({ isActive, onMouseMove }: TestAreaProps) => {
  return (
    <div 
      className={cn(
        'test-area',
        isActive && 'test-area-active'
      )}
      onMouseMove={onMouseMove}
    >
      <div className="p-6 h-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-2">Move Your Mouse Here</h2>
        <p className="text-muted-foreground text-center">
          {isActive 
            ? "Keep moving your mouse rapidly to measure polling rate..." 
            : "Move your mouse inside this area to begin measuring"}
        </p>
      </div>
    </div>
  );
};

export default TestArea;
