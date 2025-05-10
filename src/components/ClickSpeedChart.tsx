import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ClickSpeedChartProps {
  data: { time: number; clicks: number }[];
  bestCps: number;
}

const ClickSpeedChart: React.FC<ClickSpeedChartProps> = ({ data, bestCps }) => {
  // Process data for the chart - calculate CPS for each time point
  const chartData = data.map((point, index) => {
    // Calculate CPS based on clicks at this time divided by time elapsed
    // Avoid division by zero
    const timeElapsed = point.time === 0 ? 0.1 : point.time;
    const cps = point.clicks / timeElapsed;
    
    return {
      time: point.time,
      cps: parseFloat(cps.toFixed(1)),
    };
  });

  // Filter out duplicate time points, keeping the latest one
  const uniqueTimeData = chartData.reduce((acc: any[], point) => {
    const existingIndex = acc.findIndex(p => p.time === point.time);
    if (existingIndex >= 0) {
      acc[existingIndex] = point;
    } else {
      acc.push(point);
    }
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Click Speed Over Time</CardTitle>
        <CardDescription>
          See how your clicks per second (CPS) change during the test
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="graph-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={uniqueTimeData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }}
                domain={[0, 10]}
              />
              <YAxis 
                label={{ value: 'CPS', angle: -90, position: 'insideLeft' }}
                domain={[0, 'auto']}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} CPS`, 'Click Speed']}
                labelFormatter={(label) => `Time: ${label}s`}
              />
              <Line 
                type="monotone" 
                dataKey="cps" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2 }}
              />
              {bestCps > 0 && (
                <Line 
                  type="monotone" 
                  dataKey={() => bestCps}
                  stroke="#F97316"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Best CPS"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClickSpeedChart;
