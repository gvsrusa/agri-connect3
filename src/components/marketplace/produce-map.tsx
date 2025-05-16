
'use client';

import React, { useState, useEffect } from 'react';
import type { ProduceListing } from '@/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cn } from '@/lib/utils';

// Fix for default marker icon issues with Next.js/Webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore This is a known workaround for Leaflet's default icon path issues with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface ProduceMapProps {
  listings: ProduceListing[];
  className?: string;
}

const defaultPosition: [number, number] = [20.5937, 78.9629]; // Centered on India
const defaultZoom = 5;

export function ProduceMap({ listings, className: propClassName }: ProduceMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validListings = listings.filter(l => l.latitude != null && l.longitude != null);

  if (!isMounted) {
    // While the parent (MarketplacePage) uses dynamic import with a loading state,
    // returning null here ensures MapContainer is not even attempted to render
    // until ProduceMap itself has mounted. This can prevent initialization issues.
    return null;
  }

  return (
    <MapContainer
      center={defaultPosition}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
      className={cn("rounded-lg shadow-md bg-muted", propClassName)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validListings.map((listing) => (
        // Ensure latitude and longitude are numbers for the Marker position
        <Marker key={listing.id} position={[Number(listing.latitude!), Number(listing.longitude!)]}>
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold text-base">{listing.cropType}</p>
              <p><strong>Price:</strong> {listing.price}</p>
              <p><strong>Quantity:</strong> {listing.quantity}</p>
              <p><strong>Seller:</strong> {listing.sellerName || 'N/A'}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
