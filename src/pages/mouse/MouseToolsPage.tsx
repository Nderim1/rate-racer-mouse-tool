import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Mouse, BarChart2, Settings, Target, Info, ShoppingCart } from 'lucide-react'; // Icons for mouse tools
import { Helmet } from 'react-helmet-async';

const mouseToolCategories = [
  {
    title: 'Polling Rate Test',
    description: 'Test your mouse polling rate in real-time.',
    link: '/mouse-tools/polling-rate-test',
    icon: <Mouse className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Click Speed Test',
    description: 'Measure your clicks per second (CPS).',
    link: '/mouse-tools/click-speed',
    icon: <BarChart2 className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'DPI Analyzer',
    description: 'Find your mouse\'s true DPI setting.',
    link: '/mouse-tools/dpi-analyzer',
    icon: <Settings className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Input Lag Test',
    description: 'Measure mouse input latency.',
    link: '/mouse-tools/input-lag',
    icon: <BarChart2 className="w-12 h-12 mb-4 text-primary" />,
  },
  {
    title: 'Sensor Precision Test',
    description: 'Test mouse sensor accuracy and precision.',
    link: '/mouse-tools/sensor-precision',
    icon: <Target className="w-12 h-12 mb-4 text-primary" />,
  },
  // Links to guides can also be here if desired, or kept separate
];

const MouseToolsPage: React.FC = () => {
  const pageTitle = "Mouse Tools - Test Your Mouse Performance | TestMyRig";
  const pageDescription = "Discover a suite of tools to test your mouse, including polling rate, click speed (CPS), DPI accuracy, input lag, and sensor precision. Optimize your mouse for gaming and productivity with TestMyRig.";
  const pageUrl = "https://testmyrig.com/mouse-tools"; // Assuming this is the deployed URL structure
  const ogImageUrl = "https://testmyrig.com/images/og-mouse-tools.png"; // Placeholder for a specific OG image
  const siteName = "TestMyRig";
  const publisherLogoUrl = "https://testmyrig.com/images/logo.png"; // Placeholder

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "image": ogImageUrl,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogoUrl
      }
    },
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://testmyrig.com",
      "name": siteName
    }
    // Optionally, you could list mainEntity elements here referring to each tool page
    // For example: "mainEntity": [ { "@type": "WebPage", "@id": "https://testmyrig.com/mouse-tools/polling-rate-test" }, ... ]
    // But keeping it simple for now.
  };

  return (
    <MainLayout headerTitle="Mouse Tools" headerDescription="Explore various tools to test and analyze your mouse performance.">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        {/* Open Graph Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="TestMyRig" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* Add twitter:site if you have a specific twitter handle */}
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(collectionPageSchema)}
        </script>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mouseToolCategories.map((category) => (
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

export default MouseToolsPage;
