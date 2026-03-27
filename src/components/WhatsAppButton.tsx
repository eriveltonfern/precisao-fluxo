import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5531999999999";
const WHATSAPP_MESSAGE = "Olá! Preciso de um orçamento para desentupimento.";

export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WhatsAppButton = () => {
  return (
    <a
      href={whatsappLink}
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
