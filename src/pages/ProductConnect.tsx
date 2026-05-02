import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductConnect() {
  const navigate = useNavigate();

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

      <main className="container py-12 max-w-4xl">
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#3F378B]">Trizen Connect</CardTitle>
            <CardDescription className="text-lg">
              Network with founders and industry experts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#3F378B] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect with talented founders and industry experts to build meaningful relationships and grow your network.
              </p>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>Features:</strong>
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li>• Founder networking opportunities</li>
                  <li>• Industry mentor connections</li>
                  <li>• Collaboration platform</li>
                  <li>• Resource sharing</li>
                </ul>
              </div>
              
              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  onClick={() => window.open('https://connect.trizenventures.com/', '_blank', 'noopener,noreferrer')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Connect Platform
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
