import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/** Renders trusted admin-authored Markdown. Raw HTML is not enabled. */
export function Markdown({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("prose-cr", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
