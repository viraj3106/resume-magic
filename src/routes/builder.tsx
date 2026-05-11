import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { defaultCustomization, defaultResume, type Customization, type ResumeData } from "@/lib/resume-types";
import { Download, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Resume Builder — ResuméCraft" },
      { name: "description", content: "Create your resume with AI assistance, photo upload, and live preview." },
    ],
  }),
  component: Builder,
});

function Builder() {
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [custom, setCustom] = useState<Customization>(defaultCustomization);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("resume-data");
      const rawC = localStorage.getItem("resume-custom");
      if (raw) setData(JSON.parse(raw));
      if (rawC) setCustom(JSON.parse(rawC));
    } catch {}
  }, []);

  useEffect(() => { localStorage.setItem("resume-data", JSON.stringify(data)); }, [data]);
  useEffect(() => { localStorage.setItem("resume-custom", JSON.stringify(custom)); }, [custom]);

  const handleDownload = async () => {
    const el = document.getElementById("resume-page");
    if (!el) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: `${data.fullName.replace(/\s+/g, "_") || "resume"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(el)
        .save();
    } finally { setDownloading(false); }
  };

  const reset = () => {
    if (confirm("Reset to default resume?")) {
      setData(defaultResume);
      setCustom(defaultCustomization);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <SiteHeader />
      <div className="no-print sticky top-[57px] z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-2">
          <p className="text-sm text-muted-foreground">Auto-saved locally · Edit anything to update preview</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button size="sm" onClick={handleDownload} disabled={downloading}>
              <Download className="h-4 w-4" />
              {downloading ? "Generating…" : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>
      <main className="mx-auto grid max-w-[1600px] gap-6 p-4 lg:grid-cols-[480px_1fr]">
        <div className="no-print max-h-[calc(100vh-130px)] overflow-y-auto pr-2">
          <ResumeEditor data={data} setData={setData} custom={custom} setCustom={setCustom} />
        </div>
        <div className="overflow-x-auto">
          <div className="origin-top-left scale-[0.85] lg:scale-100">
            <ResumePreview data={data} custom={custom} />
          </div>
        </div>
      </main>
    </div>
  );
}
