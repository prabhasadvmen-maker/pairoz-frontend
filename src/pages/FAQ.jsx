import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { faqs } from '../data/mockData'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return <main className="page-wrap faq-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span>FAQs</div><header className="editorial-page-heading"><p className="eyebrow">Good to know</p><h1>A few things,<br /><em>made clearer.</em></h1><p>Everything you need to feel good about your next pair.</p></header><section className="faq-list">{faqs.map((faq, index) => <article className={`faq-item ${open === index ? 'faq-open' : ''}`} key={faq.question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span className="faq-number">0{index + 1}</span><strong>{faq.question}</strong><ChevronDown size={18} /></button>{open === index && <p>{faq.answer}</p>}</article>)}</section><div className="faq-contact">Still wondering? <Link to="/contact">Our team would love to help →</Link></div></main>
}
