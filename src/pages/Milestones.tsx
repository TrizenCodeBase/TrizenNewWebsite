import { CheckCircle2, Circle, Upload, FileVideo, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";

type Milestone = {
  week: string;
  title: string;
  desc: string;
  done?: boolean;
};

const MILESTONES: Milestone[] = [
  { week: "Week 1", title: "10 customer interviews", desc: "Talk to users and pick a wedge.", done: true },
  { week: "Week 2", title: "Problem → solution brief", desc: "Write the PRD + first design.", done: true },
  { week: "Week 3", title: "MVP shipped", desc: "A working prototype users can try." },
  { week: "Week 4", title: "First 20 users", desc: "Early traction + feedback loop." },
  { week: "Week 6", title: "Metrics dashboard", desc: "Retention + activation + funnel." },
  { week: "Week 9", title: "Demo Day deck", desc: "Story + traction + ask." },
];

export default function MilestonesPage() {
  return (
    <div className="flex-1">
      <section className="p-7">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Cohort 04</p>
            <h1 className="text-2xl font-bold">Milestones</h1>
          </div>
          <div className="text-xs text-muted-foreground">
            Keep shipping weekly — mentors review progress every Friday.
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {MILESTONES.map((m) => (
            <div key={m.title} className="rounded-xl border border-border p-4 flex items-start gap-3">
              <div className="mt-0.5">
                {m.done ? (
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{m.title}</p>
                  <span className="text-xs text-muted-foreground">{m.week}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Uploads Section */}
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4">Uploads</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border border-dashed p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <FileVideo className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Demo Videos</h3>
              <p className="text-xs text-muted-foreground mb-4">MP4 or WebM up to 50MB</p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" /> Upload Video
              </Button>
            </div>
            
            <div className="rounded-xl border border-border border-dashed p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <Presentation className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium mb-1">Presentations</h3>
              <p className="text-xs text-muted-foreground mb-4">PDF or PPTX up to 20MB</p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" /> Upload Pitch Deck
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

