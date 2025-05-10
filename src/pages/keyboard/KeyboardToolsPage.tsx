import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { keyboardToolItems } from '@/toolMenuItems';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const KeyboardToolsPage: React.FC = () => {
  const pageTitle = "Keyboard Tools - Test Typing Speed, Key Rollover & More | TestMyRig";
  const pageDescription = "Access a variety of keyboard testing tools: check your typing speed (WPM), verify N-key rollover (NKRO), and use our keyboard tester to visualize key presses. Perfect for gamers and typists.";
  const pageUrl = "https://testmyrig.com/keyboard-tools";
  const ogImageUrl = "https://testmyrig.com/images/og-keyboard-tools.png"; // Placeholder
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
  };

  return (
    <MainLayout 
      title={pageTitle}
      headerTitle="Keyboard Testing Tools"
      headerDescription="Explore tools for testing your keyboard's performance and functionality."
    >
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
        <meta property="og:site_name" content={siteName} />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(collectionPageSchema)}
        </script>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 md:p-4">
        {keyboardToolItems.map((item) => (
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

export default KeyboardToolsPage;
