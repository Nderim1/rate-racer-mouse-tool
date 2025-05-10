import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { monitorToolItems } from '@/toolMenuItems';
import { ArrowRight } from 'lucide-react';

const MonitorToolsPage: React.FC = () => {
  return (
    <MainLayout 
      title="Monitor Testing Tools - RateRacer"
      headerTitle="Monitor Testing Tools"
      headerDescription="A collection of tests to evaluate your monitor's performance and image quality."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 md:p-4">
        {monitorToolItems.map((item) => (
          <Link to={item.path} key={item.title} className="group">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out hover:border-primary flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <item.icon className="h-8 w-8 text-primary mb-2" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
};

export default MonitorToolsPage;
