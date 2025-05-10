import { Mouse, BarChart2, Settings, Info, Target, ShoppingCart, Keyboard as KeyboardIcon, MonitorPlay, Type, Scan, HelpCircle, Zap, MousePointer, Crosshair, Timer, LocateFixed, BookOpen, Award } from 'lucide-react';

export interface MenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}

export const mouseToolItems: MenuItem[] = [
  {
    title: 'Polling Rate Test',
    path: '/mouse-tools/polling-rate-test',
    icon: Zap,
    description: 'Measure the polling rate of your mouse in Hz.'
  },
  {
    title: 'Click Speed Test',
    path: '/mouse-tools/click-speed',
    icon: MousePointer,
    description: 'Test your clicks per second (CPS).'
  },
  {
    title: 'DPI Analyzer',
    path: '/mouse-tools/dpi-analyzer',
    icon: Crosshair,
    description: 'Analyze the actual DPI of your mouse.'
  },
  {
    title: 'Input Lag Test',
    path: '/mouse-tools/input-lag',
    icon: Timer,
    description: 'Measure mouse input latency (requires external hardware).'
  }, 
  // {
  //   title: 'Sensor Precision Test',
  //   path: '/mouse-tools/sensor-precision',
  //   icon: LocateFixed,
  //   description: 'Check for mouse sensor jitter and accuracy issues.'
  // },
];

export const keyboardToolItems: MenuItem[] = [
  {
    title: "Typing Speed Test",
    path: "/keyboard-tools/typing-speed",
    icon: Type,
    description: "Measure your WPM and accuracy"
  },
  {
    title: "Keyboard Tester",
    path: "/keyboard-tools/keyboard-tester",
    icon: KeyboardIcon,
    description: "Visualize key presses."
  },
  {
    title: "Key Rollover Test",
    path: "/keyboard-tools/key-rollover",
    icon: Scan,
    description: "Test NKRO and ghosting."
  },
];

export const monitorToolItems: MenuItem[] = [
  {
    title: "Dead Pixel Test",
    path: "/monitor-tools/dead-pixel-test",
    icon: MonitorPlay,
    description: "Check for dead or stuck pixels."
  },
  {
    title: "Screen Uniformity Test",
    path: "/monitor-tools/screen-uniformity-test",
    icon: MonitorPlay, 
    description: "Check screen color & brightness consistency."
  },
  {
    title: "Color Banding Test",
    path: "/monitor-tools/color-banding-test",
    icon: MonitorPlay, 
    description: "Test for smooth color gradients."
  },
  {
    title: "Sharpness & Text Test",
    path: "/monitor-tools/sharpness-text-test",
    icon: MonitorPlay, 
    description: "Assess text clarity and sharpness."
  },
  {
    title: "Ghosting / Motion Blur Test",
    path: "/monitor-tools/ghosting-test",
    icon: MonitorPlay, 
    description: "Visually test motion performance."
  },
  {
    title: "Contrast Ratio Test",
    path: "/monitor-tools/contrast-test",
    icon: MonitorPlay, 
    description: "Assess black/white level distinction."
  },
  {
    title: "Input Lag Test (Helper)",
    path: "/monitor-tools/input-lag-test-helper",
    icon: MonitorPlay, 
    description: "Visual aid for input lag estimation."
  }
];

export const utilityItems: MenuItem[] = [
  {
    title: "Help & Support",
    path: "/help",
    icon: HelpCircle,
    description: "Get help with using our tools"
  },
  {
    title: 'Mouse Guide',
    path: '/mouse-guide',
    icon: BookOpen,
    description: 'Learn about mouse technologies and how to choose one.'
  },
  {
    title: 'Recommended Mice',
    path: '/recommended-mice',
    icon: Award,
    description: 'Check out our top mouse picks for various needs.'
  }
];
