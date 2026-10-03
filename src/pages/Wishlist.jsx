import { ArrowRight, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore, useWishlistStore } from '../store/useStore'
import ProductCard from '../components/product/ProductCard'

export default function Wishlist() {
  const items = useWishlistStore((state) => state.items)
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)
  const addToCart = useCartStore((state) => state.addToCart)
  const moveToBag = (product) => {
    addToCart(product, product.sizes[0], product.colors[0])
    removeFromWishlist(product.id)
  }
  return <main className="page-wrap"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span>Wishlist</div><header className="listing-heading"><div><p className="eyebrow">Your considered collection</p><h1>Saved for later.</h1><p>All the pairs you can’t stop thinking about.</p></div><span>{items.length} saved</span></header>
    {!items.length ? <div className="empty-state"><Heart size={38} /><h2>Your wishlist is waiting.</h2><p>Keep the pairs you love close, and come back when the moment feels right.</p><Link className="button button-dark" to="/shop">Discover the collection <ArrowRight size={16} /></Link></div> : <div className="wishlist-grid">{items.map((product) => <div className="wishlist-item" key={product.id}><ProductCard product={product} /><div className="wishlist-actions"><button className="button button-dark" onClick={() => moveToBag(product)}><ShoppingBag size={15} /> Move to bag</button><button className="text-button" onClick={() => removeFromWishlist(product.id)}><Trash2 size={15} /> Remove</button></div></div>)}</div>}
  </main>
}
