import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCartStore } from '../store/useStore'

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCartStore()
  const [checkoutNotice, setCheckoutNotice] = useState(false)
  return <main className="page-wrap cart-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span>Shopping bag</div><header className="listing-heading"><div><p className="eyebrow">Your PAIROZ selection</p><h1>Your bag.</h1><p>Beautiful things, thoughtfully chosen.</p></div></header>
    {!items.length ? <div className="empty-state"><ShoppingBag size={38} /><h2>Your bag is taking a little breather.</h2><p>There’s nothing here just yet. The perfect pair is waiting.</p><Link className="button button-dark" to="/shop">Explore footwear</Link></div> : <div className="cart-layout"><section className="cart-list">{items.map((item) => <article className="cart-line-item" key={item.key}><Link to={`/product/${item.product.slug}`}><img src={item.product.images[0]} alt={item.product.title} /></Link><div className="cart-line-details"><span className="eyebrow">{item.product.brand}</span><Link to={`/product/${item.product.slug}`}><h2>{item.product.title}</h2></Link><p>Colour: {item.color} · EU {item.size}</p><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={13} /></button></div></div><strong>{money(item.product.price * item.quantity)}</strong><button className="icon-button" aria-label="Remove item" onClick={() => removeFromCart(item.key)}><Trash2 size={17} /></button></article>)}</section>
      <aside className="order-summary"><p className="eyebrow">A little summary</p><h2>Order total</h2><div><span>Subtotal</span><strong>{money(subtotal())}</strong></div><div><span>Shipping</span><strong>Complimentary</strong></div><hr /><div className="summary-total"><span>Total</span><strong>{money(subtotal())}</strong></div><p className="summary-note">Taxes included where applicable. Shipping is on us.</p><button className="button button-dark full-button" onClick={() => setCheckoutNotice(true)}>Proceed to checkout <span>→</span></button>{checkoutNotice && <p className="checkout-notice" role="status">This is a frontend demo. Checkout and payment are not enabled.</p>}<Link className="continue-shopping" to="/shop">Continue discovering</Link></aside></div>}
  </main>
}
