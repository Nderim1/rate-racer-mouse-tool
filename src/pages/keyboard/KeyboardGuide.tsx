import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Puzzle, Type, StretchHorizontal, Zap, Rss, Settings2, Lightbulb, Grip, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const guideSections = [
  {
    id: 'switch_types',
    title: 'Understanding Keyboard Switch Types',
    icon: Puzzle,
    description: 'Mechanical, Membrane, Scissor, Optical, and more.',
    content: [
      'Mechanical Switches: Offer distinct tactile feedback, audible clicks (optional), and durability. Popular types include Cherry MX (Red, Blue, Brown), Gateron, Kailh. Each color often signifies a different feel (linear, tactile, clicky). Great for typists and gamers who prefer a responsive feel.',
      'Membrane Keyboards: Use a rubber dome under each key. Quieter than mechanical switches and generally less expensive. Often found in budget keyboards. The typing feel can be mushy and less precise.',
      'Scissor Switches: A variation of membrane switches, commonly found in laptops and low-profile keyboards. They use a scissor-like mechanism under the keycap for a more stable and shorter key travel. Offer a better feel than traditional membrane but less tactile than mechanical.',
      'Optical Switches: Use light beams for actuation. This can result in faster response times and increased durability as there are fewer physical contact points. They can mimic the feel of mechanical switches (linear, tactile, clicky).',
      'Topre Switches: A hybrid between mechanical and membrane, offering a unique tactile bump and a cushioned feel. Known for their distinctive "thock" sound. Often found in high-end keyboards.',
    ],
  },
  {
    id: 'keycaps',
    title: 'Keycaps: Material, Profile, and Legends',
    icon: Type,
    description: 'ABS vs. PBT, OEM vs. Cherry profile, printing methods.',
    content: [
      'Material (ABS vs. PBT): ABS (Acrylonitrile Butadiene Styrene) is common, smoother, but can develop a shine over time. PBT (Polybutylene Terephthalate) is more durable, textured, and resistant to shine. PBT keycaps are generally considered higher quality.',
      'Profile (OEM, Cherry, SA, DSA, XDA): Refers to the shape and height of keycaps across different rows. OEM is a common taller profile. Cherry profile is similar but slightly lower and more sculpted. SA is very tall and spherical. DSA and XDA are uniform (same height/shape for all keys). Profile choice is largely preferential.',
      'Legends (Printing Methods): How characters are printed. Pad Printing is cheap but wears off. Laser Etching is more durable. Dye Sublimation fuses dye into plastic, very durable for PBT. Double-shot injection molding uses two plastics, creating legends that never wear off (most durable).',
      'Backlight Compatibility: Some keycaps are shine-through, allowing RGB or single-color backlighting to illuminate the legends.',
    ],
  },
  {
    id: 'layout_form_factor',
    title: 'Keyboard Layout and Form Factor',
    icon: StretchHorizontal,
    description: 'Full-size, TKL, 75%, 65%, 60%, ergonomic, and more.',
    content: [
      'Full-size (100%): Includes the alphanumeric keys, function row, navigation cluster (arrows, Ins/Del etc.), and a number pad. Best for users who need the numpad frequently.',
      'Tenkeyless (TKL or 80%): A full-size layout minus the number pad. Saves desk space while retaining most keys.',
      '75%: Compact layout that keeps the function row and arrow keys, squishing the navigation cluster closer to the main keys. Good balance of compactness and functionality.',
      '65%: More compact than 75%, removes the function row but typically keeps dedicated arrow keys and some navigation keys (often in a column on the right).',
      '60%: Removes the function row, arrow keys, and navigation cluster. These functions are usually accessible via a Function (Fn) layer. Very compact, popular for enthusiasts and portability.',
      '40%: Even smaller, often removing the number row as well, relying heavily on layers. Steep learning curve.',
      'Ergonomic Layouts: Split, ortholinear (keys in a grid), or contoured designs aimed at reducing strain and promoting natural wrist/hand posture. Examples include Alice layout, Kinesis Advantage.',
      'ISO vs. ANSI: Common physical layout standards. ANSI is prevalent in North America, while ISO is common in Europe. Differences include the shape of the Enter key and placement of certain symbols.',
    ],
  },
  {
    id: 'connectivity_features',
    title: 'Connectivity and Special Features',
    icon: Zap, // Reused, consider Rss or other for distinct feature sets
    description: 'Wired, Wireless (2.4GHz, Bluetooth), NKRO, Macros, RGB.',
    content: [
      'Wired (USB): Most common and reliable, offering lowest latency. Cable can be detachable (USB-C is popular) or fixed.',
      'Wireless (2.4GHz RF): Uses a USB dongle. Modern gaming-grade wireless offers latency comparable to wired. Requires battery charging. Good for decluttering desks.',
      'Wireless (Bluetooth): Connects directly without a dongle, good for multiple devices and portability. Can have slightly higher latency than 2.4GHz, less ideal for competitive gaming but fine for general use/typing.',
      'N-Key Rollover (NKRO): Allows the keyboard to correctly register multiple key presses simultaneously. Essential for fast typists and gamers. PS/2 offers true NKRO, while USB NKRO is common.',
      'Anti-Ghosting: Prevents "ghost" key presses (unintended keys registering when multiple keys are pressed). Most gaming keyboards have good anti-ghosting.',
      'Macros: Programmable key sequences. Useful for gaming or productivity tasks. Can be set via software or on-the-fly on some keyboards.',
      'RGB Lighting: Customizable per-key or zonal backlighting. Primarily aesthetic but can be used for status indicators in some applications.',
      'Onboard Memory: Allows saving profiles (lighting, macros) directly to the keyboard, so settings persist across different computers without software.',
    ],
  },
  {
    id: 'ergonomics_typing',
    title: 'Typing Ergonomics and Health',
    icon: Grip, // Reused, consider UserCheck or HeartPulse
    description: 'Proper posture, wrist rests, and reducing strain.',
    content: [
      'Typing Posture: Sit upright with your feet flat on the floor. Elbows should be at about a 90-degree angle, wrists straight. Avoid slouching.',
      'Wrist Position: Keep wrists neutral, not bent up, down, or sideways. Hovering wrists while typing is ideal, but a wrist rest can provide support during pauses.',
      'Wrist Rests: Can help maintain neutral wrist posture, but ensure it is soft and positions your wrists correctly relative to the keyboard height. Some ergonomic keyboards have built-in rests.',
      'Keyboard Angle & Height: Adjust keyboard feet (tilt) to your preference. Flat or a slight negative tilt can be more ergonomic for some. Ensure your keyboard height allows for comfortable arm and wrist posture.',
      'Taking Breaks: Regular breaks are crucial. Stand up, stretch your hands, wrists, and arms every 30-60 minutes to prevent Repetitive Strain Injury (RSI).',
      'Key Force: Lighter actuation force switches can reduce finger fatigue over long typing sessions. However, too light might lead to accidental presses for some.',
    ],
  },
  // Potential future sections: Keyboard Maintenance, Modding (lubing switches, custom cables), Software Ecosystems
];

