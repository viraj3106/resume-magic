import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  defaultCustomization,
  defaultResume,
  type Customization,
  type ResumeData,
} from "@/lib/resume-types";
import { Download, FileText, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resume Builder — Free Online CV Maker with Photo & PDF Download" },
      { name: "description", content: "Build a beautiful resume in minutes. Upload a profile photo, choose a template and color, and download your CV as PDF — free." },
    ],
  }),
  component: Index,
});

function Index() {
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [custom, setCustom] = useState<Customization>(defaultCustomization);
  const [downloading, setDownloading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("resume-data");
      const rawC = localStorage.getItem("resume-custom");
      if (raw) setData(JSON.parse(raw));
      if (rawC) setCustom(JSON.parse(rawC));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    localStorage.setItem("resume-custom", JSON.stringify(custom));
  }, [custom]);

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
    } finally {
      setDownloading(false);
    }
  };

  const reset = () => {
    if (confirm("Reset to default resume?")) {
      setData(defaultResume);
      setCustom(defaultCustomization);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="no-print sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Resume Builder</h1>
          </div>
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
      </header>
      <main className="mx-auto grid max-w-[1600px] gap-6 p-4 lg:grid-cols-[480px_1fr]">
        <div className="no-print max-h-[calc(100vh-90px)] overflow-y-auto pr-2">
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
