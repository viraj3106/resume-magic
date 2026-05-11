import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateCoverLetter, scoreResume } from "@/lib/ai-resume.functions";
import { defaultResume } from "@/lib/resume-types";
import { Loader2, Sparkles, FileCheck, Mail, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/ai-tools")({
  head: () => ({
    meta: [
      { title: "AI Resume Tools — ResuméCraft" },
      { name: "description", content: "Score your resume against any job, generate tailored cover letters, and get AI-powered improvements." },
    ],
  }),
  component: AiToolsPage,
});

function loadResume() {
  if (typeof window === "undefined") return defaultResume;
  try {
    const raw = localStorage.getItem("resume-data");
    return raw ? JSON.parse(raw) : defaultResume;
  } catch { return defaultResume; }
}

function AiToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Lovable AI
          </span>
          <h1 className="mt-4 text-4xl font-bold">AI Resume Tools</h1>
          <p className="mt-2 text-muted-foreground">Use AI to tailor, score, and improve your application.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <ScoreCard />
          <CoverLetterCard />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ScoreCard() {
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const score = useServerFn(scoreResume);

  const run = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      const resume = loadResume();
      const r = await score({ data: { resumeData: JSON.stringify(resume), jobDescription: job } });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <FileCheck className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">ATS Score</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">Paste a job description to score your saved resume.</p>
      <Label className="text-xs">Job description</Label>
      <Textarea rows={6} value={job} onChange={(e) => setJob(e.target.value)} placeholder="Paste the full job description here…" />
      <Button className="mt-3 w-full" onClick={run} disabled={loading || job.length < 30}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Analyzing…" : "Score my resume"}
      </Button>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {result && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: "Overall", v: result.overall },
              { label: "Keywords", v: result.keywordMatch },
              { label: "Impact", v: result.impact },
              { label: "Clarity", v: result.clarity },
            ].map((m) => (
              <div key={m.label} className="rounded-lg border p-2">
                <div className="text-2xl font-bold text-primary">{m.v}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
          {result.missingKeywords?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold">Missing keywords</h4>
              <div className="mt-2 flex flex-wrap gap-1">
                {result.missingKeywords.map((k: string) => (
                  <span key={k} className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs text-destructive">{k}</span>
                ))}
              </div>
            </div>
          )}
          {result.strengths?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold">Strengths</h4>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                {result.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {result.improvements?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold">Improvements</h4>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                {result.improvements.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CoverLetterCard() {
  const [job, setJob] = useState("");
  const [tone, setTone] = useState<"professional" | "enthusiastic" | "concise">("professional");
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const gen = useServerFn(generateCoverLetter);

  const run = async () => {
    setLoading(true); setError(null);
    try {
      const resume = loadResume();
      const r = await gen({ data: { resumeData: JSON.stringify(resume), jobDescription: job, tone } });
      setLetter(r.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Cover Letter Generator</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">Tailored to the job, grounded in your resume.</p>
      <Label className="text-xs">Job description</Label>
      <Textarea rows={5} value={job} onChange={(e) => setJob(e.target.value)} placeholder="Paste the job description…" />
      <div className="mt-2">
        <Label className="text-xs">Tone</Label>
        <select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={tone} onChange={(e) => setTone(e.target.value as any)}>
          <option value="professional">Professional</option>
          <option value="enthusiastic">Enthusiastic</option>
          <option value="concise">Concise</option>
        </select>
      </div>
      <Button className="mt-3 w-full" onClick={run} disabled={loading || job.length < 30}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Writing…" : "Generate cover letter"}
      </Button>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {letter && (
        <div className="mt-4 rounded-lg border bg-background p-4">
          <div className="mb-2 flex justify-end">
            <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(letter)}>
              <Copy className="h-3 w-3" /> Copy
            </Button>
          </div>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{letter}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