const KeyboardGuidePage: React.FC = () => {
  const pageTitle = "Keyboard Guide: Switches, Keycaps, Layouts & More | TestMyRig";
  const pageDescription = "Your ultimate guide to understanding keyboards: mechanical vs. membrane switches, PBT/ABS keycaps, form factors (TKL, 60%), connectivity, NKRO, ergonomics, and essential typing tips with TestMyRig.";
  const pageUrl = "https://testmyrig.com/keyboard-guide";
  const ogImageUrl = "https://testmyrig.com/images/og-keyboard-guide.png"; // Placeholder
  const siteName = "TestMyRig";
  const publisherLogoUrl = "https://testmyrig.com/images/logo.png"; // Placeholder
  const datePublished = "2025-05-10T18:15:00Z"; // Example publish date
  const dateModified = "2025-05-10T18:15:00Z"; // Example modification date

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDescription,
    "image": [
      ogImageUrl
     ],
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": "TestMyRig Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogoUrl
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    }
  };

  return (
    <MainLayout headerTitle="Comprehensive Keyboard Guide" headerDescription="Unlock the secrets of keyboards: from switches and keycaps to ergonomics and advanced features.">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        {/* Open Graph Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={datePublished} />
        <meta property="article:modified_time" content={dateModified} />
        <meta property="article:author" content="TestMyRig Team" />
        <meta property="article:section" content="Technology Guides" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content={siteName} />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
      <div className="space-y-8">
        {guideSections.map((section) => (
          <Card key={section.id} id={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <section.icon className="h-6 w-6 text-primary" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.content.map((point, index) => (
                <div key={index} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-muted-foreground mr-2 mt-1 flex-shrink-0" /> {/* Changed BookOpen to ChevronRight */}
                  <p className="text-muted-foreground flex-grow">{point}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default KeyboardGuidePage;
