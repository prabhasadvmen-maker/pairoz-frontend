import { useState } from 'react'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { categories } from '../../data/mockData'
import { useCartStore, useWishlistStore } from '../../store/useStore'
import CartDrawer from '../commerce/CartDrawer'

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const totalItems = useCartStore((state) => state.totalItems)
  const wishlistCount = useWishlistStore((state) => state.items.length)
  const search = (event) => {
    event.preventDefault()
    navigate(`/shop?search=${encodeURIComponent(query)}`)
    setSearchOpen(false)
    setMobileOpen(false)
  }
  return <>
    <div className="announcement">A little something for your next occasion <span>— complimentary shipping on every order</span></div>
    <header className={`site-header ${pathname === '/' ? 'site-header-overlay' : ''}`}>
      <button className="icon-button mobile-menu-trigger" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      <Link className="wordmark" to="/" aria-label="PAIROZ home"><img src="/pairoz-logo.png" alt="PAIROZ Premium Footwear" /></Link>
      <nav className={`primary-nav ${mobileOpen ? 'mobile-open' : ''}`}>
        <NavLink to="/shop" onClick={() => setMobileOpen(false)}>Shop <ChevronDown size={14} /></NavLink>
        <div className="mega-menu">{categories.map((category) => <Link key={category.slug} to={`/category/${category.slug}`} onClick={() => setMobileOpen(false)}>{category.name}<span>Explore the edit</span></Link>)}<Link className="mega-all" to="/shop">View all styles →</Link></div>
        <NavLink to="/shop?sort=newest" onClick={() => setMobileOpen(false)}>New arrivals</NavLink>
        <NavLink to="/about" onClick={() => setMobileOpen(false)}>Our story</NavLink>
        <NavLink to="/faq" onClick={() => setMobileOpen(false)}>FAQs</NavLink>
        <NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>
      </nav>
      <div className="header-tools">
        <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search /></button>
        <Link className="icon-button header-wishlist" to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`}><Heart /><span>{wishlistCount}</span></Link>
        <button className="icon-button header-bag" aria-label={`Open bag, ${totalItems()} items`} onClick={() => setCartOpen(true)}><ShoppingBag /><span>{totalItems()}</span></button>
      </div>
      {searchOpen && <form className="search-popover" onSubmit={search}><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search heels, styles, brands..." /><button aria-label="Submit search"><Search size={18} /></button></form>}
    </header>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </>
}
