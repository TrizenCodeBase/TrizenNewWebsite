import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductCommunity() {
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
            <CardTitle className="text-2xl font-bold text-[#3F378B]">Trizen Community</CardTitle>
            <CardDescription className="text-lg">
              Join our vibrant startup community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#3F378B] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect with like-minded entrepreneurs, share experiences, and grow together in our supportive community.
              </p>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>Community benefits:</strong>
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li>• Peer networking</li>
                  <li>• Knowledge sharing</li>
                  <li>• Collaboration opportunities</li>
                  <li>• Mentorship programs</li>
                  <li>• Events & meetups</li>
                </ul>
              </div>
              
              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  onClick={() => window.open('https://community.trizenventures.com/', '_blank', 'noopener,noreferrer')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Join Community
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
