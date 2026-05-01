import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Target, Users, BookOpen, Calendar, LogOut } from "lucide-react";
import logoLight from "@/assets/trizen-logo.png";
import logoDark from "@/assets/trizen-logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const SIDEBAR_NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/milestones", label: "Milestones", icon: Target },
  { href: "/dashboard/mentors", label: "Mentors", icon: Users },
  { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
  { href: "/dashboard/demo-day", label: "Demo Day", icon: Calendar },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col sticky top-0 h-screen">
        <div className="h-20 flex items-center px-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoLight} alt="Trizen Ventures" className="h-8 w-auto block dark:hidden" />
            <img src={logoDark} alt="Trizen Ventures" className="h-8 w-auto hidden dark:block" />
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {SIDEBAR_NAV.map((nav) => {
            const active = pathname === nav.href;
            return (
              <Link
                key={nav.href}
                to={nav.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <nav.icon className="h-4 w-4" />
                {nav.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" asChild>
            <Link to="/login">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border/50 flex items-center justify-end px-6 sticky top-0 bg-background/80 backdrop-blur z-10 md:hidden">
            {/* Mobile Header stuff could go here */}
            <ThemeToggle />
        </header>
        <div className="hidden md:flex h-16 border-b border-border/50 items-center justify-end px-6 sticky top-0 bg-background/80 backdrop-blur z-10">
             <ThemeToggle />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
