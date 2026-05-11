export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type Project = {
  id: string;
  name: string;
  link: string;
  description: string;
};

export type ResumeData = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo: string; // data URL
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  languages: string[];
};

export type TemplateId = "modern" | "classic" | "minimal" | "elegant";

export type Customization = {
  template: TemplateId;
  accentColor: string;
  fontFamily: string;
  showPhoto: boolean;
  fontSize: number; // base px
};

export const defaultResume: ResumeData = {
  fullName: "Alex Morgan",
  title: "Senior Product Designer",
  email: "alex.morgan@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "alexmorgan.design",
  linkedin: "linkedin.com/in/alexmorgan",
  github: "github.com/alexmorgan",
  photo: "",
  summary:
    "Product designer with 6+ years crafting intuitive digital experiences for fintech and SaaS. Passionate about systems thinking, user research, and shipping polished interfaces.",
  experience: [
    {
      id: "e1",
      role: "Senior Product Designer",
      company: "Northwind Labs",
      location: "Remote",
      startDate: "2022",
      endDate: "Present",
      description:
        "Lead designer for the analytics platform. Redesigned onboarding flow, increasing activation by 38%. Built and maintained the design system used across 4 product teams.",
    },
    {
      id: "e2",
      role: "Product Designer",
      company: "Brightway",
      location: "New York, NY",
      startDate: "2019",
      endDate: "2022",
      description:
        "Shipped customer-facing dashboards used by 200k+ users. Partnered with PMs and engineers across 3 squads. Ran weekly user interviews and usability tests.",
    },
  ],
  education: [
    {
      id: "ed1",
      degree: "B.A. in Human-Computer Interaction",
      school: "University of Washington",
      location: "Seattle, WA",
      startDate: "2015",
      endDate: "2019",
      details: "Graduated with honors. Minor in Cognitive Science.",
    },
  ],
  skills: [
    "Figma",
    "Design Systems",
    "User Research",
    "Prototyping",
    "HTML/CSS",
    "Accessibility",
    "Framer",
    "Webflow",
  ],
  projects: [
    {
      id: "p1",
      name: "Open Source Icon Set",
      link: "github.com/alexmorgan/icons",
      description: "1.2k+ star MIT-licensed icon set used in production by 50+ teams.",
    },
  ],
  languages: ["English (Native)", "Spanish (Conversational)"],
};

export const defaultCustomization: Customization = {
  template: "modern",
  accentColor: "#2563eb",
  fontFamily: "Inter",
  showPhoto: true,
  fontSize: 11,
};

export const fontOptions = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Playfair", value: "'Playfair Display', serif" },
  { label: "Roboto Slab", value: "'Roboto Slab', serif" },
  { label: "Georgia", value: "Georgia, serif" },
];

export const accentPresets = [
  "#2563eb",
  "#0f766e",
  "#9333ea",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#0f172a",
  "#dc2626",
];