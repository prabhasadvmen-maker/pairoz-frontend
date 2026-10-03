import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Leaf, Pause, Play, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homepageImages, products } from '../data/mockData'

const fittingSlides = products.slice(0, 5)

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [filmPlaying, setFilmPlaying] = useState(true)
  const filmRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      filmRef.current?.pause()
      return undefined
    }
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % fittingSlides.length)
    }, 4500)
    return () => window.clearInterval(interval)
  }, [])

  const toggleFilm = () => {
    const video = filmRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch((error) => console.error('Unable to resume the getting-ready campaign film.', error))
    } else {
      video.pause()
    }
  }

  return <main className="page-wrap about-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span>Our story</div>
    <section className="about-hero">
      <p className="eyebrow"><Sparkles size={14} /> Our point of view</p>
      <h1>Style should feel<br /><em>like coming home to yourself.</em></h1>
      <p>PAIROZ is a love letter to the woman who moves through the world on her own terms—considered, expressive and entirely herself.</p>
    </section>
    <div className="about-image"><img src={homepageImages.aboutStory} alt="A refined pair of PAIROZ high heels" /></div>
    <section className="about-story">
      <div><p className="eyebrow">The beginning</p><h2>Made for the moments that become yours.</h2></div>
      <p>We started with a simple thought: the shoes you love most should feel as good as they look. Not saved only for special occasions, but ready to make an ordinary Tuesday feel a little more like you. Each PAIROZ design brings together thoughtful form, expressive detail and a fit made for real life.</p>
    </section>
    <section className="getting-ready-section">
      <div className="getting-ready-copy">
        <p className="eyebrow">The final touch</p>
        <h2>One last detail.<br /><em>A whole new feeling.</em></h2>
        <p>Every occasion begins with a moment to yourself. Find the heel that makes it yours.</p>
        <Link className="button button-dark" to={`/product/${fittingSlides[activeSlide].slug}`}>Discover {fittingSlides[activeSlide].title} <ArrowRight size={15} /></Link>
      </div>
      <div className="fitting-film">
        <video
          ref={filmRef}
          src="/9807773-uhd_4096_2160_25fps.mp4"
          poster={fittingSlides[activeSlide].images[0]}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setFilmPlaying(true)}
          onPause={() => setFilmPlaying(false)}
          aria-label="PAIROZ getting-ready campaign film"
        />
        <div className="fitting-film-shade" />
        <span className="fitting-film-caption">THE GETTING-READY RITUAL</span>
        <button type="button" className="fitting-film-toggle" aria-label={filmPlaying ? 'Pause campaign film' : 'Play campaign film'} onClick={toggleFilm}>
          {filmPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>
      <div className="fitting-gallery">
        <div className="fitting-gallery-image" key={fittingSlides[activeSlide].id}>
          <img src={fittingSlides[activeSlide].images[0]} alt={`Model styling ${fittingSlides[activeSlide].title}`} />
          <span>{String(activeSlide + 1).padStart(2, '0')} / {String(fittingSlides.length).padStart(2, '0')}</span>
        </div>
        <div className="fitting-gallery-controls">
          <button type="button" aria-label="Previous getting-ready photo" onClick={() => setActiveSlide((activeSlide - 1 + fittingSlides.length) % fittingSlides.length)}><ArrowLeft size={16} /></button>
          <div>{fittingSlides.map((slide, index) => <button key={slide.id} type="button" aria-label={`Show ${slide.title}`} aria-current={index === activeSlide ? 'true' : undefined} className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)} />)}</div>
          <button type="button" aria-label="Next getting-ready photo" onClick={() => setActiveSlide((activeSlide + 1) % fittingSlides.length)}><ArrowRight size={16} /></button>
        </div>
        <p className="fitting-gallery-title">{fittingSlides[activeSlide].title}</p>
      </div>
    </section>
    <section className="values-grid">
      <article><Heart /><h3>Feeling first</h3><p>We design around how a woman wants to feel: sure-footed, radiant and unapologetically herself.</p></article>
      <article><Leaf /><h3>Considered always</h3><p>Smaller edits, more intentional choices, and quality details that earn their place in your wardrobe.</p></article>
      <article><Sparkles /><h3>Craft in every detail</h3><p>From the line of a heel to the softness underfoot, every decision is there for a reason.</p></article>
    </section>
    <section className="about-cta"><p className="eyebrow">Find your own way</p><h2>Your next favourite pair is waiting.</h2><Link className="button button-dark" to="/shop">Discover PAIROZ <ArrowRight size={16} /></Link></section>
  </main>
}
