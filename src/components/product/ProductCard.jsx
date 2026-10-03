import { useRef, useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlistStore } from '../../store/useStore'

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function ProductCard({ product, compact = false }) {
  const previewRef = useRef(null)
  const [previewPlaying, setPreviewPlaying] = useState(false)
  const saved = useWishlistStore((state) => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const discount = Math.round((1 - product.price / product.compareAtPrice) * 100)
  const playPreview = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    previewRef.current?.play().catch((error) => console.error('Unable to play the footwear preview.', error))
  }
  const stopPreview = () => {
    const video = previewRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setPreviewPlaying(false)
  }
  return (
    <article className={`product-card ${compact ? 'product-card-compact' : ''}`}>
      <div className="product-card-image" onMouseEnter={playPreview} onMouseLeave={stopPreview} onFocus={playPreview} onBlur={stopPreview}>
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.title}`}>
          <img src={product.images[0]} alt={product.title} loading="lazy" />
        </Link>
        <video ref={previewRef} className={`product-card-preview ${previewPlaying ? 'is-playing' : ''}`} src={product.previewVideo} muted loop playsInline preload="none" onPlay={() => setPreviewPlaying(true)} aria-hidden="true" />
        <span className="product-tag">{product.tags.includes('new') ? 'New season' : 'PAIROZ original'}</span>
        <button className={`icon-button product-heart ${saved ? 'is-active' : ''}`} type="button" aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWishlist(product)}>
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card-copy">
        <div className="product-card-meta"><span className="product-brand"><span className="brand-dot" /> {product.brand} · {product.category}</span><span><Star size={12} fill="currentColor" /> {product.rating}</span></div>
        <Link className="product-title" to={`/product/${product.slug}`}>{product.title}</Link>
        <div className="price-line"><strong>{money(product.price)}</strong><del>{money(product.compareAtPrice)}</del><span>{discount}% off</span></div>
        <Link className="product-view-link" to={`/product/${product.slug}`}>View this pair <span>↗</span></Link>
      </div>
    </article>
  )
}
