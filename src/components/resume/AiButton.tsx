import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { runAiResume, type AiAction } from "@/lib/ai-resume.functions";
import { useServerFn } from "@tanstack/react-start";

type Props = {
  action: AiAction;
  text: string;
  context?: string;
  onResult: (text: string) => void;
  label?: string;
  disabled?: boolean;
};

export function AiButton({ action, text, context, onResult, label = "AI Improve", disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = useServerFn(runAiResume);

  const handle = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: { action, text: text || " ", context } });
      onResult(res.text);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "AI request failed";
      setError(msg.includes("429") ? "Rate limited. Try again shortly." :
               msg.includes("402") ? "AI credits exhausted." : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handle}
        disabled={loading || disabled}
        className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-2 py-1 text-xs font-medium text-primary transition hover:bg-primary/10 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
        {label}
      </button>
      {error && <span className="text-[10px] text-destructive">{error}</span>}
    </div>
  );
}