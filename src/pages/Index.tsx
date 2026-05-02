import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
import logoLight from "@/assets/trizen-logo.jpg";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [user, setUser] = useState<any>(null);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const userData = localStorage.getItem("trizen.user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("trizen.user");
    localStorage.removeItem("trizen.auth.loggedIn");
    setUser(null);
    navigate("/");
  };

  const onEnquiry = () => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#3F378B] dark:bg-black border-b border-[#3F378B]/20 dark:border-gray-800">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <img src={logoDark} alt="Trizen Logo" className="h-14 object-contain cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/90">
            <a href="#home" className="text-white font-medium hover:text-white/80 transition">Home</a>
            <div className="relative">
              <button
                className="hover:text-white/80 transition flex items-center gap-1"
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                onBlur={() => setTimeout(() => setProductsDropdownOpen(false), 200)}
              >
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
              {productsDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[9999]">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/product-hr");
                    }}
                  >
                    TrizenHR
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/product-academy");
                    }}
                  >
                    Academy
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/product-courses");
                    }}
                  >
                    Courses
                  </a>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="hover:text-white/80 transition flex items-center gap-1"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onBlur={() => setTimeout(() => setServicesDropdownOpen(false), 200)}
              >
                Services
                <ChevronDown className="h-4 w-4" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[9999]">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Academic Project Services
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Research Consulting
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Venture Support
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Digital Services
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#3F378B] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Training Platform
                  </a>
                </div>
              )}
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/careers"); }} className="hover:text-white/80 transition">Careers</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <button className="w-10 h-10 bg-white text-[#3F378B] rounded-full flex items-center justify-center font-semibold hover:bg-gray-100 transition-colors">
                    {user.email.charAt(0).toUpperCase()}
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => navigate("/application-status")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Application Status
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/signup")} className="border-white text-[#3F378B] hover:bg-white hover:text-[#3F378B] transition-colors">
                  Signup
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate("/login")} className="border-white text-[#3F378B] hover:bg-white hover:text-[#3F378B] transition-colors">
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-[#3F3A8F] dark:bg-black scroll-mt-20">
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
            <Button variant="outline" size="xl" onClick={() => document.getElementById('select-problem')?.scrollIntoView({ behavior: 'smooth' })} className="border-white text-[#3F378B] hover:bg-white hover:text-[#3F378B] transition-colors" style={{ color: '#3F378B' }}>See How It Works</Button>
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
              onClick={() => {
                const authData = localStorage.getItem("trizen.auth.loggedIn");
                if (!authData) {
                  navigate("/login");
                } else {
                  navigate("/problem-library");
                }
              }}
              className="flex items-center gap-2 bg-[#3F378B] text-white hover:bg-[#3F378B]/90 border-[#3F378B] transition-colors"
            >
              Select a Problem Statement
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* PROCESS BOXES */}
      <section className="container py-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3F378B]">How It Works</h2>
          <p className="text-lg text-muted-foreground">Follow these simple steps to build your startup while still in college</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-2">
          <div className="bg-[#3F378B] text-white rounded-xl p-6 hover:shadow-lg transition-shadow border-2 border-[#3F378B] relative w-64 h-48 flex flex-col justify-between cursor-pointer" onClick={() => {
            const authData = localStorage.getItem("trizen.auth.loggedIn");
            if (!authData) {
              localStorage.setItem("trizen.redirectAfterLogin", "/problem-library");
              navigate("/login");
            } else {
              navigate("/problem-library");
            }
          }}>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Problem Statement</h3>
              <p className="text-white/80 text-sm">Consider a problem statement and submit the problem statement</p>
            </div>
            <p className="text-sm text-white font-medium mt-2">1-month</p>
            <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-[#3F378B] rotate-45 z-10"></div>
          </div>
          <div className="hidden lg:block w-8 h-0.5 bg-[#3F378B]"></div>
          <div className="bg-[#3F378B] text-white rounded-xl p-6 hover:shadow-lg transition-shadow border-2 border-[#3F378B] relative w-64 h-48 flex flex-col justify-between cursor-pointer" onClick={() => {
            const authData = localStorage.getItem("trizen.auth.loggedIn");
            if (!authData) {
              localStorage.setItem("trizen.redirectAfterLogin", "/application-status");
              navigate("/login");
            } else {
              navigate("/application-status");
            }
          }}>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Build MVP</h3>
              <p className="text-white/80 text-sm">Build MVP and submit GitHub repository</p>
            </div>
            <p className="text-sm text-white font-medium mt-2">1-month</p>
            <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-[#3F378B] rotate-45 z-10"></div>
          </div>
          <div className="hidden lg:block w-8 h-0.5 bg-[#3F378B]"></div>
          <div className="bg-[#3F378B] text-white rounded-xl p-6 hover:shadow-lg transition-shadow border-2 border-[#3F378B] relative w-64 h-48 flex flex-col justify-between">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Market Research</h3>
              <p className="text-white/80 text-sm">Explore market opportunities and validate your idea</p>
            </div>
            <p className="text-sm text-white font-medium mt-2">1-month</p>
            <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-[#3F378B] rotate-45 z-10"></div>
          </div>
          <div className="hidden lg:block w-8 h-0.5 bg-[#3F378B]"></div>
          <div className="bg-[#3F378B] text-white rounded-xl p-6 hover:shadow-lg transition-shadow border-2 border-[#3F378B] w-64 h-48 flex flex-col justify-between">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Launch Startup</h3>
              <p className="text-white/80 text-sm">Start building a startup (if approved)</p>
            </div>
            <p className="text-sm text-white font-medium mt-2">3-months</p>
          </div>
        </div>
      </section>

      {/* OUR PRODUCTS */}
      <section className="container py-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3F378B]">Our Products</h2>
          <p className="text-lg text-muted-foreground">Explore our suite of products designed to help you grow and succeed</p>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="group cursor-pointer" onClick={() => navigate("/product-hr")}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B] hover:scale-105 w-48 flex-shrink-0">
              <div className="w-12 h-12 bg-[#3F378B] rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-semibold mb-2 text-[#3F378B] group-hover:text-[#3F378B]/80 transition inline-block">TrizenHR</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Comprehensive HR solutions</p>
            </div>
          </div>
          <div className="group cursor-pointer" onClick={() => navigate("/product-academy")}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B] hover:scale-105 w-48 flex-shrink-0">
              <div className="w-12 h-12 bg-[#3F378B] rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-semibold mb-2 text-[#3F378B] group-hover:text-[#3F378B]/80 transition inline-block">Academy</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Learn entrepreneurship from industry experts</p>
            </div>
          </div>
          <div className="group cursor-pointer" onClick={() => navigate("/product-connect")}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B] hover:scale-105 w-48 flex-shrink-0">
              <div className="w-12 h-12 bg-[#3F378B] rounded-lg flex items-center justify-center mb-4">
                <Network className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-semibold mb-2 text-[#3F378B] group-hover:text-[#3F378B]/80 transition inline-block">Connect</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Network with founders and industry experts</p>
            </div>
          </div>

          <div className="group cursor-pointer" onClick={() => navigate("/product-courses")}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B] hover:scale-105 w-48 flex-shrink-0">
              <div className="w-12 h-12 bg-[#3F378B] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-semibold mb-2 text-[#3F378B] group-hover:text-[#3F378B]/80 transition inline-block">Courses</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Specialized courses for entrepreneurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section id="services" className="container py-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#3F378B]">Our Services</h2>
          <p className="text-base text-muted-foreground">Comprehensive services to support your entrepreneurial journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B]">
            <div className="w-10 h-10 bg-[#3F378B] rounded-lg flex items-center justify-center mb-3">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-[#3F378B]">Academic Project Services</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">B.Tech projects, M.Tech projects, PhD research projects, and other academic project development and consultation services</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B]">
            <div className="w-10 h-10 bg-[#3F378B] rounded-lg flex items-center justify-center mb-3">
              <FlaskConical className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-[#3F378B]">Research Consulting</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">The company provides cutting-edge research solutions for complex business challenges</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B]">
            <div className="w-10 h-10 bg-[#3F378B] rounded-lg flex items-center justify-center mb-3">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-[#3F378B]">Venture Support</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">We help you turn your idea or prototype into a startup with guidance, resources, and structured support.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B]">
            <div className="w-10 h-10 bg-[#3F378B] rounded-lg flex items-center justify-center mb-3">
              <Code className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-[#3F378B]">Digital Services</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">We build websites, full-stack applications, and product UIs to help you launch and scale faster.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-[#3F378B]">
            <div className="w-10 h-10 bg-[#3F378B] rounded-lg flex items-center justify-center mb-3">
              <Video className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-[#3F378B]">Training Platform</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">We provide courses, sessions, and hands-on training to help you build skills and grow as a founder.</p>
          </div>
        </div>
      </section>


      {/* FOUNDER STACK */}
      <section className="bg-[#3F378B] py-10">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-white/80 text-sm font-semibold uppercase tracking-widest">What you get</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">A complete founder stack</h2>
            <p className="mt-4 text-white/90">Everything a student founder needs to go from zero to a venture-fundable startup.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((f) => (
              <div key={f.title} className="bg-white text-[#3F378B] rounded-2xl shadow-lg p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="h-11 w-11 rounded-xl bg-[#3F378B]/10 grid place-items-center mb-5">
                  <f.icon className="h-5 w-5 text-[#3F378B]" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-muted/40 border-y border-border">
        <div className="container py-10 max-w-3xl">
          <div className="text-center mb-8">
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



      {/* JOIN OUR COMMUNITY */}
      <section className="bg-black text-white py-10 border-b border-white/10">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column */}
            <div className="flex flex-col items-start font-bold tracking-tight text-4xl md:text-5xl space-y-2">
              <h2 className="text-white">Join our</h2>
              <h2 className="text-[#3b82f6]">community</h2>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <p className="text-lg md:text-xl leading-relaxed text-gray-100">
                Join Trizen Community, <span className="text-[#3b82f6] cursor-pointer hover:underline" onClick={() => navigate("/product-community")}>our private community</span>, built for the next generation of founders. Connect with pros, swap ideas, ask questions, and stay ahead of what's changing in startups.
              </p>

              <div className="flex gap-4">
                <a href="#" onClick={(e) => { e.preventDefault(); toast({ description: "Hang on there! We will connect soon." }); }} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-xl">
                  𝕏
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); toast({ description: "Hang on there! We will connect soon." }); }} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                  <FaFacebook size={22} />
                </a>
                <a href="https://www.linkedin.com/company/trizenventures/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                  <FaLinkedin size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-black text-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <img src={logoDark} alt="Trizen Ventures" className="h-16 mb-4 object-contain" />
              <p className="text-sm text-white/80 mb-4">
                Empowering student entrepreneurs to build innovative startups while still in college.
              </p>

            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/careers"); }} className="text-sm text-white/80 hover:text-white transition cursor-pointer">Careers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/product-hr"); }} className="text-sm text-white/80 hover:text-white transition cursor-pointer">TrizenHR</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/product-academy"); }} className="text-sm text-white/80 hover:text-white transition cursor-pointer">Academy</a></li>
                <li><a href="#faq" className="text-sm text-white/80 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Mail className="h-4 w-4" />
                  careers@trizenventures.com
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Phone className="h-4 w-4" />
                  +91 8639648822
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Globe className="h-4 w-4" />
                  trizenventures.com
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
              <p>© 2026 Trizen Ventures. All rights reserved.</p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
