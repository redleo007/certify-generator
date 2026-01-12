import { forwardRef } from "react";
import { Award, Star } from "lucide-react";

interface CertificateData {
  participantName: string;
  eventName: string;
  eventDate: string;
  description: string;
}

interface CertificatePreviewProps {
  data: CertificateData;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ data }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return "Date TBD";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <div
        ref={ref}
        className="relative w-full aspect-[1.414/1] bg-gradient-to-br from-[#0a0a12] via-[#12121a] to-[#0a0a12] rounded-2xl overflow-hidden"
        style={{ minHeight: "400px" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,hsl(330,100%,65%)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,hsl(200,100%,55%)_0%,transparent_50%)]" />
        </div>

        {/* Decorative Border */}
        <div className="absolute inset-3 md:inset-6 border-2 border-white/10 rounded-xl" />
        <div className="absolute inset-4 md:inset-8 border border-white/5 rounded-lg" />

        {/* Corner Decorations */}
        <Star className="absolute top-6 left-6 md:top-10 md:left-10 w-4 h-4 md:w-6 md:h-6 text-neon-pink animate-pulse" />
        <Star className="absolute top-6 right-6 md:top-10 md:right-10 w-4 h-4 md:w-6 md:h-6 text-neon-blue animate-pulse" />
        <Star className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-4 h-4 md:w-6 md:h-6 text-neon-green animate-pulse" />
        <Star className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-4 h-4 md:w-6 md:h-6 text-neon-purple animate-pulse" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12 py-8 md:py-12 text-center">
          {/* College Logo/Icon */}
          <div className="mb-3 md:mb-4 p-2 md:p-3 rounded-full bg-gradient-to-br from-neon-pink/20 to-neon-blue/20 border border-white/10">
            <Award className="w-6 h-6 md:w-10 md:h-10 text-neon-pink" />
          </div>

          {/* College Name */}
          <h3 className="text-[10px] md:text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-1 md:mb-2">
            C. Abdul Hakeem College of Engineering And Technology
          </h3>

          {/* Certificate Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold neon-text mb-4 md:mb-8">
            Certificate of Achievement
          </h1>

          {/* Presented to */}
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
            This certificate is proudly presented to
          </p>

          {/* Participant Name */}
          <div className="relative mb-4 md:mb-6">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-foreground px-4 md:px-8 py-1 md:py-2">
              {data.participantName || "Participant Name"}
            </h2>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
          </div>

          {/* Event Details */}
          <p className="text-xs md:text-base text-muted-foreground mb-1 md:mb-2">
            for outstanding participation in
          </p>
          <h3 className="text-lg md:text-2xl font-display font-semibold text-secondary mb-2 md:mb-4">
            {data.eventName || "Event Name"}
          </h3>

          {/* Description */}
          {data.description && (
            <p className="text-[10px] md:text-sm text-muted-foreground max-w-md mb-2 md:mb-4 italic">
              "{data.description}"
            </p>
          )}

          {/* Date */}
          <p className="text-[10px] md:text-xs text-muted-foreground">
            Dated: {formatDate(data.eventDate)}
          </p>

          {/* Signature Area */}
          <div className="absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 flex gap-8 md:gap-16">
            <div className="text-center">
              <div className="w-16 md:w-24 h-0.5 bg-white/30 mb-1 md:mb-2" />
              <p className="text-[8px] md:text-xs text-muted-foreground">Principal</p>
            </div>
            <div className="text-center">
              <div className="w-16 md:w-24 h-0.5 bg-white/30 mb-1 md:mb-2" />
              <p className="text-[8px] md:text-xs text-muted-foreground">Event Coordinator</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificatePreview.displayName = "CertificatePreview";

export default CertificatePreview;
