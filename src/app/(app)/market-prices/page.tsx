
"use client";

import { useState, useEffect, useMemo } from 'react';
import { BarChart3, Search, Filter, CalendarDays, MapPin, Wheat, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { MarketPriceInfo } from '@/types';
import { mockMarketPrices, availableCrops, availableMarkets } from '@/data/mock-data'; // Using mock data
import { format } from 'date-fns';

// Helper function to get a unique icon for each commodity (example)
const getCommodityIcon = (commodity: string) => {
  // In a real app, you might have a mapping or more sophisticated logic
  if (commodity.toLowerCase().includes('wheat')) return <Wheat className="h-5 w-5 text-yellow-600" />;
  if (commodity.toLowerCase().includes('rice')) return <SproutIcon className="h-5 w-5 text-green-600" />; // Placeholder
  if (commodity.toLowerCase().includes('tomato')) return <TomatoIcon className="h-5 w-5 text-red-600" />; // Placeholder
  return <BarChart3 className="h-5 w-5 text-gray-500" />;
};

// Placeholder icons for Sprout and Tomato
const SproutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10"/>
    <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
    <path d="M9.5 9.4c1.1.8 1.8 2.2 1.5 3.6C10.6 14.4 9 14 8 13.1c-.9-.9-1.2-2.4-.9-3.5.2-.9.9-1.7 2-2.2"/>
    <path d="M14.5 9.4c-1.1.8-1.8 2.2-1.5 3.6.3 1.4 1.9 1.8 2.9.9.9-.9 1.2-2.4.9-3.5-.2-.9-.9-1.7-2-2.2"/>
    <path d="M12 10V2"/>
    <path d="m12 2-2.5 2.5"/>
    <path d="m12 2 2.5 2.5"/>
  </svg>
);

const TomatoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.842 1.743a1.5 1.5 0 0 1 2.368 1.025l.001.001.806 4.029A1.5 1.5 0 0 1 16.519 8.5H7.48a1.5 1.5 0 0 1-1.498-1.702L6.79 2.77a1.5 1.5 0 0 1 2.367-1.026l.001-.001 1.415.817.001.001a1.5 1.5 0 0 0 1.53-.001l.001-.001L14.842 1.743z"/>
    <path d="M21.118 12.14a7.5 7.5 0 0 1-13.236 0"/>
    <path d="M21.118 12.14A20.37 20.37 0 0 0 22 17c0 2.761-2.239 5-5 5H7c-2.761 0-5-2.239-5-5 0-1.43.309-2.782.847-3.955"/>
  </svg>
);


export default function MarketPricesPage() {
  const [prices, setPrices] = useState<MarketPriceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState<string | undefined>(undefined);
  const [selectedMarket, setSelectedMarket] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPrices(mockMarketPrices.sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()));
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredPrices = useMemo(() => {
    return prices.filter(price => {
      const matchesSearch = price.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            price.market.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCommodity = selectedCommodity ? price.commodity === selectedCommodity : true;
      const matchesMarket = selectedMarket ? price.market === selectedMarket : true;
      return matchesSearch && matchesCommodity && matchesMarket;
    });
  }, [prices, searchTerm, selectedCommodity, selectedMarket]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <BarChart3 className="mr-3 h-8 w-8" /> Local Market Prices
        </h1>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Filter Prices</CardTitle>
          <CardDescription>Refine your search for specific commodity prices.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search commodity or market..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select onValueChange={(value) => setSelectedCommodity(value === "all" ? undefined : value)} value={selectedCommodity || "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Commodity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Commodities</SelectItem>
              {availableCrops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedMarket(value === "all" ? undefined : value)} value={selectedMarket || "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Markets</SelectItem>
              {availableMarkets.map(market => (
                <SelectItem key={market} value={market}>{market}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredPrices.length > 0 ? (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Price Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Commodity</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Unit</TableHead>
                  <TableHead className="text-right">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrices.map((price, index) => (
                  <TableRow key={`${price.commodity}-${price.market}-${index}`} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getCommodityIcon(price.commodity)}
                        {price.commodity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {price.market}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-700">{price.price.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">{price.unit}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      <div className="flex items-center justify-end gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {format(price.lastUpdated, "dd MMM, HH:mm")}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
         <div className="text-center py-12 bg-card rounded-lg shadow-md">
          <Filter className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">No price data matches your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
      <p className="text-xs text-center text-muted-foreground mt-4">
        Disclaimer: Prices are indicative and subject to change. Please verify with local markets.
      </p>
    </div>
  );
}
