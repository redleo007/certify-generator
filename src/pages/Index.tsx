import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import CertificateForm from "@/components/CertificateForm";
import CertificatePreview from "@/components/CertificatePreview";
import TemplateSelector from "@/components/TemplateSelector";
import BulkUpload from "@/components/BulkUpload";
import CustomTemplateUpload from "@/components/CustomTemplateUpload";
import { Download, Zap, GraduationCap } from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import JSZip from "jszip";

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
  // default to formal professional template
  const [selectedTemplate, setSelectedTemplate] = useState("formal");
  const [customTemplate, setCustomTemplate] = useState<string | null>(null);
  const [bulkParticipants, setBulkParticipants] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const certificateRef = useRef<HTMLDivElement>(null);
  const bulkCertificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!certificateRef.current) return;

    if (!certificateData.participantName || !certificateData.eventName) {
      toast.error("Please fill in participant name and event name.");
      return;
    }

    try {
      // export certificate on neutral paper background so images look professional
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `certificate-${certificateData.participantName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Certificate downloaded.");
    } catch (error) {
      toast.error("Failed to download certificate. Please try again.");
    }
  }, [certificateData]);

  const handleBulkGenerate = useCallback(async () => {
    if (!certificateData.eventName) {
      toast.error("Please fill in the event name first.");
      return;
    }

    if (bulkParticipants.length === 0) {
      toast.error("No participants loaded.");
      return;
    }

    setIsGenerating(true);
    const zip = new JSZip();

    try {
      for (let i = 0; i < bulkParticipants.length; i++) {
        const name = bulkParticipants[i];

        // Update the hidden certificate with current participant
        setCertificateData((prev) => ({ ...prev, participantName: name }));

        // Small delay to allow React to update
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (bulkCertificateRef.current) {
          const dataUrl = await toPng(bulkCertificateRef.current, {
            quality: 1,
            pixelRatio: 2,
            backgroundColor: "#ffffff",
          });

          // Convert data URL to blob
          const response = await fetch(dataUrl);
          const blob = await response.blob();

          zip.file(`certificate-${name.replace(/\s+/g, "-").toLowerCase()}.png`, blob);
        }

        // Update progress periodically
        if ((i + 1) % 10 === 0 || i === bulkParticipants.length - 1) {
          toast.info(`Processing ${i + 1}/${bulkParticipants.length}...`);
        }
      }

      // Generate and download zip
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.download = `certificates-${certificateData.eventName.replace(/\s+/g, "-").toLowerCase()}.zip`;
      link.href = URL.createObjectURL(content);
      link.click();

      toast.success(`${bulkParticipants.length} certificates generated.`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate certificates. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [certificateData.eventName, bulkParticipants]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border shadow-sm">
                <GraduationCap className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h1 className="font-display font-semibold text-lg">CAHCET</h1>
                <p className="text-xs text-gray-600">Certificate Generator</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 hidden sm:block">Built for events & colleges</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-8 md:py-16 px-4 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-6">
              <Zap className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Create professional certificates quickly</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Create Professional E-Certificates
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Generate certificates for your events with consistent, print-ready styling.
            </p>
          </div>
        </section>

        {/* Template Selector */}
        <section className="pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <TemplateSelector
              selectedId={customTemplate ? "" : selectedTemplate}
              onSelect={(id) => {
                setSelectedTemplate(id);
                setCustomTemplate(null);
              }}
            />
            <CustomTemplateUpload customTemplate={customTemplate} onTemplateUpload={setCustomTemplate} />
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="order-2 lg:order-1 space-y-6">
                <CertificateForm data={certificateData} onChange={setCertificateData} />

                <BulkUpload
                  participants={bulkParticipants}
                  onParticipantsLoaded={setBulkParticipants}
                  onClear={() => setBulkParticipants([])}
                  onGenerateAll={handleBulkGenerate}
                  isGenerating={isGenerating}
                />

                <Button variant="default" size="xl" className="w-full" onClick={handleDownload}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Single Certificate
                </Button>
              </div>

              {/* Preview */}
              <div className="order-1 lg:order-2">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow sticky top-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs text-gray-600 ml-2">Live Preview</span>
                  </div>
                  <CertificatePreview
                    ref={certificateRef}
                    data={certificateData}
                    templateId={selectedTemplate}
                    customTemplate={customTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden certificate for bulk generation */}
        <div className="fixed -left-[9999px] -top-[9999px]">
          <CertificatePreview ref={bulkCertificateRef} data={certificateData} templateId={selectedTemplate} customTemplate={customTemplate} />
        </div>

        {/* Footer */}
        <footer className="py-6 px-4 md:px-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-gray-600">© 2026 C. Abdul Hakeem College of Engineering And Technology. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
