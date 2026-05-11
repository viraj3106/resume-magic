import type { Customization, ResumeData } from "@/lib/resume-types";

type Props = { data: ResumeData; custom: Customization };

const Section = ({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) => (
  <section style={{ marginBottom: 14 }}>
    <h2
      style={{
        fontSize: "1.1em",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: accent,
        borderBottom: `2px solid ${accent}`,
        paddingBottom: 4,
        marginBottom: 8,
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);

function ModernTemplate({ data, custom }: Props) {
  const { accentColor: a } = custom;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "35% 65%", minHeight: "100%" }}>
      <aside style={{ background: a, color: "white", padding: 24 }}>
        {custom.showPhoto && data.photo && (
          <img
            src={data.photo}
            alt={data.fullName}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid rgba(255,255,255,0.4)",
              margin: "0 auto 16px",
              display: "block",
            }}
          />
        )}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.95em", marginBottom: 6, opacity: 0.9 }}>Contact</h3>
          <div style={{ fontSize: "0.85em", lineHeight: 1.7, wordBreak: "break-word" }}>
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.location && <div>{data.location}</div>}
            {data.website && <div>{data.website}</div>}
            {data.linkedin && <div>{data.linkedin}</div>}
            {data.github && <div>{data.github}</div>}
          </div>
        </div>
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.95em", marginBottom: 8, opacity: 0.9 }}>Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.skills.map((s) => (
                <span key={s} style={{ fontSize: "0.78em", background: "rgba(255,255,255,0.18)", padding: "3px 8px", borderRadius: 4 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <h3 style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.95em", marginBottom: 6, opacity: 0.9 }}>Languages</h3>
            <div style={{ fontSize: "0.85em", lineHeight: 1.7 }}>
              {data.languages.map((l) => (<div key={l}>{l}</div>))}
            </div>
          </div>
        )}
      </aside>
      <main style={{ padding: 28 }}>
        <h1 style={{ fontSize: "2em", fontWeight: 800, color: "#111", marginBottom: 2 }}>{data.fullName}</h1>
        <p style={{ color: a, fontWeight: 600, fontSize: "1.05em", marginBottom: 14 }}>{data.title}</p>
        {data.summary && (
          <Section title="Profile" accent={a}>
            <p style={{ lineHeight: 1.55 }}>{data.summary}</p>
          </Section>
        )}
        {data.experience.length > 0 && (
          <Section title="Experience" accent={a}>
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong>{e.role}</strong>
                  <span style={{ fontSize: "0.85em", color: "#666" }}>{e.startDate} – {e.endDate}</span>
                </div>
                <div style={{ fontSize: "0.9em", color: a, fontWeight: 500 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</div>
                <p style={{ fontSize: "0.92em", lineHeight: 1.5, marginTop: 4, whiteSpace: "pre-wrap" }}>{e.description}</p>
              </div>
            ))}
          </Section>
        )}
        {data.projects.length > 0 && (
          <Section title="Projects" accent={a}>
            {data.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{p.name}</strong>
                  {p.link && <span style={{ fontSize: "0.8em", color: "#666" }}>{p.link}</span>}
                </div>
                <p style={{ fontSize: "0.92em", lineHeight: 1.5 }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}
        {data.education.length > 0 && (
          <Section title="Education" accent={a}>
            {data.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong>{e.degree}</strong>
                  <span style={{ fontSize: "0.85em", color: "#666" }}>{e.startDate} – {e.endDate}</span>
                </div>
                <div style={{ fontSize: "0.9em", color: a, fontWeight: 500 }}>{e.school}{e.location ? ` · ${e.location}` : ""}</div>
                {e.details && <p style={{ fontSize: "0.9em", lineHeight: 1.5 }}>{e.details}</p>}
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}

function ClassicTemplate({ data, custom }: Props) {
  const a = custom.accentColor;
  return (
    <div style={{ padding: 36 }}>
      <header style={{ display: "flex", alignItems: "center", gap: 20, borderBottom: `3px solid ${a}`, paddingBottom: 16, marginBottom: 18 }}>
        {custom.showPhoto && data.photo && (
          <img src={data.photo} alt="" style={{ width: 90, height: 90, borderRadius: 8, objectFit: "cover" }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2.2em", fontWeight: 700, color: "#111" }}>{data.fullName}</h1>
          <p style={{ color: a, fontWeight: 600, marginTop: 2 }}>{data.title}</p>
          <div style={{ fontSize: "0.85em", color: "#555", marginTop: 6, display: "flex", flexWrap: "wrap", gap: 12 }}>
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
            {data.website && <span>{data.website}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
          </div>
        </div>
      </header>
      {data.summary && (
        <Section title="Summary" accent={a}><p style={{ lineHeight: 1.55 }}>{data.summary}</p></Section>
      )}
      {data.experience.length > 0 && (
        <Section title="Experience" accent={a}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.role} · {e.company}</strong>
                <span style={{ fontSize: "0.85em", color: "#666" }}>{e.startDate} – {e.endDate}</span>
              </div>
              <p style={{ fontSize: "0.92em", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{e.description}</p>
            </div>
          ))}
        </Section>
      )}
      {data.education.length > 0 && (
        <Section title="Education" accent={a}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.degree} · {e.school}</strong>
                <span style={{ fontSize: "0.85em", color: "#666" }}>{e.startDate} – {e.endDate}</span>
              </div>
              {e.details && <p style={{ fontSize: "0.9em" }}>{e.details}</p>}
            </div>
          ))}
        </Section>
      )}
      {data.skills.length > 0 && (
        <Section title="Skills" accent={a}>
          <p style={{ lineHeight: 1.6 }}>{data.skills.join(" · ")}</p>
        </Section>
      )}
      {data.projects.length > 0 && (
        <Section title="Projects" accent={a}>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 6 }}>
              <strong>{p.name}</strong> {p.link && <span style={{ fontSize: "0.8em", color: "#666" }}>· {p.link}</span>}
              <p style={{ fontSize: "0.92em" }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function MinimalTemplate({ data, custom }: Props) {
  const a = custom.accentColor;
  return (
    <div style={{ padding: 40 }}>
      <header style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: "2.4em", fontWeight: 300, letterSpacing: "-0.02em", color: "#111" }}>{data.fullName}</h1>
        <p style={{ color: a, fontWeight: 500, marginTop: 4 }}>{data.title}</p>
        <div style={{ fontSize: "0.85em", color: "#666", marginTop: 8 }}>
          {[data.email, data.phone, data.location, data.website, data.linkedin].filter(Boolean).join("  ·  ")}
        </div>
      </header>
      {data.summary && <p style={{ marginBottom: 18, lineHeight: 1.6, color: "#333" }}>{data.summary}</p>}
      {data.experience.length > 0 && (
        <Section title="Experience" accent={a}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.role}</strong>
                <span style={{ fontSize: "0.85em", color: "#888" }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ color: "#666", fontSize: "0.9em" }}>{e.company}{e.location ? `, ${e.location}` : ""}</div>
              <p style={{ fontSize: "0.92em", lineHeight: 1.55, marginTop: 4, whiteSpace: "pre-wrap" }}>{e.description}</p>
            </div>
          ))}
        </Section>
      )}
      {data.education.length > 0 && (
        <Section title="Education" accent={a}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.degree}</strong>
                <span style={{ fontSize: "0.85em", color: "#888" }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ color: "#666", fontSize: "0.9em" }}>{e.school}</div>
            </div>
          ))}
        </Section>
      )}
      {data.skills.length > 0 && (
        <Section title="Skills" accent={a}>
          <p style={{ lineHeight: 1.7 }}>{data.skills.join(" · ")}</p>
        </Section>
      )}
    </div>
  );
}

