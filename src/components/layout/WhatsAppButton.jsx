import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '../../config/contact'

export default function WhatsAppButton() {
  const whatsappUrl = getWhatsAppUrl()

  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PAIROZ on WhatsApp"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span>Chat with us</span>
    </a>
  )
}
