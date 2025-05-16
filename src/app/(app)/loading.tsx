// src/app/(app)/loading.tsx
import { Loader2 } from 'lucide-react';

export default function Loading() {
  // This loading UI will be nested within AppLayout, below the Header.
  // It provides feedback during page transitions.
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span className="ml-3 text-lg text-muted-foreground">Loading page...</span>
    </div>
  );
}
