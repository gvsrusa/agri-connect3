
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
      <Leaf className="h-7 w-7" />
      <span className="text-xl font-bold tracking-tight">AgriConnect</span>
    </Link>
  );
}
