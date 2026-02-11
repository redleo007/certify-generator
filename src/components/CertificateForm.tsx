import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, User, Calendar, Trophy, FileText } from "lucide-react";

interface CertificateData {
  participantName: string;
  eventName: string;
  eventDate: string;
  description: string;
}

interface CertificateFormProps {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
}

const CertificateForm = ({ data, onChange }: CertificateFormProps) => {
  const handleChange = (field: keyof CertificateData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-display font-bold">Certificate details</h2>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="participantName" className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            Participant Name
          </Label>
          <Input
            id="participantName"
            placeholder="Enter the participant's full name..."
            value={data.participantName}
            onChange={(e) => handleChange("participantName", e.target.value)}
            className="bg-muted/50 border-white/10 focus:border-primary h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventName" className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="w-4 h-4" />
            Event Name
          </Label>
          <Input
            id="eventName"
            placeholder="e.g., TechFest 2024, Coding Marathon..."
            value={data.eventName}
            onChange={(e) => handleChange("eventName", e.target.value)}
            className="bg-muted/50 border-white/10 focus:border-primary h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventDate" className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Event Date
          </Label>
          <Input
            id="eventDate"
            type="date"
            value={data.eventDate}
            onChange={(e) => handleChange("eventDate", e.target.value)}
            className="bg-muted/50 border-white/10 focus:border-primary h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2 text-muted-foreground">
            <FileText className="w-4 h-4" />
            Additional Details (optional)
          </Label>
          <Textarea
            id="description"
            placeholder="Add any additional details like position won, special achievements..."
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="bg-muted/50 border-white/10 focus:border-primary min-h-[100px] rounded-xl resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
