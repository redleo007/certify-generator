import { forwardRef } from "react";
import { Award, Star, Cpu, Flower2, CornerDownRight } from "lucide-react";
import { getTemplate, TemplateStyle } from "./templates/TemplateDefinitions";
import { cn } from "@/lib/utils";

interface CertificateData {
  participantName: string;
  eventName: string;
  eventDate: string;
  description: string;
}

interface CertificatePreviewProps {
  data: CertificateData;
  templateId?: string;
  customTemplate?: string | null;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ data, templateId = "formal", customTemplate }, ref) => {
    const template = getTemplate(templateId);
    const hasCustomTemplate = !!customTemplate;

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const renderDecorations = () => {
      switch (template.decorations) {
        case "stars":
          return (
            <>
              <Star className="absolute top-6 left-6 md:top-10 md:left-10 w-5 h-5 opacity-60" style={{ color: template.accentColor }} />
              <Star className="absolute top-6 right-6 md:top-10 md:right-10 w-5 h-5 opacity-40" style={{ color: template.secondaryColor }} />
            </>
          );
        case "corners":
          return (
            <>
              <CornerDownRight className="absolute top-6 left-6 md:top-10 md:left-10 w-7 h-7 rotate-180 opacity-70" style={{ color: template.accentColor }} />
              <CornerDownRight className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-7 h-7 opacity-70" style={{ color: template.accentColor }} />
            </>
          );
        case "circuit":
          return (
            <>
              <Cpu className="absolute top-6 left-6 md:top-10 md:left-10 w-6 h-6 opacity-40" style={{ color: template.accentColor }} />
              <Cpu className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-6 h-6 opacity-40" style={{ color: template.secondaryColor }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 opacity-10" style={{ background: template.accentColor }} />
            </>
          );
        case "flowers":
          return (
            <>
              <Flower2 className="absolute top-6 left-6 md:top-10 md:left-10 w-6 h-6 opacity-40" style={{ color: template.accentColor }} />
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full aspect-[1.414/1] rounded-2xl overflow-hidden shadow-sm",
          !hasCustomTemplate && "bg-gradient-to-br",
          !hasCustomTemplate && template.bgGradient
        )}
        style={{ minHeight: "400px" }}
      >
        {/* Custom Template Background */}
        {hasCustomTemplate && (
          <img
            src={customTemplate}
            alt="Custom certificate background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Slight overlay on custom templates for readability */}
        {hasCustomTemplate && <div className="absolute inset-0 bg-white/30" />}

        {/* Decorative Border */}
        <div className={cn("absolute inset-4 md:inset-6 border rounded-lg", template.borderStyle)} />

        {/* Corner / Accent Decorations */}
        {renderDecorations()}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12 py-8 md:py-12 text-center">
          {/* College Icon */}
          <div
            className="mb-3 md:mb-4 p-2 md:p-3 rounded-full border border-gray-200"
            style={{
              background: `linear-gradient(135deg, ${template.accentColor}18, ${template.secondaryColor}18)`,
            }}
          >
            <Award className="w-8 h-8 md:w-10 md:h-10" style={{ color: template.accentColor }} />
          </div>

          {/* College Name */}
          <h3 className="text-[10px] md:text-sm font-semibold tracking-widest uppercase text-gray-600 mb-1 md:mb-2">
            C. Abdul Hakeem College of Engineering And Technology
          </h3>

          {/* Certificate Title */}
          <h1
            className={cn("text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-8")}
            style={{ color: template.titleColor }}
          >
            Certificate of Achievement
          </h1>

          {/* Presented to */}
          <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">This certificate is proudly presented to</p>

          {/* Participant Name */}
          <div className="relative mb-4 md:mb-6 w-full">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-semibold text-gray-900 px-4 md:px-8 py-1 md:py-2">
              {data.participantName || ""}
            </h2>
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5"
              style={{
                background: `linear-gradient(to right, transparent, ${template.accentColor}, transparent)`,
              }}
            />
          </div>

          {/* Event Details */}
          <p className="text-xs md:text-base text-gray-600 mb-1 md:mb-2">for outstanding participation in</p>
          <h3 className="text-lg md:text-2xl font-display font-semibold mb-2 md:mb-4" style={{ color: template.secondaryColor }}>
            {data.eventName || ""}
          </h3>

          {/* Description */}
          {data.description && (
            <p className="text-[10px] md:text-sm text-gray-600 max-w-md mb-2 md:mb-4 italic">"{data.description}"</p>
          )}

          {/* Date */}
          <p className="text-[10px] md:text-xs text-gray-600">{formatDate(data.eventDate)}</p>

          {/* Signature Area */}
          <div className="absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 flex gap-8 md:gap-16">
            <div className="text-center">
              <div className="w-16 md:w-24 h-0.5 bg-gray-300 mb-1 md:mb-2" />
              <p className="text-[8px] md:text-xs text-gray-600">Principal</p>
            </div>
            <div className="text-center">
              <div className="w-16 md:w-24 h-0.5 bg-gray-300 mb-1 md:mb-2" />
              <p className="text-[8px] md:text-xs text-gray-600">Event Coordinator</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificatePreview.displayName = "CertificatePreview";

export default CertificatePreview;
