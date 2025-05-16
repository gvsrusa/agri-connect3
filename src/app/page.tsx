
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/auth/auth-button';
import { useAuth } from '@/contexts/auth-context';
import { Leaf, ShoppingCart, BarChart3, BookOpenText, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/layout/logo'; // Import the Logo component
import { Toaster } from "@/components/ui/toaster";


export default function LandingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    // Optional: Show a loading spinner or minimal layout
    return <div className="flex items-center justify-center min-h-screen bg-background"><Logo /></div>;
  }

  if (user) {
    // Already handled by useEffect, but good for clarity or if redirection is slow
    return <div className="flex items-center justify-center min-h-screen bg-background"><p>Redirecting to dashboard...</p></div>;
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-green-50 text-foreground flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <AuthButton />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-12 md:py-20">
        <Leaf className="w-20 h-20 text-primary mb-6" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
          Empowering India's Farmers with AgriConnect
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Your trusted partner for fair market prices, expert crop advice, and seamless produce selling. Join a community focused on growth and prosperity.
        </p>
        <div className="mb-12">
          <AuthButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          <FeatureCard
            icon={<ShoppingCart className="w-8 h-8 text-accent" />}
            title="Sell Your Produce"
            description="Easily list your crops and connect with local buyers."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-accent" />}
            title="Market Insights"
            description="Access real-time local commodity prices for informed decisions."
          />
          <FeatureCard
            icon={<BookOpenText className="w-8 h-8 text-accent" />}
            title="Expert Guidance"
            description="Get practical advice on pests, diseases, and climate-smart farming."
          />
        </div>
      </main>

      <footer className="py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
        <p className="text-sm">Made with <span className="text-red-500">❤️</span> for Indian Farmers</p>
      </footer>
    </div>
    <Toaster />
    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
