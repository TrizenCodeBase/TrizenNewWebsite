import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Github, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Upload, 
  FileText, 
  Code,
  ExternalLink,
  Copy,
  Video,
  Youtube,
  X,
  Film
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const [githubUrl, setGithubUrl] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [demoVideoFile, setDemoVideoFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  // Check if user is logged in
  useEffect(() => {
    const authData = localStorage.getItem("trizen.auth.loggedIn");
    if (!authData) {
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a video file (MP4, MOV, AVI, etc).",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Video file must be less than 100MB.",
          variant: "destructive",
        });
        return;
      }
      
      setDemoVideoFile(file);
    }
  };

  const removeVideoFile = () => {
    setDemoVideoFile(null);
  };

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubUrl || !projectDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (youtubeUrl && !validateYouTubeUrl(youtubeUrl)) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    setSubmissionStatus("submitting");
    
    // Simulate submission process
    setTimeout(() => {
      setSubmissionStatus("submitted");
      toast({
        title: "Application Submitted!",
        description: "Your GitHub repository and demo materials have been successfully submitted for review.",
      });
      
      // Store submission in localStorage
      const submission = {
        githubUrl,
        projectDescription,
        demoVideoName: demoVideoFile?.name || null,
        youtubeUrl,
        submittedAt: new Date().toISOString(),
        status: "Under Review"
      };
      localStorage.setItem("trizen.applicationSubmission", JSON.stringify(submission));
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-[#3F378B]/10 text-[#3F378B] border-[#3F378B]/20";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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

      <main className="container py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#3F378B]/10 px-4 py-2 rounded-full mb-4">
            <Github className="h-4 w-4 text-[#3F378B]" />
            <span className="text-sm font-medium text-[#3F378B]">Application Status</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Submit Your GitHub Repository</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your application progress and submit your GitHub repository for review. 
            Our team will evaluate your project and provide feedback within 3-5 business days.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-[#3F378B]" />
                  Submit Your Project
                </CardTitle>
                <CardDescription>
                  Provide your GitHub repository URL and project description for review
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionStatus === "submitted" ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3F378B]/10 rounded-full mb-4">
                      <CheckCircle className="h-8 w-8 text-[#3F378B]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Successfully Submitted!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your application has been received and is now under review.
                    </p>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor("Under Review")}>
                          <Clock className="h-3 w-3 mr-1" />
                          Under Review
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expected response time: 3-5 business days
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="github-url" className="text-sm font-medium">
                        GitHub Repository URL *
                      </Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="github-url"
                          type="url"
                          placeholder="https://github.com/username/repository"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          className="pl-10 border-[#3F378B] focus:border-[#3F378B] focus:ring-[#3F378B]/20"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Make sure your repository is public and contains a README.md file
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="project-description" className="text-sm font-medium">
                        Project Description *
                      </Label>
                      <Textarea
                        id="project-description"
                        placeholder="Describe your project, its purpose, key features, and technologies used..."
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="min-h-[120px] border-[#3F378B] focus:border-[#3F378B] focus:ring-[#3F378B]/20"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum 50 characters. Include project goals and implementation details.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="demo-video" className="text-sm font-medium">
                        Demo Video Upload
                      </Label>
                      <div className="mt-2">
                        {demoVideoFile ? (
                          <div className="flex items-center justify-between p-3 border border-[#3F378B] rounded-lg bg-[#3F378B]/5">
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4 text-[#3F378B]" />
                              <span className="text-sm">{demoVideoFile.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({(demoVideoFile.size / 1024 / 1024).toFixed(1)} MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeVideoFile}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-[#3F378B]/30 rounded-lg p-6 text-center hover:border-[#3F378B]/50 transition-colors">
                            <Video className="h-8 w-8 text-[#3F378B] mx-auto mb-2" />
                            <label htmlFor="demo-video" className="cursor-pointer">
                              <span className="text-sm text-[#3F378B] hover:text-[#3F378B]/80">
                                Click to upload demo video
                              </span>
                              <Input
                                id="demo-video"
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              MP4, MOV, AVI (max 100MB)
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Optional: Upload a demo video showcasing your project
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="youtube-url" className="text-sm font-medium">
                        YouTube Demo Link
                      </Label>
                      <div className="relative mt-2">
                        <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="youtube-url"
                          type="url"
                          placeholder="https://youtube.com/watch?v=..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          className="pl-10 border-[#3F378B] focus:border-[#3F378B] focus:ring-[#3F378B]/20"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Optional: Link to your YouTube demo video
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#3F378B] hover:bg-[#3F378B]/90 text-white"
                      disabled={submissionStatus === "submitting"}
                    >
                      {submissionStatus === "submitting" ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Status Information */}
          <div className="space-y-6">
            {/* Application Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Application Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3F378B]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-[#3F378B]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Submission</h4>
                    <p className="text-sm text-muted-foreground">Initial application review</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3F378B]/10 flex items-center justify-center flex-shrink-0">
                    <Code className="h-4 w-4 text-[#3F378B]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Technical Review</h4>
                    <p className="text-sm text-muted-foreground">Code quality and architecture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3F378B]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-[#3F378B]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Final Decision</h4>
                    <p className="text-sm text-muted-foreground">Application outcome</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Submission Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Public GitHub repository</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">README.md file included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Clean, documented code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Project description (50+ chars)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Demo video (optional, max 100MB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <span className="text-sm">YouTube demo link (optional)</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#3F378B] text-[#3F378B] hover:bg-[#3F378B]/10"
                  onClick={() => window.open("https://github.com", "_blank")}
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#3F378B] text-[#3F378B] hover:bg-[#3F378B]/10"
                  onClick={() => navigate("/problem-library")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Problem Library
                </Button>
                              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationStatus;
