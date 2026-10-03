import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../config/contact'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const whatsappUrl = getWhatsAppUrl('Hi PAIROZ, I would like some help with your footwear collection.')
  const submit = (event) => {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }
  return <main className="page-wrap contact-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span>Contact</div><section className="contact-layout"><div className="contact-intro"><p className="eyebrow">We’re here for you</p><h1>Let’s talk<br /><em>beautiful things.</em></h1><p>Whether it’s about finding your fit or a little more about our story, we’d love to hear from you.</p><div className="contact-detail"><Mail size={17} /><span>hello@pairoz.com</span></div><div className="contact-detail"><Phone size={17} /><span>+91 80 4567 8900</span></div><div className="contact-detail"><MapPin size={17} /><span>Bengaluru, India</span></div>{whatsappUrl && <a className="button whatsapp-contact-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Message us on WhatsApp</a>}<p className="contact-hours">Monday – Saturday, 10:00 am – 6:00 pm IST</p></div><form className="contact-form" onSubmit={submit}><p className="eyebrow">Send a note</p><h2>How can we help?</h2><div className="form-row"><label>Your name<input name="name" required placeholder="Name" /></label><label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label></div><label>What’s this about?<select name="topic" defaultValue="" required><option value="" disabled>Select a topic</option><option>Product & sizing</option><option>Order support</option><option>Returns & exchanges</option><option>Something else</option></select></label><label>Your message<textarea name="message" required minLength="10" rows="5" placeholder="Tell us a little more..." /></label><button className="button button-dark" type="submit">Send your message <span>→</span></button>{sent && <p className="success-message" role="status">Thank you for reaching out. Our team will be in touch soon.</p>}</form></section></main>
}
