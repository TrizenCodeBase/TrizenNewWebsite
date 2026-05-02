import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Careers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-16">
          <Button variant="ghost" className="gap-2" onClick={() => navigate("/")}>
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[#3F378B]">Careers at Trizen</h1>
          <p className="text-xl text-muted-foreground">Join our team and help build the future of entrepreneurship.</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Explore Opportunities</h2>
          <p className="text-muted-foreground mb-6">
            We are always on the lookout for talented individuals to join our mission.
            Explore our open positions and find where you fit best!
          </p>
          <Button onClick={() => window.open("https://careers.trizenventures.com/", "_blank", "noopener,noreferrer")} className="bg-[#3F378B] hover:bg-[#3F378B]/90 text-white">
            View Open Positions
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Careers;
