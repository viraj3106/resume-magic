import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  accentPresets,
  fontOptions,
  type Customization,
  type ResumeData,
  type TemplateId,
} from "@/lib/resume-types";
import { Trash2, Plus, Upload } from "lucide-react";

type Props = {
  data: ResumeData;
  setData: (d: ResumeData) => void;
  custom: Customization;
  setCustom: (c: Customization) => void;
};

const uid = () => Math.random().toString(36).slice(2, 9);

const templates: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "minimal", label: "Minimal" },
  { id: "elegant", label: "Elegant" },
];

export function ResumeEditor({ data, setData, custom, setCustom }: Props) {
  const update = <K extends keyof ResumeData>(k: K, v: ResumeData[K]) =>
    setData({ ...data, [k]: v });

  const handlePhoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Customization */}
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Design</h2>
        <div>
          <Label className="text-xs">Template</Label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setCustom({ ...custom, template: t.id })}
                className={`rounded-md border px-2 py-2 text-xs font-medium transition ${
                  custom.template === t.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-xs">Accent Color</Label>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            {accentPresets.map((c) => (
              <button
                key={c}
                onClick={() => setCustom({ ...custom, accentColor: c })}
                className={`h-7 w-7 rounded-full border-2 transition ${
                  custom.accentColor === c ? "border-foreground scale-110" : "border-transparent"
                }`}
                style={{ background: c }}
                aria-label={c}
              />
            ))}
            <input
              type="color"
              value={custom.accentColor}
              onChange={(e) => setCustom({ ...custom, accentColor: e.target.value })}
              className="h-7 w-10 cursor-pointer rounded border"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Font</Label>
            <select
              className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
              value={custom.fontFamily}
              onChange={(e) => setCustom({ ...custom, fontFamily: e.target.value })}
            >
              {fontOptions.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs">Font Size: {custom.fontSize}pt</Label>
            <input
              type="range"
              min={9}
              max={13}
              step={0.5}
              value={custom.fontSize}
              onChange={(e) => setCustom({ ...custom, fontSize: parseFloat(e.target.value) })}
              className="mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-xs">Show profile photo</Label>
          <Switch
            checked={custom.showPhoto}
            onCheckedChange={(v) => setCustom({ ...custom, showPhoto: v })}
          />
        </div>
      </section>

      {/* Personal */}
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Personal</h2>
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
              {data.photo ? (
                <img src={data.photo} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <Upload className="h-5 w-5" />
                </div>
              )}
            </div>
            <label className="mt-2 block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handlePhoto(e.target.files[0])}
              />
              <span className="block cursor-pointer rounded-md border px-2 py-1 text-center text-xs hover:bg-accent">
                Upload
              </span>
            </label>
            {data.photo && (
              <button
                onClick={() => update("photo", "")}
                className="mt-1 w-full text-xs text-destructive hover:underline"
              >
                Remove
              </button>
            )}
          </div>
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input placeholder="Full name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} />
            <Input placeholder="Title" value={data.title} onChange={(e) => update("title", e.target.value)} />
            <Input placeholder="Email" value={data.email} onChange={(e) => update("email", e.target.value)} />
            <Input placeholder="Phone" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
            <Input placeholder="Location" value={data.location} onChange={(e) => update("location", e.target.value)} />
            <Input placeholder="Website" value={data.website} onChange={(e) => update("website", e.target.value)} />
            <Input placeholder="LinkedIn" value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
            <Input placeholder="GitHub" value={data.github} onChange={(e) => update("github", e.target.value)} />
          </div>
        </div>
        <Textarea
          placeholder="Professional summary"
          rows={3}
          value={data.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
      </section>

      {/* Experience */}
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Experience</h2>
          <Button size="sm" variant="outline" onClick={() => update("experience", [...data.experience, { id: uid(), role: "", company: "", location: "", startDate: "", endDate: "", description: "" }])}>
            <Plus className="h-4 w-4" />Add
          </Button>
        </div>
        {data.experience.map((e, i) => (
          <div key={e.id} className="space-y-2 rounded-md border p-3">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Role" value={e.role} onChange={(ev) => { const a=[...data.experience]; a[i]={...e, role: ev.target.value}; update("experience", a); }} />
              <Input placeholder="Company" value={e.company} onChange={(ev) => { const a=[...data.experience]; a[i]={...e, company: ev.target.value}; update("experience", a); }} />
              <Input placeholder="Location" value={e.location} onChange={(ev) => { const a=[...data.experience]; a[i]={...e, location: ev.target.value}; update("experience", a); }} />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Start" value={e.startDate} onChange={(ev) => { const a=[...data.experience]; a[i]={...e, startDate: ev.target.value}; update("experience", a); }} />
                <Input placeholder="End" value={e.endDate} onChange={(ev) => { const a=[...data.experience]; a[i]={...e, endDate: ev.target.value}; update("experience", a); }} />
              </div>
            </div>
            <Textarea placeholder="Description" rows={3} value={e.description} onChange={(ev) => { const a=[...data.experience]; a[i]={...e, description: ev.target.value}; update("experience", a); }} />
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => update("experience", data.experience.filter(x => x.id !== e.id))}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Education</h2>
          <Button size="sm" variant="outline" onClick={() => update("education", [...data.education, { id: uid(), degree: "", school: "", location: "", startDate: "", endDate: "", details: "" }])}>
            <Plus className="h-4 w-4" />Add
          </Button>
        </div>
        {data.education.map((e, i) => (
          <div key={e.id} className="space-y-2 rounded-md border p-3">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Degree" value={e.degree} onChange={(ev) => { const a=[...data.education]; a[i]={...e, degree: ev.target.value}; update("education", a); }} />
              <Input placeholder="School" value={e.school} onChange={(ev) => { const a=[...data.education]; a[i]={...e, school: ev.target.value}; update("education", a); }} />
              <Input placeholder="Location" value={e.location} onChange={(ev) => { const a=[...data.education]; a[i]={...e, location: ev.target.value}; update("education", a); }} />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Start" value={e.startDate} onChange={(ev) => { const a=[...data.education]; a[i]={...e, startDate: ev.target.value}; update("education", a); }} />
                <Input placeholder="End" value={e.endDate} onChange={(ev) => { const a=[...data.education]; a[i]={...e, endDate: ev.target.value}; update("education", a); }} />
              </div>
            </div>
            <Textarea placeholder="Details" rows={2} value={e.details} onChange={(ev) => { const a=[...data.education]; a[i]={...e, details: ev.target.value}; update("education", a); }} />
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => update("education", data.education.filter(x => x.id !== e.id))}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Skills</h2>
        <Textarea
          placeholder="Comma-separated skills"
          rows={2}
          value={data.skills.join(", ")}
          onChange={(e) => update("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
        />
      </section>

      {/* Languages */}
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Languages</h2>
        <Textarea
          placeholder="Comma-separated languages"
          rows={2}
          value={data.languages.join(", ")}
          onChange={(e) => update("languages", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
        />
      </section>

      {/* Projects */}
      <section className="space-y-3 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Projects</h2>
          <Button size="sm" variant="outline" onClick={() => update("projects", [...data.projects, { id: uid(), name: "", link: "", description: "" }])}>
            <Plus className="h-4 w-4" />Add
          </Button>
        </div>
        {data.projects.map((p, i) => (
          <div key={p.id} className="space-y-2 rounded-md border p-3">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Name" value={p.name} onChange={(ev) => { const a=[...data.projects]; a[i]={...p, name: ev.target.value}; update("projects", a); }} />
              <Input placeholder="Link" value={p.link} onChange={(ev) => { const a=[...data.projects]; a[i]={...p, link: ev.target.value}; update("projects", a); }} />
            </div>
            <Textarea placeholder="Description" rows={2} value={p.description} onChange={(ev) => { const a=[...data.projects]; a[i]={...p, description: ev.target.value}; update("projects", a); }} />
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => update("projects", data.projects.filter(x => x.id !== p.id))}>
              <Trash2 className="h-4 w-4" /> Remove
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}