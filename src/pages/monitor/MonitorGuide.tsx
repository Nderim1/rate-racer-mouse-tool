import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MonitorPlay, Rows, Zap, Sun, Palette, Tv2, Settings2, AlignHorizontalDistributeCenter, Ratio, Grip, ChevronRight, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const guideSections = [
  {
    id: 'panel_types',
    title: 'Understanding Monitor Panel Types',
    icon: Rows,
    description: 'IPS, TN, VA, OLED - Pros and Cons.',
    content: [
      'IPS (In-Plane Switching): Known for excellent color accuracy and wide viewing angles. Good for content creation, gaming, and general use. Can sometimes have slower response times or "IPS glow".',
      'TN (Twisted Nematic): Typically offer the fastest response times and highest refresh rates, making them popular for competitive gaming. Colors and viewing angles are generally not as good as IPS or VA.',
      'VA (Vertical Alignment): Offer the best contrast ratios, producing deep blacks. Good for movie watching and general use. Response times can be slower, sometimes leading to ghosting in fast scenes.',
      'OLED (Organic Light Emitting Diode): Provide perfect blacks (infinite contrast), vibrant colors, and extremely fast response times. Susceptible to burn-in with static images over long periods. Often found in high-end displays and TVs.',
    ],
  },
  {
    id: 'resolution',
    title: 'Screen Resolution Explained',
    icon: Ratio,
    description: '1080p, 1440p, 4K, Ultrawide - Impact on clarity and performance.',
    content: [
      'Full HD (1080p - 1920x1080): Standard resolution, easy to drive for GPUs, good for smaller screens (up to 24-27 inches).',
      'QHD (1440p - 2560x1440): Offers a noticeable step up in clarity from 1080p. Great for 27-32 inch monitors. Requires a more powerful GPU for gaming.',
      '4K UHD (2160p - 3840x2160): Provides very sharp images, excellent for large screens (27 inches+) and productivity. Demanding on GPU for gaming.',
      'Ultrawide (e.g., 3440x1440, 2560x1080): Offers a wider aspect ratio (typically 21:9) for immersive gaming and increased productivity space. Performance requirements vary based on the specific resolution.',
      'Pixel Density (PPI - Pixels Per Inch): Higher PPI results in sharper images. Consider screen size in relation to resolution to determine PPI.',
    ],
  },
  {
    id: 'refresh_rate',
    title: 'Refresh Rate (Hz)',
    icon: RefreshCw,
    description: '60Hz, 144Hz, 240Hz+ - Smoother motion and responsiveness.',
    content: [
      'Definition: How many times per second the display updates the image. Higher refresh rates result in smoother on-screen motion.',
      '60Hz: Standard for most office monitors and older displays. Adequate for general use and some types of gaming.',
      '120Hz/144Hz: A significant improvement in smoothness, highly recommended for gaming. Noticeable even in desktop use.',
      '240Hz+: Offers even smoother motion, primarily beneficial for competitive esports titles. The difference from 144Hz can be less noticeable to some users.',
      'GPU Requirement: Your graphics card must be able to render frames at a rate matching or exceeding the monitor\'s refresh rate to fully benefit.',
    ],
  },
  {
    id: 'response_time',
    title: 'Response Time (ms)',
    icon: Zap, // Reused, consider Hourglass or Timer
    description: 'GTG vs MPRT - Impact on motion blur and ghosting.',
    content: [
      'Definition: How quickly a pixel can change color (e.g., grey-to-grey or black-to-white). Faster response times reduce motion blur and ghosting.',
      'GTG (Grey-to-Grey): A common industry standard measuring how long it takes a pixel to transition from one shade of grey to another.',
      'MPRT (Moving Picture Response Time): Measures perceived pixel persistence or blur. Often achieved using backlight strobing techniques, which can reduce brightness and cause flicker.',
      'Ideal Values: For gaming, 1ms GTG is often advertised, though real-world performance varies. Lower is generally better to minimize ghosting.',
      'Overdrive: Monitor setting that can improve response times but may introduce inverse ghosting (artifacts) if set too high.',
    ],
  },
  {
    id: 'adaptive_sync',
    title: 'Adaptive Sync: G-Sync & FreeSync',
    icon: MonitorPlay,
    description: 'Eliminating screen tearing and stuttering.',
    content: [
      'Problem Solved: Screen tearing (misaligned frames) and stutter occur when the GPU\'s frame rate doesn\'t match the monitor\'s refresh rate.',
      'NVIDIA G-Sync: Proprietary technology requiring a G-Sync module in the monitor. Works with NVIDIA GPUs. Often considered the premium solution with strict certification.',
      'AMD FreeSync: Open standard, royalty-free, works with AMD GPUs (and some NVIDIA GPUs as "G-Sync Compatible"). More widely available and often more affordable. Tiers include FreeSync, FreeSync Premium, and FreeSync Premium Pro.',
      'G-Sync Compatible: NVIDIA\'s certification for FreeSync monitors that meet certain performance standards when used with NVIDIA GPUs.',
      'Benefit: Provides smoother, tear-free visuals by synchronizing the monitor\'s refresh rate to the GPU\'s output frame rate.',
    ],
  },
  {
    id: 'hdr',
    title: 'HDR (High Dynamic Range)',
    icon: Sun,
    description: 'Brighter whites, darker blacks, and wider color gamut.',
    content: [
      'Explanation: HDR enhances contrast and color for a more lifelike image. It allows for brighter highlights, deeper blacks, and a wider range of colors than Standard Dynamic Range (SDR).',
      'DisplayHDR Standards: VESA certifications (e.g., DisplayHDR 400, 600, 1000) indicate different levels of HDR performance regarding peak brightness, black levels, and color gamut.',
      'Impact: True HDR requires good local dimming (especially for LCDs) to achieve high contrast. OLEDs excel at HDR due to per-pixel illumination.',
      'Content: HDR content (movies, games) is required to see the benefits. Windows HDR implementation can sometimes be finicky.',
      'Considerations: DisplayHDR 400 is entry-level; for a noticeable HDR experience, aim for DisplayHDR 600 or higher.',
    ],
  },
  {
    id: 'color_gamut_accuracy',
    title: 'Color Gamut & Accuracy',
    icon: Palette,
    description: 'sRGB, Adobe RGB, DCI-P3 - For vibrant and true-to-life colors.',
    content: [
      'Color Gamut: The range of colors a monitor can display. Common gamuts include sRGB (standard for web/most content), Adobe RGB (wider, for professional photo editing), and DCI-P3 (common in cinema and HDR).',
      'Color Accuracy (Delta E): Measures how accurately a monitor displays colors compared to the input signal. A Delta E < 2 is generally considered very good, meaning color differences are barely perceptible.',
      'Bit Depth (8-bit, 10-bit): Affects the number of shades per color channel, influencing color gradients. 10-bit (or 8-bit + FRC) provides smoother gradients.',
      'Calibration: For color-critical work, monitor calibration with a colorimeter is recommended to ensure accuracy.',
    ],
  },
  {
    id: 'connectivity_ergonomics',
    title: 'Connectivity & Ergonomics',
    icon: Settings2, // Reused, consider Plug or Usb
    description: 'Ports (HDMI, DisplayPort), stand adjustments, VESA mounting.',
    content: [
      'HDMI: Common interface. HDMI 2.0 supports 4K at 60Hz. HDMI 2.1 supports higher resolutions/refresh rates (e.g., 4K at 120Hz+).',
      'DisplayPort: Preferred for high refresh rates and resolutions on PCs. DisplayPort 1.4 is common; DisplayPort 2.0/2.1 offers even more bandwidth.',
      'USB-C: Versatile port that can carry video (DisplayPort Alt Mode), data, and power (USB Power Delivery), allowing single-cable docking solutions for laptops.',
      'Stand Adjustments: Look for height, tilt, swivel, and pivot adjustments for optimal ergonomic positioning.',
      'VESA Mount: Standard interface for mounting monitors on arms or wall mounts (e.g., 100x100mm). Provides flexibility in positioning.',
    ],
  },
];

