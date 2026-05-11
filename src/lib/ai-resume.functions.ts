import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ActionSchema = z.object({
  action: z.enum([
    "improve-summary",
    "generate-summary",
    "improve-bullets",
    "generate-bullets",
    "extract-skills",
    "tailor-to-job",
    "fix-grammar",
    "shorten",
  ]),
  text: z.string().min(1).max(5000),
  context: z.string().max(2000).optional(),
  jobDescription: z.string().max(4000).optional(),
});

export type AiAction = z.infer<typeof ActionSchema>["action"];

const PROMPTS: Record<AiAction, (input: { text: string; context?: string; jobDescription?: string }) => string> = {
  "improve-summary": ({ text, context }) =>
    `Rewrite this resume professional summary to be punchy, specific, and impactful in 2-3 sentences. Use strong action verbs, quantify when possible, avoid clichés like "team player".\n\n${context ? `Role context: ${context}\n\n` : ""}Summary:\n${text}`,
  "generate-summary": ({ context }) =>
    `Write a compelling 2-3 sentence professional resume summary for this person. Focus on impact, expertise, and value. No clichés.\n\nContext:\n${context}`,
  "improve-bullets": ({ text }) =>
    `Rewrite the following job description as 3-5 strong resume bullet points. Each bullet:\n- Starts with a strong action verb\n- Includes quantified impact when possible\n- Is concise (under 25 words)\nReturn only the bullets, one per line, prefixed with "• ".\n\nOriginal:\n${text}`,
  "generate-bullets": ({ context }) =>
    `Write 3-5 strong resume bullet points for this role. Each bullet starts with an action verb, focuses on impact, includes metrics when reasonable. Return one per line prefixed with "• ".\n\nRole:\n${context}`,
  "extract-skills": ({ text }) =>
    `Extract a comma-separated list of 8-15 relevant professional skills (tools, frameworks, soft skills) from this resume content. Return ONLY the comma-separated list, no preamble.\n\n${text}`,
  "tailor-to-job": ({ text, jobDescription }) =>
    `You are a resume coach. Rewrite the following resume summary so it tightly aligns with this job description while staying truthful. Keep it 2-3 sentences.\n\nJob Description:\n${jobDescription}\n\nCurrent Summary:\n${text}`,
  "fix-grammar": ({ text }) =>
    `Fix grammar, spelling, and clarity issues in this text. Keep meaning and length similar. Return only the corrected text.\n\n${text}`,
  "shorten": ({ text }) =>
    `Rewrite this text to be ~30% shorter while keeping all key info. Return only the rewritten text.\n\n${text}`,
};

export const runAiResume = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ActionSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const { generateText } = await import("ai");
    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");

    const gateway = createLovableAiGatewayProvider(apiKey);
    const model = gateway("google/gemini-3-flash-preview");

    const prompt = PROMPTS[data.action]({
      text: data.text,
      context: data.context,
      jobDescription: data.jobDescription,
    });

    const { text } = await generateText({
      model,
      system:
        "You are an expert resume writer. Be concise, specific, and impact-driven. Never invent facts. Output plain text only — no markdown unless explicitly asked.",
      prompt,
    });

    return { text: text.trim() };
  });

const CoverLetterSchema = z.object({
  resumeData: z.string().min(10).max(8000),
  jobDescription: z.string().min(10).max(4000),
  tone: z.enum(["professional", "enthusiastic", "concise"]).default("professional"),
});

export const generateCoverLetter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => CoverLetterSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");
    const { generateText } = await import("ai");
    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);
    const model = gateway("google/gemini-3-flash-preview");
    const { text } = await generateText({
      model,
      system:
        "You write tailored, sincere cover letters. Avoid clichés. Match the candidate's actual experience to the job. Use markdown with paragraph breaks.",
      prompt: `Write a ${data.tone} cover letter for the following candidate applying to this job. 3-4 short paragraphs. End with a clear call to action.\n\nCANDIDATE RESUME (JSON):\n${data.resumeData}\n\nJOB DESCRIPTION:\n${data.jobDescription}`,
    });
    return { text: text.trim() };
  });

const ScoreSchema = z.object({
  resumeData: z.string().min(10).max(8000),
  jobDescription: z.string().min(10).max(4000),
});

export const scoreResume = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ScoreSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");
    const { generateText } = await import("ai");
    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);
    const model = gateway("google/gemini-3-flash-preview");
    const { text } = await generateText({
      model,
      system:
        "You are an ATS and resume reviewer. Score critically but constructively. Always respond with valid JSON only — no markdown fences, no preamble.",
      prompt: `Score this resume against the job description and return JSON with this exact shape:\n{\n  "overall": number 0-100,\n  "keywordMatch": number 0-100,\n  "impact": number 0-100,\n  "clarity": number 0-100,\n  "missingKeywords": string[] (max 15),\n  "strengths": string[] (max 5),\n  "improvements": string[] (max 5)\n}\n\nRESUME (JSON):\n${data.resumeData}\n\nJOB DESCRIPTION:\n${data.jobDescription}`,
    });
    const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    return JSON.parse(cleaned) as {
      overall: number; keywordMatch: number; impact: number; clarity: number;
      missingKeywords: string[]; strengths: string[]; improvements: string[];
    };
  });