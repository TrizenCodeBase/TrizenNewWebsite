export default function DemoDay() {
  return (
    <div className="flex-1 p-7">
      <h1 className="text-2xl font-bold mb-4">Demo Day</h1>
      <p className="text-muted-foreground mb-6">Prepare your pitch deck, rehearsal schedule, and investor invites here.</p>
      
      <div className="rounded-xl border border-border bg-card p-6 max-w-2xl">
        <h2 className="text-lg font-bold mb-2">Next Demo Day Scheduled</h2>
        <div className="flex items-center gap-4 text-primary">
          <div className="text-4xl font-black tracking-tight">Aug 24</div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="font-semibold">Bangalore, India</div>
            <div className="text-sm text-muted-foreground">In-person pitch event</div>
          </div>
        </div>
      </div>
    </div>
  );
}
