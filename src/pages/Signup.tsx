import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

type UserRegistration = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const STORAGE_USERS_KEY = "trizen.users";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegistration>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || "[]");
    
    // Check if email already exists
    if (existingUsers.some((user: any) => user.email === formData.email)) {
      toast({
        title: "Error",
        description: "An account with this email already exists",
        variant: "destructive"
      });
      return;
    }

    // Save new user
    const newUser = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(existingUsers));

    toast({
      title: "Success!",
      description: "Your account has been created. Please log in.",
    });

    navigate("/login");
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
            <CardTitle className="text-[#3F378B]">Create Account</CardTitle>
            <CardDescription>
              Sign up to start building your startup while still in college
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#3F378B] hover:bg-[#3F378B]/90 text-white" variant="hero">
                Create Account <ArrowRight />
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => navigate("/login")}
                  >
                    Log in
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
