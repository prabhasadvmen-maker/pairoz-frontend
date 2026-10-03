import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { categories, homepageImages, homepageVideos, products } from '../data/mockData'
import ProductCard from '../components/product/ProductCard'

const featured = ['PAIROZ', 'AURELIA', 'MIRA', 'VELOURA', 'SOLEIL']
const newArrivals = products.filter((product) => product.tags.includes('new')).slice(0, 6)
const newArrivalIds = new Set(newArrivals.map((product) => product.id))
const bestSellers = products
  .filter((product) => product.tags.includes('bestseller') && !newArrivalIds.has(product.id))
  .slice(0, 6)
const heelSlides = products.slice(0, 6)

function CategoryTile({ category, index }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playVideo = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const video = event.currentTarget.querySelector('video')
    video?.play().catch((error) => console.error('Unable to play the category campaign video.', error))
  }
  const stopVideo = (event) => {
    const video = event.currentTarget.querySelector('video')
    if (!video) return
    video.pause()
    video.currentTime = 0
    setIsPlaying(false)
  }

  return (
    <Link
      className={`category-tile category-tile-${index + 1}`}
      to={`/category/${category.slug}`}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
      onFocus={playVideo}
      onBlur={stopVideo}
    >
      <img src={category.image} alt="" loading="lazy" />
      <video className={isPlaying ? 'is-playing' : ''} src={category.previewVideo} muted loop playsInline preload="none" onPlay={() => setIsPlaying(true)} aria-hidden="true" />
      <span className="category-number">0{index + 1}</span>
      <div><h3>{category.name}</h3><span>Explore edit <ArrowUpRight size={14} /></span></div>
    </Link>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const heroVideoRef = useRef(null)
  const editorialVideoRef = useRef(null)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroVideoRef.current?.pause()
      editorialVideoRef.current?.pause()
    }
    const ctx = gsap.context(() => {
      gsap.from('.home-hero-copy > *', { y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' })
      gsap.from('.hero-video', { scale: 1.08, opacity: 0, duration: 1.2, ease: 'power3.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heelSlides.length)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [])

  const toggleVideoPlayback = () => {
    const video = heroVideoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch((error) => console.error('Unable to resume the PAIROZ campaign video.', error))
    } else {
      video.pause()
    }
  }
  const scrollToCollection = () => document.getElementById('category-edit')?.scrollIntoView({ behavior: 'smooth' })

  return <main>
    <section className="home-hero" ref={heroRef} aria-label="PAIROZ campaign">
      <video
        ref={heroVideoRef}
        className="hero-video"
        src={homepageVideos.hero}
        poster={homepageImages.hero}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setVideoPlaying(true)}
        onPause={() => setVideoPlaying(false)}
        aria-hidden="true"
      />
      <div className="hero-video-shade" />
      <div className="home-hero-copy">
        <p className="eyebrow"><Sparkles size={14} /> PAIROZ · The occasion edit</p>
        <h1>Make every entrance<br />unforgettable.</h1>
        <p>Statement heels, made for the moments that feel entirely yours.</p>
        <div className="home-hero-actions">
          <Link className="button button-dark" to="/shop">Find your statement pair <ArrowRight size={16} /></Link>
          <Link className="underlined-link" to="/category/party-wear">Explore the occasion edit <ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <div className="hero-campaign-note"><span>THE PAIROZ CAMPAIGN</span><strong>Made to feel like you.</strong></div>
      <button className="hero-video-toggle" type="button" onClick={toggleVideoPlayback} aria-label={videoPlaying ? 'Pause campaign video' : 'Play campaign video'}>
        {videoPlaying ? <Pause size={15} /> : <Play size={15} />}
        <span>{videoPlaying ? 'Pause film' : 'Play film'}</span>
      </button>
      <button className="hero-scroll-cue" type="button" onClick={scrollToCollection} aria-label="Explore footwear categories">
        <span>Discover the collection</span><ArrowDown size={16} />
      </button>
    </section>
    <div className="service-strip"><span>Designed with intention</span><i>✳</i><span>Made to move with you</span><i>✳</i><span>Complimentary shipping</span><i>✳</i><span>Easy 7-day returns</span></div>

    <section className="content-section category-section" id="category-edit"><header className="section-heading"><div><p className="eyebrow">Find your feeling</p><h2>Choose your silhouette.</h2><p className="section-intro">Six distinct edits, each with its own point of view. Hover to see every style come to life.</p></div><Link className="underlined-link" to="/shop">All footwear <ArrowRight size={15} /></Link></header><div className="category-grid">{categories.map((category, index) => <CategoryTile category={category} index={index} key={category.slug} />)}</div></section>

    <section className="brand-band">
      <p className="eyebrow">A point of view, in every step</p>
      
      {/* Desktop view: 5 clean beautifully spaced brands */}
      <div className="brand-band-desktop">
        {featured.map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
      </div>

      {/* Mobile view: smooth right to left scrolling marquee */}
      <div className="brand-band-mobile-marquee" aria-hidden="true">
        <div className="brand-band-mobile-track">
          {[...featured, ...featured, ...featured, ...featured].map((brand, idx) => (
            <span key={`${brand}-${idx}`}>{brand}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="content-section home-products-section"><header className="section-heading"><div><p className="eyebrow">Just arrived</p><h2>New, with intention.</h2><p className="section-intro">Meet the latest PAIROZ designs: expressive details, beautiful lines and a little extra occasion.</p></div><Link className="underlined-link" to="/shop?sort=newest">Shop new arrivals <ArrowRight size={15} /></Link></header><div className="product-grid home-featured-grid">{newArrivals.map((product) => <ProductCard product={product} key={product.id} />)}</div></section>

    <section className="editorial-banner" style={{ '--editorial-image': `url("${homepageImages.editorial}")` }}>
      <video
        ref={editorialVideoRef}
        className="editorial-video"
        src={homepageVideos.editorial}
        poster={homepageImages.editorial}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="editorial-copy"><p className="eyebrow">A study in presence</p><h2>Not made to blend in.<br />Made to feel like you.</h2><p>Confidence is never one-size-fits-all. Find the pair that says everything without saying a word.</p><Link className="button button-outline" to="/about">The PAIROZ story <ArrowRight size={16} /></Link><span className="editorial-index">PAIROZ JOURNAL · VOL. 01</span></div>
    </section>

    <section className="content-section home-products-section"><header className="section-heading"><div><p className="eyebrow">The pairs you come back to</p><h2>Beloved for a reason.</h2><p className="section-intro">Customer favourites made for long evenings, big entrances and all the lovely plans in between.</p></div><Link className="underlined-link" to="/shop?sort=bestselling">Shop best sellers <ArrowRight size={15} /></Link></header><div className="product-grid home-featured-grid">{bestSellers.map((product) => <ProductCard product={product} key={product.id} />)}</div></section>

    <section className="heel-carousel-section" aria-label="PAIROZ footwear spotlight">
      <div className="heel-carousel-heading">
        <p className="eyebrow">A closer look</p>
        <h2>Every step, a statement.</h2>
        <p>Find the pair that feels like it was made for your moment.</p>
      </div>
      <div
        className="heel-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured PAIROZ heels"
        onTouchStart={(e) => { e.currentTarget._touchX = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = e.currentTarget._touchX - e.changedTouches[0].clientX
          if (diff > 40) setActiveSlide((activeSlide + 1) % heelSlides.length)
          else if (diff < -40) setActiveSlide((activeSlide - 1 + heelSlides.length) % heelSlides.length)
        }}
      >
        <article className="heel-slide" key={heelSlides[activeSlide].id}>
          <img src={heelSlides[activeSlide].images[0]} alt={heelSlides[activeSlide].title} />
          <div className="heel-slide-shade" />
          <div className="heel-slide-copy">
            <span>{String(activeSlide + 1).padStart(2, '0')} / {String(heelSlides.length).padStart(2, '0')} · {heelSlides[activeSlide].category}</span>
            <h3>{heelSlides[activeSlide].title}</h3>
            <Link className="button button-dark" to={`/product/${heelSlides[activeSlide].slug}`}>Discover this pair <ArrowUpRight size={15} /></Link>
          </div>
          <div className="heel-carousel-controls">
            <button type="button" aria-label="Previous featured heel" onClick={() => setActiveSlide((activeSlide - 1 + heelSlides.length) % heelSlides.length)}><ArrowLeft size={17} /></button>
            <div className="heel-carousel-dots" aria-label="Choose a featured heel">
              {heelSlides.map((slide, index) => <button key={slide.id} type="button" className={index === activeSlide ? 'active' : ''} aria-label={`Show ${slide.title}`} aria-current={index === activeSlide ? 'true' : undefined} onClick={() => setActiveSlide(index)} />)}
            </div>
            <button type="button" aria-label="Next featured heel" onClick={() => setActiveSlide((activeSlide + 1) % heelSlides.length)}><ArrowRight size={17} /></button>
          </div>
        </article>
      </div>
    </section>

    <section className="content-section instagram-section"><header className="section-heading"><div><p className="eyebrow">The world of PAIROZ</p><h2>Worn your way.</h2></div><a className="underlined-link" href="https://instagram.com">Follow @pairoz <ArrowUpRight size={15} /></a></header><div className="instagram-grid">{homepageImages.instagram.map((photo, index) => <a href="https://instagram.com" key={photo}><img src={photo} alt={`PAIROZ community wearing heels ${index + 1}`} loading="lazy" /></a>)}</div></section>
  </main>
}
