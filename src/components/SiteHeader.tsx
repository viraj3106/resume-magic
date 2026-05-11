import { Link } from "@tanstack/react-router";
import { FileText, Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <FileText className="h-5 w-5 text-primary" />
          <span>ResuméCraft</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/builder" activeProps={{ className: "bg-accent" }} className="rounded-md px-3 py-1.5 hover:bg-accent">Builder</Link>
          <Link to="/templates" activeProps={{ className: "bg-accent" }} className="rounded-md px-3 py-1.5 hover:bg-accent">Templates</Link>
          <Link to="/ai-tools" activeProps={{ className: "bg-accent" }} className="rounded-md px-3 py-1.5 hover:bg-accent">
            <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" />AI Tools</span>
          </Link>
          <Link to="/tips" activeProps={{ className: "bg-accent" }} className="rounded-md px-3 py-1.5 hover:bg-accent">Tips</Link>
          <Link to="/builder" className="ml-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Start free</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print border-t bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} ResuméCraft — Free AI-powered resume builder.</p>
        <div className="flex gap-4">
          <Link to="/templates" className="hover:text-foreground">Templates</Link>
          <Link to="/tips" className="hover:text-foreground">Tips</Link>
          <Link to="/ai-tools" className="hover:text-foreground">AI Tools</Link>
        </div>
      </div>
    </footer>
  );
}