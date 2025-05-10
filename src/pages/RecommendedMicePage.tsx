import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Zap, DollarSign, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface MouseRecommendation {
  id: string;
  name: string;
  category: string;
  imageUrl?: string; // Optional image URL
  features: string[];
  amazonLink: string; // Placeholder for Amazon affiliate link
}

// Schema Interfaces
interface OfferSchemaType {
  "@type": "Offer";
  url: string;
  priceCurrency: string;
  availability: string;
  seller: {
    "@type": "Organization";
    name: string;
  };
}

interface BrandSchemaType {
  "@type": "Brand";
  name: string;
}

interface ProductSchemaType {
  "@type": "Product";
  name: string;
  description: string;
  category: string;
  url: string;
  offers: OfferSchemaType;
  image?: string;
  brand?: BrandSchemaType;
}

interface ListItemSchemaType {
  "@type": "ListItem";
  position: number;
  item: ProductSchemaType;
}

interface ItemListSchemaType {
  "@type": "ItemList";
  itemListElement: ListItemSchemaType[];
}

interface PublisherInfoSchemaType {
  "@type": "Organization";
  name: string;
  logo: {
    "@type": "ImageObject";
    url: string;
  };
}

interface CollectionPageSchemaType {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
  image?: string;
  publisher: PublisherInfoSchemaType;
  mainEntity: ItemListSchemaType;
}

const recommendedMiceData: MouseRecommendation[] = [
  // Gaming Mice
  {
    id: 'gaming-1',
    name: 'Logitech G Pro X Superlight',
    category: 'Top-Tier Gaming',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=G+Pro+X',
    features: ['Ultra-lightweight (63g)', 'HERO 25K Sensor', 'Lightspeed Wireless', 'Long Battery Life'],
    amazonLink: 'https://www.amazon.com/s?k=Logitech+G+Pro+X+Superlight'
  },
  {
    id: 'gaming-2',
    name: 'Razer DeathAdder V3 Pro',
    category: 'Top-Tier Gaming',
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=DeathAdderV3',
    features: ['Ergonomic Shape', 'Focus Pro 30K Optical Sensor', 'HyperSpeed Wireless', 'Lightweight Design'],
    amazonLink: 'https://www.amazon.com/s?k=Razer+DeathAdder+V3+Pro'
  },
  // Ergonomic Mice
  {
    id: 'ergo-1',
    name: 'Logitech MX Master 3S',
    category: 'Productivity & Ergonomics',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=MX+Master+3S',
    features: ['Advanced Scroll Wheel', 'Ergonomic Design', 'Multi-Device Control', 'Quiet Click Buttons'],
    amazonLink: 'https://www.amazon.com/s?k=Logitech+MX+Master+3S'
  },
  {
    id: 'ergo-2',
    name: 'Anker Vertical Ergonomic Mouse',
    category: 'Productivity & Ergonomics',
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Anker+Vertical',
    features: ['Vertical Design for Natural Hand Posture', 'Adjustable DPI', 'Affordable'],
    amazonLink: 'https://www.amazon.com/s?k=Anker+Vertical+Ergonomic+Mouse'
  },
  // Budget-Friendly Mice
  {
    id: 'budget-1',
    name: 'Logitech G203 Lightsync',
    category: 'Budget Gaming',
    imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=G203',
    features: ['Classic Design', 'Gaming-Grade Sensor', 'Customizable RGB Lighting', 'Affordable Price'],
    amazonLink: 'https://www.amazon.com/s?k=Logitech+G203+Lightsync'
  },
  {
    id: 'budget-2',
    name: 'Redragon M602 Griffin',
    category: 'Budget Gaming',
    imageUrl: 'https://via.placeholder.com/150/00FFFF/000000?text=Redragon+M602',
    features: ['7 Programmable Buttons', 'RGB Backlighting', 'Adjustable DPI', 'Comfortable Grip'],
    amazonLink: 'https://www.amazon.com/s?k=Redragon+M602+Griffin'
  },
];

