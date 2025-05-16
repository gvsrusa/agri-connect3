
import { GreetingCard } from '@/components/dashboard/greeting-card';
import { QuickActionCard } from '@/components/dashboard/quick-action-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, BookText, ShoppingCart, Sprout } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <GreetingCard />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          title="Marketplace"
          description="View listings or sell your produce."
          link="/marketplace"
          linkText="Go to Marketplace"
          Icon={ShoppingCart}
          iconColor="text-green-600"
        />
        <QuickActionCard
          title="Market Prices"
          description="Check the latest commodity prices."
          link="/market-prices"
          linkText="View Prices"
          Icon={BarChart3}
          iconColor="text-blue-600"
        />
        <QuickActionCard
          title="Crop Advisory"
          description="Get tips for healthier crops."
          link="/crop-advisory"
          linkText="Read Advisories"
          Icon={BookText}
          iconColor="text-yellow-600"
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary flex items-center">
            <Sprout className="mr-2 h-7 w-7" /> Your Farm, Our Priority
          </CardTitle>
          <CardDescription>
            AgriConnect is designed to be simple, accessible, and helpful for your farming needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="mb-4 text-muted-foreground">
              We understand the challenges faced by small and marginal farmers in India. That's why AgriConnect focuses on providing:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><span className="font-medium text-foreground">Easy-to-use tools:</span> List produce and find prices with just a few taps.</li>
              <li><span className="font-medium text-foreground">Actionable information:</span> Clear, concise advice for crop management.</li>
              <li><span className="font-medium text-foreground">Local relevance:</span> Information tailored to your needs and conditions.</li>
              <li><span className="font-medium text-foreground">Offline access:</span> Key features work even with intermittent internet.</li>
            </ul>
             <p className="mt-4 text-sm text-muted-foreground">
              We are continuously working to improve AgriConnect. Your feedback is valuable!
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
            <Image
              src="https://picsum.photos/seed/farmfields/600/400"
              alt="Lush farm fields"
              layout="fill"
              objectFit="cover"
              data-ai-hint="farm fields"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white text-xl font-semibold p-4 text-center">Supporting Your Harvest, Season After Season</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
