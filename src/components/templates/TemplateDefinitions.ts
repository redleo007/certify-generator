export interface TemplateStyle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  bgGradient: string;
  accentColor: string;
  secondaryColor: string;
  borderStyle: string;
  titleGradient: string;
  decorations: "stars" | "corners" | "circuit" | "flowers";
}

export const templates: TemplateStyle[] = [
  {
    id: "neon",
    name: "Neon Vibe",
    emoji: "✨",
    description: "Gen-Z neon gradients",
    bgGradient: "from-[#0a0a12] via-[#12121a] to-[#0a0a12]",
    accentColor: "hsl(330, 100%, 65%)",
    secondaryColor: "hsl(200, 100%, 55%)",
    borderStyle: "border-white/10",
    titleGradient: "from-neon-pink via-neon-purple to-neon-blue",
    decorations: "stars",
  },
  {
    id: "formal",
    name: "Formal Classic",
    emoji: "🎓",
    description: "Elegant & professional",
    bgGradient: "from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]",
    accentColor: "hsl(45, 90%, 55%)",
    secondaryColor: "hsl(45, 70%, 45%)",
    borderStyle: "border-amber-500/30",
    titleGradient: "from-amber-300 via-yellow-400 to-amber-500",
    decorations: "corners",
  },
  {
    id: "tech",
    name: "Tech Circuit",
    emoji: "💻",
    description: "Digital & futuristic",
    bgGradient: "from-[#0a0f0d] via-[#0d1a14] to-[#0a0f0d]",
    accentColor: "hsl(150, 100%, 50%)",
    secondaryColor: "hsl(180, 100%, 45%)",
    borderStyle: "border-emerald-500/20",
    titleGradient: "from-emerald-400 via-teal-400 to-cyan-400",
    decorations: "circuit",
  },
  {
    id: "casual",
    name: "Casual Fun",
    emoji: "🎉",
    description: "Playful & vibrant",
    bgGradient: "from-[#1a0a1a] via-[#2d1b3d] to-[#1a0a1a]",
    accentColor: "hsl(280, 100%, 65%)",
    secondaryColor: "hsl(320, 100%, 60%)",
    borderStyle: "border-purple-500/20",
    titleGradient: "from-purple-400 via-pink-400 to-rose-400",
    decorations: "flowers",
  },
];

export const getTemplate = (id: string): TemplateStyle => {
  return templates.find((t) => t.id === id) || templates[0];
};
