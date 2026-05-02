import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const STORAGE_USERS_KEY = "trizen.users";
const STORAGE_LOGGED_IN_KEY = "trizen.auth.loggedIn";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canLogin = email.trim().length > 0 && password.trim().length > 0;

  const login = (e: FormEvent) => {
    e.preventDefault();
    if (!canLogin) return;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || "[]");
    
    // Find user with matching email
    const user = users.find((u: any) => u.email === email);
    
    if (!user) {
      toast({
        title: "Login failed",
        description: "No account found with this email",
        variant: "destructive"
      });
      return;
    }

    // Check password (in production, this should use proper password hashing)
    if (user.password !== password) {
      toast({
        title: "Login failed",
        description: "Incorrect password",
        variant: "destructive"
      });
      return;
    }

    // Store login state
    const authData = {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_LOGGED_IN_KEY, JSON.stringify(authData));
    
    // Store user info for navbar
    localStorage.setItem("trizen.user", JSON.stringify(authData));

    toast({ 
      title: "Login successful", 
      description: `Welcome back, ${user.fullName}!` 
    });
    
    // Check if there's a redirect URL stored
    const redirectUrl = localStorage.getItem("trizen.redirectAfterLogin");
    if (redirectUrl) {
      localStorage.removeItem("trizen.redirectAfterLogin");
      navigate(redirectUrl);
    } else {
      // Always redirect to problem library since dashboard is removed
      navigate("/problem-library");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="container h-16 flex items-center justify-between">
          <button 
            type="button" 
            className="text-sm bg-[#3F378B] text-white hover:bg-[#3F378B]/90 px-3 py-1.5 rounded-md transition-colors" 
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>
        </div>
      </header>

      <main className="container py-12 max-w-md">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Log in to your account to continue building your startup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#3F378B] hover:bg-[#3F378B]/90 text-white" variant="hero" disabled={!canLogin}>
                Log In <ArrowRight />
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
