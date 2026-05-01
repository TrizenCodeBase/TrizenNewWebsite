import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Sparkles, Wallet, Users, Rocket, Scale, Network,
  Brain, Check, Plus, Minus, Calendar, GraduationCap, FlaskConical, Target,
  CheckCircle2, XCircle, Clock, FileText, Video, Trophy, AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logoLight from "@/assets/trizen-logo.png";
import logoDark from "@/assets/trizen-logo-dark.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";
import founder3 from "@/assets/founder-3.jpg";

// Dummy Mentors
const mentors = [
  { name: "Mentor 1", role: "Industry Expert", img: "https://ui-avatars.com/api/?name=Mentor+1&background=random" },
  { name: "Mentor 2", role: "Industry Expert", img: "https://ui-avatars.com/api/?name=Mentor+2&background=random" },
  { name: "Mentor 3", role: "Industry Expert", img: "https://ui-avatars.com/api/?name=Mentor+3&background=random" },
  { name: "Mentor 4", role: "Industry Expert", img: "https://ui-avatars.com/api/?name=Mentor+4&background=random" },
];

const colleges = ["IIT Bombay", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy", "VIT", "DTU", "IIT Madras", "IIIT Delhi"];

const stack = [
  { icon: Brain, title: "Modern Curriculum", desc: "Learn with the latest tools and frameworks — guided by industry experts." },
  { icon: Wallet, title: "Resource Grant", desc: "Financial support to help you focus on building without distractions." },
  { icon: Users, title: "Dedicated Mentorship", desc: "Weekly sessions with experienced operators and founders." },
  { icon: Network, title: "Industry Network", desc: "Connect with key stakeholders and potential partners when you're ready." },
  { icon: Scale, title: "Operational Support", desc: "Assistance with company setup, legal frameworks, and compliance." },
  { icon: Rocket, title: "Showcase Event", desc: "Present your progress to a curated audience at the end of the program." },
];

const timeline = [
  { week: "Week 1–2", title: "Discovery", desc: "Validate problem, customer interviews, narrow your wedge." },
  { week: "Week 3–4", title: "Build", desc: "Ship MVP with the AI-native stack. Daily build standups." },
  { week: "Week 5–6", title: "Launch", desc: "Go-to-market sprint. First 100 users, first revenue." },
  { week: "Week 7–8", title: "Scale", desc: "Metrics, hiring playbook, fundraising prep." },
  { week: "Week 9", title: "Demo Day", desc: "Pitch to investors. Term sheets in the room." },
];

const founders = [
  { name: "Aarav Mehta", college: "IIT Bombay '25", startup: "Loop AI", quote: "Trizen helped us go from a hackathon repo to a $400K pre-seed in 11 weeks.", img: founder1 },
  { name: "Riya Sharma", college: "BITS Pilani '24", startup: "Klar Health", quote: "The mentor network unlocked enterprise pilots we couldn't have reached alone.", img: founder2 },
  { name: "Karan Iyer", college: "IIIT Hyderabad '25", startup: "Vector Forge", quote: "The stipend let me build full-time without dropping out. Game changer.", img: founder3 },
];



const faqs = [
  { q: "How much equity does Trizen take?", a: "Trizen provides the program and founder stipend in exchange for equity." },
  { q: "Do I need to drop out?", a: "No. Trizen is built around the academic calendar. The stipend lets you ship full-time without leaving school." },
  { q: "Is the program remote?", a: "Hyderabad" },
  { q: "Who is eligible?", a: "Currently enrolled 3rd/4th/final-year students at any Indian college. Solo founders and teams of up to 3 are welcome. You should be able to commit 20+ hours/week." },
  { q: "What happens after the cohort?", a: "Lifetime access to the alumni network, follow-on capital intros, and ongoing mentorship as you scale." },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const navigate = useNavigate();

  const onApply = () => navigate("/signup");
  const onEnquiry = () => navigate("/enquiry");
  const onMentors = () => navigate("/mentors");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <img src={logoLight} alt="Trizen Ventures" className="h-10 md:h-12 w-auto block dark:hidden" />
            <img src={logoDark} alt="Trizen Ventures" className="h-10 md:h-12 w-auto hidden dark:block dark:brightness-0 dark:invert" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#home" className="text-foreground font-medium hover:text-foreground transition">Home</a>
            <a href="#program" className="hover:text-foreground transition">Program</a>
            <a href="#curriculum" className="hover:text-foreground transition">Curriculum</a>
            <a href="#mentors" className="hover:text-foreground transition">Mentors</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
            <button
              type="button"
              className="hover:text-foreground transition"
              onClick={onEnquiry}
            >
              Enquiry
            </button>
            <button
              type="button"
              className="hover:text-foreground transition"
              onClick={onMentors}
            >
              Contact mentors
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="hero" size="sm" onClick={onApply}>
              Apply now <ArrowRight />
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-soft-gradient scroll-mt-20">
        <div className="absolute inset-0 bg-hero-gradient" aria-hidden />
        <div className="container relative pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI-First Founder Program
          </div>
          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-5xl mx-auto">
            Build your startup{" "}
            <span className="text-gradient">before you graduate</span>
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Trizen Ventures gives 3rd & 4th year students the capital, mentorship and AI-native infrastructure to build a real company — before they graduate.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={onApply}>Apply now <ArrowRight /></Button>
            <Button variant="outline" size="xl" onClick={onEnquiry}>Book a 15-min call</Button>
          </div>
          <p className="mt-6 text-sm">
            <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-full font-semibold">Coming soon</span>
          </p>

          {/* Stats Removed for now */}
        </div>
      </section>



      {/* TRACKS */}
      <section id="program" className="container py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest">Two tracks</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Pick where you are today</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { icon: FlaskConical, tag: "Ideation Track", title: "I have a concept", desc: "Validate, design, and plan your product in 4 weeks with hands-on guidance.", bullets: ["Concept validation", "Weekly feedback sessions", "Design credits"] },
            { icon: Target, tag: "Growth Track", title: "I have an MVP", desc: "Scale faster with targeted growth strategies and performance metrics.", bullets: ["Growth planning", "Performance tracking", "Investor readiness"] },
          ].map((t) => (
            <div key={t.tag} className="group relative rounded-3xl bg-card shadow-card border border-border p-8 hover:border-primary/50 transition-all hover:shadow-glow">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-11 w-11 rounded-xl bg-brand-gradient grid place-items-center">
                  <t.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{t.tag}</span>
              </div>
              <h3 className="text-2xl font-bold">{t.title}</h3>
              <p className="mt-3 text-muted-foreground">{t.desc}</p>
              <ul className="mt-6 space-y-2">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent" /> {b}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-8 w-full" onClick={onApply}>Apply now <ArrowRight /></Button>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUM TIMELINE */}
      <section id="curriculum" className="bg-muted/40 border-y border-border">
        <div className="container py-28">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest">9-week curriculum</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">From idea to Demo Day</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <div key={t.week} className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                    <div className="absolute left-2 md:left-1/2 top-2 -translate-x-1/2 h-5 w-5 rounded-full bg-brand-gradient ring-4 ring-background" />
                    <p className="text-accent font-semibold text-sm">{t.week}</p>
                    <h3 className="mt-1 text-2xl font-bold">{t.title}</h3>
                    <p className="mt-2 text-muted-foreground">{t.desc}</p>
                  </div>
                  <div />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER STACK */}
      <section className="container py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest">What you get</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">A complete founder stack</h2>
          <p className="mt-4 text-muted-foreground">Everything a student founder needs to go from zero to a venture-fundable startup.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((f) => (
            <div key={f.title} className="rounded-2xl bg-card shadow-card border border-border p-7 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
              <div className="h-11 w-11 rounded-xl bg-secondary grid place-items-center mb-5">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENTORS */}
      <section id="mentors" className="bg-muted/40 border-y border-border">
        <div className="container py-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Mentor wall</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {mentors.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden border border-border mb-4 group-hover:shadow-glow transition-all">
                  <img src={m.img} alt={m.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" onClick={onMentors}>
              Contact mentors <ArrowRight />
            </Button>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="bg-muted/40 border-y border-border">
        <div className="container py-28 max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest">FAQ</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Questions, answered</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <button
                key={f.q}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-lg">{f.q}</h3>
                  {openFaq === i ? <Minus className="h-5 w-5 text-accent shrink-0" /> : <Plus className="h-5 w-5 text-muted-foreground shrink-0" />}
                </div>
                {openFaq === i && <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container py-12 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logoLight} alt="Trizen Ventures" className="h-12 w-auto mb-4 block dark:hidden" />
            <img src={logoDark} alt="Trizen Ventures" className="h-12 w-auto mb-4 hidden dark:block dark:brightness-0 dark:invert" />
            <p className="text-muted-foreground text-sm max-w-sm">
              Capital, mentorship and AI-native infrastructure for India's next generation of student founders.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Program</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#program" className="hover:text-foreground">Tracks</a></li>
              <li><a href="#curriculum" className="hover:text-foreground">Curriculum</a></li>
              <li><a href="#mentors" className="hover:text-foreground">Mentors</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Press</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="container py-6 border-t border-border text-sm text-muted-foreground flex flex-col sm:flex-row justify-between gap-3">
          <p>© 2026 Trizen Ventures. All rights reserved.</p>
          <div className="flex gap-6">
            <button type="button" className="hover:text-foreground" onClick={() => navigate("/privacy")}>Privacy</button>
            <button type="button" className="hover:text-foreground" onClick={() => navigate("/terms")}>Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
