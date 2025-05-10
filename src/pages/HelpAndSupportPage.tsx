import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Settings, Mail, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqItems = [
  {
    value: 'faq-1',
    question: 'How does the Click Speed Test work?',
    answer: 'The Click Speed Test measures how many times you can click your mouse button within a set time period (usually 5 or 10 seconds). Simply click the designated area as fast as you can until the timer runs out. Your score will be displayed in Clicks Per Second (CPS).'
  },
  {
    value: 'faq-2',
    question: 'What is DPI and why is it important for the DPI Analyzer?',
    answer: 'DPI (Dots Per Inch) or CPI (Counts Per Inch) is a measure of your mouse\'s sensitivity. The DPI Analyzer tool helps you understand your current DPI settings and how they affect cursor movement on your screen. Knowing your DPI can help you fine-tune your mouse for gaming or productivity tasks.'
  },
  {
    value: 'faq-3',
    question: 'My mouse seems to be lagging, what can I do?',
    answer: 'If you suspect mouse lag, first try the Input Lag Test to get a baseline. Common causes for lag include: low battery (for wireless mice), wireless interference, outdated drivers, high CPU usage, or issues with your USB port. Try charging your mouse, moving the wireless dongle closer, updating drivers, closing unnecessary applications, or trying a different USB port.'
  },
  {
    value: 'faq-4',
    question: 'How can I improve my mouse sensor precision?',
    answer: 'Ensure you are using a good quality mousepad suitable for your mouse sensor type (optical or laser). Keep the sensor lens clean. Avoid using excessively high DPI settings, as some sensors may introduce smoothing or jitter. The Sensor Precision Test can help you identify inconsistencies in tracking.'
  }
];

const troubleshootingTips = [
  {
    id: 'ts-1',
    title: 'Cursor is jittery or skipping',
    solution: 'Clean your mouse sensor and mousepad. Try a different surface. If wireless, check battery and dongle placement. Test with a lower polling rate.'
  },
  {
    id: 'ts-2',
    title: 'Clicks are not registering or double-clicking',
    solution: 'This might indicate a failing mouse switch. Try cleaning around the buttons. If the problem persists, the mouse may need repair or replacement. The Click Speed Test can sometimes highlight switch issues.'
  },
  {
    id: 'ts-3',
    title: 'Wireless mouse disconnects frequently',
    solution: 'Ensure the mouse is fully charged. Move the wireless receiver/dongle closer to the mouse, ideally with a USB extension cable to avoid interference. Avoid placing the dongle near other wireless devices or large metal objects.'
  }
];

const HelpAndSupportPage: React.FC = () => {
  return (
    <MainLayout headerTitle="Help & Support" headerDescription="Find answers to common questions and troubleshooting tips.">
      <div className="space-y-8">
        {/* FAQs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              Frequently Asked Questions (FAQs)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map(item => (
                <AccordionItem value={item.value} key={item.value}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Troubleshooting Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-primary" />
              Troubleshooting Common Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {troubleshootingTips.map(tip => (
              <div key={tip.id}>
                <h4 className="font-semibold">{tip.title}</h4>
                <p className="text-muted-foreground text-sm">{tip.solution}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mouse Guide Link Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              Looking for Mouse Information?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our Comprehensive Mouse Guide covers everything from sensor technology to ergonomics. 
              <Link to="/guide" className="text-primary hover:underline ml-1">
                Check out the Mouse Guide.
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Contact Section (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              Contact Support
            </CardTitle>
            <CardDescription>Still need help? Reach out to us.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Contact options will be available here soon. For now, please refer to the FAQs and troubleshooting tips.
            </p>
            {/* Placeholder for a contact form or email link */}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HelpAndSupportPage;
