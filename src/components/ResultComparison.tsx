import { useState } from "react";
import { Download, RefreshCw, BookmarkPlus, LogIn } from "lucide-react";
import { Button } from "./ui/button";

interface ResultComparisonProps {
  originalContent: {
    title: string;
    paragraphs: string[];
  };
  translatedContent: {
    title: string;
    paragraphs: string[];
  };
  isLoggedIn: boolean;
  onDownload: () => void;
  onRetranslate: () => void;
  onSave: () => void;
  onLoginPrompt: () => void;
}

const ResultComparison = ({
  originalContent,
  translatedContent,
  isLoggedIn,
  onDownload,
  onRetranslate,
  onSave,
  onLoginPrompt,
}: ResultComparisonProps) => {
  const [activeTab, setActiveTab] = useState<"original" | "translated">("translated");

  const ContentPane = ({
    content,
    label,
    isOriginal,
  }: {
    content: { title: string; paragraphs: string[] };
    label: string;
    isOriginal: boolean;
  }) => (
    <div
      className={`flex-1 bg-card border-2 border-foreground shadow-hard wobbly-border p-4 md:p-6 ${
        isOriginal ? "rotate-slight-left" : "rotate-slight-right"
      } hover:rotate-0 transition-transform`}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-dashed border-foreground/30">
        <span className="font-heading text-lg text-muted-foreground">{label}</span>
        <div className="w-3 h-3 bg-primary wobbly-border-sm" />
      </div>
      
      <div className="paper-texture p-4 min-h-[300px]">
        <h4 className="font-heading text-xl mb-4">{content.title}</h4>
        <div className="space-y-3">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} className="font-body text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      {/* Mobile tabs */}
      <div className="flex md:hidden border-2 border-foreground wobbly-border-sm overflow-hidden">
        <button
          onClick={() => setActiveTab("original")}
          className={`flex-1 py-3 font-heading text-lg transition-colors ${
            activeTab === "original" ? "bg-muted" : "bg-card"
          }`}
        >
          Original
        </button>
        <button
          onClick={() => setActiveTab("translated")}
          className={`flex-1 py-3 font-heading text-lg transition-colors border-l-2 border-foreground ${
            activeTab === "translated" ? "bg-muted" : "bg-card"
          }`}
        >
          Translated
        </button>
      </div>

      {/* Desktop: side by side */}
      <div className="hidden md:flex gap-6">
        <ContentPane content={originalContent} label="📄 Original" isOriginal />
        <ContentPane content={translatedContent} label="✨ Translated" isOriginal={false} />
      </div>

      {/* Mobile: single pane */}
      <div className="md:hidden">
        {activeTab === "original" ? (
          <ContentPane content={originalContent} label="📄 Original" isOriginal />
        ) : (
          <ContentPane content={translatedContent} label="✨ Translated" isOriginal={false} />
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={onDownload} size="lg">
          <Download className="w-5 h-5" />
          Download
        </Button>
        
        <Button variant="outline" onClick={onRetranslate}>
          <RefreshCw className="w-5 h-5" />
          Re-translate
        </Button>

        {isLoggedIn ? (
          <Button variant="secondary" onClick={onSave}>
            <BookmarkPlus className="w-5 h-5" />
            Save to History
          </Button>
        ) : (
          <button
            onClick={onLoginPrompt}
            className="flex items-center gap-2 px-4 py-2 font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span className="underline decoration-dashed">Sign in to save</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultComparison;
