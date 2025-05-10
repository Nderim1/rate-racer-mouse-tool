
import { useState, useEffect, useRef, useCallback } from 'react';

// Maximum time window (in ms) for the polling rate calculation
const TIME_WINDOW = 1000;
// Update frequency for the chart data (in ms)
const UPDATE_FREQUENCY = 200;
// Inactivity threshold (in ms) after which we consider the test paused
const INACTIVITY_THRESHOLD = 3000;

interface PollingRateData {
  current: number;
  average: number;
  max: number;
  chartData: { time: number; rate: number }[];
  isActive: boolean;
}

export const usePollingRate = () => {
  // Polling rate states
  const [data, setData] = useState<PollingRateData>({
    current: 0,
    average: 0,
    max: 0,
    chartData: [],
    isActive: false,
  });

  // Refs to store mouse movement data and timestamps
  const movementsRef = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const testStartRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);
  const totalEventsRef = useRef<number>(0);

  // Calculate the current polling rate
  const calculatePollingRate = useCallback(() => {
    const now = Date.now();
    const movements = movementsRef.current;
    
    // Filter movements within the last second
    const recentMovements = movements.filter(time => now - time < TIME_WINDOW);
    movementsRef.current = recentMovements;
    
    // Calculate rates
    const currentRate = Math.round(recentMovements.length * (1000 / TIME_WINDOW));
    
    // Check for inactivity
    if (now - lastMoveTimeRef.current > INACTIVITY_THRESHOLD) {
      if (isRunningRef.current) {
        isRunningRef.current = false;
      }
      return setData(prev => ({ 
        ...prev, 
        current: 0,
        isActive: false 
      }));
    }

    // Update total events for average calculation
    if (isRunningRef.current && recentMovements.length > 0) {
      const elapsedTime = (now - testStartRef.current) / 1000;
      const averageRate = elapsedTime > 0 
        ? Math.round(totalEventsRef.current / elapsedTime) 
        : 0;
      
      // Update the chart data at regular intervals
      const newChartPoint = { time: Math.round((now - testStartRef.current) / 100) / 10, rate: currentRate };
      
      setData(prev => ({
        current: currentRate,
        average: averageRate,
        max: Math.max(prev.max, currentRate),
        chartData: [...prev.chartData.slice(-50), newChartPoint],
        isActive: true
      }));
    }
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback(() => {
    const now = Date.now();
    
    // Start test if not running
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      testStartRef.current = now;
      totalEventsRef.current = 0;
      
      // Reset polling data
      setData({
        current: 0,
        average: 0,
        max: 0,
        chartData: [],
        isActive: true
      });
    }
    
    // Record the movement
    movementsRef.current.push(now);
    totalEventsRef.current++;
    lastMoveTimeRef.current = now;
  }, []);

  // Reset all data
  const resetTest = useCallback(() => {
    movementsRef.current = [];
    totalEventsRef.current = 0;
    isRunningRef.current = false;
    
    setData({
      current: 0,
      average: 0,
      max: 0,
      chartData: [],
      isActive: false
    });
  }, []);

  // Toggle test (start/stop)
  const toggleTest = useCallback(() => {
    if (isRunningRef.current) {
      isRunningRef.current = false;
      setData(prev => ({ ...prev, isActive: false }));
    } else {
      // If restarting, don't reset everything
      isRunningRef.current = true;
      testStartRef.current = Date.now();
      setData(prev => ({ ...prev, isActive: true }));
    }
  }, []);

  // Setup timer for calculations
  useEffect(() => {
    timerRef.current = setInterval(calculatePollingRate, UPDATE_FREQUENCY);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [calculatePollingRate]);

  return {
    ...data,
    handleMouseMove,
    resetTest,
    toggleTest,
  };
};
