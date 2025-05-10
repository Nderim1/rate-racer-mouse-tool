
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const InfoSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>What is Mouse Polling Rate?</CardTitle>
          <CardDescription>Understanding the basics of polling rate</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            The polling rate (measured in Hz) determines how often your computer checks for input from your mouse. 
            For example, a mouse with a 1000Hz polling rate reports its position to your computer 1000 times per second (every 1ms).
          </p>
          <div className="mt-4">
            <h4 className="font-medium text-foreground mb-2">Common Polling Rates:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground">125 Hz</span> - Basic office mice (8ms response time)</li>
              <li><span className="text-foreground">500 Hz</span> - Mid-range gaming mice (2ms response time)</li>
              <li><span className="text-foreground">1000 Hz</span> - High-end gaming mice (1ms response time)</li>
              <li><span className="text-foreground">4000+ Hz</span> - Premium gaming mice with ultra-high polling rates</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about mouse polling rate</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">Is a higher polling rate always better?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Not necessarily. While a higher polling rate can reduce input lag and improve responsiveness, 
                it also requires more CPU resources. Most gamers find that 1000Hz offers a good balance. 
                For casual use, 125-500Hz is typically sufficient.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm">My polling rate seems low, what can I do?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Check your mouse software for polling rate settings</li>
                  <li>Ensure you're using a proper mouse pad</li>
                  <li>Try connecting to a different USB port (USB 3.0 ports are preferred)</li>
                  <li>Update your mouse drivers and firmware</li>
                  <li>Close resource-intensive applications that may affect performance</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm">Why does polling rate matter for gaming?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                In competitive gaming, especially fast-paced shooters and esports titles, 
                every millisecond counts. A higher polling rate means more frequent position updates, 
                resulting in smoother tracking and reduced input lag. This can give players a slight 
                edge in scenarios where precise, quick movements are crucial.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm">How accurate is this test?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                This test provides a good approximation of your mouse's polling rate, but browser-based tests 
                have limitations. Factors like CPU load, browser performance, and system resources can affect 
                the results. For the most accurate testing, try running the test when your system isn't under heavy load.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoSection;
