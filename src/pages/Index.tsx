import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import CertificateForm from "@/components/CertificateForm";
import CertificatePreview from "@/components/CertificatePreview";
import { Download, Sparkles, Zap, GraduationCap } from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

interface CertificateData {
  participantName: string;
  eventName: string;
  eventDate: string;
  description: string;
}

const Index = () => {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    participantName: "",
    eventName: "",
    eventDate: "",
    description: "",
  });

  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!certificateRef.current) return;

    if (!certificateData.participantName || !certificateData.eventName) {
      toast.error("Please fill in participant name and event name!");
      return;
    }

    try {
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#0a0a12",
      });

      const link = document.createElement("a");
      link.download = `certificate-${certificateData.participantName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Certificate downloaded! 🎉");
    } catch (error) {
      toast.error("Failed to download certificate. Please try again.");
    }
  }, [certificateData]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-neon-pink to-neon-blue glow-pink">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg">CAHCET</h1>
                <p className="text-xs text-muted-foreground">Certificate Generator</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:block">made with</span>
              <Sparkles className="w-4 h-4 text-neon-pink" />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-8 md:py-16 px-4 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-neon-green" />
              <span className="text-sm">Generate certificates in seconds ⚡</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4">
              Create <span className="neon-text">Stunning</span> E-Certificates
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate professional certificates for your college events with our Gen-Z styled certificate generator ✨
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="order-2 lg:order-1">
                <CertificateForm
                  data={certificateData}
                  onChange={setCertificateData}
                />

                <Button
                  variant="neon"
                  size="xl"
                  className="w-full mt-6"
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </Button>
              </div>

              {/* Preview */}
              <div className="order-1 lg:order-2">
                <div className="glass-card p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-neon-green" />
                    <span className="text-xs text-muted-foreground ml-2">Live Preview</span>
                  </div>
                  <CertificatePreview ref={certificateRef} data={certificateData} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-4 md:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 C. Abdul Hakeem College of Engineering And Technology. All rights reserved. 🎓
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
