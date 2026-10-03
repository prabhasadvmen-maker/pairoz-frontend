import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlistStore } from '../../store/useStore'

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function ProductCard({ product, compact = false }) {
  const saved = useWishlistStore((state) => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const discount = Math.round((1 - product.price / product.compareAtPrice) * 100)
  return (
    <article className={`product-card ${compact ? 'product-card-compact' : ''}`}>
      <div className="product-card-image">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.title}`}>
          <img src={product.images[0]} alt={product.title} loading="lazy" />
        </Link>
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
