import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Minus, Pause, Play, Plus, ShieldCheck, Star, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { campaignVideos, products } from '../data/mockData'
import { useCartStore, useWishlistStore } from '../store/useStore'
import ProductCard from '../components/product/ProductCard'

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const [imageIndex, setImageIndex] = useState(0)
  const [previewPlaying, setPreviewPlaying] = useState(false)
  const previewRef = useRef(null)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [guideOpen, setGuideOpen] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)
  const saved = useWishlistStore((state) => product ? state.isInWishlist(product.id) : false)
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  if (!product) return <main className="page-wrap"><div className="empty-state"><h2>We couldn’t find that pair.</h2><Link className="button button-dark" to="/shop">Browse the collection</Link></div></main>
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
  const detailHighlights = Object.entries(product.specs).slice(0, 3)
  const changeImage = (direction) => {
    stopPreview()
    setImageIndex((current) => (current + direction + product.images.length) % product.images.length)
  }
  const playPreview = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    previewRef.current?.play().catch((error) => console.error('Unable to play the product campaign preview.', error))
  }
  const stopPreview = () => {
    const video = previewRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }
  const togglePreview = () => {
    if (previewRef.current?.paused) playPreview()
    else stopPreview()
  }
  const add = () => {
    if (!size || !color) {
      setMessage(!size && !color ? 'Choose a size and colour to continue.' : !size ? 'Please choose your size.' : 'Please choose a colour.')
      return
    }
    addToCart(product, size, color, quantity)
    setMessage('Added to your bag.')
  }
  return <main className="page-wrap detail-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span>{product.title}</div><div className="product-detail-layout"><div className="gallery"><div className="gallery-main" onMouseEnter={playPreview} onMouseLeave={stopPreview}>
      <img src={product.images[imageIndex]} alt={`${product.title} — ${['campaign view', 'side profile', 'detail view', 'on-foot styling', 'craft detail'][imageIndex % 5]}`} />
      <video ref={previewRef} className={`gallery-preview ${previewPlaying ? 'is-playing' : ''}`} src={product.previewVideo || campaignVideos[0]} poster={product.images[imageIndex]} muted loop playsInline preload="none" onPlay={() => setPreviewPlaying(true)} onPause={() => setPreviewPlaying(false)} aria-label={`${product.title} campaign preview`} />
      <span className="gallery-counter">{String(imageIndex + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}</span>
      <button className="gallery-step gallery-step-previous" type="button" onClick={() => changeImage(-1)} aria-label="Previous product photo"><ArrowLeft size={17} /></button>
      <button className="gallery-step gallery-step-next" type="button" onClick={() => changeImage(1)} aria-label="Next product photo"><ArrowRight size={17} /></button>
      <button className="gallery-preview-toggle" type="button" onClick={togglePreview} aria-label={previewPlaying ? 'Pause product campaign preview' : 'Play product campaign preview'}>{previewPlaying ? <Pause size={14} /> : <Play size={14} />}<span>{previewPlaying ? 'Pause film' : 'Play campaign film'}</span></button>
    </div><div className="gallery-thumbs">{product.images.map((src, index) => <button className={imageIndex === index ? 'active' : ''} onClick={() => setImageIndex(index)} key={src} aria-label={`View ${['campaign view', 'side profile', 'detail view', 'on-foot styling', 'craft detail'][index % 5]}`} aria-current={imageIndex === index ? 'true' : undefined}><img src={src} alt="" loading="lazy" /></button>)}</div><p className="gallery-caption">A closer look at {product.title}</p></div>
    <section className="detail-copy"><p className="eyebrow">{product.brand} · {product.category}</p><h1>{product.title}</h1><div className="detail-rating"><Star size={14} fill="currentColor" /> {product.rating} <span>· 36 reviews</span></div><div className="detail-price"><strong>{money(product.price)}</strong><del>{money(product.compareAtPrice)}</del><span>{Math.round((1 - product.price / product.compareAtPrice) * 100)}% off</span></div><p className="detail-description">{product.description}</p>
      <div className="detail-highlights">{detailHighlights.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <div className="variant-heading"><strong>Colour</strong><span>{color || 'Select a colour'}</span></div><div className="color-options">{product.colors.map((item) => <button key={item} className={`color-chip ${color === item ? 'selected' : ''}`} onClick={() => setColor(item)}>{item}</button>)}</div>
      <div className="variant-heading size-heading"><strong>Size (EU)</strong><button className="text-button" onClick={() => setGuideOpen(true)}>Size guide</button></div><div className="size-options">{product.sizes.map((item) => <button key={item} className={size === item ? 'selected' : ''} onClick={() => { setSize(item); setMessage('') }}>{item}</button>)}</div>
      <div className="detail-buy-row"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div><button className="button button-dark add-cart-button" onClick={add}>Add to bag · {money(product.price * quantity)}</button><button className={`icon-button detail-wishlist ${saved ? 'is-active' : ''}`} aria-label="Toggle wishlist" onClick={() => toggleWishlist(product)}><Heart fill={saved ? 'currentColor' : 'none'} /></button></div><p className="variant-message" role="status">{message}</p>
      <div className="delivery-promise"><p><Truck size={17} /> Complimentary delivery, dispatched in 48 hours</p><p><ShieldCheck size={17} /> Easy 7-day return & exchange</p></div>
      <details className="detail-accordion" open><summary>Details & craftsmanship</summary><p>{product.description} Finished with a balanced silhouette and a cushioned feel, this pair is designed to move comfortably from first plans to the last dance.</p></details><details className="detail-accordion"><summary>Specifications & fit</summary><dl>{Object.entries(product.specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><p>Designed for a considered fit. If you are between sizes, we recommend choosing the larger size.</p></details><details className="detail-accordion"><summary>Care & keeping</summary><p>Store in a cool, dry place away from direct sunlight. Wipe gently with a soft dry cloth and avoid water, perfume and harsh cleaners.</p></details><details className="detail-accordion"><summary>Shipping & returns</summary><p>Complimentary standard delivery across India. Unworn pairs may be returned or exchanged within 7 days of delivery.</p></details>
    </section></div><section className="content-section related-products"><header className="section-heading"><div><p className="eyebrow">Pairs well with your plans</p><h2>You may also love.</h2></div></header><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></section>
    {guideOpen && <div className="modal-backdrop" role="presentation" onClick={() => setGuideOpen(false)}><section className="size-modal" role="dialog" aria-modal="true" aria-labelledby="size-guide-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setGuideOpen(false)} aria-label="Close size guide">×</button><p className="eyebrow">Find your fit</p><h2 id="size-guide-title">Size guide</h2><p>Measure your foot from heel to longest toe, then match it to your EU size.</p><table><thead><tr><th>EU</th><th>Foot length</th></tr></thead><tbody>{[[36, 23], [37, 23.5], [38, 24], [39, 24.7], [40, 25.4], [41, 26]].map(([eu, cm]) => <tr key={eu}><td>{eu}</td><td>{cm} cm</td></tr>)}</tbody></table></section></div>}
  </main>
}
