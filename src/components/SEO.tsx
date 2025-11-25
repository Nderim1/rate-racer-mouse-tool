import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string;
    ogImage?: string;
    schema?: object;
    noindex?: boolean;
}

export function SEO({
    title,
    description,
    canonical,
    keywords,
    ogImage = '/og-image.png',
    schema,
    noindex = false,
}: SEOProps) {
    const fullTitle = `${title} | TestMyRig`;
    const url = canonical || `https://testmyrig.com${window.location.pathname}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url} />
            {noindex && <meta name="robots" content="noindex,nofollow" />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={`https://testmyrig.com${ogImage}`} />
            <meta property="og:site_name" content="TestMyRig" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`https://testmyrig.com${ogImage}`} />

            {/* Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
