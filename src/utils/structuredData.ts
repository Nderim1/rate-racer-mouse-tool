export interface BreadcrumbItem {
    name: string;
    url: string;
}

export function generateWebPageSchema(
    title: string,
    description: string,
    url: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: url,
        publisher: {
            '@type': 'Organization',
            name: 'TestMyRig',
            url: 'https://testmyrig.com',
        },
    };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://testmyrig.com${item.url}`,
        })),
    };
}

export function generateHowToSchema(
    name: string,
    description: string,
    steps: string[]
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: name,
        description: description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            text: step,
        })),
    };
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TestMyRig',
        url: 'https://testmyrig.com',
        logo: 'https://testmyrig.com/logo.png',
        description:
            'Comprehensive peripheral testing suite for mouse, keyboard, and monitor performance.',
        sameAs: [
            // Add social media URLs here when available
        ],
    };
}

export function generateSoftwareApplicationSchema(
    name: string,
    description: string,
    applicationCategory: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: name,
        description: description,
        applicationCategory: applicationCategory,
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };
}