const MonitorGuidePage: React.FC = () => {
  const pageTitle = "Monitor Buying Guide: Understanding Specs & Features | TestMyRig";
  const pageDescription = "Learn everything about monitor technology: panel types (IPS, VA, TN, OLED), resolution (1080p, 1440p, 4K), refresh rate (Hz), response time, HDR, color gamut, G-Sync/FreeSync, and more. Make an informed choice with TestMyRig.";
  const pageUrl = "https://testmyrig.com/monitor-guide"; // Assuming this is the deployed URL structure
  const ogImageUrl = "https://testmyrig.com/images/og-monitor-guide.png"; // Placeholder for a specific OG image
  const siteName = "TestMyRig";
  const publisherLogoUrl = "https://testmyrig.com/images/logo.png"; // Placeholder for site logo
  const datePublished = "2025-05-10T18:00:00Z"; // Consistent with OG article tag
  const dateModified = "2025-05-10T18:00:00Z"; // Consistent with OG article tag

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
    <MainLayout headerTitle="Comprehensive Monitor Guide" headerDescription="Navigate the world of displays: from panel tech and resolution to refresh rates and color science.">
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
                  <ChevronRight className="h-5 w-5 text-muted-foreground mr-2 mt-1 flex-shrink-0" />
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

export default MonitorGuidePage;
