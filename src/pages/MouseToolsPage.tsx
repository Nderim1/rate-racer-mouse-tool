import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Mouse, BarChart2, Settings, Target, Info, ShoppingCart } from 'lucide-react'; // Icons for mouse tools

const mouseToolCategories = [
  {
    title: 'Polling Rate Test',
    description: 'Test your mouse polling rate in real-time.',
    link: '/polling-rate-test',
    icon: <Mouse className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Click Speed Test',
    description: 'Measure your clicks per second (CPS).',
    link: '/click-speed',
    icon: <BarChart2 className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'DPI Analyzer',
    description: 'Find your mouse\'s true DPI setting.',
    link: '/dpi-analyzer',
    icon: <Settings className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Input Lag Test',
    description: 'Measure mouse input latency.',
    link: '/input-lag',
    icon: <BarChart2 className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Sensor Precision Test',
    description: 'Test mouse sensor accuracy and precision.',
    link: '/sensor-precision',
    icon: <Target className="w-12 h-12 mb-4 text-primary" />,
  },
  // Links to guides can also be here if desired, or kept separate
];

const MouseToolsPage: React.FC = () => {
  return (
    <MainLayout headerTitle="Mouse Tools" headerDescription="Explore various tools to test and analyze your mouse performance.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mouseToolCategories.map((category) => (
          <Link to={category.link} key={category.title} className="block hover:no-underline">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center">
              <CardHeader>
                {category.icon}
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
};

export default MouseToolsPage;
