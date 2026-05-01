import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, CheckCircle2, ChevronDown, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

type CountryDialCode = {
  cca2: string;
  name: string;
  dial: string;
  flag?: string;
};

type ApplicationDraft = {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  college: string;
  course: string;
  year: "1" | "2" | "3" | "4" | "5";
  linkedIn?: string;
  github?: string;
  track: "build" | "scale";
  stage: "idea" | "prototype" | "launched" | "revenue";
  teamSize: "1" | "2" | "3" | "4+";
  hoursPerWeek: number;
  idea: string;
  whyNow: string;
};

const STORAGE_SUBMITTED_KEY = "trizen.application.submitted";
const STORAGE_APPLICATION_KEY = "trizen.application.data";

function parseLegacyPhone(phone: string | undefined) {
  if (!phone) return null;
  const m = phone.trim().match(/^(\+\d{1,4})\s*(.*)$/);
  if (!m) return null;
  return { phoneCountryCode: m[1], phoneNumber: m[2] };
}

function getEligibility(draft: ApplicationDraft) {
  const yearOk = draft.year === "3" || draft.year === "4" || draft.year === "5";
  const teamOk = draft.teamSize === "1" || draft.teamSize === "2" || draft.teamSize === "3";
  const hoursOk = Number.isFinite(draft.hoursPerWeek) && draft.hoursPerWeek >= 20;

  const issues: string[] = [];
  if (!yearOk) issues.push("Only 3rd/4th/final-year students are eligible.");
  if (!teamOk) issues.push("Teams must be 1–3 founders.");
  if (!hoursOk) issues.push("You should be able to commit at least 20 hrs/week.");

  return { eligible: yearOk && teamOk && hoursOk, issues };
}

