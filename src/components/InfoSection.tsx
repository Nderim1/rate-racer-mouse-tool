import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

interface InfoSectionProps {
  leftCardData: {
    title: string;
    description: string;
    mainParagraph: string;
    detailList?: {
      heading: string;
      items: string[];
    };
  };
  rightCardData: {
    title: string;
    description: string;
    faqItems: FAQItem[];
  };
}

const InfoSection = ({ leftCardData, rightCardData }: InfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>{leftCardData.title}</CardTitle>
          <CardDescription>{leftCardData.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            {leftCardData.mainParagraph}
          </p>
          {leftCardData.detailList && (
            <div className="mt-4">
              <h4 className="font-medium text-foreground mb-2">{leftCardData.detailList.heading}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {leftCardData.detailList.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>{rightCardData.title}</CardTitle>
          <CardDescription>{rightCardData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {rightCardData.faqItems.map((item, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-sm">{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoSection;
