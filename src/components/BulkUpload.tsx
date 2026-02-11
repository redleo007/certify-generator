import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, X, Users, Download } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";

interface BulkUploadProps {
  onParticipantsLoaded: (participants: string[]) => void;
  participants: string[];
  onClear: () => void;
  onGenerateAll: () => void;
  isGenerating: boolean;
}

const BulkUpload = ({
  onParticipantsLoaded,
  participants,
  onClear,
  onGenerateAll,
  isGenerating,
}: BulkUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file");
        return;
      }

      Papa.parse(file, {
        complete: (results) => {
          const names: string[] = [];
          results.data.forEach((row: any) => {
            // Try to find name in first column or "name" column
            const name = row.name || row.Name || row[0];
            if (name && typeof name === "string" && name.trim()) {
              names.push(name.trim());
            }
          });

          if (names.length === 0) {
            toast.error(
              "No names found. Make sure your CSV has a 'name' column or names in the first column."
            );
            return;
          }

          onParticipantsLoaded(names);
          toast.success(`Loaded ${names.length} participants.`);
        },
        header: true,
        skipEmptyLines: true,
        error: () => {
          toast.error("Failed to parse CSV file");
        },
      });
    },
    [onParticipantsLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (participants.length > 0) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-neon-green" />
            Bulk Generation
          </h3>
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="bg-muted/30 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto">
          <p className="text-sm text-muted-foreground mb-2">
            {participants.length} participants loaded:
          </p>
          <div className="flex flex-wrap gap-2">
            {participants.slice(0, 10).map((name, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-primary/20 rounded-full text-xs"
              >
                {name}
              </span>
            ))}
            {participants.length > 10 && (
              <span className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                +{participants.length - 10} more
              </span>
            )}
          </div>
        </div>

        <Button
          variant="neon"
          className="w-full"
          onClick={onGenerateAll}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download All Certificates (ZIP)
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
        <FileSpreadsheet className="w-5 h-5 text-neon-blue" />
        Bulk Upload (CSV)
      </h3>

      <label
        className={`
          flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
          ${
            isDragOver
              ? "border-primary bg-primary/10"
              : "border-white/10 hover:border-white/20 hover:bg-white/5"
          }
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="text-sm text-center mb-2">
          Drag & drop a CSV file or <span className="text-primary">browse</span>
        </p>
        <p className="text-xs text-muted-foreground text-center">
          CSV should have a "name" column or names in the first column
        </p>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
};

export default BulkUpload;
