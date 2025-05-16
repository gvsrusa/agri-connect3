"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, BarChart3, BookText, LayoutDashboard, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/auth/auth-button';
import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
  { href: '/market-prices', label: 'Market Prices', icon: BarChart3 },
  { href: '/crop-advisory', label: 'Crop Advisory', icon: BookText },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const NavLinks = ({isMobile = false}: {isMobile?: boolean}) => (
    navItems.map((item) => (
      <Button
        key={item.href}
        variant="ghost"
        asChild
        className={cn(
          "justify-start text-base font-medium",
          isMobile ? "w-full text-lg py-3" : "text-sm",
          pathname === item.href
            ? "text-primary bg-accent/30 hover:bg-accent/40"
            : "text-foreground/70 hover:text-foreground"
        )}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        <Link href={item.href} className="flex items-center gap-2">
          <item.icon className={cn("h-5 w-5", isMobile ? "h-6 w-6" : "h-4 w-4")} />
          {item.label}
        </Link>
      </Button>
    ))
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <AuthButton />
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-6 flex flex-col">
                <SheetHeader>
                  <Logo />
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex-1 flex flex-col space-y-3 pt-4 overflow-y-auto"> {/* pt-4 to use gap from SheetContent or add custom space */}
                  <NavLinks isMobile={true} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