export default function Signup() {
  const navigate = useNavigate();
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const [countryCodes, setCountryCodes] = useState<CountryDialCode[]>([]);
  const [countryCodesStatus, setCountryCodesStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const alreadySubmitted = useMemo(() => {
    return localStorage.getItem(STORAGE_SUBMITTED_KEY) === "true";
  }, []);

  const [draft, setDraft] = useState<ApplicationDraft>(() => {
    const raw = localStorage.getItem(STORAGE_APPLICATION_KEY);
    if (!raw) {
      return {
        fullName: "",
        email: "",
        phoneCountryCode: "+91",
        phoneNumber: "",
        college: "",
        course: "",
        year: "3",
        linkedIn: "",
        github: "",
        track: "build",
        stage: "prototype",
        teamSize: "1",
        hoursPerWeek: 20,
        idea: "",
        whyNow: "",
      };
    }
    try {
      const parsed = JSON.parse(raw) as Partial<ApplicationDraft> & { phone?: string };
      const legacyPhone = parseLegacyPhone(parsed.phone);
      return {
        fullName: parsed.fullName ?? "",
        email: parsed.email ?? "",
        phoneCountryCode: parsed.phoneCountryCode ?? legacyPhone?.phoneCountryCode ?? "+91",
        phoneNumber: parsed.phoneNumber ?? legacyPhone?.phoneNumber ?? "",
        college: parsed.college ?? "",
        course: parsed.course ?? "",
        year: parsed.year ?? "3",
        linkedIn: parsed.linkedIn ?? "",
        github: parsed.github ?? "",
        track: parsed.track ?? "build",
        stage: parsed.stage ?? "prototype",
        teamSize: parsed.teamSize ?? "1",
        hoursPerWeek: parsed.hoursPerWeek ?? 20,
        idea: parsed.idea ?? "",
        whyNow: parsed.whyNow ?? "",
      };
    } catch {
      return {
        fullName: "",
        email: "",
        phoneCountryCode: "+91",
        phoneNumber: "",
        college: "",
        course: "",
        year: "3",
        linkedIn: "",
        github: "",
        track: "build",
        stage: "prototype",
        teamSize: "1",
        hoursPerWeek: 20,
        idea: "",
        whyNow: "",
      };
    }
  });

  const eligibility = getEligibility(draft);

  const canSubmit =
    draft.fullName.trim() &&
    draft.email.trim() &&
    draft.phoneCountryCode.trim() &&
    draft.phoneNumber.trim() &&
    draft.college.trim() &&
    draft.course.trim() &&
    draft.idea.trim() &&
    draft.whyNow.trim();

  const selectedCountry = useMemo(() => {
    return countryCodes.find((c) => c.dial === draft.phoneCountryCode);
  }, [countryCodes, draft.phoneCountryCode]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setCountryCodesStatus("loading");
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,cca2,flag");
        if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
        const data = (await res.json()) as Array<{
          name?: { common?: string };
          idd?: { root?: string; suffixes?: string[] };
          cca2?: string;
          flag?: string;
        }>;
        const items: CountryDialCode[] = [];
        for (const c of data) {
          const root = c.idd?.root;
          const suffixes = c.idd?.suffixes ?? [];
          const name = c.name?.common;
          const cca2 = c.cca2;
          if (!root || !name || !cca2 || suffixes.length === 0) continue;
          for (const s of suffixes) {
            const dial = `${root}${s}`;
            if (!dial.startsWith("+")) continue;
            items.push({ cca2, name, dial, flag: c.flag });
          }
        }
        // De-dupe by dial+name
        const unique = new Map<string, CountryDialCode>();
        for (const item of items) unique.set(`${item.dial}|${item.name}`, item);
        const sorted = Array.from(unique.values()).sort((a, b) => {
          const byDial = a.dial.localeCompare(b.dial);
          return byDial !== 0 ? byDial : a.name.localeCompare(b.name);
        });
        if (cancelled) return;
        setCountryCodes(sorted);
        setCountryCodesStatus("ready");
      } catch {
        if (cancelled) return;
        setCountryCodesStatus("error");
        setCountryCodes([
          { cca2: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
          { cca2: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
          { cca2: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
          { cca2: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
          { cca2: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
        ]);
      }
    };

    if (countryCodesStatus === "idle") void load();
    return () => {
      cancelled = true;
    };
  }, [countryCodesStatus]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    localStorage.setItem(STORAGE_APPLICATION_KEY, JSON.stringify(draft));

    if (eligibility.eligible) {
      localStorage.setItem(STORAGE_SUBMITTED_KEY, "true");
      toast({
        title: "Application submitted",
        description: "You can now log in to the founder portal.",
      });
      navigate("/login");
      return;
    }

    localStorage.removeItem(STORAGE_SUBMITTED_KEY);
    toast({
      title: "Saved — not eligible yet",
      description: "We saved your details. You’ll be able to log in once you meet the eligibility criteria.",
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
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-12 max-w-2xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Apply to Trizen Cohort 04</CardTitle>
            <CardDescription>Fill in a few details. If you’re eligible, you can log in right after submitting.</CardDescription>
          </CardHeader>
          <CardContent>
            {alreadySubmitted ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You’ve already submitted an application on this device.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" onClick={() => navigate("/login")}>
                    Go to login <ArrowRight />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem(STORAGE_SUBMITTED_KEY);
                      toast({ title: "You can apply again", description: "Submission flag cleared for this device." });
                      navigate(0);
                    }}
                  >
                    Re-apply
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                {/* Eligibility */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">Eligibility check</p>
                      <p className="text-xs text-muted-foreground">
                        Criteria: 3rd/4th/final year · 1–3 founders · 20+ hrs/week commitment
                      </p>
                    </div>
                    {eligibility.eligible ? (
                      <Badge className="gap-1 bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]/90">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Eligible
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3.5 w-3.5" /> Not eligible yet
                      </Badge>
                    )}
                  </div>
                  {!eligibility.eligible ? (
                    <ul className="mt-3 space-y-1 text-xs text-muted-foreground list-disc pl-4">
                      {eligibility.issues.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {/* Personal */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold">Personal details</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full name</Label>
                      <Input
                        id="fullName"
                        value={draft.fullName}
                        onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
                        placeholder="Aarav Mehta"
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
                        placeholder="aarav@college.edu"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone / WhatsApp</Label>
                      <div className="flex gap-2">
                        <Popover open={countryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-[150px] justify-between"
                              aria-label="Select country code"
                            >
                              <span className="truncate">
                                {selectedCountry?.flag ? `${selectedCountry.flag} ` : ""}
                                {draft.phoneCountryCode}
                              </span>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[340px]" align="start">
                            <Command>
                              <CommandInput placeholder="Search country or code…" />
                              <CommandList>
                                <CommandEmpty>
                                  {countryCodesStatus === "loading" ? "Loading countries…" : "No matches."}
                                </CommandEmpty>
                                <CommandGroup>
                                  {countryCodes.map((c) => (
                                    <CommandItem
                                      key={`${c.cca2}-${c.dial}-${c.name}`}
                                      value={`${c.name} ${c.dial} ${c.cca2}`}
                                      onSelect={() => {
                                        setDraft((d) => ({ ...d, phoneCountryCode: c.dial }));
                                        setCountryPopoverOpen(false);
                                      }}
                                      className="flex items-center justify-between"
                                    >
                                      <span className="min-w-0 truncate">
                                        {c.flag ? `${c.flag} ` : ""}
                                        {c.name}
                                      </span>
                                      <span className="flex items-center gap-2 shrink-0">
                                        <span className="text-xs text-muted-foreground">{c.dial}</span>
                                        {draft.phoneCountryCode === c.dial ? <Check className="h-4 w-4" /> : null}
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <Input
                          id="phone"
                          value={draft.phoneNumber}
                          onChange={(e) => setDraft((d) => ({ ...d, phoneNumber: e.target.value }))}
                          placeholder="Phone number"
                          autoComplete="tel"
                          required
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {countryCodesStatus === "error"
                          ? "Couldn’t load all countries — showing a fallback list."
                          : "Select country code and enter your number."}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedIn">LinkedIn (optional)</Label>
                      <Input
                        id="linkedIn"
                        value={draft.linkedIn}
                        onChange={(e) => setDraft((d) => ({ ...d, linkedIn: e.target.value }))}
                        placeholder="https://linkedin.com/in/…"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub (optional)</Label>
                    <Input
                      id="github"
                      value={draft.github}
                      onChange={(e) => setDraft((d) => ({ ...d, github: e.target.value }))}
                      placeholder="https://github.com/…"
                    />
                  </div>
                </div>

                {/* University */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold">University</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="college">College</Label>
                      <Input
                        id="college"
                        value={draft.college}
                        onChange={(e) => setDraft((d) => ({ ...d, college: e.target.value }))}
                        placeholder="IIT Bombay"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Course / Branch</Label>
                      <Input
                        id="course"
                        value={draft.course}
                        onChange={(e) => setDraft((d) => ({ ...d, course: e.target.value }))}
                        placeholder="Computer Science"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Year of study</Label>
                      <Select value={draft.year} onValueChange={(v) => setDraft((d) => ({ ...d, year: v as ApplicationDraft["year"] }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st year</SelectItem>
                          <SelectItem value="2">2nd year</SelectItem>
                          <SelectItem value="3">3rd year</SelectItem>
                          <SelectItem value="4">4th year</SelectItem>
                          <SelectItem value="5">Final year / 5th year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Weekly commitment</Label>
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        value={draft.hoursPerWeek}
                        onChange={(e) => setDraft((d) => ({ ...d, hoursPerWeek: Number(e.target.value) }))}
                        placeholder="20"
                        required
                      />
                      <p className="text-[11px] text-muted-foreground">We recommend 20+ hrs/week.</p>
                    </div>
                  </div>
                </div>

                {/* Startup */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold">Startup</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Track</Label>
                      <Select value={draft.track} onValueChange={(v) => setDraft((d) => ({ ...d, track: v as ApplicationDraft["track"] }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select track" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="build">Build Track (idea → MVP)</SelectItem>
                          <SelectItem value="scale">Scale Track (prototype → growth)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stage</Label>
                      <Select value={draft.stage} onValueChange={(v) => setDraft((d) => ({ ...d, stage: v as ApplicationDraft["stage"] }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Just an idea</SelectItem>
                          <SelectItem value="prototype">Working prototype</SelectItem>
                          <SelectItem value="launched">Launched to users</SelectItem>
                          <SelectItem value="revenue">Revenue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Team size</Label>
                      <Select
                        value={draft.teamSize}
                        onValueChange={(v) => setDraft((d) => ({ ...d, teamSize: v as ApplicationDraft["teamSize"] }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Solo</SelectItem>
                          <SelectItem value="2">2 founders</SelectItem>
                          <SelectItem value="3">3 founders</SelectItem>
                          <SelectItem value="4+">4+ founders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idea">What are you building?</Label>
                      <p className="text-[11px] text-muted-foreground">Short description is fine.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      id="idea"
                      value={draft.idea}
                      onChange={(e) => setDraft((d) => ({ ...d, idea: e.target.value }))}
                      placeholder="Problem, wedge, and who you’re targeting (2–5 sentences)."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whyNow">Why now?</Label>
                    <Textarea
                      id="whyNow"
                      value={draft.whyNow}
                      onChange={(e) => setDraft((d) => ({ ...d, whyNow: e.target.value }))}
                      placeholder="Why this team and why this moment? What will you do in the next 8–10 weeks?"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to be contacted about your application.
                  </p>
                  <Button type="submit" variant="hero" disabled={!canSubmit}>
                    {eligibility.eligible ? "Submit application" : "Save details"} <ArrowRight />
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

