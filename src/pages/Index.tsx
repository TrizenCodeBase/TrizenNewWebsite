import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Sparkles, Wallet, Users, Rocket, Scale, Network,
  Brain, Check, Plus, Minus, Calendar, GraduationCap, FlaskConical, Target,
  CheckCircle2, XCircle, Clock, FileText, Video, Trophy, AlertCircle, MapPin,
  Briefcase, Building, BookOpen, Phone, Mail, Globe, Shield, FileText as Document,
  Upload, Lightbulb, Code, TrendingUp, ChevronDown, ChevronUp, ChevronRight, Filter,
} from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logoLight from "@/assets/trizen-logo.png";
import logoDark from "@/assets/trizen-logo-dark.png";
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";
import founder3 from "@/assets/founder-3.jpg";
import { ThemeToggle } from "@/components/ThemeToggle";


const colleges = ["IIT Bombay", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy", "VIT", "DTU", "IIT Madras", "IIIT Delhi"];

const stack = [
  { icon: Brain, title: "Modern Curriculum", desc: "Learn with the latest tools and frameworks — build independently." },
  { icon: Wallet, title: "Resource Grant", desc: "Financial support to help you focus on building without distractions." },
  { icon: Users, title: "Track Your Progress", desc: "Monitor your development and track your milestones." },
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
  { name: "Riya Sharma", college: "BITS Pilani '24", startup: "Klar Health", quote: "The network unlocked enterprise pilots we couldn't have reached alone.", img: founder2 },
  { name: "Karan Iyer", college: "IIIT Hyderabad '25", startup: "Vector Forge", quote: "The stipend let me build full-time without dropping out. Game changer.", img: founder3 },
];



const faqs = [
  { q: "How much equity does Trizen take?", a: "Trizen provides the program and founder stipend in exchange for equity." },
  { q: "Do I need to drop out?", a: "No. Trizen is built around the academic calendar. The stipend lets you ship full-time without leaving school." },
  { q: "Is the program remote?", a: "Hyderabad" },
  { q: "Who is eligible?", a: "Currently enrolled 3rd/4th/final-year students at any Indian college. Solo founders and teams of up to 3 are welcome. You should be able to commit 20+ hours/week." },
  { q: "What happens after the cohort?", a: "Lifetime access to the alumni network, follow-on capital intros, and ongoing support as you scale." },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const navigate = useNavigate();

  const onApply = () => navigate("/signup");
  const onEnquiry = () => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#3F378B] dark:bg-black border-b border-[#3F378B]/20 dark:border-gray-800">
        <div className="container flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <img src={logoDark} alt="Trizen Ventures" className="h-8 md:h-10 w-auto block dark:hidden dark:brightness-0 dark:invert" />
            <img src={logoLight} alt="Trizen Ventures" className="h-8 md:h-10 w-auto hidden dark:block" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/90">
            <a href="#home" className="text-white font-medium hover:text-white/80 transition">Home</a>
            <a href="#faq" className="hover:text-white/80 transition">FAQ</a>
            <button
              type="button"
              className="hover:text-white/80 transition"
              onClick={onEnquiry}
            >
              Enquiry
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/signup")} className="border-white text-[#3F378B] hover:bg-white hover:text-[#3F378B] transition-colors">
              Signup
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/login")} className="border-white text-[#3F378B] hover:bg-white hover:text-[#3F378B] transition-colors">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-[#3F378B] dark:bg-black scroll-mt-20">
        <div className="container relative pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-white" />
            For 3rd & 4th Year Students
          </div>
          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-5xl mx-auto text-white">
            Build Your Startup While You're Still in College
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed">
            Submit your project or idea. Get selected. Build your startup — and earn a monthly stipend.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="xl" onClick={() => document.getElementById('select-problem')?.scrollIntoView({ behavior: 'smooth' })} className="border-white text-[#3F378B] hover:bg-white hover:text-[#3F378B] transition-colors" style={{color: '#3F378B'}}>See How It Works</Button>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Selection-based program • Limited seats
          </p>

          {/* Stats Removed for now */}
        </div>
      </section>

      {/* PROBLEM NAVIGATION BAR */}
      <section id="select-problem" className="bg-muted/30 border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/problem-library")}
              className="flex items-center gap-2 bg-[#3F378B] text-white hover:bg-[#3F378B]/90 border-[#3F378B] transition-colors"
            >
              Select a Problem Statement
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* PROCESS BOXES */}
      <section className="container py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3F378B]">How It Works</h2>
          <p className="text-lg text-muted-foreground">Follow these simple steps to build your startup while still in college</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50" onClick={onApply}>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Apply & Submit</h3>
            <p className="text-muted-foreground">Share your idea, project, or GitHub repo to get started</p>
          </div>
          <button 
            type="button"
            onClick={() => navigate("/application-status")}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-[#3F378B]/50 transition-all text-left group cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#3F378B]/20 transition-colors">
              <Check className="h-6 w-6 text-primary group-hover:text-[#3F378B] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-[#3F378B] transition-colors">Application Status</h3>
            <p className="text-muted-foreground">Track your application review and selection status in your dashboard</p>
            <div className="mt-3 text-sm text-[#3F378B] opacity-0 group-hover:opacity-100 transition-opacity">
              Click to submit your application →
            </div>
          </button>
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Build Your Startup</h3>
            <p className="text-muted-foreground">Work on your product and improve it independently</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn Stipend</h3>
            <p className="text-muted-foreground">Monthly stipend based on your progress tracking</p>
          </div>
        </div>
      </section>

      
      {/* FOUNDER STACK */}
      <section className="container py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#3F378B] text-sm font-semibold uppercase tracking-widest">What you get</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#3F378B]">A complete founder stack</h2>
          <p className="mt-4 text-muted-foreground">Everything a student founder needs to go from zero to a venture-fundable startup.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((f) => (
            <div key={f.title} className="rounded-2xl bg-card shadow-card border border-border p-7 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
              <div className="h-11 w-11 rounded-xl bg-secondary grid place-items-center mb-5">
                <f.icon className="h-5 w-5 text-[#3F378B]" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-muted/40 border-y border-border">
        <div className="container py-28 max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-[#3F378B] text-sm font-semibold uppercase tracking-widest">FAQ</p>
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
                  {openFaq === i ? <Minus className="h-5 w-5 text-[#3F378B] shrink-0" /> : <Plus className="h-5 w-5 text-[#3F378B] shrink-0" />}
                </div>
                {openFaq === i && <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer id="footer" className="bg-primary-foreground text-primary-foreground py-6">
        {/* Main sections row */}
        <div className="container grid grid-cols-1 md:grid-cols-5 gap-6">
          <div>
            <img src={logoLight} alt="Trizen Careers" className="h-8 w-auto block dark:hidden mb-3" />
            <img src={logoDark} alt="Trizen Careers" className="h-8 w-auto hidden dark:block dark:brightness-0 dark:invert mb-3" />
            <h3 className="text-lg font-semibold mb-2">Trizen Careers</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Join us in building innovative solutions that impact millions of people worldwide. Discover your next career opportunity with us.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary-foreground"><FaLinkedin size={16} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary-foreground"><FaTwitter size={16} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary-foreground"><FaFacebook size={16} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary-foreground"><FaInstagram size={16} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary-foreground"><FaYoutube size={16} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-primary">
              <Briefcase className="h-4 w-4" />
              Careers
            </h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Browse Jobs</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Early Careers</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Life at Company</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Benefits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-primary">
              <Building className="h-4 w-4" />
              Company
            </h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">About Us</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Our Values</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Leadership</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">News</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-primary">
              <BookOpen className="h-4 w-4" />
              Resources
            </h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Interview Tips</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">FAQs</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Contact HR</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Locations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-primary">
              <Shield className="h-4 w-4" />
              Legal
            </h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Terms of Service</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Cookie Policy</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary-foreground">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        {/* Contact and address row */}
        <div className="container mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-primary">
                <Phone className="h-3 w-3" />
                Contact Information
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground font-medium">
                  <Phone className="h-3 w-3" />
                  +91 8639648822
                </div>
                <div className="flex items-center gap-1 text-muted-foreground font-medium">
                  <Mail className="h-3 w-3" />
                  careers@trizenventures.com
                </div>
                <div className="flex items-center gap-1 text-muted-foreground font-medium">
                  <Globe className="h-3 w-3" />
                  trizenventures.com
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-primary">
                <MapPin className="h-3 w-3" />
                Registered Office
              </h4>
              <div className="flex items-start gap-1">
                <MapPin className="h-3 w-3 mt-0.5" />
                <div className="text-muted-foreground font-medium">
                  65-3-747/18, Vayaputranagara area,<br />
                  Sriharipuram, Gajuwaka,<br />
                  Visakhapatnam (Urban), 530026,<br />
                  Andhra Pradesh, India
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-muted-foreground">
                © 2024 Trizen Careers. All rights reserved.<br />
                Built with ❤️ for amazing candidates worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
