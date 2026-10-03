import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useStore'

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCartStore()
  if (!open) return null
  return <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <header className="drawer-header"><div><p className="eyebrow">PAIROZ edit</p><h2>Your bag <span>({totalItems()})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close bag"><X /></button></header>
      {!items.length ? <div className="drawer-empty"><ShoppingBag size={38} /><h3>Your bag is waiting</h3><p>Find a pair that feels like you.</p><Link className="button button-dark" to="/shop" onClick={onClose}>Explore the collection</Link></div> : <>
        <div className="drawer-items">{items.map((item) => <article className="drawer-item" key={item.key}><img src={item.product.images[0]} alt={item.product.title} /><div className="drawer-item-info"><span className="muted-small">{item.product.brand}</span><strong>{item.product.title}</strong><span className="muted-small">Size {item.size} · {item.color}</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={13} /></button><button className="remove-item" aria-label="Remove item" onClick={() => removeFromCart(item.key)}><Trash2 size={14} /></button></div></div><strong className="item-total">{money(item.product.price * item.quantity)}</strong></article>)}</div>
        <div className="drawer-summary"><div><span>Subtotal</span><strong>{money(subtotal())}</strong></div><p>Shipping and taxes are calculated at checkout.</p><Link className="button button-dark full-button" to="/cart" onClick={onClose}>Proceed to Checkout <span>→</span></Link><button className="text-button continue-shopping" onClick={onClose}>Continue shopping</button></div>
      </>}
    </aside>
  </div>
}
