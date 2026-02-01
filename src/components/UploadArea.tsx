import { useState, useCallback } from "react";
import { Upload, File, X, FileText, FileSpreadsheet, Presentation } from "lucide-react";
import { Button } from "./ui/button";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface UploadAreaProps {
  file: UploadedFile | null;
  onFileUpload: (file: UploadedFile) => void;
  onFileRemove: () => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const getFileIcon = (type: string) => {
  if (type.includes("pdf")) return <FileText className="w-8 h-8 text-primary" />;
  if (type.includes("word") || type.includes("document")) return <FileText className="w-8 h-8 text-secondary" />;
  if (type.includes("presentation") || type.includes("powerpoint")) return <Presentation className="w-8 h-8 text-primary" />;
  if (type.includes("spreadsheet") || type.includes("excel")) return <FileSpreadsheet className="w-8 h-8 text-secondary" />;
  return <File className="w-8 h-8 text-foreground" />;
};

const UploadArea = ({ file, onFileUpload, onFileRemove }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        onFileUpload({
          name: droppedFile.name,
          size: droppedFile.size,
          type: droppedFile.type,
        });
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        onFileUpload({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
        });
      }
    },
    [onFileUpload]
  );

  if (file) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative bg-card border-2 border-foreground shadow-hard wobbly-border p-6 rotate-slight-right hover:rotate-0 transition-transform duration-200">
          <button
            onClick={onFileRemove}
            className="absolute -top-3 -right-3 w-8 h-8 bg-destructive border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center hover:shadow-hard-active hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            aria-label="Remove file"
          >
            <X className="w-4 h-4 text-destructive-foreground" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted border-2 border-foreground wobbly-border-sm flex items-center justify-center">
              {getFileIcon(file.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-xl truncate">{file.name}</h3>
              <p className="font-body text-muted-foreground">
                {formatFileSize(file.size)} • Ready to translate
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 border-2 border-foreground rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative block cursor-pointer
          bg-card border-2 border-dashed border-foreground
          wobbly-border p-8 md:p-12
          transition-all duration-200
          ${isDragging 
            ? "shadow-hard-active translate-x-[4px] translate-y-[4px] bg-muted" 
            : "shadow-hard hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px]"
          }
        `}
      >
        <input
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={handleFileSelect}
        />
        
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`
            w-20 h-20 bg-muted border-2 border-foreground wobbly-border-sm
            flex items-center justify-center
            ${isDragging ? "animate-wiggle" : ""}
          `}>
            <Upload className="w-10 h-10 text-foreground" />
          </div>
          
          <div>
            <h2 className="font-heading text-2xl md:text-3xl mb-2">
              Drop your document here
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              or click to browse your files
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["PDF", "Word", "PPT"].map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-muted border-2 border-foreground text-sm font-body wobbly-border-sm"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
};

export default UploadArea;
