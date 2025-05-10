
import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

interface PollingChartProps {
  data: { time: number; rate: number }[];
  maxRate: number;
}

const PollingChart = ({ data, maxRate }: PollingChartProps) => {
  const maxYValue = Math.max(1200, maxRate + 200);
  
  // Common polling rates for reference lines
  const referenceRates = [125, 500, 1000];
  
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="text-md font-medium mb-2">Polling Rate Over Time</h3>
        <div className="graph-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.5)"
                label={{ value: 'Time (seconds)', position: 'insideBottomRight', offset: -10, fill: 'rgba(255,255,255,0.5)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)" 
                domain={[0, maxYValue]}
                label={{ value: 'Rate (Hz)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.5)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 40, 0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  color: '#fff',
                }}
                formatter={(value) => [`${value} Hz`, 'Polling Rate']}
                labelFormatter={(label) => `Time: ${label}s`}
              />
              
              {referenceRates.map((rate) => (
                <ReferenceLine 
                  key={rate} 
                  y={rate} 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeDasharray="3 3"
                  label={{ 
                    value: `${rate} Hz`, 
                    position: 'right', 
                    fill: 'rgba(255,255,255,0.5)',
                    fontSize: 10
                  }}
                />
              ))}
              
              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--primary))"
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollingChart;
