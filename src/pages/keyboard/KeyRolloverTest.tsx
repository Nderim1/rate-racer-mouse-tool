import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan, Construction } from 'lucide-react'; // Using Scan icon for rollover

const KeyRolloverTest: React.FC = () => {
  return (
    <MainLayout headerTitle="Key Rollover Test (NKRO)" headerDescription="Check how many keys your keyboard can register simultaneously.">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="w-6 h-6 text-primary" />
            Key Rollover Test Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex items-center gap-2">
            <Construction className="w-5 h-5 text-muted-foreground" />
            This tool is under construction. The key rollover test functionality will be implemented here soon.
          </CardDescription>
          {/* Placeholder for key press display area */}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default KeyRolloverTest;
