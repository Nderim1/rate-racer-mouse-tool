import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Mouse, Keyboard, Monitor } from 'lucide-react';

const categories = [
  {
    title: 'Mouse Tools',
    description: 'Test and analyze your mouse performance.',
    link: '/polling-rate-test', // Link to the first mouse tool for now
    icon: <Mouse className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Keyboard Tools',
    description: 'Tools for testing your keyboard (coming soon).',
    link: '/keyboard-tools',
    icon: <Keyboard className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Monitor Tools',
    description: 'Utilities for your display (coming soon).',
    link: '/monitor-tools',
    icon: <Monitor className="w-12 h-12 mb-4 text-primary" />,
  },
];

const HomePage: React.FC = () => {
  return (
    <MainLayout 
      headerTitle="Welcome to TestMyRig.com" 
      headerDescription="Select a category to get started."
      showSidebar={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
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

export default HomePage;
