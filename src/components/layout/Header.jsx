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
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('footwear')
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
    setMobileCollectionsOpen(false)
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
      {/* Top 3 Tabs like COUTURE | JEWELLERY | ACCESSORIES */}
      <div className="mobile-drawer-tabs">
        <button 
          type="button" 
          className={`drawer-tab ${activeTab === 'footwear' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('footwear')}
        >
          COUTURE
        </button>
        <button 
          type="button" 
          className={`drawer-tab ${activeTab === 'collections' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('collections')}
        >
          COLLECTIONS
        </button>
        <button 
          type="button" 
          className={`drawer-tab ${activeTab === 'accessories' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('accessories')}
        >
          ACCESSORIES
        </button>
      </div>

      {/* Drawer Header: Close (X) | Centered Logo | Search & Bag */}
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
          <span className="drawer-logo-initial">M</span>
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

      {/* Menu Rows Matching Manish Malhotra Structure */}
      <div className="mobile-drawer-scroll">
        <Link 
          to="/shop?sort=newest" 
          className="mobile-drawer-row mobile-tryon-row" 
          onClick={closeMobile}
        >
          <span className="row-text">VIRTUAL TRY ON</span>
          <span className="badge-new-pill">NEW</span>
        </Link>

        <Link 
          to="/shop?sort=newest" 
          className="mobile-drawer-row" 
          onClick={closeMobile}
        >
          <span className="row-text">NEW ARRIVALS</span>
        </Link>

        {/* WOMEN / HEELS with Expandable Arrow */}
        <div className="mobile-drawer-group">
          <button 
            type="button" 
            className="mobile-drawer-row drawer-row-btn"
            onClick={() => setMobileShopOpen(!mobileShopOpen)}
            aria-expanded={mobileShopOpen}
          >
            <span className="row-text">WOMEN</span>
            <ChevronRight size={18} className={`drawer-arrow ${mobileShopOpen ? 'is-open' : ''}`} />
          </button>
          {mobileShopOpen && (
            <div className="drawer-sublinks">
              <Link to="/shop" onClick={closeMobile} className="drawer-sublink-all">
                All Women's Footwear →
              </Link>
              {categories.map((c) => (
                <Link key={c.slug} to={`/category/${c.slug}`} onClick={closeMobile} className="drawer-sublink">
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* COLLECTIONS with Expandable Arrow */}
        <div className="mobile-drawer-group">
          <button 
            type="button" 
            className="mobile-drawer-row drawer-row-btn"
            onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
            aria-expanded={mobileCollectionsOpen}
          >
            <span className="row-text">COLLECTIONS</span>
            <ChevronRight size={18} className={`drawer-arrow ${mobileCollectionsOpen ? 'is-open' : ''}`} />
          </button>
          {mobileCollectionsOpen && (
            <div className="drawer-sublinks">
              {['Aurelia', 'Mira', 'Veloura', 'Soleil'].map((col) => (
                <Link key={col} to={`/shop?search=${col}`} onClick={closeMobile} className="drawer-sublink">
                  {col} Collection
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/category/party-wear" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">JEWELLERY & EMBELLISHED</span>
        </Link>

        <Link to="/about" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">STARS OF PAIROZ</span>
        </Link>

        <Link to="/shop?search=wedding" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">PAIROZ VOWS</span>
        </Link>

        <Link to="/about" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">RUNWAYS & EDITORIAL</span>
        </Link>

        <Link to="/about" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">ABOUT US</span>
        </Link>

        <Link to="/faq" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">FAQS & CARE</span>
        </Link>

        <Link to="/contact" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">CONTACT US</span>
        </Link>

        <Link to="/wishlist" className="mobile-drawer-row" onClick={closeMobile}>
          <span className="row-text">SAVED WISHLIST ({wishlistCount})</span>
        </Link>

        <div className="drawer-footer-note">
          <p>PAIROZ HAUTE COUTURE FOOTWEAR</p>
          <span>Complimentary Express Shipping on all orders</span>
        </div>
      </div>
    </aside>

    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </>
}
