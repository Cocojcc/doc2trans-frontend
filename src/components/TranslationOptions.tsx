import { useState, useRef } from "react";
import { ChevronDown, Upload, X, FileSpreadsheet, HelpCircle, Download, Settings2, Sparkles } from "lucide-react";

interface TranslationOptionsProps {
  targetLanguage: string;
  onTargetChange: (lang: string) => void;
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  glossaryFile: File | null;
  onGlossaryUpload: (file: File | null) => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
];

const styles = [
  { id: "standard", name: "标准翻译", description: "保持原文风格和语调" },
  { id: "formal", name: "正式商务", description: "适合商业文档和正式场合" },
  { id: "casual", name: "轻松口语", description: "更自然、口语化的表达" },
  { id: "creative", name: "创意改写", description: "更有创意和文学性" },
  { id: "academic", name: "学术论文", description: "适合学术文献和研究报告" },
  { id: "technical", name: "技术文档", description: "适合技术手册和API文档" },
];

const TranslationOptions = ({
  targetLanguage,
  onTargetChange,
  selectedStyle,
  onStyleChange,
  glossaryFile,
  onGlossaryUpload,
}: TranslationOptionsProps) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedLang = languages.find((l) => l.code === targetLanguage);
  const selectedStyleData = styles.find((s) => s.id === selectedStyle);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (validTypes.includes(file.type) || file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        onGlossaryUpload(file);
      } else {
        alert("请上传Excel格式的术语表文件（.xlsx 或 .xls）");
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownloadTemplate = () => {
    const templateContent = "源语言术语,目标语言术语,备注\nArtificial Intelligence,人工智能,AI的全称\nMachine Learning,机器学习,";
    const blob = new Blob(["\ufeff" + templateContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "术语表模板.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getAdvancedSummary = () => {
    const parts = [selectedStyleData?.name || "标准翻译"];
    if (glossaryFile) {
      parts.push("术语表");
    }
    return parts.join(" + ");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      {/* 目标语言 + 高级选项 一行 */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* 目标语言选择 */}
        <div className="relative flex-1">
          <label className="block font-heading text-sm mb-2 text-muted-foreground">
            翻译为
          </label>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-card border-2 border-foreground shadow-hard wobbly-border-sm font-body text-lg hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{selectedLang?.flag}</span>
              <span>{selectedLang?.name}</span>
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
          </button>

          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
              <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-card border-2 border-foreground shadow-hard wobbly-border max-h-60 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onTargetChange(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 font-body text-lg hover:bg-muted transition-colors border-b border-foreground/20 last:border-b-0 ${
                      targetLanguage === lang.code ? "bg-muted" : ""
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 高级选项 */}
        <div className="relative flex-1">
          <label className="block font-heading text-sm mb-2 text-muted-foreground">
            高级选项
          </label>
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-card border-2 border-foreground shadow-hard wobbly-border-sm font-body hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              <span className="text-lg">{getAdvancedSummary()}</span>
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
          </button>

          {isAdvancedOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsAdvancedOpen(false)} />
              <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-card border-2 border-foreground shadow-hard wobbly-border p-4 space-y-4">
                {/* 翻译风格 */}
                <div className="relative">
                  <label className="block font-heading text-sm mb-2 text-muted-foreground">
                    翻译风格
                  </label>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsStyleOpen(!isStyleOpen);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-muted/50 border-2 border-foreground/50 font-body text-sm hover:border-foreground transition-all"
                  >
                    <span>
                      <span className="font-medium">{selectedStyleData?.name}</span>
                      <span className="text-muted-foreground ml-2">- {selectedStyleData?.description}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ${isStyleOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isStyleOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-card border-2 border-foreground shadow-hard max-h-48 overflow-y-auto">
                      {styles.map((style) => (
                        <button
                          key={style.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onStyleChange(style.id);
                            setIsStyleOpen(false);
                          }}
                          className={`w-full flex flex-col items-start px-3 py-2.5 font-body text-sm hover:bg-muted transition-colors border-b border-foreground/20 last:border-b-0 ${
                            selectedStyle === style.id ? "bg-muted" : ""
                          }`}
                        >
                          <span className="font-medium">{style.name}</span>
                          <span className="text-muted-foreground text-xs">{style.description}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 术语表上传 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="font-heading text-sm text-muted-foreground">
                      术语表（可选）
                    </label>
                    <a
                      href="https://docs.example.com/glossary-guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="查看术语表使用说明"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {glossaryFile ? (
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-2 border-foreground/50">
                      <FileSpreadsheet className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-body text-sm flex-1 truncate">{glossaryFile.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onGlossaryUpload(null);
                        }}
                        className="p-1 hover:bg-muted rounded transition-colors"
                        title="移除术语表"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted/30 border-2 border-dashed border-foreground/40 font-body text-sm text-muted-foreground hover:border-foreground/60 hover:text-foreground transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>上传术语表</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadTemplate();
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 bg-muted/50 border-2 border-foreground/50 font-body text-sm hover:bg-muted transition-all"
                        title="下载术语表模板"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>模板</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationOptions;
