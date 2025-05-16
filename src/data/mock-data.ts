import type { ProduceListing, CropAdvisory, MarketPriceInfo } from '@/types';

export const mockUser: import('@/types').User = {
  id: 'user-123',
  name: 'Venkata Subbarao Gorantla',
  email: 'gorantla@example.com',
  image: 'src/data/IMG_0589.JPG',
  farmLocation: 'Village Anjan',
};

export const mockProduceListings: ProduceListing[] = [
  {
    id: 'listing-1',
    cropType: 'Wheat',
    quantity: '10 Quintal',
    price: '₹2200/Quintal',
    sellerId: 'user-123',
    sellerName: 'Venkata Subbarao Gorantla',
    imageUrl: 'https://picsum.photos/seed/wheat/300/200',
    listedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    latitude: 28.6139, // Delhi
    longitude: 77.2090,
  },
  {
    id: 'listing-2',
    cropType: 'Tomatoes',
    quantity: '50 KG',
    price: '₹30/KG',
    sellerId: 'user-456',
    sellerName: 'Sita Devi',
    imageUrl: 'https://picsum.photos/seed/tomatoes/300/200',
    listedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    latitude: 19.0760, // Mumbai
    longitude: 72.8777,
  },
  {
    id: 'listing-3',
    cropType: 'Onions',
    quantity: '5 Quintal',
    price: '₹1800/Quintal',
    sellerId: 'user-789',
    sellerName: 'Vijay Singh',
    imageUrl: 'https://picsum.photos/seed/onions/300/200',
    listedDate: new Date(),
    latitude: 12.9716, // Bangalore
    longitude: 77.5946,
  },
];

export const mockMarketPrices: MarketPriceInfo[] = [
  {
    commodity: 'Wheat',
    market: 'Mandi A',
    price: 2150,
    unit: '₹/Quintal',
    lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    commodity: 'Wheat',
    market: 'Mandi B',
    price: 2200,
    unit: '₹/Quintal',
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    commodity: 'Rice',
    market: 'Mandi A',
    price: 3500,
    unit: '₹/Quintal',
    lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    commodity: 'Tomatoes',
    market: 'Local Market',
    price: 28,
    unit: '₹/KG',
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
];

export const mockCropAdvisories: CropAdvisory[] = [
  {
    id: 'advisory-1',
    title: 'Managing Aphids in Cotton',
    cropName: 'Cotton',
    category: 'Pest Management',
    summary: 'Effective strategies to control aphid infestations in cotton crops.',
    content: '<p>Aphids can cause significant damage to cotton crops by sucking sap and transmitting viruses. Regular monitoring is crucial. Consider using neem oil sprays as an organic control method. For severe infestations, consult local agricultural extension services for recommended pesticides. Encourage natural predators like ladybugs.</p>',
    imageUrl: 'https://picsum.photos/seed/aphids/300/200',
    lastUpdated: new Date('2023-05-15T10:00:00Z'),
  },
  {
    id: 'advisory-2',
    title: 'Water Conservation for Wheat',
    cropName: 'Wheat',
    category: 'Climate Adaptation',
    summary: 'Tips for efficient water use in wheat cultivation during dry spells.',
    content: '<p>Wheat requires timely irrigation, especially during critical growth stages. Adopt practices like drip irrigation or sprinkler systems to minimize water wastage. Mulching can help retain soil moisture. Avoid over-irrigation, which can lead to waterlogging and nutrient leaching. Monitor weather forecasts to plan irrigation schedules.</p>',
    imageUrl: 'https://picsum.photos/seed/water_wheat/300/200',
    lastUpdated: new Date('2023-06-01T14:30:00Z'),
  },
  {
    id: 'advisory-3',
    title: 'Preventing Post-Harvest Spoilage in Tomatoes',
    cropName: 'Tomatoes',
    category: 'General Tip',
    summary: 'Guidance on proper handling and storage of tomatoes to reduce losses.',
    content: '<p>Handle tomatoes gently to avoid bruising. Sort and remove any damaged or diseased fruits immediately. Store in a cool, well-ventilated place away from direct sunlight. Do not wash tomatoes before storing unless they are to be consumed immediately. For longer storage, consider cool storage options if available.</p>',
    imageUrl: 'https://picsum.photos/seed/tomato_storage/300/200',
    lastUpdated: new Date('2023-07-10T09:15:00Z'),
  },
];

export const availableCrops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Tomatoes', 'Onions', 'Potatoes'];
export const availableMarkets = ['Mandi A', 'Mandi B', 'Local Market', 'District Hub'];
