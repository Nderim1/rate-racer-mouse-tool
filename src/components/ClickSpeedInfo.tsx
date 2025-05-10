
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ClickSpeedInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-3">What is Click Speed?</h3>
          <p className="mb-3">
            Click speed (measured in CPS - Clicks Per Second) is how quickly you can click your mouse button. It's a measure of your finger dexterity and coordination that's particularly relevant in:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Fast-paced games that require rapid clicking</li>
            <li>Minecraft PvP combat</li>
            <li>Rhythm games and clicker games</li>
            <li>Competitive gaming where reaction time matters</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-3">Interpreting Your Results</h3>
          <p className="mb-3">The average click speed results typically fall in these ranges:</p>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span>4-6 CPS</span>
                <span className="text-muted-foreground">Beginner</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full">
                <div className="h-2 bg-orange-600 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span>7-9 CPS</span>
                <span className="text-muted-foreground">Intermediate</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span>10-12 CPS</span>
                <span className="text-muted-foreground">Advanced</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span>13+ CPS</span>
                <span className="text-muted-foreground">Professional</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-3">Improve Your Click Speed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Technique Tips</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the butterfly clicking method (alternating fingers on one button)</li>
                <li>Try jitter clicking (tensing your arm to create rapid clicks)</li>
                <li>Ensure your mouse is on a stable surface</li>
                <li>Find a comfortable grip that allows quick finger movement</li>
                <li>Practice regularly with click speed tests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Equipment Factors</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Gaming mice often have more responsive buttons</li>
                <li>Lightweight mice can be easier to click rapidly</li>
                <li>Some switches require less force to activate</li>
                <li>Make sure your mouse is clean and well-maintained</li>
                <li>Check that your mouse polling rate is high (500Hz+)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClickSpeedInfo;
