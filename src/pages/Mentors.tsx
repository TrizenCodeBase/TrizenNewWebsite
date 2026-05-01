import { useMemo } from "react";
import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MentorContact = {
  name: string;
  role: string;
  img?: string;
};

const MENTORS: MentorContact[] = [
  { name: "Rohan Kapoor", role: "Ex-Razorpay, Founder Stripe Alum" },
  { name: "Ananya Iyer", role: "Partner, Lightspeed India" },
  { name: "Vikram Shah", role: "Founding Eng, OpenAI India" },
  { name: "Priya Nair", role: "GP, Blume Ventures" },
];

// Single concierge number (edit to your real number).
const CONCIERGE_E164 = "+919999999999";

function toWhatsAppUrl(e164: string, text: string) {
  const digits = e164.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export default function Mentors() {
  const mentors = useMemo(() => MENTORS, []);

  return (
    <div className="flex-1 p-7">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold">Mentors</h1>
        <p className="mt-3 text-muted-foreground text-sm">
          Message us on WhatsApp or call — we’ll route you to the right mentor and schedule time.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Update the concierge number in `src/pages/Mentors.tsx` (currently set to a placeholder).
        </p>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentors.map((m) => {
          const waText = `Hi Trizen — I’d like to talk to ${m.name} (${m.role}). I’m applying to Cohort 04.`;
          return (
            <Card key={m.name} className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">{m.name}</CardTitle>
                <CardDescription>{m.role}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button asChild variant="hero" className="w-full">
                  <a href={toWhatsAppUrl(CONCIERGE_E164, waText)} target="_blank" rel="noreferrer">
                    WhatsApp <MessageCircle className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={`tel:${CONCIERGE_E164}`}>
                    Call <Phone className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

