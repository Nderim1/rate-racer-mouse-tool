import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MenuItem } from '@/toolMenuItems';

interface RelatedToolsProps {
    tools: MenuItem[];
    title?: string;
}

export function RelatedTools({ tools, title = 'Related Tools' }: RelatedToolsProps) {
    if (tools.length === 0) return null;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold mb-6">{title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                    <Link key={tool.path} to={tool.path} className="block">
                        <Card className="h-full hover:border-primary transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <tool.icon className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                                </div>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
