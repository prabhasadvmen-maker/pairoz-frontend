import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { categories, homepageImages, products } from '../data/mockData'
import ProductCard from '../components/product/ProductCard'

const featured = ['PAIROZ', 'AURELIA', 'MIRA', 'VELOURA', 'SOLEIL']
const newArrivals = products.filter((product) => product.tags.includes('new')).slice(0, 4)
const newArrivalIds = new Set(newArrivals.map((product) => product.id))
const bestSellers = products
  .filter((product) => product.tags.includes('bestseller') && !newArrivalIds.has(product.id))
  .slice(0, 4)

export default function Home() {
  const heroRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.home-hero-copy > *', { y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' })
      gsap.from('.home-hero-image', { scale: 1.08, opacity: 0, duration: 1.2, ease: 'power3.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return <main>
    <section className="home-hero" ref={heroRef}>
      <div className="home-hero-copy"><p className="eyebrow"><Sparkles size={14} /> The occasion edit · 2026</p><h1>A softer kind<br />of statement.</h1><p>For the entrances you remember—and the feeling that stays long after.</p><div className="home-hero-actions"><Link className="button button-dark" to="/shop">Discover the collection <ArrowRight size={16} /></Link><Link className="underlined-link" to="/category/party-wear">Explore occasionwear <ArrowUpRight size={15} /></Link></div><div className="hero-caption"><span>01 / 03</span><span>PAIROZ · THE EVENING EDIT</span><ArrowDown size={15} /></div></div>
      <div className="home-hero-image"><img className="home-hero-media" src={homepageImages.hero} alt="Woman slipping into elegant black high heels" /><div className="hero-image-note"><span>THE NEW CAMPAIGN</span><strong>In her own light</strong></div></div>
    </section>
    <div className="service-strip"><span>Designed with intention</span><i>✳</i><span>Made to move with you</span><i>✳</i><span>Complimentary shipping</span><i>✳</i><span>Easy 7-day returns</span></div>

    <section className="content-section category-section"><header className="section-heading"><div><p className="eyebrow">Find your feeling</p><h2>Choose your silhouette.</h2></div><Link className="underlined-link" to="/shop">All footwear <ArrowRight size={15} /></Link></header><div className="category-grid">{categories.map((category, index) => <Link className={`category-tile category-tile-${index + 1}`} key={category.slug} to={`/category/${category.slug}`}><img src={category.image} alt={category.name} loading="lazy" /><span className="category-number">0{index + 1}</span><div><h3>{category.name}</h3><span>Explore edit <ArrowUpRight size={14} /></span></div></Link>)}</div></section>

    <section className="brand-band"><p className="eyebrow">A point of view, in every step</p><div>{featured.map((brand) => <span key={brand}>{brand}</span>)}</div></section>

    <section className="content-section"><header className="section-heading"><div><p className="eyebrow">Just arrived</p><h2>New, with intention.</h2></div><Link className="underlined-link" to="/shop?sort=newest">Shop new arrivals <ArrowRight size={15} /></Link></header><div className="product-grid">{newArrivals.map((product) => <ProductCard product={product} key={product.id} />)}</div></section>

    <section className="editorial-banner" style={{ '--editorial-image': `url("${homepageImages.editorial}")` }}><div className="editorial-copy"><p className="eyebrow">A study in presence</p><h2>Not made to blend in.<br />Made to feel like you.</h2><p>Confidence is never one-size-fits-all. Find the pair that says everything without saying a word.</p><Link className="button button-outline" to="/about">The PAIROZ story <ArrowRight size={16} /></Link><span className="editorial-index">PAIROZ JOURNAL · VOL. 01</span></div></section>

    <section className="content-section"><header className="section-heading"><div><p className="eyebrow">The pairs you come back to</p><h2>Beloved for a reason.</h2></div><Link className="underlined-link" to="/shop?sort=bestselling">Shop best sellers <ArrowRight size={15} /></Link></header><div className="product-grid">{bestSellers.map((product) => <ProductCard product={product} key={product.id} />)}</div></section>

    <section className="content-section instagram-section"><header className="section-heading"><div><p className="eyebrow">The world of PAIROZ</p><h2>Worn your way.</h2></div><a className="underlined-link" href="https://instagram.com">Follow @pairoz <ArrowUpRight size={15} /></a></header><div className="instagram-grid">{homepageImages.instagram.map((photo, index) => <a href="https://instagram.com" key={photo}><img src={photo} alt={`PAIROZ community wearing heels ${index + 1}`} loading="lazy" /></a>)}</div></section>
  </main>
}
