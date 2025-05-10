
import React from 'react';
import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InputLagChartProps {
  data: { attempt: number; lag: number }[];
}

const InputLagChart = ({ data }: InputLagChartProps) => {
  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No data available yet. Complete at least one test.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis 
          dataKey="attempt" 
          tickLine={false}
          axisLine={false}
          stroke="#888" 
          fontSize={12}
          label={{ value: 'Attempt', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888"
          fontSize={12}
          label={{ value: 'Lag (ms)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(24, 24, 27, 0.9)', 
            borderColor: 'rgba(139, 92, 246, 0.5)',
            color: '#fff'
          }}
          labelStyle={{ color: '#fff' }}
        />
        <Area
          type="monotone"
          dataKey="lag"
          stroke="var(--accent)"
          strokeWidth={2}
          fill="var(--accent)"
          fillOpacity={0.2}
          activeDot={{ r: 6, fill: "var(--primary)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InputLagChart;
