// SEO metadata for all pages
export const pageMetadata = {
    // Category pages
    'mouse-tools': {
        title: 'Mouse Testing Tools',
        description: 'Comprehensive suite of mouse testing tools. Test polling rate, click speed, DPI accuracy, and input lag.',
        keywords: 'mouse tools, mouse test, gaming mouse, mouse testing suite',
        path: '/mouse-tools'
    },
    'keyboard-tools': {
        title: 'Keyboard Testing Tools',
        description: 'Test your keyboard with our suite of tools. Check typing speed, key rollover, and test individual keys.',
        keywords: 'keyboard tools, keyboard test, typing speed, NKRO, key rollover',
        path: '/keyboard-tools'
    },
    'monitor-tools': {
        title: 'Monitor Testing Tools',
        description: 'Comprehensive monitor testing tools. Test for dead pixels, color banding, ghosting, and more.',
        keywords: 'monitor tools, monitor test, dead pixel test, screen test',
        path: '/monitor-tools'
    },

    // Mouse tools
    'mouse-tools/polling-rate-test': {
        title: 'Mouse Polling Rate Test - Check Your Mouse Hz',
        description: 'Test your mouse\'s polling rate (Hz) accurately. See real-time, average, and max polling rate.',
        keywords: 'mouse polling rate, Hz test, mouse test, gaming mouse, polling rate test',
        path: '/mouse-tools/polling-rate-test'
    },
    'mouse-tools/click-speed': {
        title: 'Click Speed Test - CPS Test',
        description: 'Test your clicking speed with our CPS (Clicks Per Second) tester. Track your performance and improve your clicking speed.',
        keywords: 'click speed test, CPS test, clicks per second, mouse clicking speed',
        path: '/mouse-tools/click-speed'
    },
    'mouse-tools/dpi-analyzer': {
        title: 'DPI Analyzer - Test Mouse DPI Accuracy',
        description: 'Analyze your mouse\'s actual DPI and sensitivity. Verify if your mouse DPI matches the advertised specifications.',
        keywords: 'DPI test, mouse DPI, DPI analyzer, mouse sensitivity test',
        path: '/mouse-tools/dpi-analyzer'
    },
    'mouse-tools/input-lag': {
        title: 'Mouse Input Lag Test',
        description: 'Measure your mouse input latency. Requires external hardware for accurate measurements.',
        keywords: 'input lag test, mouse latency, mouse input lag, response time',
        path: '/mouse-tools/input-lag'
    },

    // Keyboard tools
    'keyboard-tools/typing-speed': {
        title: 'Typing Speed Test - WPM Test',
        description: 'Test your typing speed and accuracy. Measure your WPM (Words Per Minute) and improve your typing skills.',
        keywords: 'typing speed test, WPM test, typing test, words per minute',
        path: '/keyboard-tools/typing-speed'
    },
    'keyboard-tools/key-rollover': {
        title: 'Key Rollover Test - NKRO Test',
        description: 'Test your keyboard\'s key rollover and anti-ghosting capabilities. Check for NKRO (N-Key Rollover) support.',
        keywords: 'key rollover test, NKRO test, anti-ghosting, keyboard ghosting test',
        path: '/keyboard-tools/key-rollover'
    },
    'keyboard-tools/keyboard-tester': {
        title: 'Keyboard Tester - Test All Keys',
        description: 'Visual keyboard tester to check if all your keys are working properly. Test each key individually.',
        keywords: 'keyboard tester, key test, keyboard test, test keyboard keys',
        path: '/keyboard-tools/keyboard-tester'
    },

    // Monitor tools
    'monitor-tools/dead-pixel-test': {
        title: 'Dead Pixel Test - Check for Stuck Pixels',
        description: 'Test your monitor for dead or stuck pixels. Use different colors to identify pixel issues.',
        keywords: 'dead pixel test, stuck pixel test, pixel test, monitor test',
        path: '/monitor-tools/dead-pixel-test'
    },
    'monitor-tools/screen-uniformity-test': {
        title: 'Screen Uniformity Test',
        description: 'Test your monitor\'s color and brightness uniformity. Check for backlight bleeding and color consistency.',
        keywords: 'screen uniformity test, backlight bleeding, monitor uniformity, color uniformity',
        path: '/monitor-tools/screen-uniformity-test'
    },
    'monitor-tools/color-banding-test': {
        title: 'Color Banding Test',
        description: 'Test your monitor for color banding issues. Check if your display can show smooth color gradients.',
        keywords: 'color banding test, gradient test, monitor color test, banding test',
        path: '/monitor-tools/color-banding-test'
    },
    'monitor-tools/sharpness-text-test': {
        title: 'Sharpness & Text Test',
        description: 'Test your monitor\'s sharpness and text clarity. Ensure optimal display settings for reading.',
        keywords: 'sharpness test, text clarity test, monitor sharpness, display sharpness',
        path: '/monitor-tools/sharpness-text-test'
    },
    'monitor-tools/ghosting-test': {
        title: 'Ghosting & Motion Blur Test',
        description: 'Test your monitor for ghosting and motion blur. Check response time and motion performance.',
        keywords: 'ghosting test, motion blur test, monitor ghosting, response time test',
        path: '/monitor-tools/ghosting-test'
    },
    'monitor-tools/contrast-test': {
        title: 'Contrast Ratio Test',
        description: 'Test your monitor\'s contrast ratio. Check black and white level distinction.',
        keywords: 'contrast test, contrast ratio, monitor contrast, black level test',
        path: '/monitor-tools/contrast-test'
    },
    'monitor-tools/input-lag-test-helper': {
        title: 'Monitor Input Lag Test Helper',
        description: 'Visual aid for estimating monitor input lag. Use with external camera for accurate measurements.',
        keywords: 'input lag test, monitor lag, display lag, input latency',
        path: '/monitor-tools/input-lag-test-helper'
    },

    // Guides
    'mouse-guide': {
        title: 'Mouse Buying Guide',
        description: 'Learn about mouse technologies, specifications, and how to choose the perfect mouse for your needs.',
        keywords: 'mouse guide, gaming mouse guide, mouse buying guide, mouse specifications',
        path: '/mouse-guide'
    },
    'keyboard-guide': {
        title: 'Keyboard Buying Guide',
        description: 'Learn about keyboard technologies, switch types, and how to choose the perfect keyboard.',
        keywords: 'keyboard guide, mechanical keyboard guide, keyboard buying guide, keyboard switches',
        path: '/keyboard-guide'
    },
    'monitor-guide': {
        title: 'Monitor Buying Guide',
        description: 'Learn about monitor technologies, panel types, and how to choose the perfect display.',
        keywords: 'monitor guide, display guide, monitor buying guide, monitor specifications',
        path: '/monitor-guide'
    },
    'recommended-mice': {
        title: 'Recommended Gaming Mice',
        description: 'Our top picks for gaming mice across different categories and budgets.',
        keywords: 'best gaming mice, recommended mice, top gaming mice, mouse recommendations',
        path: '/recommended-mice'
    }
};

export function getPageMetadata(path: string) {
    const key = path.startsWith('/') ? path.slice(1) : path;
    return pageMetadata[key as keyof typeof pageMetadata];
}
