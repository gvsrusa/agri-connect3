
"use client";

import { useState, useEffect, useMemo } from 'react';
import { BookText, Search, Filter, Sprout, AlertTriangle, Wind, Thermometer, Leaf, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { CropAdvisory } from '@/types';
import { mockCropAdvisories, availableCrops } from '@/data/mock-data'; // Using mock data
import Image from 'next/image';
import { format } from 'date-fns';

const getCategoryIcon = (category: CropAdvisory['category']) => {
  switch (category) {
    case 'Pest Management': return <Sprout className="h-5 w-5 text-red-500" />;
    case 'Disease Control': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case 'Climate Adaptation': return <Wind className="h-5 w-5 text-blue-500" />;
    case 'General Tip': return <Leaf className="h-5 w-5 text-green-500" />;
    default: return <BookText className="h-5 w-5 text-gray-500" />;
  }
};

const getCategoryColor = (category: CropAdvisory['category']) => {
  switch (category) {
    case 'Pest Management': return "bg-red-100 text-red-800 border-red-300";
    case 'Disease Control': return "bg-orange-100 text-orange-800 border-orange-300";
    case 'Climate Adaptation': return "bg-blue-100 text-blue-800 border-blue-300";
    case 'General Tip': return "bg-green-100 text-green-800 border-green-300";
    default: return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export default function CropAdvisoryPage() {
  const [advisories, setAdvisories] = useState<CropAdvisory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const categories: CropAdvisory['category'][] = ['Pest Management', 'Disease Control', 'Climate Adaptation', 'General Tip'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAdvisories(mockCropAdvisories.sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()));
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredAdvisories = useMemo(() => {
    return advisories.filter(advisory => {
      const matchesSearch = advisory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            advisory.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            advisory.cropName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCrop = selectedCrop ? advisory.cropName === selectedCrop : true;
      const matchesCategory = selectedCategory ? advisory.category === selectedCategory : true;
      return matchesSearch && matchesCrop && matchesCategory;
    });
  }, [advisories, searchTerm, selectedCrop, selectedCategory]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <BookText className="mr-3 h-8 w-8" /> Crop Advisory
        </h1>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Find Farming Tips</CardTitle>
          <CardDescription>Search for advice on pests, diseases, climate, and more.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search advisories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select onValueChange={(value) => setSelectedCrop(value === "all" ? undefined : value)} value={selectedCrop || "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {availableCrops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : value)} value={selectedCategory || "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredAdvisories.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {filteredAdvisories.map((advisory) => (
            <AccordionItem key={advisory.id} value={advisory.id} className="bg-card rounded-lg shadow-lg border border-border data-[state=open]:border-primary">
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <div className="flex items-start gap-4 w-full">
                  {advisory.imageUrl && (
                     <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={advisory.imageUrl} alt={advisory.title} layout="fill" objectFit="cover" data-ai-hint={`${advisory.cropName} advisory`} />
                     </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold text-primary">{advisory.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{advisory.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                      <Badge variant="secondary" className="text-xs">Crop: {advisory.cropName}</Badge>
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(advisory.category)}`}>
                        {getCategoryIcon(advisory.category)}
                        <span className="ml-1">{advisory.category}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <div className="prose prose-sm max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: advisory.content }} />
                <p className="text-xs text-muted-foreground mt-4">
                  Last updated: {format(advisory.lastUpdated, "PPPp")}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
          <Filter className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">No advisories match your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
