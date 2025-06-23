
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SentimentChartProps {
  sentiment: {
    positive: number;
    neutral: number;
    disruptive: number;
  };
}

export const SentimentChart = ({ sentiment }: SentimentChartProps) => {
  const data = [
    { name: 'Positive', value: sentiment.positive, fill: '#10B981' },
    { name: 'Neutral', value: sentiment.neutral, fill: '#6B7280' },
    { name: 'Disruptive', value: sentiment.disruptive, fill: '#EF4444' },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
