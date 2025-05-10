import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

const MonitorToolsPage: React.FC = () => {
  return (
    <MainLayout headerTitle="Monitor Tools" headerDescription="Utilities and tests for your display.">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="w-6 h-6 text-primary" />
            Coming Soon!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            This section is under construction. Monitor testing tools and utilities will be available here in the future.
          </CardDescription>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default MonitorToolsPage;
