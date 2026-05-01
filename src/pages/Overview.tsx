import { FileText, Video, Users, Trophy } from "lucide-react";

export default function Overview() {
  return (
    <div className="flex-1">
      <section className="p-7">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              Cohort 04 · Week 5 of 9
            </p>
            <h1 className="text-2xl font-bold">Student's Performance</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ background: "hsl(var(--success))" }}
            />
            On track
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Cohort progress</span>
            <span>56%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-brand-gradient"
              style={{ width: "56%" }}
            />
          </div>
        </div>

        <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Upcoming deadlines
        </h2>

        <div className="space-y-3">
          {[
            {
              icon: FileText,
              title: "Submit MVP demo video",
              due: "Due in 2 days · May 2",
              tag: "Milestone",
              tone: "warning",
            },
            {
              icon: Video,
              title: "1:1 with Rohan Kapoor",
              due: "Tomorrow · 4:00 PM IST",
              tag: "Mentor",
              tone: "primary",
            },
            {
              icon: Users,
              title: "First 50 users review",
              due: "Due May 10",
              tag: "Growth",
              tone: "default",
            },
            {
              icon: Trophy,
              title: "Demo Day rehearsal",
              due: "May 24 · Bangalore",
              tag: "Event",
              tone: "accent",
            },
          ].map((d) => {
            const toneMap: Record<string, string> = {
              warning:
                "bg-[hsl(var(--warning)/0.12)] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.35)]",
              primary:
                "bg-primary/10 text-primary border-primary/30",
              accent:
                "bg-accent/10 text-accent border-accent/30",
              default:
                "bg-muted text-muted-foreground border-border",
            };

            return (
              <div
                key={d.title}
                className="flex items-center gap-4 rounded-xl border border-border p-4 hover:border-primary/40 transition"
              >
                <div className="h-10 w-10 rounded-lg bg-muted grid place-items-center shrink-0">
                  <d.icon className="h-4 w-4 text-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {d.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.due}
                  </p>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full border ${toneMap[d.tone]}`}
                >
                  {d.tag}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
