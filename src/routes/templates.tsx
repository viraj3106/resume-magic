import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { defaultResume, type TemplateId } from "@/lib/resume-types";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Resume Templates — ResuméCraft" },
      { name: "description", content: "Browse free professional resume templates: Modern, Classic, Minimal, and Elegant." },
    ],
  }),
  component: TemplatesPage,
});

const templates: { id: TemplateId; name: string; desc: string; accent: string }[] = [
  { id: "modern", name: "Modern", desc: "Two-column layout with bold sidebar — great for tech and design roles.", accent: "#2563eb" },
  { id: "classic", name: "Classic", desc: "Clean traditional layout. Recruiter-friendly and ATS-safe.", accent: "#0f172a" },
  { id: "minimal", name: "Minimal", desc: "Lots of whitespace. Lets your content speak.", accent: "#0f766e" },
  { id: "elegant", name: "Elegant", desc: "Centered header with refined typography for senior roles.", accent: "#9333ea" },
];

function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-bold">Templates</h1>
        <p className="mt-2 text-muted-foreground">Pick a starting point — you can switch anytime in the builder.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {templates.map((t) => (
            <div key={t.id} className="overflow-hidden rounded-xl border bg-card">
              <div className="overflow-hidden bg-muted/30 p-4" style={{ height: 360 }}>
                <div className="origin-top-left scale-[0.42]" style={{ width: "238%" }}>
                  <ResumePreview
                    data={defaultResume}
                    custom={{ template: t.id, accentColor: t.accent, fontFamily: "Inter, sans-serif", showPhoto: true, fontSize: 11 }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-t p-4">
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
                <Link to="/builder" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Use
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