function ElegantTemplate({ data, custom }: Props) {
  const a = custom.accentColor;
  return (
    <div style={{ padding: 36 }}>
      <header style={{ textAlign: "center", marginBottom: 20 }}>
        {custom.showPhoto && data.photo && (
          <img src={data.photo} alt="" style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", margin: "0 auto 12px", display: "block", border: `3px solid ${a}` }} />
        )}
        <h1 style={{ fontSize: "2.4em", fontWeight: 700, letterSpacing: "0.02em", color: "#111" }}>{data.fullName}</h1>
        <p style={{ color: a, fontWeight: 500, marginTop: 4, fontStyle: "italic" }}>{data.title}</p>
        <div style={{ width: 60, height: 2, background: a, margin: "12px auto" }} />
        <div style={{ fontSize: "0.85em", color: "#555" }}>
          {[data.email, data.phone, data.location, data.website].filter(Boolean).join("  •  ")}
        </div>
      </header>
      {data.summary && <Section title="About" accent={a}><p style={{ lineHeight: 1.6, fontStyle: "italic" }}>{data.summary}</p></Section>}
      {data.experience.length > 0 && (
        <Section title="Experience" accent={a}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.role}</strong>
                <span style={{ fontSize: "0.85em", color: "#666" }}>{e.startDate} – {e.endDate}</span>
              </div>
              <em style={{ color: a }}>{e.company}{e.location ? `, ${e.location}` : ""}</em>
              <p style={{ fontSize: "0.92em", lineHeight: 1.55, marginTop: 4, whiteSpace: "pre-wrap" }}>{e.description}</p>
            </div>
          ))}
        </Section>
      )}
      {data.education.length > 0 && (
        <Section title="Education" accent={a}>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 6 }}>
              <strong>{e.degree}</strong> — <em>{e.school}</em>
              <span style={{ float: "right", fontSize: "0.85em", color: "#666" }}>{e.startDate} – {e.endDate}</span>
            </div>
          ))}
        </Section>
      )}
      {data.skills.length > 0 && (
        <Section title="Skills" accent={a}>
          <p style={{ textAlign: "center", lineHeight: 1.8 }}>{data.skills.join("  •  ")}</p>
        </Section>
      )}
    </div>
  );
}

export function ResumePreview({ data, custom }: Props) {
  const T =
    custom.template === "classic" ? ClassicTemplate :
    custom.template === "minimal" ? MinimalTemplate :
    custom.template === "elegant" ? ElegantTemplate :
    ModernTemplate;
  return (
    <div
      id="resume-page"
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "white",
        color: "#222",
        fontFamily: custom.fontFamily,
        fontSize: `${custom.fontSize}pt`,
        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        margin: "0 auto",
      }}
    >
      <T data={data} custom={custom} />
    </div>
  );
}