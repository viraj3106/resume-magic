import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/tips")({
  head: () => ({
    meta: [
      { title: "Resume Writing Tips — ResuméCraft" },
      { name: "description", content: "Practical resume tips: action verbs, quantification, ATS, formatting, and common mistakes to avoid." },
    ],
  }),
  component: TipsPage,
});

const sections = [
  {
    title: "Quantify everything",
    body: "Numbers stand out. Replace 'improved performance' with 'cut load time 42% (3.1s → 1.8s) for 200k MAU'.",
    good: "Reduced support tickets by 38% by redesigning onboarding flow.",
    bad: "Worked on improving the onboarding experience.",
  },
  {
    title: "Lead with strong verbs",
    body: "Start each bullet with an action verb: Led, Shipped, Built, Designed, Architected, Reduced, Increased.",
    good: "Architected payment service handling $4M/month in transactions.",
    bad: "Was responsible for the payment service.",
  },
  {
    title: "One page when possible",
    body: "Recruiters spend ~7 seconds on first scan. Cut anything older than 10 years or unrelated to the role.",
    good: "Tightly focused, 1 page, scannable.",
    bad: "3 pages with unrelated college projects.",
  },
  {
    title: "Match the job description",
    body: "Use exact keywords from the JD (when truthful). Most ATS scan for literal terms before a human reads it.",
    good: "Mentions React, TypeScript, GraphQL — exactly as in JD.",
    bad: "Lists 'JavaScript frameworks' when JD says React.",
  },
  {
    title: "Avoid clichés",
    body: "'Team player', 'detail-oriented', 'hard worker' — these say nothing. Show, don't tell.",
    good: "Mentored 4 junior engineers; 2 promoted within 18 months.",
    bad: "Excellent team player and detail-oriented.",
  },
];

function TipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold">Resume tips that actually work</h1>
        <p className="mt-2 text-muted-foreground">Battle-tested advice from hiring managers and recruiters.</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <article key={s.title} className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-sm">
                  <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-green-700"><CheckCircle2 className="h-3.5 w-3.5" /> GOOD</div>
                  {s.good}
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
                  <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-destructive"><XCircle className="h-3.5 w-3.5" /> AVOID</div>
                  {s.bad}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
