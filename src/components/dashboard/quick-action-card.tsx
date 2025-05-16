
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
  Icon: LucideIcon;
  iconColor?: string;
}

export function QuickActionCard({ title, description, link, linkText, Icon, iconColor = "text-primary" }: QuickActionCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      </CardContent>
      <CardContent className="pt-0 mt-auto">
         <Button asChild variant="outline" className="w-full group">
          <Link href={link}>
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
