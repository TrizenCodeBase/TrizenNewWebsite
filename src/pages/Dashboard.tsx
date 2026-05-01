import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Upload, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const STORAGE_LOGGED_IN_KEY = "trizen.auth.loggedIn";
const STORAGE_PROBLEM_STATEMENTS_KEY = "trizen.problemStatements";

type LoggedInUser = {
  userId: string;
  email: string;
  fullName: string;
  loggedInAt: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [problemStatement, setProblemStatement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedStatements, setSavedStatements] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const loggedInData = localStorage.getItem(STORAGE_LOGGED_IN_KEY);
    if (!loggedInData) {
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(loggedInData);
      setUser(userData);
      
      // Load saved problem statements
      const statements = JSON.parse(localStorage.getItem(STORAGE_PROBLEM_STATEMENTS_KEY) || "[]");
      const userStatements = statements.filter((s: any) => s.userId === userData.userId);
      setSavedStatements(userStatements);
      
      if (userStatements.length > 0) {
        setProblemStatement(userStatements[0].content);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!problemStatement.trim()) {
      toast({
        title: "Error",
        description: "Please enter your problem statement",
        variant: "destructive"
      });
      return;
    }

    if (!user) return;

    setIsSubmitting(true);

    try {
      // Get existing problem statements
      const existingStatements = JSON.parse(localStorage.getItem(STORAGE_PROBLEM_STATEMENTS_KEY) || "[]");
      
      // Remove any existing statement from this user
      const filteredStatements = existingStatements.filter((s: any) => s.userId !== user.userId);
      
      // Add new problem statement
      const newStatement = {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        content: problemStatement.trim(),
        submittedAt: new Date().toISOString(),
        id: Date.now().toString()
      };

      filteredStatements.push(newStatement);
      localStorage.setItem(STORAGE_PROBLEM_STATEMENTS_KEY, JSON.stringify(filteredStatements));

      toast({
        title: "Success!",
        description: "Your problem statement has been submitted successfully.",
      });

      setSavedStatements([newStatement]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit problem statement. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_LOGGED_IN_KEY);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="container h-16 flex items-center justify-between">
          <button 
            type="button" 
            className="text-sm text-muted-foreground hover:text-foreground" 
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.fullName}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Founder Dashboard</h1>
          <p className="text-muted-foreground">
            Submit your problem statement to start building your startup journey
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Problem Statement
            </CardTitle>
            <CardDescription>
              Describe the problem you want to solve and your proposed solution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="problemStatement">Your Problem Statement</Label>
              <Textarea
                id="problemStatement"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="Describe the problem you're trying to solve, who it affects, and your proposed solution. Be as detailed as possible..."
                className="min-h-[200px]"
              />
              <p className="text-sm text-muted-foreground">
                {problemStatement.length} characters
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                {savedStatements.length > 0 && (
                  <p className="text-sm text-green-600">
                    ✓ Problem statement submitted on {new Date(savedStatements[0].submittedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !problemStatement.trim()}
                variant="hero"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Problem Statement
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {savedStatements.length > 0 && (
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle>Submitted Problem Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{savedStatements[0].content}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Submitted: {new Date(savedStatements[0].submittedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
