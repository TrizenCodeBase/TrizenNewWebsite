import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, Circle, Upload, FileText, Code, Rocket, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
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

type StageData = {
  stage1: {
    problemUnderstanding: string;
    targetUsers: string;
    painPoints: string;
    solutionApproach: string;
  };
  stage2: {
    solutionDesign: string;
    features: string;
    techStack: string;
    mvpScope: string;
  };
  stage3: {
    progress: string;
    challenges: string;
    learnings: string;
    nextSteps: string;
  };
  stage4: {
    finalDemo: string;
    achievements: string;
    metrics: string;
    futurePlans: string;
    demoVideo: string;
    documentation: string;
  };
};

const STORAGE_WORKFLOW_KEY = "trizen.workflow";
const STORAGE_LOGGED_IN_KEY = "trizen.auth.loggedIn";

export default function Workflow() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [stageData, setStageData] = useState<StageData>({
    stage1: { problemUnderstanding: "", targetUsers: "", painPoints: "", solutionApproach: "" },
    stage2: { solutionDesign: "", features: "", techStack: "", mvpScope: "" },
    stage3: { progress: "", challenges: "", learnings: "", nextSteps: "" },
    stage4: { finalDemo: "", achievements: "", metrics: "", futurePlans: "", demoVideo: "", documentation: "" }
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedInData = localStorage.getItem(STORAGE_LOGGED_IN_KEY);
    if (!loggedInData) {
      navigate("/login");
      return;
    }

    // Get selected problem
    const problemData = localStorage.getItem("trizen.selectedProblem");
    if (!problemData) {
      navigate("/problem-library");
      return;
    }

    try {
      const problem = JSON.parse(problemData);
      setSelectedProblem(problem);

      // Load existing workflow data
      const existingData = JSON.parse(localStorage.getItem(STORAGE_WORKFLOW_KEY) || "{}");
      if (existingData[problem.id]) {
        setStageData(existingData[problem.id]);
        // Determine current stage based on completion
        const stages = ['stage1', 'stage2', 'stage3', 'stage4'] as const;
        for (let i = stages.length - 1; i >= 0; i--) {
          const stage = stages[i];
          if (Object.values(existingData[problem.id][stage]).some(val => val.trim())) {
            setCurrentStage(i + 1);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
      navigate("/problem-library");
    }
  }, [navigate]);

  const stages = [
    {
      id: 1,
      title: "Problem Understanding",
      icon: Lightbulb,
      description: "Deep dive into the problem and understand the context",
      fields: [
        { name: "problemUnderstanding", label: "Problem Understanding", type: "textarea", placeholder: "Explain the problem in your own words..." },
        { name: "targetUsers", label: "Target Users", type: "textarea", placeholder: "Who are you solving this problem for?" },
        { name: "painPoints", label: "Pain Points", type: "textarea", placeholder: "What specific pain points will you address?" },
        { name: "solutionApproach", label: "Solution Approach", type: "textarea", placeholder: "How do you plan to solve this?" }
      ]
    },
    {
      id: 2,
      title: "Solution Design",
      icon: FileText,
      description: "Design your solution and plan the implementation",
      fields: [
        { name: "solutionDesign", label: "Solution Design", type: "textarea", placeholder: "Describe your solution architecture..." },
        { name: "features", label: "Key Features", type: "textarea", placeholder: "List the key features you'll implement..." },
        { name: "techStack", label: "Tech Stack", type: "textarea", placeholder: "What technologies will you use?" },
        { name: "mvpScope", label: "MVP Scope", type: "textarea", placeholder: "What will your MVP include?" }
      ]
    },
    {
      id: 3,
      title: "MVP Build",
      icon: Code,
      description: "Build your minimum viable product",
      fields: [
        { name: "progress", label: "Development Progress", type: "textarea", placeholder: "What have you built so far?" },
        { name: "challenges", label: "Challenges Faced", type: "textarea", placeholder: "What challenges did you encounter?" },
        { name: "learnings", label: "Key Learnings", type: "textarea", placeholder: "What did you learn during development?" },
        { name: "nextSteps", label: "Next Steps", type: "textarea", placeholder: "What are your next development steps?" }
      ]
    },
    {
      id: 4,
      title: "Submission",
      icon: Rocket,
      description: "Submit your final MVP for evaluation",
      fields: [
        { name: "finalDemo", label: "Demo Description", type: "textarea", placeholder: "Describe your final demo..." },
        { name: "achievements", label: "Key Achievements", type: "textarea", placeholder: "What are you proud of accomplishing?" },
        { name: "metrics", label: "Success Metrics", type: "textarea", placeholder: "How do you measure success?" },
        { name: "futurePlans", label: "Future Plans", type: "textarea", placeholder: "What's your roadmap for the future?" },
        { name: "demoVideo", label: "Demo Video Link", type: "input", placeholder: "https://youtube.com/..." },
        { name: "documentation", label: "Documentation Link", type: "input", placeholder: "https://docs..." }
      ]
    }
  ];

  const handleStageDataChange = (field: string, value: string) => {
    const stageKey = `stage${currentStage}` as keyof StageData;
    setStageData(prev => ({
      ...prev,
      [stageKey]: {
        ...prev[stageKey],
        [field]: value
      }
    }));
  };

  const saveStageData = () => {
    if (!selectedProblem) return;

    const existingData = JSON.parse(localStorage.getItem(STORAGE_WORKFLOW_KEY) || "{}");
    existingData[selectedProblem.id] = stageData;
    localStorage.setItem(STORAGE_WORKFLOW_KEY, JSON.stringify(existingData));

    toast({
      title: "Progress Saved",
      description: `Stage ${currentStage} data has been saved successfully.`,
    });
  };

  const submitStage = () => {
    const stageKey = `stage${currentStage}` as keyof StageData;
    const currentStageData = stageData[stageKey];
    
    // Check if all required fields are filled
    const isComplete = Object.values(currentStageData).every(val => typeof val === 'string' && val.trim());
    
    if (!isComplete) {
      toast({
        title: "Incomplete",
        description: "Please fill in all fields before proceeding.",
        variant: "destructive"
      });
      return;
    }

    saveStageData();

    if (currentStage < 4) {
      setCurrentStage(currentStage + 1);
      toast({
        title: "Stage Completed!",
        description: `Moving to Stage ${currentStage + 1}`,
      });
    } else {
      // Final submission
      toast({
        title: "Submissions Not Open",
        description: "MVP submissions are not open yet. Please check back later.",
        variant: "destructive",
      });
    }
  };

  const getStageProgress = () => {
    const stageKey = `stage${currentStage}` as keyof StageData;
    const currentStageData = stageData[stageKey];
    const filledFields = Object.values(currentStageData).filter(val => typeof val === 'string' && val.trim()).length;
    return (filledFields / Object.keys(currentStageData).length) * 100;
  };

  if (!selectedProblem) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const currentStageInfo = stages[currentStage - 1];
  const StageIcon = currentStageInfo.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="container h-16 flex items-center justify-between">
          <button 
            type="button" 
            className="text-sm bg-[#3F378B] text-white hover:bg-[#3F378B]/90 px-3 py-1.5 rounded-md transition-colors" 
            onClick={() => navigate("/problem-library")}
          >
            ← Back to Problem Library
          </button>
        </div>
      </header>

      <main className="container py-12 max-w-4xl">
        {/* Problem Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge>{selectedProblem.domain}</Badge>
            <Badge variant="secondary">{selectedProblem.difficulty}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{selectedProblem.title}</h1>
          <p className="text-muted-foreground">{selectedProblem.description}</p>
        </div>

        {/* Stage Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Workflow Progress</h2>
            <span className="text-sm text-muted-foreground">Stage {currentStage} of 4</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = index < currentStage - 1;
              const isCurrent = index === currentStage - 1;
              
              return (
                <div key={stage.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : isCurrent 
                      ? 'border-primary text-primary' 
                      : 'border-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      isCompleted ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <Progress value={getStageProgress()} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Current stage: {Math.round(getStageProgress())}% complete
          </p>
        </div>

        {/* Current Stage */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <StageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Stage {currentStage}: {currentStageInfo.title}
                </CardTitle>
                <CardDescription>{currentStageInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStageInfo.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    value={stageData[`stage${currentStage}` as keyof StageData][field.name as keyof typeof stageData.stage1]}
                    onChange={(e) => handleStageDataChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="min-h-[100px]"
                  />
                ) : (
                  <Input
                    id={field.name}
                    type="text"
                    value={stageData[`stage${currentStage}` as keyof StageData][field.name as keyof typeof stageData.stage1]}
                    onChange={(e) => handleStageDataChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between pt-4">
              {currentStage > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStage(currentStage - 1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Stage
                </Button>
              )}
              
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={saveStageData}>
                  Save Progress
                </Button>
                <Button onClick={submitStage}>
                  {currentStage === 4 ? "Submit Final MVP" : "Complete Stage"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
