import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Sparkles, Download, Palette, FileCheck, Wand2, ImageIcon, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResuméCraft — Free AI Resume Builder with PDF Download" },
      { name: "description", content: "Build a stunning resume in minutes with AI-powered writing, beautiful templates, profile photo upload, and instant PDF download. Free." },
      { property: "og:title", content: "ResuméCraft — Free AI Resume Builder" },
      { property: "og:description", content: "AI-powered resume builder with templates, photo upload, ATS scoring, and PDF download." },
    ],
  }),
  component: Landing,
});

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Powered by Lovable AI
          </span>
          <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight sm:text-6xl">
            Build a resume that gets <span className="text-primary">interviews</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            AI rewrites your bullets, scores your resume against any job, and exports a polished PDF — all in your browser. No signup.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/builder" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
              Start building <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/templates" className="inline-flex items-center gap-2 rounded-md border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
              Browse templates
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={Wand2} title="AI Writer" desc="Generate or polish your summary, bullets, and skills with one click." />
            <Feature icon={FileCheck} title="ATS Score" desc="Paste a job description to get a match score and missing keywords." />
            <Feature icon={Palette} title="4 Beautiful Templates" desc="Modern, Classic, Minimal, Elegant — switch instantly." />
            <Feature icon={ImageIcon} title="Photo Upload" desc="Add a professional headshot, perfectly cropped." />
            <Feature icon={Download} title="Instant PDF" desc="Pixel-perfect A4 export ready to email or print." />
            <Feature icon={Sparkles} title="Cover Letters" desc="Generate a tailored cover letter from your resume + job link." />
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h2 className="text-3xl font-bold">Land your next role faster</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Join thousands of job seekers using AI to write better resumes — free forever.
            </p>
            <Link to="/builder" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Open the Builder <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
