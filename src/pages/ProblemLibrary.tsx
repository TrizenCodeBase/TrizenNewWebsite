import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, Brain, Heart, Sprout, Cloud, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";

type Problem = {
  id: string;
  title: string;
  description: string;
  impact: string;
  expectedOutcome: string;
  domain: "AI" | "Health" | "Agri" | "SaaS";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
};

const STORAGE_PROBLEMS_KEY = "trizen.problems";

const domainIcons = {
  AI: Brain,
  Health: Heart,
  Agri: Sprout,
  SaaS: Cloud,
};

const domainColors = {
  AI: "bg-blue-100 text-blue-800 border-blue-200",
  Health: "bg-red-100 text-red-800 border-red-200",
  Agri: "bg-green-100 text-green-800 border-green-200",
  SaaS: "bg-purple-100 text-purple-800 border-purple-200",
};

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

export default function ProblemLibrary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [user, setUser] = useState<any>(null);

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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  useEffect(() => {
    // Handle URL parameters
    const categoryParam = searchParams.get('category');
    const locationParam = searchParams.get('location');
    
    if (categoryParam) {
      setSelectedDomain(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
    }
    if (locationParam) {
      setSelectedLocation(locationParam);
    }

    // Clear all problems and set empty array
    const emptyProblems: Problem[] = [];
    localStorage.setItem(STORAGE_PROBLEMS_KEY, JSON.stringify(emptyProblems));
    setProblems(emptyProblems);
  }, []);

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDomain = selectedDomain === "all" || problem.domain === selectedDomain;
    const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
    const matchesLocation = selectedLocation === "all" || true; // For now, all problems are available in all locations
    
    return matchesSearch && matchesDomain && matchesDifficulty && matchesLocation;
  });

  const handleSelectProblem = (problem: Problem) => {
    // Check if user is logged in
    const user = localStorage.getItem("trizen.user");
    if (!user) {
      // Store the problem they were trying to access
      localStorage.setItem("trizen.selectedProblem", JSON.stringify(problem));
      localStorage.setItem("trizen.redirectAfterLogin", "/workflow");
      navigate("/login");
      return;
    }
    
    // Store selected problem and navigate to workflow
    localStorage.setItem("trizen.selectedProblem", JSON.stringify(problem));
    navigate("/workflow");
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
          
          {user && (
            <div className="flex items-center gap-2">
              <div className="relative group">
                <button className="w-10 h-10 bg-[#3F378B] text-white rounded-full flex items-center justify-center font-semibold hover:bg-[#3F378B]/90 transition-colors">
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
          )}
        </div>
      </header>

      <main className="container py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Problem Library</h1>
          <p className="text-lg text-muted-foreground">
            Choose from curated problem statements across different domains
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-[180px] border-[#3F378B] focus:border-[#3F378B] focus:ring-[#3F378B]/20">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent className="[&_[data-highlighted]]:bg-[#3F378B]/10 [&_[data-state=checked]]:bg-[#3F378B] [&_[data-state=checked]]:text-white">
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="AI">AI</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Agri">Agriculture</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[180px] border-[#3F378B] focus:border-[#3F378B] focus:ring-[#3F378B]/20">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="[&_[data-highlighted]]:bg-[#3F378B]/10 [&_[data-state=checked]]:bg-[#3F378B] [&_[data-state=checked]]:text-white">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px] border-[#3F378B] focus:border-[#3F378B] focus:ring-[#3F378B]/20">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="[&_[data-highlighted]]:bg-[#3F378B]/10 [&_[data-state=checked]]:bg-[#3F378B] [&_[data-state=checked]]:text-white">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="vishakapatnam">Vishakapatnam</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Domain Stats */}
          <div className="flex flex-wrap gap-4">
            {Object.entries(domainIcons).map(([domain, Icon]) => {
              const count = problems.filter(p => p.domain === domain).length;
              return (
                <div key={domain} className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4" />
                  <span>{domain}: {count} problems</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 1: Curated Problem Statements */}
        <div className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#3F378B]">Choose from Curated Problem Statements</h2>
            <p className="text-muted-foreground">
              Select from our carefully curated problem statements across different domains to start your startup journey
            </p>
          </div>
          
          {filteredProblems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => {
                const DomainIcon = domainIcons[problem.domain];
                return (
                  <Card key={problem.id} className="hover:shadow-lg hover:bg-[#3F378B]/5 active:bg-[#3F378B]/10 transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${domainColors[problem.domain].split(' ')[0]}`}>
                            <DomainIcon className="h-4 w-4" />
                          </div>
                          <Badge className={domainColors[problem.domain]}>
                            {problem.domain}
                          </Badge>
                        </div>
                        <Badge className={difficultyColors[problem.difficulty]}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{problem.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-3">
                        {problem.description}
                      </CardDescription>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Impact</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{problem.impact}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Expected Outcome</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{problem.expectedOutcome}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {problem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          onClick={() => handleSelectProblem(problem)}
                          className="w-full mt-4 bg-[#3F378B] hover:bg-[#3F378B]/90 text-white border-[#3F378B]"
                          variant="outline"
                        >
                          Start Working <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No curated problems available at the moment.</p>
            </div>
          )}
        </div>

        {/* Section 2: Have Your Own Idea */}
        <div className="border-t pt-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#3F378B]">Have Your Own Idea?</h2>
            <p className="text-muted-foreground">
              Already have a startup idea you're passionate about? Skip our curated problems and work on your own vision
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-[#3F378B]/5 to-[#3F378B]/10 border-[#3F378B]/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#3F378B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-[#3F378B]">Submit Your Own Problem Statement</CardTitle>
              <CardDescription>
                Turn your unique idea into a startup with our guided workflow and resources
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-[#3F378B]">🚀 Your Vision</h4>
                  <p className="text-muted-foreground">Build what you believe in</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-[#3F378B]">🛠️ Full Support</h4>
                  <p className="text-muted-foreground">Get resources and guidance</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-[#3F378B]">📈 Track Progress</h4>
                  <p className="text-muted-foreground">Monitor your startup journey</p>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate("/workflow")}
                className="w-full md:w-auto bg-[#3F378B] hover:bg-[#3F378B]/90 text-white border-[#3F378B]"
                size="lg"
              >
                Start With Your Idea <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
