"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ArrowLeft } from "lucide-react";
import useAuthStore from "../../store/authStore";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: "1",
        email,
        name: "John Doe",
      };

      login(userData);
      
      // Check for redirect parameters from URL
      const redirectPath = searchParams.get("redirect");
      const redirectUrl = searchParams.get("redirectUrl");
      
      if (redirectPath) {
        // Redirect back to the page where user was filling the form
        router.push(redirectPath);
      } else if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Link href="/" className="absolute left-6 top-6">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Image
              src="/logo.png"
              alt="Xpartex Logo"
              width={200}
              height={200}
              className="dark:invert"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Welcome to Xpartex
          </CardTitle>
          <CardDescription>
            Sign in to your multi-vendor marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-2 px-4 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link 
              href={`/signup${searchParams.toString() ? `?${searchParams.toString()}` : ""}`} 
              className="underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
