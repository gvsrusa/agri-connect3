
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null; // For Google profile picture
  farmLocation?: string; // Added as per proposal
}

export interface ProduceListing {
  id: string;
  cropType: string;
  quantity: string; // e.g., "50 kg", "10 quintal"
  price: string; // e.g., "₹2500/quintal"
  sellerId: string;
  sellerName?: string; // Denormalized for easier display
  imageUrl?: string; // Optional image for the produce
  listedDate: Date;
  latitude?: number;
  longitude?: number;
}

export interface MarketPriceInfo {
  commodity: string;
  market: string;
  price: number;
  unit: string;
  lastUpdated: Date;
}

export interface CropAdvisory {
  id: string;
  title: string;
  cropName: string;
  category: 'Pest Management' | 'Disease Control' | 'Climate Adaptation' | 'General Tip';
  summary: string;
  content: string; // Detailed content, can include HTML or Markdown
  imageUrl?: string; // Optional image for the advisory
  lastUpdated: Date;
}
