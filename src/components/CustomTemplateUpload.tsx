import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CustomTemplateUploadProps {
  customTemplate: string | null;
  onTemplateUpload: (template: string | null) => void;
}

const CustomTemplateUpload = ({ customTemplate, onTemplateUpload }: CustomTemplateUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onTemplateUpload(result);
      toast.success("Custom template uploaded.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    onTemplateUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Custom template removed");
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
        Upload custom template
      </h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {customTemplate ? (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-primary/50">
            <img
              src={customTemplate}
              alt="Custom template preview"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-medium">Custom Template Active</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Your custom background is being used. Text and decorations will overlay on it.
          </p>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer",
            isDragging
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-white/10 hover:border-white/20 hover:bg-white/5"
          )}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 rounded-full bg-muted/50">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Drop your template here</p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse (PNG, JPG up to 10MB)
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Export your Canva design as a PNG (A4 landscape) for best results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTemplateUpload;
