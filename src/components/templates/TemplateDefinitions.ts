export interface TemplateStyle {
  id: string;
  name: string;
  // keep emoji for backward compatibility (empty for professional templates)
  emoji: string;
  // optional icon path (use public/assets icons or favicon)
  icon?: string;
  description: string;
  bgGradient: string;
  accentColor: string;
  secondaryColor: string;
  borderStyle: string;
  // single solid title color for a professional look
  titleColor: string;
  decorations: "stars" | "corners" | "circuit" | "flowers" | "none";
}

export const templates: TemplateStyle[] = [
  {
    id: "formal",
    name: "Formal Classic",
    emoji: "",
    icon: "/favicon.ico",
    description: "Elegant and professional certificate style",
    // subtle dark-to-mid gradient for certificate background preview (preset)
    bgGradient: "from-[#fbfbfb] via-[#f5f6f8] to-[#ffffff]",
    accentColor: "#0b3d91",
    secondaryColor: "#8a6b2b",
    borderStyle: "border-[rgba(0,0,0,0.08)]",
    titleColor: "#0b3d91",
    decorations: "corners",
  },
  {
    id: "modern",
    name: "Modern Minimal",
    emoji: "",
    icon: "/favicon.ico",
    description: "Clean minimal layout with neutral tones",
    bgGradient: "from-[#ffffff] via-[#fbfbfd] to-[#ffffff]",
    accentColor: "#1f2937",
    secondaryColor: "#6b7280",
    borderStyle: "border-[rgba(0,0,0,0.06)]",
    titleColor: "#111827",
    decorations: "none",
  },
  {
    id: "tech",
    name: "Tech Subtle",
    emoji: "",
    icon: "/favicon.ico",
    description: "Slightly technical-but-professional style",
    bgGradient: "from-[#fbfcfd] via-[#f7fafc] to-[#ffffff]",
    accentColor: "#0f766e",
    secondaryColor: "#0ea5a4",
    borderStyle: "border-[rgba(0,0,0,0.06)]",
    titleColor: "#0f766e",
    decorations: "circuit",
  },
  {
    id: "minimal",
    name: "Simple Minimal",
    emoji: "",
    icon: "/favicon.ico",
    description: "Very minimal with generous whitespace",
    bgGradient: "from-[#ffffff] via-[#ffffff] to-[#ffffff]",
    accentColor: "#111827",
    secondaryColor: "#4b5563",
    borderStyle: "border-[rgba(0,0,0,0.04)]",
    titleColor: "#111827",
    decorations: "none",
  },
];

export const getTemplate = (id: string): TemplateStyle => {
  return templates.find((t) => t.id === id) || templates[0];
};
