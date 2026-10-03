import { useState } from 'react'
import { Heart, Minus, Plus, ShieldCheck, Star, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/mockData'
import { useCartStore, useWishlistStore } from '../store/useStore'
import ProductCard from '../components/product/ProductCard'

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const [imageIndex, setImageIndex] = useState(0)
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
  const add = () => {
    if (!size || !color) {
      setMessage(!size && !color ? 'Choose a size and colour to continue.' : !size ? 'Please choose your size.' : 'Please choose a colour.')
      return
    }
    addToCart(product, size, color, quantity)
    setMessage('Added to your bag.')
  }
  return <main className="page-wrap detail-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span>{product.title}</div><div className="product-detail-layout"><div className="gallery"><div className="gallery-main"><img src={product.images[imageIndex]} alt={product.title} /></div><div className="gallery-thumbs">{product.images.map((src, index) => <button className={imageIndex === index ? 'active' : ''} onClick={() => setImageIndex(index)} key={src} aria-label={`View image ${index + 1}`}><img src={src} alt="" /></button>)}</div></div>
    <section className="detail-copy"><p className="eyebrow">{product.brand} · {product.category}</p><h1>{product.title}</h1><div className="detail-rating"><Star size={14} fill="currentColor" /> {product.rating} <span>· 36 reviews</span></div><div className="detail-price"><strong>{money(product.price)}</strong><del>{money(product.compareAtPrice)}</del><span>{Math.round((1 - product.price / product.compareAtPrice) * 100)}% off</span></div><p className="detail-description">{product.description}</p>
      <div className="variant-heading"><strong>Colour</strong><span>{color || 'Select a colour'}</span></div><div className="color-options">{product.colors.map((item) => <button key={item} className={`color-chip ${color === item ? 'selected' : ''}`} onClick={() => setColor(item)}>{item}</button>)}</div>
      <div className="variant-heading size-heading"><strong>Size (EU)</strong><button className="text-button" onClick={() => setGuideOpen(true)}>Size guide</button></div><div className="size-options">{product.sizes.map((item) => <button key={item} className={size === item ? 'selected' : ''} onClick={() => { setSize(item); setMessage('') }}>{item}</button>)}</div>
      <div className="detail-buy-row"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div><button className="button button-dark add-cart-button" onClick={add}>Add to bag · {money(product.price * quantity)}</button><button className={`icon-button detail-wishlist ${saved ? 'is-active' : ''}`} aria-label="Toggle wishlist" onClick={() => toggleWishlist(product)}><Heart fill={saved ? 'currentColor' : 'none'} /></button></div><p className="variant-message" role="status">{message}</p>
      <div className="delivery-promise"><p><Truck size={17} /> Complimentary delivery, dispatched in 48 hours</p><p><ShieldCheck size={17} /> Easy 7-day return & exchange</p></div>
      <details className="detail-accordion" open><summary>Details & craftsmanship</summary><p>{product.description}</p></details><details className="detail-accordion"><summary>Specifications</summary><dl>{Object.entries(product.specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></details><details className="detail-accordion"><summary>Shipping & returns</summary><p>Complimentary standard delivery across India. Unworn pairs may be returned or exchanged within 7 days of delivery.</p></details>
    </section></div><section className="content-section related-products"><header className="section-heading"><div><p className="eyebrow">Pairs well with your plans</p><h2>You may also love.</h2></div></header><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></section>
    {guideOpen && <div className="modal-backdrop" role="presentation" onClick={() => setGuideOpen(false)}><section className="size-modal" role="dialog" aria-modal="true" aria-labelledby="size-guide-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setGuideOpen(false)} aria-label="Close size guide">×</button><p className="eyebrow">Find your fit</p><h2 id="size-guide-title">Size guide</h2><p>Measure your foot from heel to longest toe, then match it to your EU size.</p><table><thead><tr><th>EU</th><th>Foot length</th></tr></thead><tbody>{[[36, 23], [37, 23.5], [38, 24], [39, 24.7], [40, 25.4], [41, 26]].map(([eu, cm]) => <tr key={eu}><td>{eu}</td><td>{cm} cm</td></tr>)}</tbody></table></section></div>}
  </main>
}
