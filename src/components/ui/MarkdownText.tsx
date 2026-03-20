import { parseMarkdownBoldSegments } from "@/lib/utils";

interface MarkdownTextProps {
  text: string;
}

/**
 * Component to render text with **bold** markdown syntax
 */
export function MarkdownText({ text }: MarkdownTextProps) {
  const segments = parseMarkdownBoldSegments(text);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.isBold) {
          return (
            <strong key={index} className="font-semibold text-slate-900">
              {segment.text}
            </strong>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
    </>
  );
}
