import { useState } from 'react'
import { Camera, Mail, MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const submit = (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback('Please enter a valid email address.')
      return
    }
    setFeedback('You’re on the list. Look out for a little PAIROZ magic.')
    setEmail('')
  }
  return <footer className="site-footer">
    <div className="footer-main"><div className="footer-story"><Link className="wordmark footer-wordmark" to="/" aria-label="PAIROZ home"><img src="/pairoz-logo.png" alt="PAIROZ Premium Footwear" /></Link><p>Considered silhouettes, made for the way you want to feel.</p><div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><Camera size={18} /></a><a href="mailto:hello@pairoz.com" aria-label="Email us"><Mail size={18} /></a></div></div>
      <div className="footer-links"><div><h4>Explore</h4><Link to="/shop">Shop all</Link><Link to="/shop?sort=newest">New arrivals</Link><Link to="/wishlist">Wishlist</Link><Link to="/about">Our story</Link></div><div><h4>Here to help</h4><Link to="/contact">Contact</Link><Link to="/faq">FAQs</Link><Link to="/policies/shipping">Shipping</Link><Link to="/policies/returns">Returns & exchanges</Link></div><div><h4>The details</h4><Link to="/policies/privacy">Privacy policy</Link><Link to="/policies/terms">Terms of service</Link><Link to="/policies">All policies</Link></div></div>
      <form className="newsletter-form" onSubmit={submit} noValidate><h3>A note from us, now and then.</h3><p>New collections, thoughtful edits and first looks—never the noise.</p><div className="newsletter-input"><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email address" placeholder="Your email address" /><button aria-label="Subscribe"><MoveRight size={19} /></button></div><span className="form-feedback" role="status">{feedback}</span></form>
    </div><div className="footer-bottom"><span>© {currentYear} PAIROZ. Made with intention.</span><span>Designed in India · Crafted for everywhere</span></div>
    <div className="footer-signature" aria-label="PAIROZ Premium Footwear">
      <span className="footer-signature-rule" />
      <span className="footer-signature-monogram" aria-hidden="true">P</span>
      <span className="footer-signature-name">PAIROZ</span>
      <span className="footer-signature-caption">PREMIUM FOOTWEAR · MADE WITH INTENTION</span>
      <span className="footer-signature-rule" />
    </div>
  </footer>
}
