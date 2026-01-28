import { templates, TemplateStyle } from "./templates/TemplateDefinitions";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const TemplateSelector = ({ selectedId, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2 text-foreground">
        🎨 Choose Template
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all duration-300 text-left group hover-glow",
              selectedId === template.id
                ? "border-primary bg-primary/20 scale-[1.02] neon-border"
                : "border-border hover:border-primary/50 bg-card/50"
            )}
          >
            {selectedId === template.id && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-pulse">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <span className="text-2xl mb-2 block">{template.emoji}</span>
            <h4 className="font-semibold text-sm text-foreground">{template.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              {template.description}
            </p>
            {/* Mini preview */}
            <div
              className={cn(
                "mt-3 h-8 rounded-md bg-gradient-to-br opacity-80",
                template.bgGradient
              )}
              style={{
                boxShadow: `0 0 15px ${template.accentColor}60`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
