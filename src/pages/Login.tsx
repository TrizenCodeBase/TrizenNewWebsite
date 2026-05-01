import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const STORAGE_SUBMITTED_KEY = "trizen.application.submitted";
const STORAGE_LOGGED_IN_KEY = "trizen.auth.loggedIn";

export default function Login() {
  const navigate = useNavigate();

  const hasApplied = useMemo(() => {
    return localStorage.getItem(STORAGE_SUBMITTED_KEY) === "true";
  }, []);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!hasApplied) {
      toast({
        title: "Apply first",
        description: "You can log in once you’ve submitted the application.",
      });
      navigate("/signup", { replace: true });
    }
  }, [hasApplied, navigate]);

  const canLogin = email.trim().length > 3;

  const login = (e: FormEvent) => {
    e.preventDefault();
    if (!canLogin) return;
    localStorage.setItem(STORAGE_LOGGED_IN_KEY, "true");
    toast({ title: "Logged in", description: "Welcome to the founder portal (demo)." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="container h-16 flex items-center justify-between">
          <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => navigate("/")}>
            ← Back to home
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-12 max-w-xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-accent" />
              Login
            </CardTitle>
            <CardDescription>Login unlocks only after you apply.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aarav@college.edu"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Demo login: no password/OTP required.
                </p>
                <Button type="submit" variant="hero" disabled={!canLogin}>
                  Continue <ArrowRight />
                </Button>
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/signup")}>
                Edit application
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

