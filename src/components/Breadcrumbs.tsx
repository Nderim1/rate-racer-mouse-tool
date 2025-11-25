import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    name: string;
    path: string;
}

export function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbs: BreadcrumbItem[] = [
        { name: 'Home', path: '/' },
    ];

    let currentPath = '';
    pathnames.forEach((segment) => {
        currentPath += `/${segment}`;
        const name = segment
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        breadcrumbs.push({ name, path: currentPath });
    });

    if (breadcrumbs.length === 1) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.path} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-foreground font-medium">{crumb.name}</span>
                        ) : (
                            <Link
                                to={crumb.path}
                                className="hover:text-foreground transition-colors flex items-center"
                            >
                                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                                {crumb.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
