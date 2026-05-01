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

    // Initialize with sample problems if none exist
    const existingProblems = JSON.parse(localStorage.getItem(STORAGE_PROBLEMS_KEY) || "[]");
    
    if (existingProblems.length === 0) {
      const sampleProblems: Problem[] = [
        {
          id: "1",
          title: "AI-Powered Study Assistant",
          description: "Create an AI tool that helps students organize study materials, generate practice questions, and provide personalized learning recommendations.",
          impact: "Helps millions of students improve learning efficiency and academic performance.",
          expectedOutcome: "Functional AI study assistant with 80% accuracy in question generation and 1000+ active users.",
          domain: "AI",
          difficulty: "Intermediate",
          tags: ["Education", "Machine Learning", "NLP"]
        },
        {
          id: "2",
          title: "Mental Health Support Chatbot",
          description: "Develop a chatbot that provides initial mental health support, mood tracking, and connects users with professional help when needed.",
          impact: "Reduces stigma around mental health and provides accessible support to students in need.",
          expectedOutcome: "24/7 available chatbot with mood tracking features and 500+ monthly active users.",
          domain: "Health",
          difficulty: "Advanced",
          tags: ["Healthcare", "Chatbot", "Mental Health"]
        },
        {
          id: "3",
          title: "Crop Yield Prediction System",
          description: "Build a system that uses satellite imagery and weather data to predict crop yields and help farmers make better decisions.",
          impact: "Helps small farmers increase productivity and reduce losses through data-driven farming.",
          expectedOutcome: "Prediction accuracy of 85%+ and adoption by 100+ farms in pilot regions.",
          domain: "Agri",
          difficulty: "Advanced",
          tags: ["Agriculture", "Data Science", "Satellite"]
        },
        {
          id: "4",
          title: "Student Project Collaboration Platform",
          description: "Create a SaaS platform for students to collaborate on academic projects, track progress, and manage deadlines.",
          impact: "Improves team collaboration and project completion rates among college students.",
          expectedOutcome: "Platform with 5000+ registered users and 80% project completion rate.",
          domain: "SaaS",
          difficulty: "Beginner",
          tags: ["Collaboration", "Education", "Productivity"]
        },
        {
          id: "5",
          title: "AI Resume Builder",
          description: "Develop an AI-powered tool that helps students create professional resumes tailored to specific job applications.",
          impact: "Increases interview rates and job placement success for college graduates.",
          expectedOutcome: "50% improvement in interview rates and 10,000+ resumes generated.",
          domain: "AI",
          difficulty: "Beginner",
          tags: ["Career", "AI", "Resume"]
        },
        {
          id: "6",
          title: "Medicine Reminder System",
          description: "Build a mobile app that helps patients track medication schedules and sends timely reminders.",
          impact: "Improves medication adherence and reduces health complications from missed doses.",
          expectedOutcome: "90% medication adherence rate and 1000+ daily active users.",
          domain: "Health",
          difficulty: "Beginner",
          tags: ["Mobile", "Healthcare", "Reminder"]
        }
      ];
      
      localStorage.setItem(STORAGE_PROBLEMS_KEY, JSON.stringify(sampleProblems));
      setProblems(sampleProblems);
    } else {
      setProblems(existingProblems);
    }
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

        {/* Problem Cards */}
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

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No problems found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
