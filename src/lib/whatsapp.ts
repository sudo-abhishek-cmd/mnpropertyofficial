import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/utils/constants";

export { WHATSAPP_NUMBER, WHATSAPP_MESSAGE };

export function waLink(message = WHATSAPP_MESSAGE, number = WHATSAPP_NUMBER.replace(/\D/g, "")) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
