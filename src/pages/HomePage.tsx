import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mouse, Keyboard as KeyboardIcon, MonitorPlay } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { generateWebPageSchema, generateOrganizationSchema } from '@/utils/structuredData';

const HomePage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'TestMyRig - Test Your Peripherals',
        'Your one-stop destination for testing mouse, keyboard, and monitor performance.',
        'https://testmyrig.com/'
      ),
      generateOrganizationSchema(),
    ],
  };

  return (
    <>
      <SEO
        title="Test Your Peripherals"
        description="Test your mouse, keyboard, and monitor with a suite of professional tools. Measure polling rate, input lag, typing speed, screen uniformity, and more."
        canonical="https://testmyrig.com/"
        keywords="mouse test, keyboard test, monitor test, polling rate, DPI test, typing speed, dead pixel test"
        schema={schema}
      />
      <MainLayout
        title="TestMyRig - Test Your Peripherals"
        headerTitle="Welcome to TestMyRig"
        headerDescription="Your one-stop destination for testing mouse, keyboard, and monitor performance."
      >
        <div className="container mx-auto py-12 px-4">
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Peripheral Testing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a gamer, professional, or tech enthusiast, TestMyRig provides the tools you need
              to accurately measure and understand the performance of your computer peripherals.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Mouse className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mouse Tools</h3>
              <p className="text-muted-foreground mb-4 flex-grow">Test polling rate, click speed, DPI accuracy, and more.</p>
              <Button asChild>
                <Link to="/mouse-tools">Explore Mouse Tools</Link>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <KeyboardIcon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Keyboard Tools</h3>
              <p className="text-muted-foreground mb-4 flex-grow">Check typing speed, key rollover, and test individual keys.</p>
              <Button asChild>
                <Link to="/keyboard-tools">Explore Keyboard Tools</Link>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <MonitorPlay className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monitor Tools</h3>
              <p className="text-muted-foreground mb-4 flex-grow">Test for dead pixels, color banding, ghosting, and more.</p>
              <Button asChild>
                <Link to="/monitor-tools">Explore Monitor Tools</Link>
              </Button>
            </div>
          </section>

          <section className="text-center py-8 bg-secondary/50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Why Test Your Peripherals?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Understanding your hardware's capabilities can help you optimize your setup for gaming, productivity, or general use.
              Identify issues, compare products, and ensure you're getting the performance you expect.
            </p>
          </section>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
