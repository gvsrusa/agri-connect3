
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import type { ProduceListing } from '@/types';
import { mockProduceListings, mockUser, availableCrops } from '@/data/mock-data'; // Using mock data for now
import Image from 'next/image';
import { PlusCircle, Tag, ShoppingBasket, User, CalendarDays, Filter, Search, Loader2, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

const ProduceMap = dynamic(() =>
  import('@/components/marketplace/produce-map').then((mod) => mod.ProduceMap),
  {
    ssr: false,
    loading: () => <div className="h-[400px] w-full flex items-center justify-center bg-muted rounded-lg shadow-md"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <p className="ml-2 text-muted-foreground">Loading Map...</p></div>
  }
);

export default function MarketplacePage() {
  const [listings, setListings] = useState<ProduceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCropType, setFilterCropType] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  // Form state for new listing
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockProduceListings.sort((a, b) => b.listedDate.getTime() - a.listedDate.getTime()));
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropType || !quantity || !price) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call for creating listing
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newListing: ProduceListing = {
      id: `listing-${Date.now()}`,
      cropType,
      quantity,
      price,
      sellerId: mockUser.id, // Assuming mockUser is the logged-in user
      sellerName: mockUser.name || "Unknown Farmer",
      imageUrl: `https://picsum.photos/seed/${cropType.toLowerCase()}-${Date.now()}/300/200`, // Ensure unique image per listing
      listedDate: new Date(),
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
    };
    setListings(prev => [newListing, ...prev]);
    setIsSubmitting(false);
    // Reset form and close dialog
    setCropType('');
    setQuantity('');
    setPrice('');
    setDescription('');
    setLatitude('');
    setLongitude('');
    document.getElementById('closeDialogButton')?.click(); // Close dialog
    toast({ title: "Listing Created!", description: `${cropType} listing posted successfully.`});
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearchTerm = 
      listing.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.sellerName && listing.sellerName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCropType = filterCropType ? listing.cropType === filterCropType : true;
    return matchesSearchTerm && matchesCropType;
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-5 w-5" /> List Your Produce
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Listing</DialogTitle>
              <DialogDescription>
                Fill in the details of the produce you want to sell.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateListing} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cropType" className="text-base">Crop Type</Label>
                <Select onValueChange={setCropType} value={cropType} required>
                  <SelectTrigger id="cropType">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCrops.map(crop => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-base">Quantity (e.g., 50 KG, 10 Quintal)</Label>
                <Input id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 50 KG" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-base">Desired Price (e.g., ₹30/KG, ₹2200/Quintal)</Label>
                <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., ₹30/KG" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-base">Description (Optional)</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Organic, freshly harvested" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="latitude" className="text-base">Latitude (Optional)</Label>
                <Input id="latitude" type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="e.g., 28.6139" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="longitude" className="text-base">Longitude (Optional)</Label>
                <Input id="longitude" type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="e.g., 77.2090" />
              </div>
              <DialogFooter className="mt-2">
                <Button type="button" variant="outline" id="closeDialogButton" onClick={() => { /* Can add logic to reset form if dialog is closed manually */ }}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Create Listing
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by crop or farmer name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select onValueChange={(value) => setFilterCropType(value === "all" ? undefined : value)} value={filterCropType || "all"}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {availableCrops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary" /> Listings on Map
          </CardTitle>
          <CardDescription>View produce listings geographically. Pinch to zoom, drag to pan.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProduceMap listings={filteredListings} />
        </CardContent>
      </Card>

      {filteredListings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image 
                  src={listing.imageUrl || `https://picsum.photos/seed/${listing.cropType.toLowerCase()}/300/200`} 
                  alt={listing.cropType} 
                  layout="fill" 
                  objectFit="cover"
                  data-ai-hint={`${listing.cropType} produce`}
                  className="bg-muted"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">{listing.cropType}</CardTitle>
                <CardDescription className="flex items-center text-sm">
                  <ShoppingBasket className="mr-1 h-4 w-4" /> Quantity: {listing.quantity}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <p className="flex items-center text-lg font-semibold text-green-700">
                  <Tag className="mr-1 h-5 w-5" /> {listing.price}
                </p>
                <p className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-1 h-4 w-4" /> Seller: {listing.sellerName}
                </p>
                <p className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="mr-1 h-3 w-3" /> 
                  Listed: {formatDistanceToNow(listing.listedDate, { addSuffix: true })}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
          <Filter className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">No listings match your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters, or check back later!</p>
        </div>
      )}
    </div>
  );
}
