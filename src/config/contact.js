const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')

export function getWhatsAppUrl(message = 'Hi PAIROZ, I have a question about your footwear collection.') {
  const destination = whatsappNumber ? `/${whatsappNumber}` : ''
  return `https://api.whatsapp.com/send${destination}?text=${encodeURIComponent(message)}`
}
