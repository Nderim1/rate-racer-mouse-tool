import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Type, Scan, Keyboard } from 'lucide-react';

const keyboardToolCategories = [
  {
    title: 'Typing Speed Test',
    description: 'Measure your WPM and accuracy.',
    link: '/keyboard-tools/typing-speed',
    icon: <Type className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Key Rollover Test (NKRO)',
    description: 'Check simultaneous key presses.',
    link: '/keyboard-tools/key-rollover',
    icon: <Scan className="w-12 h-12 mb-4 text-primary" />,
  },
  // Add more keyboard tools here as they are created
];

const KeyboardToolsPage: React.FC = () => {
  return (
    <MainLayout headerTitle="Keyboard Tools" headerDescription="Select a keyboard tool to get started.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyboardToolCategories.map((category) => (
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

export default KeyboardToolsPage;