const mouseCategories = [
  { id: 'gaming', title: 'Best Gaming Mice', icon: Zap, data: recommendedMiceData.filter(m => m.category === 'Top-Tier Gaming' || m.category === 'Budget Gaming') },
  { id: 'ergo', title: 'Best Ergonomic & Productivity Mice', icon: ShieldCheck, data: recommendedMiceData.filter(m => m.category === 'Productivity & Ergonomics') },
  { id: 'budget', title: 'Best Budget-Friendly Mice', icon: DollarSign, data: recommendedMiceData.filter(m => m.category === 'Budget Gaming') }, // Can refine this category later
];

// Helper function to infer brand from mouse name
const inferBrand = (mouseName: string): string | undefined => {
  const lowerName = mouseName.toLowerCase();
  if (lowerName.includes('logitech')) return 'Logitech';
  if (lowerName.includes('razer')) return 'Razer';
  if (lowerName.includes('anker')) return 'Anker';
  if (lowerName.includes('redragon')) return 'Redragon';
  // Add other brands as needed
  return undefined;
};

const RecommendedMicePage: React.FC = () => {
  const pageTitle = "Recommended Mice - Top Picks for Gaming & Productivity | TestMyRig";
  const pageDescription = "Discover our curated list of top-rated mice for gaming, ergonomics, and budget-conscious users. Features, pros & cons, and direct links to buy.";
  const pageUrl = "https://testmyrig.com/recommended-mice";
  const ogImageUrl = "https://testmyrig.com/images/og-recommended-mice.png"; // Placeholder
  const siteName = "TestMyRig";
  const publisherLogoUrl = "https://testmyrig.com/images/logo.png"; // Placeholder

  const productListItems: ListItemSchemaType[] = recommendedMiceData.map((mouse, index) => {
    const brandName = inferBrand(mouse.name);
    const productSchema: ProductSchemaType = {
      "@type": "Product",
      "name": mouse.name,
      "description": mouse.features.join(', '),
      "category": mouse.category,
      "url": mouse.amazonLink,
      "offers": {
        "@type": "Offer",
        "url": mouse.amazonLink,
        "priceCurrency": "USD", // Assuming USD, price can't be specified without actual data
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Amazon.com"
        }
      }
    };
    if (mouse.imageUrl && !mouse.imageUrl.includes('via.placeholder.com')) {
      productSchema.image = mouse.imageUrl;
    }
    if (brandName) {
      productSchema.brand = {
        "@type": "Brand",
        "name": brandName
      };
    }
    return {
      "@type": "ListItem",
      "position": index + 1,
      "item": productSchema
    };
  });

  const collectionPageSchema: CollectionPageSchemaType = {
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
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": productListItems
    }
  };

  return (
    <MainLayout headerTitle="Recommended Mice" headerDescription="Curated list of mice for various needs, with links for purchase.">
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
      <div className="space-y-8">
        <Card className="bg-secondary/50 border-primary/50">
            <CardHeader>
                <CardTitle className="text-primary">Affiliate Link Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Please note: Some of the links on this page are affiliate links. If you click on these links and make a purchase, we may earn a small commission at no extra cost to you. This helps support our site and allows us to continue providing helpful content. We only recommend products we believe in.
                </p>
            </CardContent>
        </Card>

        {mouseCategories.map(category => (
          <section key={category.id} className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-6 flex items-center">
              <category.icon className="h-7 w-7 mr-3 text-primary" />
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.data.map(mouse => (
                <Card key={mouse.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    {mouse.imageUrl && (
                        <div className="mb-4 overflow-hidden rounded-lg h-40 flex items-center justify-center bg-muted">
                            <img src={mouse.imageUrl} alt={mouse.name} className="object-contain h-full w-full" />
                        </div>
                    )}
                    <CardTitle>{mouse.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">{mouse.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-1.5 mb-4 text-sm text-muted-foreground">
                      {mouse.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <a href={mouse.amazonLink} target="_blank" rel="noopener noreferrer sponsored">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Check Price on Amazon
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </MainLayout>
  );
};

export default RecommendedMicePage;
