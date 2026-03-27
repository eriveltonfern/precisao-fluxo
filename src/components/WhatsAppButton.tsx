import { MessageCircle } from "lucide-react";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";

const WhatsAppButton = () => {
  const { data: s } = useSettings();
  if (!s) return null;

  return (
    <a
      href={getWhatsAppLink(s)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-4 font-semibold text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl animate-pulse-scale md:px-6"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
