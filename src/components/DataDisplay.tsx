
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, CirclePlay, CircleStop } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataDisplayProps {
  current: number;
  average: number;
  max: number;
  isActive: boolean;
  onReset: () => void;
  onToggle: () => void;
}

const DataDisplay = ({
  current,
  average,
  max,
  isActive,
  onReset,
  onToggle
}: DataDisplayProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Rate Display */}
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-lg bg-secondary/50 border border-border">
            <div className="text-sm font-medium mb-1 text-muted-foreground">Current</div>
            <div className={cn(
              "text-xl font-bold transition-colors",
              isActive
                ? current > 800 ? "text-accent" : "text-foreground"
                : "text-muted-foreground"
            )}>
              {current}
              <span className="text-lg font-normal text-muted-foreground ml-1">Hz</span>
            </div>
          </div>

          {/* Average Rate Display */}
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-lg bg-secondary/50 border border-border">
            <div className="text-sm font-medium mb-1 text-muted-foreground">Average</div>
            <div className="text-xl font-bold">
              {average}
              <span className="text-lg font-normal text-muted-foreground ml-1">Hz</span>
            </div>
          </div>

          {/* Max Rate Display */}
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-lg bg-secondary/50 border border-border">
            <div className="text-sm font-medium mb-1 text-muted-foreground">Maximum</div>
            <div className="text-xl font-bold text-primary">
              {max}
              <span className="text-lg font-normal text-muted-foreground ml-1">Hz</span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center mt-4 gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onToggle}
          >
            {isActive ? (
              <>
                <CircleStop className="h-4 w-4" /> Stop
              </>
            ) : (
              <>
                <CirclePlay className="h-4 w-4" /> Start
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onReset}
          >
            <RefreshCw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card >
  );
};

export default DataDisplay;
