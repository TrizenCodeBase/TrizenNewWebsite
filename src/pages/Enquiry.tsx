import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
];

type EnquiryDraft = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  preferredTime: string;
  message: string;
};

const STORAGE_KEY = "trizen.enquiry.draft";

export default function Enquiry() {
  const navigate = useNavigate();

  const [draft, setDraft] = useState<EnquiryDraft>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { name: "", email: "", countryCode: "+91", phone: "", preferredTime: "", message: "" };
    }
    try {
      const parsed = JSON.parse(raw) as Partial<EnquiryDraft>;
      return {
        name: parsed.name ?? "",
        email: parsed.email ?? "",
        countryCode: parsed.countryCode ?? "+91",
        phone: parsed.phone ?? "",
        preferredTime: parsed.preferredTime ?? "",
        message: parsed.message ?? "",
      };
    } catch {
      return { name: "", email: "", countryCode: "+91", phone: "", preferredTime: "", message: "" };
    }
  });

  const canSubmit = useMemo(() => {
    return draft.name.trim() && draft.email.trim() && draft.phone.trim();
  }, [draft.email, draft.name, draft.phone]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    toast({
      title: "Enquiry received",
      description: "We’ll reach out to schedule a 15‑minute call.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="container h-16 flex items-center justify-between">
          <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => navigate("/")}>
            ← Back to home
          </button>
        </div>
      </header>

      <main className="container py-12 max-w-2xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Book a 15‑minute call
            </CardTitle>
            <CardDescription>Share your details and we’ll contact you to confirm a time.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={draft.email}
                    onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                    placeholder="you@college.edu"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone / WhatsApp</Label>
                  <div className="flex gap-2">
                    <div className="relative shrink-0">
                      <select
                        id="countryCode"
                        value={draft.countryCode}
                        onChange={(e) => setDraft((d) => ({ ...d, countryCode: e.target.value }))}
                        className="appearance-none h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <Input
                      id="phone"
                      value={draft.phone}
                      onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                      placeholder="9xxxx xxxxx"
                      autoComplete="tel"
                      required
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred time (optional)</Label>
                  <Input
                    id="preferredTime"
                    value={draft.preferredTime}
                    onChange={(e) => setDraft((d) => ({ ...d, preferredTime: e.target.value }))}
                    placeholder="Fri 5–7pm IST"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea
                  id="message"
                  value={draft.message}
                  onChange={(e) => setDraft((d) => ({ ...d, message: e.target.value }))}
                  placeholder="What do you want to talk about? (eligibility, track selection, fundraising, etc.)"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  We’ll respond within 24–48 hours.
                </p>
                <Button type="submit" variant="hero" disabled={!canSubmit}>
                  Send enquiry <ArrowRight />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

