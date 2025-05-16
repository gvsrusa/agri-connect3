
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";

export function GreetingCard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-semibold text-primary">
          {greeting}, {user?.name?.split(' ')[0] || 'Farmer'}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-base md:text-lg">
          Welcome back to AgriConnect. Here's what's new for you today.
        </p>
      </CardContent>
    </Card>
  );
}
