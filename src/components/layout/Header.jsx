import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { categories } from '../../data/mockData'
import { useCartStore, useWishlistStore } from '../../store/useStore'
import CartDrawer from '../commerce/CartDrawer'

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const totalItems = useCartStore((state) => state.totalItems)
  const wishlistCount = useWishlistStore((state) => state.items.length)

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const search = (event) => {
    event.preventDefault()
    navigate(`/shop?search=${encodeURIComponent(query)}`)
    setSearchOpen(false)
    setMobileOpen(false)
  }

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileShopOpen(false)
  }

  return <>
    <div className="announcement">A little something for your next occasion <span>— complimentary shipping on every order</span></div>
    <header className={`site-header ${pathname === '/' ? 'site-header-overlay' : ''}`}>
      <button 
        className="icon-button mobile-menu-trigger" 
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'} 
        onClick={() => setMobileOpen(true)}
      >
        <Menu />
      </button>

      <Link className="wordmark" to="/" aria-label="PAIROZ home">
        <img src="/pairoz-logo.png" alt="PAIROZ Premium Footwear" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="primary-nav desktop-nav">
        <div className="shop-nav-group">
          <NavLink className="desktop-shop-link" to="/shop">
            <span>Shop</span>
            <ChevronDown size={14} className="shop-chevron" />
          </NavLink>
          <div className="mega-menu">
            {categories.map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                {category.name}
                <span>Explore the edit</span>
              </Link>
            ))}
            <Link className="mega-all" to="/shop">View all styles →</Link>
          </div>
        </div>
        <NavLink to="/shop?sort=newest">New arrivals</NavLink>
        <NavLink to="/about">Our story</NavLink>
        <NavLink to="/faq">FAQs</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="header-tools">
        <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
          <Search />
        </button>
        <Link className="icon-button header-wishlist" to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`}>
          <Heart />
          <span>{wishlistCount}</span>
        </Link>
        <button className="icon-button header-bag" aria-label={`Open bag, ${totalItems()} items`} onClick={() => setCartOpen(true)}>
          <ShoppingBag />
          <span>{totalItems()}</span>
        </button>
      </div>

      {searchOpen && (
        <form className="search-popover" onSubmit={search}>
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search heels, styles, brands..." />
          <button aria-label="Submit search"><Search size={18} /></button>
        </form>
      )}
    </header>

    {/* Manish Malhotra Style Mobile Navigation Drawer */}
    <div 
      className={`mobile-drawer-overlay ${mobileOpen ? 'is-active' : ''}`}
      onClick={closeMobile}
      aria-hidden="true"
    />

    <aside 
      className={`mobile-nav-drawer ${mobileOpen ? 'is-active' : ''}`} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Site Navigation"
    >
      {/* Drawer Header: Close (X) | Centered P PAIROZ Logo | Search & Bag */}
      <div className="mobile-drawer-header">
        <button 
          type="button" 
          className="drawer-close-btn" 
          onClick={closeMobile} 
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <Link to="/" className="drawer-logo" onClick={closeMobile}>
          <span className="drawer-logo-initial">P</span>
          <span className="drawer-logo-name">PAIROZ</span>
        </Link>

        <div className="drawer-header-actions">
          <button 
            type="button" 
            className="drawer-action-btn" 
            aria-label="Search"
            onClick={() => { closeMobile(); setSearchOpen(true); }}
          >
            <Search size={22} />
          </button>
          <button 
            type="button" 
            className="drawer-action-btn drawer-bag-trigger" 
            aria-label="Open cart"
            onClick={() => { closeMobile(); setCartOpen(true); }}
          >
            <ShoppingBag size={22} />
            {totalItems() > 0 && <span className="drawer-bag-badge">{totalItems()}</span>}
          </button>
        </div>
      </div>

      {/* Menu Rows Matching Navbar Sections Exactly */}
      <div className="mobile-drawer-scroll">
        {/* 1. SHOP (Expandable with categories & all styles) */}
        <div className="mobile-drawer-group">
          <button 
            type="button" 
            className="mobile-drawer-row drawer-row-btn"
            onClick={() => setMobileShopOpen(!mobileShopOpen)}
            aria-expanded={mobileShopOpen}
          >
            <span className="row-text">SHOP</span>
            <ChevronRight size={18} className={`drawer-arrow ${mobileShopOpen ? 'is-open' : ''}`} />
          </button>
          {mobileShopOpen && (
            <div className="drawer-sublinks">
              <Link to="/shop" onClick={closeMobile} className="drawer-sublink-all">
                View all styles →
              </Link>
              {categories.map((c) => (
                <Link key={c.slug} to={`/category/${c.slug}`} onClick={closeMobile} className="drawer-sublink">
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 2. NEW ARRIVALS */}
        <Link 
          to="/shop?sort=newest" 
          className="mobile-drawer-row" 
          onClick={closeMobile}
        >
          <span className="row-text">NEW ARRIVALS</span>
        </Link>

        {/* 3. OUR STORY */}
        <Link 
          to="/about" 
          className="mobile-drawer-row" 
          onClick={closeMobile}
        >
          <span className="row-text">OUR STORY</span>
        </Link>

        {/* 4. FAQS */}
        <Link 
          to="/faq" 
          className="mobile-drawer-row" 
          onClick={closeMobile}
        >
          <span className="row-text">FAQS</span>
        </Link>

        {/* 5. CONTACT */}
        <Link 
          to="/contact" 
          className="mobile-drawer-row" 
          onClick={closeMobile}
        >
          <span className="row-text">CONTACT</span>
        </Link>

        <div className="drawer-footer-note">
          <p>PAIROZ PREMIUM FOOTWEAR</p>
          <span>Complimentary Express Shipping on all orders</span>
        </div>
      </div>
    </aside>

    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </>
}
