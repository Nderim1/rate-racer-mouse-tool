import React from 'react';
import MainLayout from '@/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Disc3, Zap, Grip, ChevronRight, Activity, Settings2 } from 'lucide-react';

const guideSections = [
  {
    id: 'sensor',
    title: 'Understanding Mouse Sensors',
    icon: Disc3,
    description: 'Optical vs. Laser, tracking speed, and accuracy.',
    content: [
      'Optical Sensors: Use an LED and a CMOS camera to take thousands of pictures per second of the surface beneath. They excel on non-glossy surfaces and are generally preferred by gamers for their raw, unfiltered tracking. Common issues include problems with very glossy or transparent surfaces.',
      'Laser Sensors: Use an infrared laser diode instead of an LED. They can track on a wider variety of surfaces, including glass, but can sometimes be overly sensitive to surface imperfections, leading to jitter or unwanted acceleration. Some high-end laser sensors have mitigated these issues.',
      'Sensor Models: Different sensors (e.g., PixArt PMW3360, Logitech HERO, Razer Focus+) offer varying levels of performance. Key manufacturers like PixArt supply sensors to many brands, while some, like Logitech, develop their own. Look for reviews comparing specific sensor models if top-tier accuracy is critical.',
      'CPI/DPI (Counts/Dots Per Inch): Measures how many pixels the cursor moves on screen for every inch the mouse is physically moved. While often used interchangeably, CPI is technically more accurate for sensor resolution. Higher is not always better; it depends on preference and screen resolution.',
      'Max Tracking Speed (IPS - Inches Per Second): The maximum speed at which the mouse can be moved while still accurately tracking. A higher IPS is better, especially for gamers who make fast, sweeping movements. Speeds of 400 IPS or more are common in gaming mice.',
      'Acceleration: Measures how quickly the sensor can respond to changes in movement speed, typically rated in Gs (gravity). Higher G-rating means the sensor can handle faster flicks. Most modern gaming sensors handle 30G-50G, which is more than sufficient for human capability.',
    ],
  },
  {
    id: 'dpi_cpi',
    title: 'DPI/CPI Explained',
    icon: Settings2,
    description: 'What is DPI/CPI and how it affects your experience.',
    content: [
      'Definition: DPI (Dots Per Inch) and CPI (Counts Per Inch) measure mouse sensitivity. It dictates how far your cursor moves on screen for every inch you move your mouse physically. For example, a mouse set to 800 DPI will move the cursor 800 pixels for every inch the mouse travels.',
      'Cursor Sensitivity: Higher DPI/CPI settings result in a faster-moving cursor for the same physical mouse movement, requiring less physical effort for large cursor jumps. Lower DPI/CPI provides more granular control, often preferred for precision tasks like FPS gaming or detailed design work.',
      'Common Ranges & Uses: General desktop use might be comfortable around 800-1600 DPI. FPS gamers often prefer lower DPIs (400-800) for precise aiming, while RTS/MOBA gamers might use higher DPIs (1000-3000+) for quick map navigation. Ultra-high DPIs (10,000+) are often marketing figures and rarely practical, but can be useful on very high-resolution multi-monitor setups.',
      'eDPI (Effective DPI): This is a crucial concept, especially for gamers. eDPI = Mouse DPI × In-Game Sensitivity. It provides a standardized measure of true sensitivity across different games and hardware. For example, 800 DPI at 0.5 in-game sensitivity is an eDPI of 400, the same as 400 DPI at 1.0 in-game sensitivity.',
      'Native DPI vs Interpolated: Most sensors have a native DPI range where they perform optimally. Some mice achieve very high DPI values through interpolation (software calculation to estimate cursor position), which can sometimes introduce smoothing or lag. It is generally better to use a DPI setting native to the sensor if known.',
    ],
  },
  {
    id: 'polling_rate',
    title: 'Polling Rate Significance',
    icon: Activity,
    description: 'How often your mouse reports its position.',
    content: [
      'Explanation: Polling rate, measured in Hertz (Hz), indicates how many times per second your mouse reports its position to the computer. For example, a 1000Hz polling rate means the mouse sends an update every 1 millisecond (ms).',
      'Common Rates: Standard mice often use 125Hz (8ms response). Gaming mice typically offer 500Hz (2ms), 1000Hz (1ms), and some newer models even support 2000Hz (0.5ms), 4000Hz (0.25ms), or 8000Hz (0.125ms).',
      'Impact: A higher polling rate can result in smoother cursor movement and quicker registration of clicks, which can be beneficial in fast-paced gaming. However, the perceptible difference diminishes for many users beyond 1000Hz.',
      'CPU Usage: Higher polling rates can consume more CPU resources. While modern CPUs handle this well, very high rates (4000Hz+) might cause issues on older or lower-end systems, or in CPU-intensive games. If you experience stuttering, consider lowering the polling rate.',
      'Choosing: For most gamers, 1000Hz is a safe bet, offering a good balance of responsiveness and system impact. If you have a high refresh rate monitor (144Hz+) and a capable PC, experimenting with higher rates might provide a slight edge, but the difference is often minimal. For general use, 125Hz or 500Hz is perfectly adequate.',
    ],
  },
  {
    id: 'connectivity',
    title: 'Connectivity: Wired vs. Wireless',
    icon: Zap,
    description: 'Pros and cons of different connection types.',
    content: [
      'Wired Mice: Generally offer the most stable connection with the lowest latency as there\'s no wireless interference or battery to worry about. The cable can sometimes cause drag, but mouse bungees can alleviate this. They are often preferred by competitive gamers for maximum reliability.',
      'Wireless Mice (2.4GHz RF): Modern 2.4GHz wireless mice using proprietary dongles (e.g., Logitech Lightspeed, Razer HyperSpeed) offer performance virtually indistinguishable from wired mice in terms of latency. They provide freedom of movement but require battery charging/replacement. Ensure a clear line-of-sight or use an extender for the dongle for optimal performance.',
      'Wireless Mice (Bluetooth): Bluetooth mice are convenient as they don\'t require a separate dongle and are great for portability and use with laptops. However, Bluetooth generally has higher latency and lower polling rates compared to 2.4GHz RF or wired connections, making it less ideal for serious gaming. Battery life is often better than 2.4GHz RF mice.',
      'Latency: Top-tier 2.4GHz wireless technologies have achieved parity with wired connections, often reporting ~1ms latency. Cheaper wireless mice or Bluetooth connections can have significantly higher latency (10-30ms+), which might be noticeable.',
      'Battery Life: Varies greatly. Some 2.4GHz gaming mice offer 50-100 hours of use, while others might last longer with RGB lighting off. Bluetooth mice generally have longer battery life. Consider features like auto-sleep and whether the mouse is rechargeable or uses replaceable batteries.',
    ],
  },
  {
    id: 'ergonomics',
    title: 'Ergonomics and Grip Styles',
    icon: Grip,
    description: 'Finding a comfortable mouse for your hand.',
    content: [
      'Importance: Mouse ergonomics are crucial for long-term comfort and preventing strain or injuries like Carpal Tunnel Syndrome. An ergonomic mouse fits your hand well, supports your grip style, and allows for natural wrist posture.',
      'Palm Grip: Your entire palm rests on the mouse, with fingers extended over the buttons. This is often considered the most relaxed grip. Larger, contoured mice are typically best for palm grip. Pros: Comfortable for long sessions, good control. Cons: Can be less agile for quick micro-adjustments.',
      'Claw Grip: Your palm may touch the back of the mouse, but your fingers are arched, and the fingertips are used to click the buttons. This grip offers a balance of comfort and control. Medium-sized, ambidextrous or ergo mice with a defined hump can work well. Pros: Good for quick clicks and moderate control. Cons: Can cause finger fatigue for some.',
      'Fingertip Grip: Only your fingertips touch the mouse; your palm does not make contact. This grip allows for very fast, precise movements controlled by the fingers. Smaller, lightweight mice are ideal. Pros: Highly agile, excellent for micro-adjustments. Cons: Least ergonomic, can be tiring over long periods, offers less stability for large swipes.',
      'Mouse Shape & Size: Consider your hand size (measure from the tip of your middle finger to the base of your palm). Mice are often categorized as small, medium, or large. Ambidextrous shapes suit both left and right-handed users, while ergonomic right-handed (or left-handed) shapes are contoured for one hand.',
      'Weight: Lighter mice (sub-80g, some even sub-60g) are popular for FPS gaming as they allow for quicker movements and less fatigue. Heavier mice can feel more stable and controlled for some users or tasks. Some mice offer adjustable weight systems.',
      'Try Before You Buy: If possible, try different mouse shapes and sizes in a store to see what feels most comfortable for your hand and grip style.',
    ],
  },
  // Add more sections like Switches, Mouse Feet, Software, Build Quality etc. later
];

const MouseGuidePage: React.FC = () => {
  return (
    <MainLayout headerTitle="Comprehensive Mouse Guide" headerDescription="Everything you need to know about mice to make an informed decision.">
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
              {/* Placeholder for more detailed content later */}
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default MouseGuidePage;
